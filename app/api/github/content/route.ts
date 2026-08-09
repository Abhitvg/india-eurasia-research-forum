import { NextResponse } from 'next/server';

const REPO = 'india-eurasia-research-forum';
const PATH = 'src/data/content.json';
const BRANCH = 'main';

function getToken(): string | null {
  const raw = process.env.GITHUB_TOKEN;
  if (!raw) return null;
  // Trim whitespace/newlines that commonly sneak in when pasting into Vercel UI
  return raw.trim();
}

function friendlyGitHubError(status: number, body: string): string {
  if (status === 401) {
    return 'GitHub token is invalid or expired. Please generate a new Personal Access Token and update your .env / Vercel environment variables.';
  }
  if (status === 403) {
    return 'GitHub token does not have permission to write to this repository. Ensure the token has "Contents: Read and write" scope.';
  }
  if (status === 404) {
    return `Repository not found, or the token does not have access to it.`;
  }
  if (status === 409) {
    return 'Conflict: The file was modified by another process. Please try saving again.';
  }
  if (status === 422) {
    return 'GitHub rejected the request. The file SHA may be stale — please refresh and try again.';
  }
  return `GitHub API error (${status}): ${body.substring(0, 200)}`;
}

// GET /api/github/content — Health check: verify token + repo access
export async function GET() {
  const token = getToken();
  if (!token) {
    return NextResponse.json({ ok: false, error: 'GITHUB_TOKEN env var is not set' });
  }

  // 1. Check who the token belongs to
  const userRes = await fetch('https://api.github.com/user', {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
  });
  if (!userRes.ok) {
    return NextResponse.json({ ok: false, error: `Token invalid (${userRes.status})`, tokenLength: token.length, tokenPrefix: token.substring(0, 12) + '...' });
  }
  const user = await userRes.json();

  // 2. Check repo access using the authenticated user's login
  const owner = user.login;
  const repoRes = await fetch(`https://api.github.com/repos/${owner}/${REPO}`, {
    headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
  });

  return NextResponse.json({
    ok: repoRes.ok,
    user: user.login,
    repoAccess: repoRes.ok ? 'granted' : `denied (${repoRes.status})`,
    tokenLength: token.length,
    tokenPrefix: token.substring(0, 12) + '...',
    permissions: repoRes.ok ? (await repoRes.json()).permissions : null,
  });
}

export async function POST(request: Request) {
  try {
    const token = getToken();
    const { content } = await request.json();
    
    if (!token) {
      return NextResponse.json({ success: false, message: 'Missing GITHUB_TOKEN environment variable. Add it to your .env file.' }, { status: 500 });
    }

    // Validate content is not empty
    if (!content || Object.keys(content).length === 0) {
      return NextResponse.json({ success: false, message: 'Refusing to save empty content. This would break the site.' }, { status: 400 });
    }

    // Resolve owner from the token itself
    const userRes = await fetch('https://api.github.com/user', {
      headers: { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' },
    });
    if (!userRes.ok) {
      const errorText = await userRes.text();
      console.error('GitHub /user check failed:', userRes.status, errorText);
      throw new Error(friendlyGitHubError(userRes.status, errorText));
    }
    const user = await userRes.json();
    const OWNER = user.login;
    console.log(`Saving content as GitHub user: ${OWNER}, token length: ${token.length}`);

    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${PATH}`;
    
    // 1. Fetch current file to get the SHA
    const getRes = await fetch(`${apiUrl}?ref=${BRANCH}`, {
      headers: {
        'Authorization': `token ${token}`,
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
        'Authorization': `token ${token}`,
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
