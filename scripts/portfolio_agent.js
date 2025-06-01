// scripts/portfolio_agent.js

const InvestmentAgentValueStyleName = "稳健智远";
const InvestmentAgentGrowthStyleName = "锐进先锋";

// Agent data
let agents = {
    agent1: {
        id: 'agent1',
        name: "大智",
        role: InvestmentAgentValueStyleName,
        photo: "images/female_avatar.png",
        stockPoolList: [],
        portfolio: [],
        stockInputId: 'agent1StockInput',
        stockPoolListId: 'agent1StockPoolList',
        stockSelectId: 'agent1StockSelect',
        analysisInputId: 'agent1AnalysisInput',
        analysisOutputId: 'agent1AnalysisOutput',
        portfolioTableId: 'agent1PortfolioTable',
        portfolioTotalAllocationId: 'agent1PortfolioTotalAllocation',
        addToPortfolioInputId: 'agent1AddToPortfolioInput',
        addFromPoolSelectId: 'agent1AddFromPoolSelect',
        coreLogic: `我的投资哲学强调深入理解企业的内在价值，寻找那些拥有强大护城河、稳定盈利能力和优秀管理层的公司。
我倾向于长期持有，并相信市场的短期波动最终会回归到企业的真实价值。在分析时，我会特别关注公司的财务健康状况、行业地位以及宏观经济环境。
量化因子方面，我会审视标的动能(PotScore)以判断市场情绪和短期趋势，并结合主力资金流入情况，确保我的价值判断得到市场资金的佐证。`,
        promptTemplate: (stockName, potScore, totalInflow) => `
背景设定:
你投资风格根 Warren Buffett一样. 根据Buffett公开的贡献、专长领域和已知行事风格/理念，从第一性原理出发，深入思考并回答以下用户提出的问题。

Warren Buffett的核心信息:
- 主要贡献: 伯克希尔·哈撒韦首席执行官，价值投资代表，管理数百亿美元资产，以长期投资和资本配置著称。
- 专业领域: 价值投资、资产管理、资本配置。
- 关键备注/特点: 被称为“奥马哈先知”，其投资哲学强调企业内在价值，影响全球金融市场。

思考框架指引 (以 Warren Buffett 思考时请遵循)：
1.  **第一性原理 (First Principles Thinking)**: 将问题分解到最基本的、不容置疑的真实要素。避免类比推理或依赖普遍接受的假设，除非这些假设已经过严格验证。
2.  **领域专长**: 运用你在 价值投资、资产管理、资本配置。 的深厚知识。 如果问题跨领域，尝试从你的核心领域视角寻找切入点或提出独到见解。
3.  **核心理念/驱动力**: 结合 Warren Buffett 的 备注中提到的特点 (被称为“奥马哈先知”，其投资哲学强调企业内在价值，影响全球金融市场。) 和 已知贡献，思考其做决策、看待问题时的核心驱动力是什么（例如，技术乐观主义、风险厌恶、社会责任、效率至上、创新驱动、长期主义等）。
4.  **问题剖析**: 深入分析用户问题的本质，探讨其背后的深层原因和可能的多种解读。
5.  **解决方案/洞察**: 基于以上思考，提出具有 Warren Buffett 特色的、富有洞察力的、可能具有前瞻性的观点、分析或解决方案框架。 如果适用，可以指出潜在的挑战、机遇或需要进一步探索的方向。
6.  **量化因子**: 针对 ${stockName}，其当前的标的动能(PotScore)为 ${potScore}，近5日主力资金总净流入占比为 ${totalInflow}。请将这些量化数据融入你的分析中，评估它们如何支持或挑战你的价值判断。
7.  **投资配置思路**: 基于对 ${stockName} 的分析，如果认为其具备投资价值，请阐述如何将其整合进一个符合您投资理念的多元化组合中，以及它可能占据的权重范围和理由。
8.  **语言风格**: 尝试模仿 Warren Buffett 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。 如果其风格未知，则采用清晰、专业、有深度的表达。

注意事项：
切记回答信息中不要带有任何Warren Buffett字眼，这里全称都体现你自己，你是${agents.agent1.name}

用户问题:
"针对 ${stockName}，请提供投资分析以及配置思路。"

请你作为${agents.agent1.name} (${agents.agent1.role})，开始你的思考和中文回复:
        `
    },
    agent2: {
        id: 'agent2',
        name: "大成",
        role: InvestmentAgentGrowthStyleName,
        photo: "images/male_avatar.png",
        stockPoolList: [],
        portfolio: [],
        stockInputId: 'agent2StockInput',
        stockPoolListId: 'agent2StockPoolList',
        stockSelectId: 'agent2StockSelect',
        analysisInputId: 'agent2AnalysisInput',
        analysisOutputId: 'agent2AnalysisOutput',
        portfolioTableId: 'agent2PortfolioTable',
        portfolioTotalAllocationId: 'agent2PortfolioTotalAllocation',
        addToPortfolioInputId: 'agent2AddToPortfolioInput',
        addFromPoolSelectId: 'agent2AddFromPoolSelect',
        coreLogic: `我专注于发掘具有颠覆性创新能力和巨大增长潜力的公司，尤其是在人工智能、区块链、基因编辑等前沿科技领域。
我相信技术进步是驱动未来经济增长的核心动力，并乐于承担较高风险以追求超额回报。我的分析侧重于公司的技术壁垒、市场规模、以及其商业模式的可扩展性。
对于量化因子，我会关注标的动能(PotScore)来捕捉市场对创新趋势的早期反应，同时分析主力资金流入情况，以验证增长故事是否获得聪明资金的认可。`,
        promptTemplate: (stockName, potScore, totalInflow) => `
背景设定:
你是 Cathie Wood. 根据公开的贡献、专长领域和已知行事风格/理念，从第一性原理出发，深入思考并回答以下用户提出的问题。

Cathie Wood的核心信息:
- 主要贡献: ARK Invest创始人，专注AI、区块链等创新投资，推动主动管理ETF普及。
- 专业领域: 创新投资、ETF、人工智能与金融科技。
- 关键备注/特点: 以长期投资科技驱动行业著称，吸引年轻投资者。

思考框架指引 (以 Cathie Wood 思考时请遵循)：
1.  **第一性原理 (First Principles Thinking)**: 将问题分解到最基本的、不容置疑的真实要素。避免类比推理或依赖普遍接受的假设，除非这些假设已经过严格验证。
2.  **领域专长**: 运用你在 创新投资、ETF、人工智能与金融科技。 的深厚知识。 如果问题跨领域，尝试从你的核心领域视角寻找切入点或提出独到见解。
3.  **核心理念/驱动力**: 结合 Cathie Wood 的 备注中提到的特点 (以长期投资科技驱动行业著称，吸引年轻投资者。) 和 已知贡献，思考其做决策、看待问题时的核心驱动力是什么（例如，技术乐观主义、风险厌恶、社会责任、效率至上、创新驱动、长期主义等）。
4.  **问题剖析**: 深入分析用户问题的本质，探讨其背后的深层原因和可能的多种解读。
5.  **解决方案/洞察**: 基于以上思考，提出具有 Cathie Wood 特色的、富有洞察力的、可能具有前瞻性的观点、分析或解决方案框架。 如果适用，可以指出潜在的挑战、机遇或需要进一步探索的方向。
6.  **量化因子**: 关于 ${stockName}，其当前标的动能(PotScore)为 ${potScore}，而近5日主力资金总净流入占比为 ${totalInflow}。请分析这些量化指标如何反映市场对该股票创新故事的看法，以及它们是否支持其成长潜力。
7.  **投资配置思路**: 基于对 ${stockName} 的分析，如果认为其具备投资潜力，请阐述如何将其整合进一个符合您投资理念的成长型多元化组合中，以及它可能占据的权重范围和理由。
8.  **语言风格**: 尝试模仿 Cathie Wood 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。 如果其风格未知，则采用清晰、专业、有深度的表达。

注意事项：
切记回答信息中不要带有任何Cathie Woo, ARK Invest, ARK字眼，这里全称都体现你自己，你是${agents.agent2.name}

用户问题:
"针对 ${stockName}，请提供投资前景展望以及配置思路。"

请你作为${agents.agent2.name} (${agents.agent2.role}), 开始你的思考和中文回复:
        `
    }
};

let myPortfolio = [];
let myPortfolioTitle = "我的投资组合"; // Default title
let apiSettings = { endpoint: '', key: '', model: '' };
let performanceChartInstance = null;
let currentBacktestTarget = null;

// API Settings Model/Endpoint Configuration
const endpointModelMap = {
    "https://api.deepseek.com": [
        { value: "deepseek-chat", labelKey: "modelDeepSeekV3" }
    ],
    "https://generativelanguage.googleapis.com": [
        { value: "gemini-2.5-flash-preview-05-20", labelKey: "modelGeminiFlash" }
    ],
    "https://api.openai.com": [
        { value: "gpt-4o-mini", labelKey: "modelGpt4oMini" }
    ]
};

const modelDisplayStrings = {
    "modelDeepSeekV3": "DeepSeek Chat (deepseek-chat)",
    "modelGeminiFlash": "gemini-2.5-flash-preview-05-20",
    "modelGpt4oMini": "OpenAI GPT-4o mini (gpt-4o-mini)"
};


// DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    if (window.allStockDataGlobalPromise) {
        try {
            await window.allStockDataGlobalPromise;
            console.log("Portfolio Agent JS: Excel data is ready.");
        } catch (error) {
            console.error("Portfolio Agent JS: Error awaiting Excel data promise:", error);
        }
    } else {
        console.warn("Portfolio Agent JS: allStockDataGlobalPromise not found. Data might not be loaded for validation.");
    }

    document.getElementById('agent1NameDisplay').textContent = agents.agent1.name;
    document.getElementById('agent1RoleDisplay').textContent = agents.agent1.role;
    document.getElementById('agent1Logic').textContent = agents.agent1.coreLogic;
    if(document.getElementById('agent1Photo')) document.getElementById('agent1Photo').src = agents.agent1.photo;

    document.getElementById('agent2NameDisplay').textContent = agents.agent2.name;
    document.getElementById('agent2RoleDisplay').textContent = agents.agent2.role;
    document.getElementById('agent2Logic').textContent = agents.agent2.coreLogic;
    if(document.getElementById('agent2Photo')) document.getElementById('agent2Photo').src = agents.agent2.photo;

    loadApiSettings();
    loadAgentData();
    loadMyPortfolio();

    document.querySelector('.tab-link-main').click();

    const balanceUserPortfolioBtn = document.getElementById('balancePortfolioBtn');
    if (balanceUserPortfolioBtn) {
        balanceUserPortfolioBtn.addEventListener('click', () => autoBalancePortfolio('myPortfolio'));
    }
    document.querySelectorAll('.balance-agent-portfolio-btn').forEach(button => {
        button.addEventListener('click', function() {
            const agentId = this.dataset.agentid;
            autoBalancePortfolio(agentId);
        });
    });

    const today = new Date();
    const oneYearAgo = new Date(new Date().setFullYear(today.getFullYear() - 1));
    if(document.getElementById('backtestEndDate')) document.getElementById('backtestEndDate').valueAsDate = today;
    if(document.getElementById('backtestStartDate')) document.getElementById('backtestStartDate').valueAsDate = oneYearAgo;

    const portfolioTitleText = document.getElementById('myPortfolioTitleText');
    const editPortfolioTitleBtn = document.getElementById('editMyPortfolioTitleBtn');

    if (portfolioTitleText && editPortfolioTitleBtn) {
        editPortfolioTitleBtn.addEventListener('click', () => {
            const isEditing = portfolioTitleText.contentEditable === 'true';
            if (isEditing) {
                portfolioTitleText.contentEditable = 'false';
                editPortfolioTitleBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                editPortfolioTitleBtn.title = "编辑组合名称";
                const newTitle = portfolioTitleText.textContent.trim();
                if (newTitle && newTitle !== myPortfolioTitle) {
                    myPortfolioTitle = newTitle;
                    saveMyPortfolio();
                } else if (!newTitle) {
                    portfolioTitleText.textContent = myPortfolioTitle;
                }
                portfolioTitleText.blur();
            } else {
                portfolioTitleText.contentEditable = 'true';
                editPortfolioTitleBtn.innerHTML = '<i class="fas fa-save"></i>';
                editPortfolioTitleBtn.title = "保存名称";
                portfolioTitleText.focus();
                const range = document.createRange();
                range.selectNodeContents(portfolioTitleText);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            }
        });

        portfolioTitleText.addEventListener('blur', () => {
            if (portfolioTitleText.contentEditable === 'true') {
                editPortfolioTitleBtn.click();
            }
        });

        portfolioTitleText.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && portfolioTitleText.contentEditable === 'true') {
                event.preventDefault();
                editPortfolioTitleBtn.click();
            }
            if (event.key === 'Escape' && portfolioTitleText.contentEditable === 'true') {
                 portfolioTitleText.textContent = myPortfolioTitle;
                 portfolioTitleText.contentEditable = 'false';
                 editPortfolioTitleBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                 editPortfolioTitleBtn.title = "编辑组合名称";
                 portfolioTitleText.blur();
            }
        });
    }
});

// Main Tab Management
function openMainTab(evt, tabName) {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("main-tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }
    tablinks = document.getElementsByClassName("tab-link-main");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }
    const currentTab = document.getElementById(tabName);
    if (currentTab) {
        currentTab.style.display = "block";
        currentTab.classList.add("active");
    }
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}

// Helper function for stock validation using allStockData (Improved)
function findStockInGlobalData(searchTerm) {
    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        console.warn("findStockInGlobalData: allStockData is not available or empty.");
        return null;
    }

    let foundStock = null;
    const upperSearchTerm = searchTerm.toUpperCase();

    // Try to parse if searchTerm is "Name (CODE)" format
    const stockMatch = searchTerm.match(/(.+?)\s*\((.*?)\)/);
    if (stockMatch && stockMatch[1] && stockMatch[2]) {
        const codeFromInput = stockMatch[2].trim().toUpperCase();
        const nameFromInput = stockMatch[1].trim();
        // Check if code exists and name matches (case-insensitive for name part)
        if (allStockData[codeFromInput] && allStockData[codeFromInput].name.toLowerCase().includes(nameFromInput.toLowerCase())) {
             return { code: codeFromInput, name: allStockData[codeFromInput].name };
        }
    }

    // Try direct match by code (if searchTerm is just a code)
    if (allStockData[searchTerm]) { // Assumes searchTerm could be a code if not matched above
        return { code: searchTerm, name: allStockData[searchTerm].name };
    }
    if (allStockData[upperSearchTerm]) { // Try uppercase code
         return { code: upperSearchTerm, name: allStockData[upperSearchTerm].name };
    }

    // If not a code match, try to find by name (partial, case-insensitive)
    const searchTermLower = searchTerm.toLowerCase();
    for (const code in allStockData) {
        if (allStockData[code].name && allStockData[code].name.toLowerCase().includes(searchTermLower)) {
            foundStock = { code: code, name: allStockData[code].name };
            break;
        }
    }
    return foundStock;
}


// Agent Stock Pool Management
function addStockToPool(agentId) {
    const agent = agents[agentId];
    const stockInput = document.getElementById(agent.stockInputId);
    const searchTerm = stockInput.value.trim();

    if (searchTerm === "") {
        alert("请输入股票代码或名称。");
        return;
    }

    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        alert("股票基础数据尚未加载。请稍候再试或刷新页面。");
        return;
    }

    const foundStock = findStockInGlobalData(searchTerm);

    if (!foundStock) {
        alert(`未在股票基础数据中找到 "${searchTerm}" 对应的股票。请检查输入。`);
        return;
    }

    if (agent.stockPoolList.find(s => s.code === foundStock.code)) {
        alert(`股票 ${foundStock.name} (${foundStock.code}) 已在 ${agent.name} 的分析池中。`);
        return;
    }

    agent.stockPoolList.push({ code: foundStock.code, name: foundStock.name });
    stockInput.value = "";
    renderStockPoolList(agentId);
    saveAgentData();
}

function removeStockFromPool(agentId, stockCode) {
    const agent = agents[agentId];
    agent.stockPoolList = agent.stockPoolList.filter(s => s.code !== stockCode);
    renderStockPoolList(agentId);
    saveAgentData();
}

function renderStockPoolList(agentId) {
    const agent = agents[agentId];
    const stockPoolUl = document.getElementById(agent.stockPoolListId);
    const stockSelectForAnalysis = document.getElementById(agent.stockSelectId);
    const addFromPoolSelect = document.getElementById(agent.addFromPoolSelectId);

    if (!stockPoolUl || !stockSelectForAnalysis || !addFromPoolSelect) return;

    stockPoolUl.innerHTML = "";
    stockSelectForAnalysis.innerHTML = '<option value="">--- 从分析池选择 ---</option>';
    addFromPoolSelect.innerHTML = '<option value="">--- 从分析池选择添加到组合 ---</option>';

    agent.stockPoolList.forEach(stock => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${stock.name} (${stock.code})</span>
            <button class="remove-stock-btn" onclick="removeStockFromPool('${agentId}', '${stock.code}')"><i class="fas fa-trash-alt"></i></button>
        `;
        stockPoolUl.appendChild(li);

        const optionForAnalysis = document.createElement('option');
        optionForAnalysis.value = `${stock.name} (${stock.code})`;
        optionForAnalysis.textContent = `${stock.name} (${stock.code})`;
        stockSelectForAnalysis.appendChild(optionForAnalysis);

        const optionForPortfolioAdd = document.createElement('option');
        optionForPortfolioAdd.value = stock.code;
        optionForPortfolioAdd.textContent = `${stock.name} (${stock.code})`;
        addFromPoolSelect.appendChild(optionForPortfolioAdd);
    });
}

// Stock Analysis For Agent (Updated to be async and use API)
async function analyzeStockForAgent(agentId) {
    const agent = agents[agentId];
    const stockSelect = document.getElementById(agent.stockSelectId);
    const analysisInput = document.getElementById(agent.analysisInputId);
    const analysisOutput = document.getElementById(agent.analysisOutputId);

    let stockToAnalyze = analysisInput.value.trim();
    if (stockToAnalyze === "" && stockSelect.value !== "") {
        stockToAnalyze = stockSelect.value;
    }

    if (stockToAnalyze === "") {
        alert("请从分析池选择或输入要分析的股票。");
        if (analysisOutput) analysisOutput.value = "错误：未指定分析目标。";
        return;
    }

    // Clear previous output and inputs
    if (analysisInput) analysisInput.value = "";
    if (stockSelect) stockSelect.value = "";
    if (analysisOutput) analysisOutput.value = "请稍候...\n";

    // 1. Parse stockToAnalyze to get name and code
    let stockNameForDisplay = stockToAnalyze;
    let stockCodeForData = null;

    const stockNameCodeMatch = stockToAnalyze.match(/(.+?)\s*\((.*?)\)/); // e.g., "茅台 (600519)"
    if (stockNameCodeMatch && stockNameCodeMatch[1] && stockNameCodeMatch[2]) {
        stockNameForDisplay = stockNameCodeMatch[1].trim();
        stockCodeForData = stockNameCodeMatch[2].trim().toUpperCase();
    } else {
        // If no code in parentheses, try to find the stock using findStockInGlobalData
        const foundStockInfo = findStockInGlobalData(stockToAnalyze);
        if (foundStockInfo) {
            stockNameForDisplay = foundStockInfo.name;
            stockCodeForData = foundStockInfo.code.toUpperCase();
        } else {
            stockNameForDisplay = stockToAnalyze; // Use input as name, code remains null
            if (analysisOutput) analysisOutput.value += `警告: 未能从 "${stockToAnalyze}" 中识别股票代码或找到对应股票。将使用 "${stockNameForDisplay}" 作为名称进行分析，但量化数据可能无法获取。\n`;
        }
    }

    // 2. Fetch PotScore and TotalInflow from allStockData
    let potScore = "[数据缺失]";
    let totalInflow = "[数据缺失]";
    let quantDataMessage = "";

    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        quantDataMessage = "注意: 股票基础数据 (allStockData) 未完全加载，无法获取量化指标。\n";
    } else if (stockCodeForData && allStockData[stockCodeForData]) {
        const stockData = allStockData[stockCodeForData];
        potScore = stockData.currentPotScore !== undefined ? String(stockData.currentPotScore) : "[无PotScore数据]";
        totalInflow = stockData.totalInflow !== undefined ? String(stockData.totalInflow) : "[无主力资金数据]";
        quantDataMessage = `已获取 ${stockNameForDisplay}(${stockCodeForData}) 的量化数据: PotScore=${potScore}, 主力资金流入=${totalInflow}\n`;
    } else if (stockCodeForData) {
        quantDataMessage = `注意: 无法在已加载的股票基础数据中找到代码 ${stockCodeForData} (${stockNameForDisplay}) 的量化信息。\n`;
        potScore = `[无法获取代码 ${stockCodeForData} 的PotScore]`;
        totalInflow = `[无法获取代码 ${stockCodeForData} 的主力资金数据]`;
    } else {
        quantDataMessage = `注意: 由于未能识别股票代码，无法获取 ${stockNameForDisplay} 的量化数据。\n`;
    }
    if (analysisOutput) analysisOutput.value += quantDataMessage;


    // 3. Check API Settings
    if (!apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
        if (analysisOutput) analysisOutput.value += "错误：API设置未完成。请前往“API设置”配置模型接入点、API Key和模型选择。";
        return;
    }

    // 4. Prepare Prompt
    const prompt = agent.promptTemplate(stockNameForDisplay, potScore, totalInflow);

    if (analysisOutput) {
        analysisOutput.value += `\n正在为 "${stockNameForDisplay}" 生成分析报告 (使用模型: ${apiSettings.model})...\n这将需要一些时间，请耐心等待。\n`;
    }

    // 5. Make API Call
    try {
        let requestUrl = apiSettings.endpoint;
        let requestPayload;
        const headers = { 'Content-Type': 'application/json' };

        if (apiSettings.endpoint.includes("deepseek.com")) {
            headers['Authorization'] = `Bearer ${apiSettings.key}`;
            requestPayload = {
                model: apiSettings.model,
                messages: [{ role: "user", content: prompt }],
            };
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            requestUrl = `${apiSettings.endpoint}/v1beta/models/${apiSettings.model}:generateContent?key=${apiSettings.key}`;
            requestPayload = {
                contents: [{ parts: [{ text: prompt }] }],
                safetySettings: [
                    { "category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_NONE" },
                    { "category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_NONE" }
                ]
            };
        } else if (apiSettings.endpoint.includes("api.openai.com")) {
            headers['Authorization'] = `Bearer ${apiSettings.key}`;
            requestPayload = {
                model: apiSettings.model,
                messages: [{ role: "user", content: prompt }],
            };
        } else {
            if (analysisOutput) analysisOutput.value += "错误: 不支持的API接入点配置。请检查API设置。";
            return;
        }

        const apiResponse = await fetch(requestUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(requestPayload)
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.text();
            throw new Error(`API请求失败: ${apiResponse.status} ${apiResponse.statusText}. 响应详情: ${errorBody}`);
        }

        const responseData = await apiResponse.json();
        let analysisReportText = "未能从API响应中提取分析报告。请检查控制台中的API原始响应。";
        console.log("API Response Data:", responseData); 

        if (apiSettings.endpoint.includes("deepseek.com") || apiSettings.endpoint.includes("api.openai.com")) {
            if (responseData.choices && responseData.choices[0] && responseData.choices[0].message && responseData.choices[0].message.content) {
                analysisReportText = responseData.choices[0].message.content;
            } else if (responseData.error) {
                analysisReportText = `API错误: ${responseData.error.message || JSON.stringify(responseData.error)}`;
            }
        } else if (apiSettings.endpoint.includes("generativelanguage.googleapis.com")) {
            if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content && responseData.candidates[0].content.parts && responseData.candidates[0].content.parts[0] && responseData.candidates[0].content.parts[0].text) {
                analysisReportText = responseData.candidates[0].content.parts[0].text;
                if (responseData.candidates[0].finishReason && responseData.candidates[0].finishReason !== "STOP") {
                     analysisReportText += `\n\n(模型输出可能由于以下原因不完整: ${responseData.candidates[0].finishReason})`;
                }
                if (responseData.candidates[0].safetyRatings) {
                    const concerningRatings = responseData.candidates[0].safetyRatings.filter(r => r.probability !== "NEGLIGIBLE" && r.probability !== "LOW");
                    if (concerningRatings.length > 0) {
                        analysisReportText += `\n\n(内容安全提示: ${concerningRatings.map(r=>`${r.category}: ${r.probability}`).join('; ')})`;
                    }
                }
            } else if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
                analysisReportText = `API错误: 您的请求因 "${responseData.promptFeedback.blockReason}" 而被阻止。`;
                if (responseData.promptFeedback.safetyRatings) {
                     analysisReportText += ` 具体安全评估: ${responseData.promptFeedback.safetyRatings.map(r => `${r.category} - ${r.probability}`).join(', ')}.`;
                }
                analysisReportText += "\n请尝试调整提示或检查内容策略。";
            } else if (responseData.error) {
                 analysisReportText = `API错误: ${responseData.error.message || JSON.stringify(responseData.error)}`;
            }
        }
        
        if (analysisOutput) analysisOutput.value = analysisReportText;

    } catch (error) {
        console.error("analyzeStockForAgent API Call Error:", error);
        if (analysisOutput) analysisOutput.value = `调用AI模型进行分析时发生客户端错误: ${error.message}\n请检查浏览器控制台获取详细错误信息，并确认API Key、模型名称及网络连接是否正确。`;
    }
}


// Agent Portfolio Management Functions
function addStockToAgentPortfolio(agentId) { // This is for MANUAL input
    const agent = agents[agentId];
    const inputElement = document.getElementById(agent.addToPortfolioInputId);
    const searchTerm = inputElement.value.trim();

    if (!searchTerm) {
        alert("请输入股票代码或名称进行手动添加。");
        return;
    }

    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        alert("股票基础数据尚未加载。请稍候再试或刷新页面。");
        return;
    }

    const foundStock = findStockInGlobalData(searchTerm);
    if (!foundStock) {
        alert(`手动输入：未在股票基础数据中找到 "${searchTerm}" 对应的股票。请检查输入。`);
        return;
    }

    if (agent.portfolio.find(s => s.code === foundStock.code)) {
        alert(`股票 ${foundStock.name} (${foundStock.code}) 已在 ${agent.name} 的投资组合中。`);
        return;
    }

    agent.portfolio.push({ code: foundStock.code, name: foundStock.name, allocation: 0 });
    inputElement.value = ""; // Clear manual input field
    renderAgentPortfolio(agentId);
    saveAgentData();
}

function addSelectedStockFromPoolToAgentPortfolio(agentId) {
    const agent = agents[agentId];
    const selectElement = document.getElementById(agent.addFromPoolSelectId);

    if (!selectElement) {
        console.error(`Select element ${agent.addFromPoolSelectId} not found for agent ${agentId}`);
        return;
    }

    const selectedStockCode = selectElement.value;

    if (!selectedStockCode) {
        alert("请从分析池下拉列表中选择一个股票。");
        return;
    }

    const stockInPool = agent.stockPoolList.find(s => s.code === selectedStockCode);

    if (!stockInPool) {
        alert("选择的股票在分析池中未找到详细信息。请确保分析池是最新的。");
        selectElement.value = "";
        return;
    }

    if (agent.portfolio.find(s => s.code === stockInPool.code)) {
        alert(`股票 ${stockInPool.name} (${stockInPool.code}) 已在 ${agent.name} 的投资组合中。`);
        selectElement.value = "";
        return;
    }

    agent.portfolio.push({ code: stockInPool.code, name: stockInPool.name, allocation: 0 });
    renderAgentPortfolio(agentId);
    saveAgentData();
    selectElement.value = "";
}


function removeStockFromAgentPortfolio(agentId, stockCode) {
    const agent = agents[agentId];
    agent.portfolio = agent.portfolio.filter(s => s.code !== stockCode);
    renderAgentPortfolio(agentId);
    saveAgentData();
}

function updateAgentPortfolioAllocation(agentId, stockCode, newAllocation) {
    const agent = agents[agentId];
    const stock = agent.portfolio.find(s => s.code === stockCode);
    if (stock) {
        stock.allocation = parseFloat(newAllocation) || 0;
        renderAgentPortfolio(agentId);
        saveAgentData();
    }
}

function renderAgentPortfolio(agentId) {
    const agent = agents[agentId];
    const portfolioTableBody = document.querySelector(`#${agent.portfolioTableId} tbody`);
    const totalAllocationEl = document.getElementById(agent.portfolioTotalAllocationId);

    if (!portfolioTableBody || !totalAllocationEl) return;

    portfolioTableBody.innerHTML = "";
    let totalAgentAllocation = 0;

    agent.portfolio.forEach(item => {
        const row = portfolioTableBody.insertRow();
        row.innerHTML = `
            <td>${item.name} (${item.code})</td>
            <td><input type="number" value="${item.allocation}" min="0" max="100" step="0.01" onchange="updateAgentPortfolioAllocation('${agentId}', '${item.code}', this.value)">%</td>
            <td><button class="remove-agent-stock-btn" onclick="removeStockFromAgentPortfolio('${agentId}', '${item.code}')"><i class="fas fa-times-circle"></i></button></td>
        `;
        totalAgentAllocation += parseFloat(item.allocation) || 0;
    });

    totalAllocationEl.textContent = `${totalAgentAllocation.toFixed(2)}%`;
    if (agent.portfolio.length > 0) {
        const agentAccentColor = agentId === 'agent1' ? 'var(--accent-color-value)' : 'var(--accent-color-growth)';
        if (Math.abs(totalAgentAllocation - 100) > 0.01 && totalAgentAllocation > 0) {
            totalAllocationEl.style.color = 'var(--danger-color)';
        } else if (Math.abs(totalAgentAllocation - 100) <= 0.01 && totalAgentAllocation > 0) {
            totalAllocationEl.style.color = agentAccentColor;
        } else {
            totalAllocationEl.style.color = 'var(--text-color)';
        }
    } else {
        totalAllocationEl.style.color = 'var(--text-color)';
    }
}

function exportAgentPortfolioToExcel(agentId) {
    const agent = agents[agentId];
    if (agent.portfolio.length === 0) {
        alert(`${agent.name} 的投资组合为空，无法导出。`);
        return;
    }
    const dataToExport = agent.portfolio.map(item => ({
        "股票代码": item.code,
        "股票名称": item.name,
        "配置比例 (%)": item.allocation
    }));
     dataToExport.push({});
    dataToExport.push({
        "股票代码": "总计",
        "配置比例 (%)": agent.portfolio.reduce((sum, item) => sum + (parseFloat(item.allocation) || 0), 0).toFixed(2)
    });

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, `${agent.name}投资组合`);
    try {
        XLSX.writeFile(wb, `AIEP_${agent.name}_Portfolio.xlsx`);
    } catch (error) {
        console.error("导出Excel失败:", error);
        alert("导出Excel失败，详情请查看控制台。");
    }
}


// My Portfolio Management
function syncStocksToMyPortfolio() {
    let changed = false;
    const processAgentPortfolioForSync = (sourceAgent) => {
        sourceAgent.portfolio.forEach(agentStock => {
            if (agentStock.allocation > 0) {
                let existingUserPortfolioItem = myPortfolio.find(p => p.code === agentStock.code);
                if (!existingUserPortfolioItem) {
                    myPortfolio.push({
                        code: agentStock.code,
                        name: agentStock.name,
                        source: sourceAgent.name,
                        suggestedAllocation: agentStock.allocation,
                        userAllocation: 0
                    });
                    changed = true;
                } else {
                    if (!existingUserPortfolioItem.source.includes(sourceAgent.name)) {
                        existingUserPortfolioItem.source += ` & ${sourceAgent.name}`;
                        existingUserPortfolioItem.suggestedAllocation = Math.max(existingUserPortfolioItem.suggestedAllocation || 0, agentStock.allocation);
                        changed = true;
                    } else {
                        if (agentStock.allocation > (existingUserPortfolioItem.suggestedAllocation || 0) ) {
                             existingUserPortfolioItem.suggestedAllocation = agentStock.allocation;
                             changed = true;
                        }
                    }
                }
            }
        });
    };

    processAgentPortfolioForSync(agents.agent1);
    processAgentPortfolioForSync(agents.agent2);

    if (changed) {
        renderMyPortfolio();
        saveMyPortfolio();
        alert("AI智能体投资组合中的已配置股票已同步至“我的投资组合”。请调整您的配置比例。");
    } else {
        alert("所有AI智能体已配置股票均已在“我的投资组合”中，或AI智能体组合中无新内容同步。");
    }
}

function updateMyPortfolioAllocation(stockCode, newAllocation) {
    const stock = myPortfolio.find(s => s.code === stockCode);
    if (stock) {
        stock.userAllocation = parseFloat(newAllocation) || 0;
        renderMyPortfolio();
        saveMyPortfolio();
    }
}
function removeMyPortfolioItem(stockCode) {
    myPortfolio = myPortfolio.filter(s => s.code !== stockCode);
    renderMyPortfolio();
    saveMyPortfolio();
}

function renderMyPortfolio() {
    const portfolioTableBody = document.querySelector("#myPortfolioTable tbody");
    const totalAllocationEl = document.getElementById("myPortfolioTotalAllocation");
    const portfolioTitleEl = document.getElementById("myPortfolioTitleText");

    if (portfolioTitleEl) {
        portfolioTitleEl.textContent = myPortfolioTitle;
    }

    if (!portfolioTableBody || !totalAllocationEl) return;

    portfolioTableBody.innerHTML = "";
    let totalUserAllocation = 0;

    myPortfolio.forEach(item => {
        const row = portfolioTableBody.insertRow();
        row.innerHTML = `
            <td>${item.name} (${item.code})</td>
            <td>${item.source}</td>
            <td>${item.suggestedAllocation}%</td>
            <td><input type="number" value="${item.userAllocation}" min="0" max="100" step="0.01" onchange="updateMyPortfolioAllocation('${item.code}', this.value)">%</td>
            <td><button class="remove-portfolio-item-btn" onclick="removeMyPortfolioItem('${item.code}')"><i class="fas fa-times-circle"></i></button></td>
        `;
        totalUserAllocation += parseFloat(item.userAllocation) || 0;
    });
    totalAllocationEl.textContent = `${totalUserAllocation.toFixed(2)}%`;

    if (myPortfolio.length > 0) {
        if (Math.abs(totalUserAllocation - 100) > 0.01 && totalUserAllocation > 0) {
            totalAllocationEl.style.color = 'var(--danger-color)';
        } else if (Math.abs(totalUserAllocation - 100) <= 0.01 && totalUserAllocation > 0) {
             totalAllocationEl.style.color = 'var(--accent-color2)';
        } else {
             totalAllocationEl.style.color = 'var(--text-color)';
        }
    } else {
        totalAllocationEl.style.color = 'var(--text-color)';
    }
}

function exportMyPortfolioToExcel() {
    if (myPortfolio.length === 0) {
        alert(`“${myPortfolioTitle}”为空，无法导出。`);
        return;
    }
    const dataToExport = myPortfolio.map(item => ({
        "股票代码": item.code,
        "股票名称": item.name,
        "来源": item.source,
        "建议比例 (%)": item.suggestedAllocation,
        "我的配置 (%)": item.userAllocation
    }));
    dataToExport.push({});
    dataToExport.push({
        "股票代码": "总计",
        "我的配置 (%)": myPortfolio.reduce((sum, item) => sum + (parseFloat(item.userAllocation) || 0), 0).toFixed(2)
    });
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    const safeTitle = myPortfolioTitle.replace(/[^a-zA-Z0-9_ ]/g, '').substring(0, 30) || "MyPortfolio";
    XLSX.utils.book_append_sheet(wb, ws, safeTitle);
    try {
        XLSX.writeFile(wb, `AIEP_${safeTitle}.xlsx`);
    } catch (error) {
        console.error("导出Excel失败:", error);
        alert("导出Excel失败，详情请查看控制台。");
    }
}

// Generic Auto Balance function
function autoBalancePortfolio(targetId) {
    let portfolioToBalance;
    let allocationField;

    if (targetId === 'myPortfolio') {
        portfolioToBalance = myPortfolio;
        allocationField = 'userAllocation';
    } else if (agents[targetId]) {
        portfolioToBalance = agents[targetId].portfolio;
        allocationField = 'allocation';
    } else {
        console.error("Invalid target for autoBalance:", targetId);
        return;
    }

    if (portfolioToBalance.length === 0) {
        alert("目标投资组合为空，无法平衡。");
        return;
    }

    const unallocatedStocks = portfolioToBalance.filter(s => s[allocationField] === 0 || s[allocationField] === undefined || s[allocationField] === null);
    const allocatedSum = portfolioToBalance
        .filter(s => s[allocationField] > 0)
        .reduce((sum, s) => sum + s[allocationField], 0);
    const remainingToAllocate = 100 - allocatedSum;

    if (unallocatedStocks.length > 0 && remainingToAllocate > 0) {
        const perStockAllocation = remainingToAllocate / unallocatedStocks.length;
        unallocatedStocks.forEach(stock => {
            stock[allocationField] = parseFloat(perStockAllocation.toFixed(2));
        });
    } else if (unallocatedStocks.length === 0 && Math.abs(allocatedSum - 100) > 0.01 && allocatedSum > 0) {
        const factor = 100 / allocatedSum;
        portfolioToBalance.forEach(stock => {
            stock[allocationField] = parseFloat((stock[allocationField] * factor).toFixed(2));
        });
    } else if (unallocatedStocks.length > 0 && remainingToAllocate <= 0) {
        alert("总配置已达到或超过100%，无法为未配置股票自动分配。");
        return;
    }

    let currentSum = portfolioToBalance.reduce((sum, s) => sum + (s[allocationField] || 0), 0);
    if (portfolioToBalance.length > 0 && Math.abs(currentSum - 100) > 0.001 && Math.abs(currentSum - 100) < 1) {
        const diff = 100 - currentSum;
        let stockToAdjust = portfolioToBalance.find(s => (s[allocationField] || 0) + diff >= 0 && (s[allocationField] || 0) + diff <=100 )
                           || portfolioToBalance.find(s => (s[allocationField] || 0) > 0)
                           || portfolioToBalance[portfolioToBalance.length-1];

        if(stockToAdjust) {
           stockToAdjust[allocationField] = (stockToAdjust[allocationField] || 0) + diff;
           stockToAdjust[allocationField] = parseFloat(stockToAdjust[allocationField].toFixed(2));
           if (stockToAdjust[allocationField] < 0) stockToAdjust[allocationField] = 0;
           if (stockToAdjust[allocationField] > 100) stockToAdjust[allocationField] = 100;
        }
    }

    if (targetId === 'myPortfolio') {
        renderMyPortfolio();
        saveMyPortfolio();
    } else {
        renderAgentPortfolio(targetId);
        saveAgentData();
    }
}

// API Settings Modal
const apiSettingsModal = document.getElementById('apiSettingsModal');
function openApiSettingsModal() {
    if(apiSettingsModal) apiSettingsModal.style.display = "block";
}
function closeApiSettingsModal() { if(apiSettingsModal) apiSettingsModal.style.display = "none"; }

function populateApiModelDropdown(selectedEndpointUrl, selectedModelValue = null) {
    const modelSelect = document.getElementById('apiModelSelect');
    if (!modelSelect) return;
    modelSelect.innerHTML = '';

    if (!selectedEndpointUrl || selectedEndpointUrl === "") {
        modelSelect.disabled = true;
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "--- 先选择接入点 ---";
        modelSelect.appendChild(defaultOption);
        return;
    }

    modelSelect.disabled = false;
    const modelsForEndpoint = endpointModelMap[selectedEndpointUrl];

    if (modelsForEndpoint && modelsForEndpoint.length > 0) {
        modelsForEndpoint.forEach(model => {
            const option = document.createElement('option');
            option.value = model.value;
            option.textContent = modelDisplayStrings[model.labelKey] || model.value;
            if (model.value === selectedModelValue) {
                option.selected = true;
            }
            modelSelect.appendChild(option);
        });
    } else {
        const noModelsOption = document.createElement('option');
        noModelsOption.value = "";
        noModelsOption.textContent = "该接入点无预设模型";
        noModelsOption.disabled = true;
        noModelsOption.selected = true;
        modelSelect.appendChild(noModelsOption);
    }
}

function saveApiSettings() {
    apiSettings.endpoint = document.getElementById('apiEndpointSelect').value;
    apiSettings.key = document.getElementById('apiKey').value.trim();
    apiSettings.model = document.getElementById('apiModelSelect').value;
    localStorage.setItem('apiSettings', JSON.stringify(apiSettings));
    const statusEl = document.getElementById('settingsStatus');
    statusEl.textContent = "API设置已保存！";
    statusEl.className = 'status-message success';
    setTimeout(() => { statusEl.textContent = ""; closeApiSettingsModal(); }, 2000);
}

function clearApiSettings() { 
    if (confirm("确定要清除所有已保存的API设置吗？此操作不可撤销。")) {
        localStorage.removeItem('apiSettings');
        apiSettings = { endpoint: '', key: '', model: '' };

        const endpointSelect = document.getElementById('apiEndpointSelect');
        const apiKeyInput = document.getElementById('apiKey');
        // const modelSelect = document.getElementById('apiModelSelect'); // Already handled by populate

        if(endpointSelect) endpointSelect.value = ""; // This will trigger its change event
        if(apiKeyInput) apiKeyInput.value = "";
        
        // Explicitly repopulate model dropdown for empty endpoint
        populateApiModelDropdown("");


        const statusEl = document.getElementById('settingsStatus');
        if (statusEl) {
            statusEl.textContent = "API设置已清除！";
            statusEl.className = 'status-message success';
            setTimeout(() => { statusEl.textContent = ""; }, 2000);
        }
        alert("API设置已清除。");
    }
}


function loadApiSettings() {
    const endpointSelect = document.getElementById('apiEndpointSelect');
    const modelSelect = document.getElementById('apiModelSelect');
    const apiKeyInput = document.getElementById('apiKey');

    if (!endpointSelect || !modelSelect || !apiKeyInput) return;

    endpointSelect.innerHTML = '<option value="">--- 选择模型接入点 ---</option>'; // Add a default blank option
    let firstEndpointValue = null;
    for (const endpointUrl in endpointModelMap) {
        if(firstEndpointValue === null) firstEndpointValue = endpointUrl;
        const option = document.createElement('option');
        option.value = endpointUrl;
        option.textContent = endpointUrl;
        endpointSelect.appendChild(option);
    }

    endpointSelect.addEventListener('change', (event) => {
        const newSelectedEndpoint = event.target.value;
        populateApiModelDropdown(newSelectedEndpoint, apiSettings.model); // Pass current model if re-selecting same endpoint
    });

    const savedSettings = localStorage.getItem('apiSettings');
    let initialEndpointToLoad = ""; // Default to blank

    if (savedSettings) {
        apiSettings = JSON.parse(savedSettings);
        if (apiSettings.endpoint && endpointModelMap[apiSettings.endpoint]) {
            initialEndpointToLoad = apiSettings.endpoint;
        }
        apiKeyInput.value = apiSettings.key || "";
    }

    if (initialEndpointToLoad) {
        endpointSelect.value = initialEndpointToLoad;
    }

    populateApiModelDropdown(endpointSelect.value, apiSettings.model || null);
}


// Performance Backtest Modal
const performanceModal = document.getElementById('performanceModal');

function openPerformanceModal(target) {
    currentBacktestTarget = target;
    let portfolioToCheck;
    let title;
    let currentPortfolioName = myPortfolioTitle;

    if (target === 'myPortfolio') {
        portfolioToCheck = myPortfolio;
        title = `<i class="fas fa-chart-pie"></i> ${currentPortfolioName} 收益测算`;
    } else if (agents[target]) {
        portfolioToCheck = agents[target].portfolio;
        currentPortfolioName = `${agents[target].name} (${agents[target].role})`;
        title = `<i class="fas fa-chart-pie"></i> ${currentPortfolioName} 投资组合收益测算`;
    } else {
        console.error("Invalid target for performance modal:", target);
        return;
    }

    const allocatedStocksInTarget = portfolioToCheck.filter(s => (s.allocation || s.userAllocation || 0) > 0);
    if (allocatedStocksInTarget.length === 0) {
        alert(`“${currentPortfolioName}”中没有配置股票，无法进行收益测算。`);
        return;
    }

    if(document.getElementById('performanceModalTitle')) document.getElementById('performanceModalTitle').innerHTML = title;

    if(performanceModal) performanceModal.style.display = "block";
    if(document.getElementById('backtestResults')) document.getElementById('backtestResults').innerHTML = "<p>请选择日期范围并开始测算。注意：此功能为演示，实际回测需要历史数据和复杂计算。</p>";
    const chartCanvas = document.getElementById('performanceChart');
    if (chartCanvas) {
        if (performanceChartInstance) {
            performanceChartInstance.destroy();
            performanceChartInstance = null;
        }
        chartCanvas.style.display = 'none';
    }
}

function closePerformanceModal() { if(performanceModal) performanceModal.style.display = "none"; }

function runBacktest() {
    const startDateInput = document.getElementById('backtestStartDate');
    const endDateInput = document.getElementById('backtestEndDate');
    const resultsDiv = document.getElementById('backtestResults');
    const chartCanvas = document.getElementById('performanceChart');

    if (!startDateInput || !endDateInput || !resultsDiv || !chartCanvas) return;

    const startDate = startDateInput.value;
    const endDate = endDateInput.value;

    if (!currentBacktestTarget) {
        resultsDiv.innerHTML = "<p style='color: var(--danger-color);'>错误：未指定测算目标组合。</p>";
        return;
    }
    if (!startDate || !endDate) {
        resultsDiv.innerHTML = "<p style='color: var(--danger-color);'>请选择开始和结束日期。</p>";
        return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
        resultsDiv.innerHTML = "<p style='color: var(--danger-color);'>开始日期必须早于结束日期。</p>";
        return;
    }

    let portfolioToBacktest;
    let allocationField;
    let portfolioNameForDisplay;

    if (currentBacktestTarget === 'myPortfolio') {
        portfolioToBacktest = myPortfolio;
        allocationField = 'userAllocation';
        portfolioNameForDisplay = myPortfolioTitle;
    } else if (agents[currentBacktestTarget]) {
        portfolioToBacktest = agents[currentBacktestTarget].portfolio;
        allocationField = 'allocation';
        portfolioNameForDisplay = `${agents[currentBacktestTarget].name} (${agents[currentBacktestTarget].role}) 投资组合`;
    } else {
        resultsDiv.innerHTML = "<p style='color: var(--danger-color);'>错误：无效的测算目标组合。</p>";
        return;
    }

    const allocatedStocks = portfolioToBacktest.filter(s => (s[allocationField] || 0) > 0);
    if (allocatedStocks.length === 0) {
         resultsDiv.innerHTML = `<p style='color: var(--danger-color);'>“${portfolioNameForDisplay}”中没有配置股票，无法测算。</p>`;
        return;
    }

    resultsDiv.innerHTML = `<p>正在为 “${portfolioNameForDisplay}” 进行 ${startDate} 至 ${endDate} 的收益测算 (模拟中)...</p>`;

    setTimeout(() => {
        const labels = [];
        const dataPoints = [];
        let currentDateLoop = new Date(startDate);
        let currentValue = 100;

        while(currentDateLoop <= new Date(endDate)) {
            labels.push(currentDateLoop.toISOString().split('T')[0]);
            let dailyChangeFactor = 0;
            allocatedStocks.forEach(stock => {
                const stockAllocation = (stock[allocationField] || 0) / 100;
                dailyChangeFactor += stockAllocation * ( (Math.random() - 0.48) * 0.025 );
            });
            currentValue *= (1 + dailyChangeFactor);
            dataPoints.push(currentValue.toFixed(2));

            let nextDay = new Date(currentDateLoop);
            nextDay.setDate(currentDateLoop.getDate() + 1);
            currentDateLoop = nextDay;

            if (labels.length > 365 * 5) break;
        }

        const totalReturn = dataPoints.length > 0 ? ((dataPoints[dataPoints.length-1] / 100) - 1) * 100 : 0;

        resultsDiv.innerHTML = `
            <p><strong>模拟测算结果 (“${portfolioNameForDisplay}”):</strong></p>
            <ul>
                <li>期间: ${startDate} to ${endDate}</li>
                <li>期初价值: 100.00 (假设)</li>
                <li>期末价值: ${dataPoints.length > 0 ? dataPoints[dataPoints.length-1] : 'N/A'}</li>
                <li>总回报率: <span style="color: ${totalReturn >= 0 ? 'var(--accent-color2)' : 'var(--danger-color)'}; font-weight: bold;">${totalReturn.toFixed(2)}%</span></li>
            </ul>
            <p style="font-size:0.8em; color: var(--text-muted)">注意: 此为随机模拟数据，不代表真实投资表现。</p>
        `;

        chartCanvas.style.display = 'block';
        if (window.Chart && Chart) {
            if (performanceChartInstance) {
                performanceChartInstance.destroy();
            }
            const ctx = chartCanvas.getContext('2d');
            performanceChartInstance = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: '模拟组合净值',
                        data: dataPoints,
                        borderColor: 'var(--accent-color1)',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        tension: 0.1,
                        fill: true,
                        pointRadius: dataPoints.length > 100 ? 0 : 2,
                        borderWidth: 1.5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: false, ticks: { color: 'var(--text-muted)'}, grid: { color: 'var(--border-color)' } },
                        x: { ticks: { color: 'var(--text-muted)', maxRotation: 45, minRotation: 30, autoSkip: true, maxTicksLimit: 20 }, grid: { color: 'var(--border-color)' } }
                    },
                    plugins: { legend: { labels: { color: 'var(--text-color)' } } }
                }
            });
        } else {
             resultsDiv.innerHTML += "<p>Chart.js 未加载，无法显示图表。</p>";
        }
    }, 1000);
}


// Save/Load Agent Data
function saveAgentData() {
    const dataToSave = {
        agent1StockPool: agents.agent1.stockPoolList,
        agent1Portfolio: agents.agent1.portfolio,
        agent2StockPool: agents.agent2.stockPoolList,
        agent2Portfolio: agents.agent2.portfolio,
    };
    localStorage.setItem('agentsData_v3', JSON.stringify(dataToSave));
}

function loadAgentData() {
    const savedData = localStorage.getItem('agentsData_v3');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        agents.agent1.stockPoolList = parsedData.agent1StockPool || [];
        agents.agent1.portfolio = parsedData.agent1Portfolio || [];
        agents.agent2.stockPoolList = parsedData.agent2StockPool || [];
        agents.agent2.portfolio = parsedData.agent2Portfolio || [];
    }
    renderStockPoolList('agent1');
    renderAgentPortfolio('agent1');
    renderStockPoolList('agent2');
    renderAgentPortfolio('agent2');
}

function saveMyPortfolio() {
    const dataToSave = {
        items: myPortfolio,
        title: myPortfolioTitle
    };
    localStorage.setItem('myPortfolioData_v4', JSON.stringify(dataToSave));
}
function loadMyPortfolio() {
    const savedData = localStorage.getItem('myPortfolioData_v4');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        myPortfolio = parsedData.items || [];
        myPortfolioTitle = parsedData.title || "我的投资组合";
    } else {
        myPortfolioTitle = "我的投资组合";
    }
    const portfolioTitleEl = document.getElementById("myPortfolioTitleText");
    if (portfolioTitleEl) {
        portfolioTitleEl.textContent = myPortfolioTitle;
    }
    renderMyPortfolio();
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (apiSettingsModal && event.target == apiSettingsModal) {
        closeApiSettingsModal();
    }
    if (performanceModal && event.target == performanceModal) {
        closePerformanceModal();
    }
}
