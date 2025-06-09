const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/API/deepSearchProxy', async (req, res) => {
    const { prompt, settings: apiSettings } = req.body;

    if (!prompt || !apiSettings || !apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
        return res.status(400).json({ message: '请求无效：缺少 prompt 或完整的 API 设置。' });
    }

    console.log(`收到深度搜索请求，模型: ${apiSettings.model}`);

    try {
        let requestUrl;
        let requestPayload;
        const headers = { 'Content-Type': 'application/json' };

        if (apiSettings.endpoint.includes("deepseek.com") || apiSettings.endpoint.includes("api.openai.com")) {
            requestUrl = (apiSettings.endpoint.endsWith('/') ? apiSettings.endpoint.slice(0, -1) : apiSettings.endpoint) + "/v1/chat/completions";
            headers['Authorization'] = `Bearer ${apiSettings.key}`;
            requestPayload = {
                model: apiSettings.model,
                messages: [{ role: "user", content: prompt }],
                use_web_search: true // Deepseek/OpenAI 的方式
            };
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            requestUrl = `${apiSettings.endpoint}/v1beta/models/${apiSettings.model}:generateContent?key=${apiSettings.key}`;
            
            // ✨ 关键修改：为 Google Gemini 添加搜索工具
            requestPayload = {
                contents: [{ parts: [{ text: prompt }] }],
                tools: [
                    {
                        "google_search_retrieval": {} // 显式启用 Google 搜索
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
            return res.status(400).json({ message: '不支持的API接入点配置。' });
        }

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

        // 解析逻辑保持不变
        if (apiSettings.endpoint.includes("deepseek.com") || apiSettings.endpoint.includes("api.openai.com")) {
            if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                analysisReportText = responseData.choices[0].message.content;
            }
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content) {
                analysisReportText = responseData.candidates[0].content.parts[0].text;
            }
        }
        
        res.status(200).json({ report: analysisReportText });

    } catch (error) {
        console.error('在处理 deepSearchProxy 时发生错误:', error.message);
        res.status(500).json({ message: `服务器内部错误: ${error.message}` });
    }
});

app.listen(PORT, () => {
    console.log(`函数服务已启动，正在监听端口 ${PORT}`);
    console.log(`深度搜索 API 地址: http://localhost:${PORT}/API/deepSearchProxy`);
});
