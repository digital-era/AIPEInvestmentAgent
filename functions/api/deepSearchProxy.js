// functions/API/deepSearchProxy.js

// 定义可复用的 CORS 响应头，以确保所有响应都遵循相同的跨域策略
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // 允许任何来源的请求
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // 明确声明允许的方法
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', // 明确声明允许的请求头
};

/**
 * 处理浏览器的 CORS 预检请求 (Preflight Request)。
 * 当浏览器发送带有自定义头（如 'Content-Type: application/json'）的 POST 请求前，
 * 会先发送一个 OPTIONS 请求来询问服务器是否允许。
 * 我们必须正确响应这个 OPTIONS 请求，否则浏览器会阻止后续的 POST 请求。
 */
export async function onRequestOptions(context) {
  // 返回一个空响应，但包含正确的 CORS 头，告诉浏览器“可以继续”。
  return new Response(null, {
    status: 204, // 204 No Content 是处理 OPTIONS 请求的标准方式
    headers: {
      ...corsHeaders,
      'Access-Control-Max-Age': '86400', // 可选：将此预检响应缓存一天
    },
  });
}

/**
 * 处理核心的 POST 请求，执行实际的 API 代理逻辑。
 */
export async function onRequestPost(context) {
    try {
        // 1. 解析请求体
        const { prompt, settings: apiSettings } = await context.request.json();

        if (!prompt || !apiSettings || !apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
            // 返回 400 错误，并附上 CORS 头
            return new Response(JSON.stringify({ message: '请求无效：缺少 prompt 或完整的 API 设置。' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        console.log(`收到深度搜索请求，模型: ${apiSettings.model}`);

        let requestUrl;
        let requestPayload;
        const headers = { 'Content-Type': 'application/json' };

        // 2. 根据不同的API端点构建请求
        if (apiSettings.endpoint.includes("deepseek.com") || apiSettings.endpoint.includes("api.openai.com")) {
            requestUrl = (apiSettings.endpoint.endsWith('/') ? apiSettings.endpoint.slice(0, -1) : apiSettings.endpoint) + "/v1/chat/completions";
            headers['Authorization'] = `Bearer ${apiSettings.key}`;
            requestPayload = {
                model: apiSettings.model,
                messages: [{ role: "user", content: prompt }],
                use_web_search: true
            };
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            #requestUrl = `${apiSettings.endpoint}/v1beta/models/${apiSettings.model}:generateContent?key=${apiSettings.key}`;
            requestUrl = `${apiSettings.endpoint}/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiSettings.key}`;
            requestPayload = {
                contents: [{ parts: [{ text: prompt }] }],
                tools: [
                    {
                        "google_search_retrieval": {}
                    }
                ],
                safetySettings: [
                    { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
                ]
            };
        } else {
            // 返回不支持的配置错误，并附上 CORS 头
            return new Response(JSON.stringify({ message: '不支持的API接入点配置。' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }

        // 3. 发起 fetch 请求到第三方 API
        const apiResponse = await fetch(requestUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestPayload)
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            throw new Error(`API请求失败: ${apiResponse.status} ${apiResponse.statusText}. 响应: ${errorBody}`);
        }

        const responseData = await apiResponse.json();
        let analysisReportText = "未能从API响应中提取分析报告。";

        // 4. 解析来自第三方API的响应
        if (apiSettings.endpoint.includes("deepseek.com") || apiSettings.endpoint.includes("api.openai.com")) {
            if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                analysisReportText = responseData.choices[0].message.content;
            }
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content) {
                analysisReportText = responseData.candidates[0].content.parts[0].text;
            }
        }

        // 5. 返回成功的响应，并附上 CORS 头
        return new Response(JSON.stringify({ report: analysisReportText }), {
            status: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('在处理 deepSearchProxy 时发生错误:', error.message);
        // 6. 处理异常并返回 500 错误，并附上 CORS 头
        return new Response(JSON.stringify({ message: `服务器内部错误: ${error.message}` }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
}
