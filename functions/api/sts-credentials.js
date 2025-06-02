// functions/api/sts-credentials.js
// 注意：这个例子需要你在 Cloudflare Function 的环境中安装 aliyun-sdk
// `npm install @alicloud/pop-core` (或者完整的 aliyun-sdk)
// 如果在 CF Function 中直接使用 SDK 有困难，可以考虑一个轻量级的后端服务或使用 API 网关调用 STS。

import RPCClient from '@alicloud/pop-core'; // 示例，具体引入方式和使用看阿里云SDK文档

export async function onRequestGet(context) {
    const { env } = context;
    const { OSS_ACCESS_KEY_ID, OSS_ACCESS_KEY_SECRET, OSS_STS_ROLE_ARN, OSS_REGION } = env;

    if (!OSS_ACCESS_KEY_ID || !OSS_ACCESS_KEY_SECRET || !OSS_STS_ROLE_ARN) {
        return new Response(JSON.stringify({ error: 'STS 服务器配置不完整。' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const client = new RPCClient({
            accessKeyId: ALIYUN_ACCESS_KEY_ID,
            accessKeySecret: ALIYUN_ACCESS_KEY_SECRET,
            endpoint: `https://sts.${OSS_REGION || 'aliyuncs.com'}`, // 根据实际区域调整
            apiVersion: '2015-04-01',
        });

        const params = {
            Action: 'AssumeRole',
            RoleArn: OSS_STS_ROLE_ARN, // 你在阿里云 RAM 中创建的、允许访问 OSS 的角色 ARN
            RoleSessionName: 'aipe-frontend-session-' + Date.now(),
            DurationSeconds: 3600, // 凭证有效期，单位秒
            // Policy: JSON.stringify({...}) // 可选：进一步限制临时凭证的权限
        };

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
            throw new Error('从阿里云 STS 获取临时凭证失败。');
        }
    } catch (error) {
        console.error('获取 STS 凭证错误:', error);
        return new Response(JSON.stringify({ error: `获取 STS 凭证失败: ${error.message}` }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
