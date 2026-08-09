import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'Abhitvg';
const REPO = 'india-eurasia-research-forum';
const PATH = 'src/data/content.json';
const BRANCH = 'main';

function friendlyGitHubError(status: number, body: string): string {
  if (status === 401) {
    return 'GitHub token is invalid or expired. Please generate a new Personal Access Token and update your .env / Vercel environment variables.';
  }
  if (status === 403) {
    return 'GitHub token does not have permission to write to this repository. Ensure the token has "Contents: Read and write" scope.';
  }
  if (status === 404) {
    return `Repository "${OWNER}/${REPO}" not found, or the token does not have access to it.`;
  }
  if (status === 409) {
    return 'Conflict: The file was modified by another process. Please try saving again.';
  }
  if (status === 422) {
    return 'GitHub rejected the request. The file SHA may be stale — please refresh and try again.';
  }
  return `GitHub API error (${status}): ${body.substring(0, 200)}`;
}

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ success: false, message: 'Missing GITHUB_TOKEN environment variable. Add it to your .env file.' }, { status: 500 });
    }

    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    
    // 1. Fetch current file to get the SHA
    const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    let sha = undefined;
    if (getRes.ok) {
      const currentFile = await getRes.json();
      sha = currentFile.sha;
    } else if (getRes.status !== 404) {
      const errorText = await getRes.text();
      throw new Error(friendlyGitHubError(getRes.status, errorText));
    }

    // 2. Commit the new file
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: 'Content update via Git-Backed CMS',
        content: Buffer.from(JSON.stringify(content, null, 2)).toString('base64'),
        sha,
        branch: BRANCH
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      throw new Error(friendlyGitHubError(putRes.status, errorText));
    }

    return NextResponse.json({ success: true, message: 'Content successfully saved to GitHub!' });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
