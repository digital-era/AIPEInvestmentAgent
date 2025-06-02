export default {
  async fetch(request, env, ctx) {
    if (request.method === "GET") {
      return handleGetRequest({ env });
    }
    return new Response("Method Not Allowed", { status: 405 });
  }
};

async function handleGetRequest(context) {
  const { env } = context;
  const { OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_STS_ROLE_ARN, OSS_REGION } = env;

  if (!OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_STS_ROLE_ARN || !OSS_REGION) {
    return new Response(JSON.stringify({ error: 'STS 服务器配置不完整' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // 1. 准备请求参数
    const params = {
      Action: 'AssumeRole',
      RoleArn: OSS_STS_ROLE_ARN,
      RoleSessionName: 'cf-worker-session-' + Date.now(),
      DurationSeconds: 3600,
      Format: 'JSON', // 明确要求JSON响应
      Version: '2015-04-01',
      AccessKeyId: OSS_ACCESS_KEY_ID,
      SignatureMethod: 'HMAC-SHA1',
      SignatureVersion: '1.0',
      Timestamp: new Date().toISOString().replace(/\.\d{3}Z/, 'Z'), // ISO8601格式
      SignatureNonce: Date.now() + Math.random().toString(36).substring(2, 10),
      RegionId: OSS_REGION
    };

    // 2. 生成签名
    const signature = await generateSignature(params, OSS_ACCESS_KEY_SECRET);
    params.Signature = signature;

    // 3. 构造请求URL
    const endpoint = `https://sts.${OSS_REGION}.aliyuncs.com`;
    const queryString = new URLSearchParams(params).toString();

    // 4. 发送请求
    const response = await fetch(`${endpoint}?${queryString}`, {
      method: 'GET' // STS AssumeRole 支持GET请求
    });

    const result = await response.json();

    // 5. 处理响应
    if (result.Credentials) {
      return new Response(JSON.stringify({
        AccessKeyId: result.Credentials.AccessKeyId,
        AccessKeySecret: result.Credentials.AccessKeySecret,
        SecurityToken: result.Credentials.SecurityToken,
        Expiration: result.Credentials.Expiration
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      console.error('STS响应异常:', result);
      throw new Error(`STS服务错误: ${result.Code || '未知错误'}`);
    }
  } catch (error) {
    console.error('STS请求失败:', error);
    return new Response(JSON.stringify({
      error: `获取STS凭证失败: ${error.message}`
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 生成阿里云签名
async function generateSignature(params, accessKeySecret) {
  // 1. 参数按key排序
  const sortedKeys = Object.keys(params).sort();
  const canonicalizedQueryString = sortedKeys
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

  // 2. 构造签名字符串
  const stringToSign = `GET&%2F&${encodeURIComponent(canonicalizedQueryString)}`;

  // 3. 计算HMAC-SHA1
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(`${accessKeySecret}&`),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(stringToSign)
  );

  // 4. Base64编码
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
