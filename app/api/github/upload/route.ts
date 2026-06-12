import { NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'abhisheksingh214';
const REPO = 'india-eurasia-research-forum';
const BRANCH = 'main';

export async function POST(request: Request) {
  try {
    const { filename, base64Data } = await request.json();
    
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ success: false, message: 'Missing GITHUB_TOKEN environment variable.' }, { status: 500 });
    }

    const path = `public/images/${filename}`;
    const apiUrl = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`;
    
    // We assume the file doesn't exist, so no SHA is provided. 
    // If it exists, GitHub will reject the PUT without a SHA.
    // That's fine for our use case (filenames should be unique).
    
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Upload image ${filename} via Git-Backed CMS`,
        content: base64Data, // already in base64 without the data URI prefix
        branch: BRANCH
      })
    });

    if (!putRes.ok) {
      const errorText = await putRes.text();
      throw new Error(`Failed to commit image: ${errorText}`);
    }

    const result = await putRes.json();

    return NextResponse.json({ success: true, message: 'Image successfully uploaded to GitHub!', url: `/images/${filename}` });
  } catch (err: any) {
    console.error('API Error:', err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
