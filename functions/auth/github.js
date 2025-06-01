// functions/auth/github.js

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    const { code, state: receivedState } = body;

    // It's good practice to also pass the state from the client to the function
    // and re-verify it here if you were using a server-side session for state.
    // However, for a pure static-site + function, client-side state verification is primary.

    if (!code) {
      return new Response(JSON.stringify({ error: 'Authorization code is missing' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const GITHUB_CLIENT_ID = env.G_CLIENT_ID;
    const GITHUB_CLIENT_SECRET = env.G_CLIENT_SECRET;
    // IMPORTANT: This redirect_uri MUST EXACTLY MATCH your GitHub OAuth App's callback URL
    // AND the redirect_uri used in the frontend.
    const REDIRECT_URI = `https://aipeinvestmentagent.pages.dev/callback.html`;

    if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
        console.error('Missing G_CLIENT_ID or G_CLIENT_SECRET in Cloudflare environment variables.');
        return new Response(JSON.stringify({ error: 'Server configuration error: OAuth client credentials missing.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const tokenUrl = 'https://github.com/login/oauth/access_token';
    const tokenParams = new URLSearchParams({
      client_id: GITHUB_CLIENT_ID,
      client_secret: GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: REDIRECT_URI,
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json', // Request JSON response from GitHub
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('GitHub token exchange error:', errorText, 'Status:', tokenResponse.status);
      return new Response(JSON.stringify({ error: 'Failed to exchange token with GitHub', details: errorText }), {
        status: tokenResponse.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
        console.error('GitHub token data error:', tokenData.error_description);
        return new Response(JSON.stringify({ error: tokenData.error_description || 'Error retrieving access token' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    // Successfully obtained access_token.
    // You can choose to return only the access_token or use it here to fetch user info
    // and return that. For this example, we return the full token data from GitHub.
    return new Response(JSON.stringify(tokenData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Cloudflare Function error in /auth/github:', error);
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
