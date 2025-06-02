// npm install @alicloud/pop-core  <- 这一步在 Cloudflare Workers 中通常不会直接这样使用
// 你需要确保你的构建过程能处理这个依赖，或者它本身就是为 Workers/浏览器设计的。

// 尝试使用 ES Module 导入方式，更符合 Workers 的习惯
// import RPCClient from '@alicloud/pop-core'; // 如果包支持 ES 模块
// 或者如果它只支持 CommonJS 且你的构建工具能转换:
const { RPCClient } = require('@alicloud/pop-core'); // 保持你原来的方式，但注意兼容性风险

export default {
    async fetch(request, env, ctx) {
        // 假设这是 GET 请求的处理逻辑
        if (request.method === "GET") {
            return handleGetRequest({ env });
        }
        return new Response("Method Not Allowed", { status: 405 });
    }
};

async function handleGetRequest(context) { // 修改了函数签名以匹配 fetch handler
    const { env } = context;
    const { OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_STS_ROLE_ARN, OSS_REGION } = env; // 新增 OSS_REGION

    if (!OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_STS_ROLE_ARN || !OSS_REGION) { // 检查 OSS_REGION
        return new Response(JSON.stringify({ error: 'STS 服务器配置不完整 (缺少 KEY_ID, SECRET, ROLE_ARN, 或 REGION)。' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const client = new RPCClient({
            accessKeyId: OSS_ACCESS_KEY_ID,
            accessKeySecret: OSS_ACCESS_KEY_SECRET,
            // endpoint: `https://sts.${OSS_STS_ROLE_ARN || 'aliyuncs.com'}`, //  <-- 这是错误的地方
            endpoint: `https://sts.${OSS_REGION}.aliyuncs.com`, // <-- 正确的 Endpoint 构造方式
            apiVersion: '2015-04-01',
        });

        const params = {
            Action: 'AssumeRole',
            RoleArn: OSS_STS_ROLE_ARN,
            RoleSessionName: 'cf-worker-session-' + Date.now(), // 修改了 SessionName 示例
            DurationSeconds: 3600,
            // Policy: JSON.stringify({...}) // 可选
        };

        // 注意：Cloudflare Workers 中，外部网络请求默认使用 fetch API。
        // @alicloud/pop-core 内部如何发起请求是关键，如果它依赖 Node.js 的 'http'/'https' 模块，就会失败。
        const result = await client.request('AssumeRole', params, { method: 'POST' });

        if (result && result.Credentials) {
            return new Response(JSON.stringify({
                AccessKeyId: result.Credentials.AccessKeyId,
                AccessKeySecret: result.Credentials.AccessKeySecret,
                SecurityToken: result.Credentials.SecurityToken,
                Expiration: result.Credentials.Expiration,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.error('从阿里云 STS 获取临时凭证失败，原始返回:', result); // 打印原始返回帮助调试
            throw new Error('从阿里云 STS 获取临时凭证失败。');
        }
    } catch (error) {
        console.error('获取 STS 凭证错误:', error);
        // 尝试打印更详细的错误信息，包括 error.code 或 error.data (如果SDK提供)
        const errorMessage = error.data ? JSON.stringify(error.data) : error.message;
        return new Response(JSON.stringify({ error: `获取 STS 凭证失败: ${errorMessage}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
