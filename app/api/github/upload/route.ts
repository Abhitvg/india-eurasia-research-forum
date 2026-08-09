import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const OWNER = 'Abhitvg';
const REPO = 'india-eurasia-research-forum';
const BRANCH = 'main';

function friendlyGitHubError(status: number, body: string): string {
  if (status === 401) return 'GitHub token is invalid or expired. Please generate a new Personal Access Token.';
  if (status === 403) return 'GitHub token lacks write permission. Ensure "Contents: Read and write" scope.';
  if (status === 404) return `Repository "${OWNER}/${REPO}" not found or token has no access.`;
  if (status === 422) return 'GitHub rejected the file. It may already exist with a different SHA — try again.';
  return `GitHub API error (${status}): ${body.substring(0, 200)}`;
}

export async function POST(request: NextRequest) {
  try {
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'Missing file in request.' },
        { status: 400 }
      );
    }

    const filename = file.name;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString('base64');

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { success: false, message: 'Missing GITHUB_TOKEN environment variable.' },
        { status: 500 }
      );
    }

    // 1. Write file to local public/images/ directory so it's immediately available
    try {
      const localDir = path.join(process.cwd(), 'public', 'images');
      if (!fs.existsSync(localDir)) {
        fs.mkdirSync(localDir, { recursive: true });
      }
      const localPath = path.join(localDir, filename);
      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(localPath, buffer);
      console.log(`Image written locally: ${localPath} (${buffer.length} bytes)`);
    } catch (localErr: any) {
      // Local write failure is non-fatal in production (read-only filesystem)
      console.warn('Local file write failed (expected in production):', localErr.message);
    }

    // 2. Commit to GitHub for persistence across deployments
    const ghPath = `public/images/${filename}`;
    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${ghPath}`;

    // Check if file already exists to get SHA (needed for updates)
    let sha: string | undefined;
    try {
      const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      if (getRes.ok) {
        const existing = await getRes.json();
        sha = existing.sha;
      }
    } catch {
      // File doesn't exist, that's fine
    }

    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload image ${filename} via CMS`,
        content: base64Data,
        ...(sha ? { sha } : {}),
        branch: BRANCH,
      }),
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      console.error('GitHub API Error:', putRes.status, errorText);
      throw new Error(friendlyGitHubError(putRes.status, errorText));
    }

    return NextResponse.json({
      success: true,
      message: 'Image uploaded successfully!',
      url: `/images/${filename}`,
    });
  } catch (err: any) {
    console.error('Upload API Error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Unknown upload error' },
      { status: 500 }
    );
  }
}
