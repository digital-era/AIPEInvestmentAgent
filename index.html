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
    return new Response(JSON.stringify({ error: 'STS 配置不完整' }), {
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
      Format: 'JSON',
      Version: '2015-04-01',
      AccessKeyId: OSS_ACCESS_KEY_ID,
      SignatureMethod: 'HMAC-SHA1',
      SignatureVersion: '1.0',
      Timestamp: new Date().toISOString().replace(/\.\d{3}Z/, 'Z'),
      SignatureNonce: Date.now() + Math.random().toString(36).substring(2, 10),
      RegionId: OSS_REGION
    };

    // 2. 生成签名 (使用阿里云特定的编码规则)
    const signature = await generateAliyunSignature(params, OSS_ACCESS_KEY_SECRET);
    params.Signature = signature;

    // 3. 构造请求URL (使用阿里云要求的编码方式)
    const endpoint = `https://sts.${OSS_REGION}.aliyuncs.com`;
    const queryString = Object.keys(params)
      .sort()
      .map(key => `${percentEncode(key)}=${percentEncode(params[key])}`)
      .join('&');

    const url = `${endpoint}/?${queryString}`;
    console.log("请求URL:", url);  // 调试用

    // 4. 发送请求
    const response = await fetch(url, { method: 'GET' });
    
    // 检查响应类型
    const contentType = response.headers.get('content-type') || '';
    const responseText = await response.text();
    
    if (!contentType.includes('application/json')) {
      console.error("非JSON响应:", responseText.substring(0, 300));
      throw new Error(`阿里云返回错误: ${response.status} ${response.statusText}`);
    }

    const result = JSON.parse(responseText);

    // 5. 处理响应
    if (result.Credentials) {
      return new Response(JSON.stringify({
        AccessKeyId: result.Credentials.AccessKeyId,
        AccessKeySecret: result.Credentials.AccessKeySecret,
        SecurityToken: result.Credentials.SecurityToken,
        Expiration: result.Credentials.Expiration
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, max-age=0' 
        }
      });
    } else if (result.Code) {
      console.error('STS错误响应:', result);
      throw new Error(`${result.Code}: ${result.Message}`);
    } else {
      throw new Error('无效的STS响应');
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

// 阿里云特定的百分比编码
function percentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+'); // 阿里云要求空格编码为+
}

// 符合阿里云规范的签名生成
async function generateAliyunSignature(params, accessKeySecret) {
  // 1. 参数排序和编码
  const sortedKeys = Object.keys(params).sort();
  const canonicalized = sortedKeys
    .map(key => `${percentEncode(key)}=${percentEncode(params[key])}`)
    .join('&');

  // 2. 构造签名字符串
  const stringToSign = 
    'GET&%2F&' + 
    percentEncode(canonicalized).replace(/%20/g, '+');

  // 3. 计算签名
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
