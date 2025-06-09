// 正确的文件路径: /functions/API/deepSearchProxy.js

// Cloudflare Pages Functions 要求固定的导出格式
export async function onRequestPost(context) {
    try {
        // 1. 解析请求体
        // 在Cloudflare环境中，从 context.request 中获取JSON数据
        const { prompt, settings: apiSettings } = await context.request.json();

        if (!prompt || !apiSettings || !apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
            // 返回一个 Response 对象
            return new Response(JSON.stringify({ message: '请求无效：缺少 prompt 或完整的 API 设置。' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
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
            requestUrl = `${apiSettings.endpoint}/v1beta/models/${apiSettings.model}:generateContent?key=${apiSettings.key}`;
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
            return new Response(JSON.stringify({ message: '不支持的API接入点配置。' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // 3. 发起 fetch 请求
        // 在Cloudflare环境中，fetch是全局可用的，无需引入 'node-fetch'
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

        // 5. 返回成功的响应
        // 必须返回一个标准的 Response 对象
        return new Response(JSON.stringify({ report: analysisReportText }), {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }, // 添加CORS头
        });

    } catch (error) {
        console.error('在处理 deepSearchProxy 时发生错误:', error.message);
        // 6. 处理异常并返回错误响应
        return new Response(JSON.stringify({ message: `服务器内部错误: ${error.message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
