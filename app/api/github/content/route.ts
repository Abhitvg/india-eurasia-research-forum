import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'abhisheksingh214';
const REPO = 'india-eurasia-research-forum';
const PATH = 'src/data/content.json';
const BRANCH = 'main';

export async function POST(request: Request) {
  try {
    const { content } = await request.json();
    
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ success: false, message: 'Missing GITHUB_TOKEN environment variable.' }, { status: 500 });
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
      throw new Error(`Failed to fetch current file SHA: ${errorText}`);
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
      throw new Error(`Failed to commit file: ${errorText}`);
    }

    return NextResponse.json({ success: true, message: 'Content successfully saved to GitHub!' });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
