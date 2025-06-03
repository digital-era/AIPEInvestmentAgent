// functions/api/sts-credentials.js

export async function onRequestPost(context) {
    try {
      const { request, env } = context;
      const OSS_ACCESS_KEY_ID = env.OSS_ACCESS_KEY_ID;
      const OSS_ACCESS_KEY_SECRET = env.OSS_ACCESS_KEY_SECRET;
      const OSS_STS_ROLE_ARN = env.OSS_STS_ROLE_ARN;
      const OSS_REGION = env.OSS_REGION;
      
      if (!OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_STS_ROLE_ARN || !OSS_REGION) {
        return new Response(JSON.stringify({ error: 'STS 配置不完整' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 1. 准备请求参数（按字母顺序排序）
      const params = {
        AccessKeyId: OSS_ACCESS_KEY_ID,
        Action: 'AssumeRole',
        DurationSeconds: 3600,
        Format: 'JSON',
        RegionId: OSS_REGION,
        RoleArn: OSS_STS_ROLE_ARN,
        RoleSessionName: 'cf-worker-' + Date.now(),
        SignatureMethod: 'HMAC-SHA1',
        SignatureNonce: Date.now() + Math.random().toString(36).substring(2, 8),
        SignatureVersion: '1.0',
        Timestamp: new Date().toISOString().replace(/\.\d{3}Z/, 'Z'),
        Version: '2015-04-01'
      };
  
      // 2. 生成规范化的查询字符串
      const canonicalizedQueryString = Object.keys(params)
        .sort()
        .map(key => `${aliyunPercentEncode(key)}=${aliyunPercentEncode(params[key])}`)
        .join('&');
  
      // 3. 构造签名字符串
      const method = 'GET';
      const stringToSign = `${method}&${aliyunPercentEncode('/')}&${aliyunPercentEncode(canonicalizedQueryString)}`;
      
      // 4. 计算签名
      const signature = await hmacSha1(stringToSign, `${OSS_ACCESS_KEY_SECRET}&`);
      
      // 5. 添加签名到参数
      params.Signature = signature;
  
      // 6. 构造最终请求URL
      const queryStringWithSignature = Object.keys(params)
        .sort()
        .map(key => `${aliyunPercentEncode(key)}=${aliyunPercentEncode(params[key])}`)
        .join('&');
        
      const endpoint = `https://sts.${OSS_REGION}.aliyuncs.com`;
      const url = `${endpoint}/?${queryStringWithSignature}`;
  
      // 7. 发送请求
      const response = await fetch(url, { method: 'GET' });
      
      // 8. 处理响应
      const responseText = await response.text();
      
      // 调试：记录响应前100个字符
      console.log(`STS响应: ${response.status} - ${responseText.substring(0, 100)}`);
      
      if (!response.ok) {
        throw new Error(`阿里云STS错误: ${response.status} ${response.statusText}`);
      }
      
      const result = JSON.parse(responseText);
      
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

// 阿里云专用百分比编码
function aliyunPercentEncode(str) {
  return encodeURIComponent(str)
    .replace(/!/g, '%21')
    .replace(/'/g, '%27')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29')
    .replace(/\*/g, '%2A')
    .replace(/%20/g, '+');
}

// HMAC-SHA1签名计算
async function hmacSha1(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  );
  
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    encoder.encode(message)
  );
  
  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
