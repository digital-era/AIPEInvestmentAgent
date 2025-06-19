/**
 * Cloudflare Function - API Proxy
 * Forwards requests from /api/rtStockQueryProxy to the Vercel backend service.
 * 
 * Expects query parameters:
 * - `code`: The stock code (e.g., '600900')
 * - `type`: The type of query ('price' or 'info')
 */
export async function onRequest(context) {
  // Get the Vercel API URL from environment variables for security and flexibility.
  const vercelApiUrl = context.env.VERCEL_API_URL;

  if (!vercelApiUrl) {
    return new Response(
      JSON.stringify({ error: 'Backend service URL is not configured.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  // Get query parameters from the incoming request URL.
  const url = new URL(context.request.url);
  const code = url.searchParams.get('code');
  const type = url.searchParams.get('type');

  // Basic validation.
  if (!code || !type) {
    return new Response(
      JSON.stringify({ error: 'Missing required parameters: code and type.' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
  
  // Construct the target URL for the Vercel service.
  const targetUrl = `${vercelApiUrl}?code=${encodeURIComponent(code)}&type=${encodeURIComponent(type)}`;

  try {
    // Make the request to the Vercel backend.
    const response = await fetch(targetUrl, {
        // Vercel serverless functions can sometimes be slow to start (cold start).
        // A longer timeout might be necessary. Cloudflare's default fetch timeout is generous.
        headers: {
            'Accept': 'application/json'
        }
    });

    // Re-create the response to pass back to the client.
    // This includes the status, headers, and body from the Vercel service.
    const responseData = await response.json();

    return new Response(JSON.stringify(responseData), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        // Optional: Add caching headers if desired
        // 'Cache-Control': 's-maxage=60, stale-while-revalidate=30'
      },
    });

  } catch (error) {
    console.error('Error proxying request to Vercel:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to connect to the backend service.' }),
      {
        status: 502, // Bad Gateway
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
