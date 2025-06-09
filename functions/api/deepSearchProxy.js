// 临时调试代码: /functions/API/deepSearchProxy.js

// 简单的 CORS 头
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// 响应 OPTIONS 请求
export async function onRequestOptions(context) {
  return new Response(null, { status: 204, headers: corsHeaders });
}

// 响应 POST 请求
export async function onRequestPost(context) {
  // 不做任何复杂操作，直接返回成功信息
  const responseBody = {
    message: "POST request received successfully by the debug function!",
    timestamp: new Date().toISOString()
  };
  
  return new Response(JSON.stringify(responseBody), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
}
