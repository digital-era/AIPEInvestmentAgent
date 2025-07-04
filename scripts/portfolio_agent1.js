// scripts/portfolio_agent1.js

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
	latestPrompt: "",
        latestReport: "",
	latestDeepSearchPrompt: "",
        latestDeepSearcReport: "",
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
6.  **投资配置思路**: 基于对 ${stockName} 的分析，如果认为其具备投资价值，请阐述如何将其整合进一个符合您投资理念的多元化组合中，以及它可能占据的权重范围和理由。
7.  **语言风格**: 尝试模仿 Warren Buffett 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。 如果其风格未知，则采用清晰、专业、有深度的表达。
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
	latestPrompt: "",
        latestReport: "",
	latestDeepSearchPrompt: "",
        latestDeepSearcReport: "",
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
6.  **投资配置思路**: 基于对 ${stockName} 的分析，如果认为其具备投资潜力，请阐述如何将其整合进一个符合您投资理念的成长型多元化组合中，以及它可能占据的权重范围和理由。
7.  **语言风格**: 尝试模仿 Cathie Wood 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。 如果其风格未知，则采用清晰、专业、有深度的表达。
注意事项：
切记回答信息中不要带有任何Cathie Wood, ARK Invest, ARK字眼，这里全称都体现你自己，你是${agents.agent2.name}
用户问题:
"针对 ${stockName}，请提供投资前景展望以及配置思路。"
请你作为${agents.agent2.name} (${agents.agent2.role}), 开始你的思考和中文回复:
        `
    }
};

let myPortfolio = []; // This will be populated by loadMyPortfolio
let myPortfolioTitle = "我的投资组合"; // Default title, will be updated by loadMyPortfolio
let apiSettings = { endpoint: '', key: '', model: '' };
let performanceChartInstance = null;
let currentBacktestTarget = null;
// 全局变量，用于在编辑报告时暂存信息
let originalReportContent = '';
let currentAgentIdForReport = null;
let currentStockNameForReport = null; 

// API Settings Model/Endpoint Configuration
const endpointModelMap = {
    "https://api.deepseek.com": [{ value: "deepseek-chat", labelKey: "modelDeepSeekV3" }],
    "https://generativelanguage.googleapis.com": [{ value: "gemini-2.5-flash-preview-05-20", labelKey: "modelGeminiFlash" }],
    "https://api.openai.com": [{ value: "gpt-4o-mini", labelKey: "modelGpt4oMini" }]
};
const modelDisplayStrings = {
    "modelDeepSeekV3": "DeepSeek Chat (deepseek-chat)",
    "modelGeminiFlash": "gemini-2.5-flash-preview-05-20",
    "modelGpt4oMini": "OpenAI GPT-4o mini (gpt-4o-mini)"
};

// --- Data Readiness Management ---
let isPortfolioSystemReady = false; // Flag for Excel data (allStockData) readiness

async function ensureStockDataIsReady() {
    if (isPortfolioSystemReady) {
        // console.log("ensureStockDataIsReady: Core stock data (allStockData) already marked as ready.");
        return true;
    }

    // Check if allStockData is already populated (e.g. if this function is called later)
    if (typeof allStockData !== 'undefined' && Object.keys(allStockData).length > 0) {
        console.log("ensureStockDataIsReady: allStockData was already populated.");
        isPortfolioSystemReady = true;
        return true;
    }

    if (window.allStockDataGlobalPromise) {
        console.log("ensureStockDataIsReady: Waiting for allStockDataGlobalPromise to resolve...");
        try {
            await window.allStockDataGlobalPromise;
            console.log("ensureStockDataIsReady: allStockDataGlobalPromise resolved.");
            if (typeof allStockData !== 'undefined' && Object.keys(allStockData).length > 0) {
                isPortfolioSystemReady = true;
                return true;
            } else {
                console.error("ensureStockDataIsReady: allStockDataGlobalPromise resolved, but allStockData is still empty or undefined.");
                alert("错误：股票基础数据未能成功加载。请尝试刷新页面。");
                return false;
            }
        } catch (error) {
            console.error("ensureStockDataIsReady: Error awaiting allStockDataGlobalPromise:", error);
            alert("加载股票基础数据时出错。请尝试刷新页面。");
            return false;
        }
    } else {
        console.warn("ensureStockDataIsReady: allStockDataGlobalPromise not found. This usually means `loadAndProcessExcelData` hasn't run or completed setting the global promise from index.html or potfunddatarender.js.");
        // As a last resort, if `loadAndProcessExcelData` is available, try to kick it off.
        if (typeof loadAndProcessExcelData === "function" && typeof window.allStockDataGlobalPromise === 'undefined') {
            console.log("ensureStockDataIsReady: Attempting to initiate loadAndProcessExcelData as a fallback.");
            window.allStockDataGlobalPromise = loadAndProcessExcelData(); // This sets the global promise
            return await ensureStockDataIsReady(); // Recurse to await the newly set promise
        }
        alert("股票基础数据加载流程未正确启动。请尝试刷新页面或联系管理员。");
        return false;
    }
}


// DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log("Portfolio Agent JS: DOMContentLoaded event fired.");

    // It's important that `allStockDataGlobalPromise` is initiated by `index.html`'s script
    // or `potfunddatarender.js` before this script heavily relies on it.
    // We will use `ensureStockDataIsReady()` before operations needing `allStockData`.

    // Initialize Agent display elements
    document.getElementById('agent1NameDisplay').textContent = agents.agent1.name;
    document.getElementById('agent1RoleDisplay').textContent = agents.agent1.role;
    document.getElementById('agent1Logic').textContent = agents.agent1.coreLogic;
    if(document.getElementById('agent1Photo')) document.getElementById('agent1Photo').src = agents.agent1.photo;

    document.getElementById('agent2NameDisplay').textContent = agents.agent2.name;
    document.getElementById('agent2RoleDisplay').textContent = agents.agent2.role;
    document.getElementById('agent2Logic').textContent = agents.agent2.coreLogic;
    if(document.getElementById('agent2Photo')) document.getElementById('agent2Photo').src = agents.agent2.photo;

    const agent1AnalysisOutput = document.getElementById(agents.agent1.analysisOutputId);
    if (agent1AnalysisOutput) agent1AnalysisOutput.value = agent1AnalysisOutput.placeholder;
    const agent2AnalysisOutput = document.getElementById(agents.agent2.analysisOutputId);
    if (agent2AnalysisOutput) agent2AnalysisOutput.value = agent2AnalysisOutput.placeholder;

    // Load data from localStorage (this is independent of allStockData for now)
    loadApiSettings();
    loadAgentData(); // Loads agent stock pools, portfolios, reports from localStorage
    loadMyPortfolio(); // Loads user's main portfolio from localStorage

    document.querySelector('.tab-link-main').click(); // Activate default tab

    // Setup event listeners for balance buttons
    const balanceUserPortfolioBtn = document.getElementById('balancePortfolioBtn');
    if (balanceUserPortfolioBtn) {
        balanceUserPortfolioBtn.addEventListener('click', () => autoBalancePortfolio('myPortfolio'));
    }
    document.querySelectorAll('.balance-agent-portfolio-btn').forEach(button => {
        button.addEventListener('click', function() {
            autoBalancePortfolio(this.dataset.agentid);
        });
    });

    // Setup performance modal dates
    const today = new Date();
    const oneYearAgo = new Date(new Date().setFullYear(today.getFullYear() - 1));
    if(document.getElementById('backtestEndDate')) document.getElementById('backtestEndDate').valueAsDate = today;
    if(document.getElementById('backtestStartDate')) document.getElementById('backtestStartDate').valueAsDate = oneYearAgo;

    // Setup "My Portfolio" title editing
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
                    saveMyPortfolio(); // Save changes
                } else if (!newTitle) {
                    portfolioTitleText.textContent = myPortfolioTitle; // Revert if empty
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
	// 调用 initializePortfoliosAfterLogin 以确保在没有云数据时，本地数据也能加载
    if (typeof initializePortfoliosAfterLogin === "function") {
        initializePortfoliosAfterLogin();
    }
});

// 由 index.html 的 displayLoggedInUser 或 updateAuthUI (登出时) 调用
function initializePortfoliosAfterLogin() {
    console.log("portfolio_agent.js: initializePortfoliosAfterLogin called.");
    // 这个函数现在主要负责从 localStorage 加载数据作为回退或初始状态
    // 云端数据的加载由 index.html 中的 loadPortfolioFromCloudAndApplyToUI 触发
    loadAgentData();
    loadMyPortfolio();
}

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
async function findStockInGlobalData(searchTerm) {
    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        console.warn("findStockInGlobalData: allStockData is not available or empty.");
        return null;
    }
	
    if (typeof HKallStockData === 'undefined' || Object.keys(HKallStockData).length === 0) {
        console.warn("findStockInGlobalData: HKallStockData is not available or empty.");
        //return null;
    } 

    if (typeof ETFallStockData === 'undefined' || Object.keys(ETFallStockData).length === 0) {
        console.warn("findStockInGlobalData: ETFallStockData is not available or empty.");
        //return null;
    } 
	
    let foundStock = null;
    let foundStockCode = null;
    let code;
    const upperSearchTerm = searchTerm.toUpperCase();
    let stockData = null;
    /**
    const stockMatch = searchTerm.match(/(.+?)\s*\((.*?)\)/);
    if (stockMatch && stockMatch[1] && stockMatch[2]) {
        const codeFromInput = stockMatch[2].trim().toUpperCase();
        const nameFromInput = stockMatch[1].trim();
        if (allStockData[codeFromInput] && allStockData[codeFromInput].name.toLowerCase().includes(nameFromInput.toLowerCase())) {
             return { code: codeFromInput, name: allStockData[codeFromInput].name };
        } else  if (HKallStockData[codeFromInput] && HKallStockData[codeFromInput].name.toLowerCase().includes(nameFromInput.toLowerCase())) {
             return { code: codeFromInput, name: HKallStockData[codeFromInput].name };
	} else  if (ETFallStockData[codeFromInput] && ETFallStockData[codeFromInput].name.toLowerCase().includes(nameFromInput.toLowerCase())) {
             return { code: codeFromInput, name: ETFallStockData[codeFromInput].name };
	} 
	    
    }
    */
	
    if (allStockData[upperSearchTerm]) {
	stockData = allStockData[upperSearchTerm];
	foundStockCode = upperSearchTerm;
    } else {
	const searchTermLower = searchTerm.toLowerCase();
	for (code in allStockData) {
	    if (allStockData[code].name.toLowerCase().includes(searchTermLower)) {
		foundStockCode = code;
		break; 
	    }
	}
    } 

    if (allStockData[foundStockCode]) {
        return { code: foundStockCode, name: allStockData[foundStockCode].name };
    }

    if (HKallStockData[upperSearchTerm]) {
	stockData = HKallStockData[upperSearchTerm];
	foundStockCode = upperSearchTerm;
    } else {
	const searchTermLower = searchTerm.toLowerCase();
	for (code in HKallStockData) {
	    if (HKallStockData[code].name.toLowerCase().includes(searchTermLower)) {
		foundStockCode = code;
		break; 
	    }
	}
    } 
	
    if (HKallStockData[foundStockCode]) {
        return { code: foundStockCode, name: HKallStockData[foundStockCode].name };
    }


    if (ETFallStockData[upperSearchTerm]) {
	stockData = ETFallStockData[upperSearchTerm];
	foundStockCode = upperSearchTerm;
    } else {
	const searchTermLower = searchTerm.toLowerCase();
	for (code in ETFallStockData) {
	    if (ETFallStockData[code].name.toLowerCase().includes(searchTermLower)) {
		foundStockCode = code;
		break; 
	    }
	}
    } 
    if (ETFallStockData[foundStockCode]) {
         return { code: foundStockCode, name: ETFallStockData[foundStockCode].name };
    }

    // 2. 如果本地数据没有找到，检查是否需要进行API请求
    const isETF = upperSearchTerm.startsWith('58') || upperSearchTerm.startsWith('56') || upperSearchTerm.startsWith('51') || upperSearchTerm.startsWith('15');
    const isUS = upperSearchTerm.startsWith('US');
    
    if (isUS || isETF) {
        console.log(`本地未找到 ${upperSearchTerm}，尝试进行API查询...`);
        try {
            const response = await fetch(`/api/rtStockQueryProxy?code=${upperSearchTerm}&type=price`);
            
            if (!response.ok) {
                // 尝试解析错误体，否则使用状态文本
                let errorMsg = `服务器响应错误: ${response.status} ${response.statusText}`;
                try {
                    const errorData = await response.json();
                    errorMsg = errorData.error || errorMsg;
                } catch (e) {
                    // JSON解析失败，使用原始错误信息
                }
                throw new Error(errorMsg);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            if (data.dailydata && data.dailydata.length > 0) {
                // 根据类型决定存到哪个全局对象
                const targetData = isUS ? USallStockData : ETFallStockData;
                const stockType = isUS ? 'US' : 'ETF';
                
                // 更新或创建股票数据
                const existingName = targetData[upperSearchTerm]?.name || data.name;
                targetData[upperSearchTerm] = {
                    name: existingName,
                    latestDate: data.dailydata[0].date,
                    dailyData: data.dailydata
                };
                
                console.log(`已通过API获取并存储${stockType}数据: ${upperSearchTerm}`, targetData[upperSearchTerm]);
                
                // **关键：API成功后，从这里返回结果**
                return { code: upperSearchTerm, name: targetData[upperSearchTerm].name };
            } else {
                console.warn(`API请求成功，但返回的数据中没有 'dailydata':`, data);
                // 没有有效数据，也视为找不到
                return null;
            }

        } catch (error) {
            console.error("API请求或处理失败:", error);
            alert(`数据获取失败: ${error.message}`);
            return null; // API失败，返回null
        }
    }

    // 3. 如果所有方法都试过，仍然没找到，返回null
    console.log(`在所有数据源中都未找到 '${searchTerm}'`);
    return null;
}


// Agent Stock Pool Management
async function addStockToPool(agentId) {
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

    if (typeof HKallStockData === 'undefined' || Object.keys(HKallStockData).length === 0) {
        alert("HK股票基础数据尚未加载。请稍候再试或刷新页面。");
        //return;
    }

    if (typeof ETFallStockData === 'undefined' || Object.keys(ETFallStockData).length === 0) {
        alert("ETF基础数据尚未加载。请稍候再试或刷新页面。");
        //return;
    }

    const foundStock = await findStockInGlobalData(searchTerm);

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

/**
 * 从阿里云OSS获取指定股票的最新深度报告内容。
 * 它会自动查找所有符合 'deepreport/{stockName}_YYYY-MM-DD.md' 格式的文件，
 * 并选择日期最新的一个文件进行读取。
*/
async function getLatestReportFromOSS(stockName) {
    if (!stockName) {
        console.error("获取报告失败：未提供股票名称。");
        return ""; // 如果没有传入stockName，直接返回空
    }

    try {
        // 1. 获取OSS客户端实例
        const client = await getOSSClient();

        // 2. 定义要搜索的文件前缀
        // 例如，如果 stockName 是 "贵州茅台"，前缀就是 "deepreport/贵州茅台_"
        const prefix = `deepreport/${stockName}_`;
        console.log(`正在OSS中搜索前缀为 "${prefix}" 的报告...`);

        // 3. 使用 client.list() 列出所有匹配前缀的文件
        const listResult = await client.list({
            prefix: prefix,
            // 'max-keys' 可以限制返回的最大文件数，以防文件过多
            'max-keys': 1000 
        });

        // 4. 检查是否找到了任何文件
        if (!listResult.objects || listResult.objects.length === 0) {
            console.log(`未找到与 "${prefix}" 匹配的报告文件。`);
            return ""; // 按要求，如果找不到文件则返回空字符串
        }

        // 5. 找到最新的文件
        // 由于文件名格式为 '..._YYYY-MM-DD.md'，日期部分是可按字典顺序比较的。
        // 因此，我们直接对文件名字符串进行降序排序，第一个就是最新的。
        listResult.objects.sort((a, b) => {
            // b.name.localeCompare(a.name) 实现字符串降序排序
            // 例如 '..._2023-10-27.md' 会排在 '..._2023-10-26.md' 前面
            return b.name.localeCompare(a.name);
        });

        const latestFile = listResult.objects[0];
        const latestFileKey = latestFile.name;
        
        console.log(`找到最新报告文件: ${latestFileKey}`);

        // 6. 使用 client.get() 获取最新文件的内容
        const getResult = await client.get(latestFileKey);
        
        // 7. 将返回的 Buffer/Uint8Array 内容解码为UTF-8字符串
        // 在浏览器环境中，getResult.content 是一个 Uint8Array
        const fileContent = new TextDecoder('utf-8').decode(getResult.content);
        
        // 8. 成功！返回文件内容
        return fileContent;

    } catch (error) {
        // 统一处理所有可能的错误：获取客户端失败、列出文件失败、获取文件失败等
        console.error(`从OSS读取最新报告时发生错误 (股票: ${stockName}):`, error);
        
        // 按要求，如果读取失败则返回空字符串
        return "";
    }
}

// Stock Analysis For Agent (MODAL VERSION - Agent Specific Report)
async function analyzeStockForAgent(agentId) {
    const agent = agents[agentId]; // agent 对象现在包含 latestReport
    const stockSelect = document.getElementById(agent.stockSelectId);
    const analysisInput = document.getElementById(agent.analysisInputId);
    const analysisDisplayElement = document.getElementById(agent.analysisOutputId); // This is the textarea
    const analysisOutputContainer = analysisDisplayElement.parentNode; // The .analysis-output div

    let viewReportBtn = document.getElementById(`viewReportBtn_${agentId}`);
    if (viewReportBtn) {
        viewReportBtn.style.display = 'none';
    }
    agent.latestReport = ""; // <--- 清空此Agent的旧报告
    agent.latestPrompt = ""; // <--- 清空此Agent的旧Prompt

    let stockToAnalyze = analysisInput.value.trim();
    if (stockToAnalyze === "" && stockSelect.value !== "") {
        stockToAnalyze = stockSelect.value;
    }

    if (analysisDisplayElement) {
        analysisDisplayElement.value = analysisDisplayElement.placeholder || "分析结果将在此显示...";
        analysisDisplayElement.style.color = 'var(--text-muted)';
        analysisDisplayElement.readOnly = true;
    }

    if (stockToAnalyze === "") {
        alert("请从分析池选择或输入要分析的股票。");
        if (analysisDisplayElement) analysisDisplayElement.value = "错误：未指定分析目标。";
        return;
    }

    if (analysisInput) analysisInput.value = "";
    if (stockSelect) stockSelect.value = "";
    if (analysisDisplayElement) analysisDisplayElement.value = "请稍候，正在准备分析...\n";

    let stockNameForDisplay = stockToAnalyze;
    let stockCodeForData = null;

    const stockNameCodeMatch = stockToAnalyze.match(/(.+?)\s*\((.*?)\)/);
    if (stockNameCodeMatch && stockNameCodeMatch[1] && stockNameCodeMatch[2]) {
        stockNameForDisplay = stockNameCodeMatch[1].trim();
        stockCodeForData = stockNameCodeMatch[2].trim().toUpperCase();
    } else {
        const foundStockInfo = await findStockInGlobalData(stockToAnalyze);
        if (foundStockInfo) {
            stockNameForDisplay = foundStockInfo.name;
            stockCodeForData = foundStockInfo.code.toUpperCase();
        } else {
            stockNameForDisplay = stockToAnalyze;
            if (analysisDisplayElement) analysisDisplayElement.value += `警告: 未能从 "${stockToAnalyze}" 中识别股票代码或找到对应股票。将使用 "${stockNameForDisplay}" 作为名称进行分析，但量化数据可能无法获取。\n`;
        }
    }
    
    let potScore = "[数据缺失]";
    let totalInflow = "[数据缺失]";
    let quantDataMessage = "";
    /* 
    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        quantDataMessage = "注意: 股票基础数据 (allStockData) 未完全加载，无法获取量化指标。\n";
    } else if (stockCodeForData && allStockData[stockCodeForData]) {
        const stockData = allStockData[stockCodeForData];
        potScore = stockData.currentPotScore !== undefined ? String(stockData.currentPotScore) : "[无PotScore数据]";
        totalInflow = stockData.totalInflow !== undefined ? String(stockData.totalInflow) : "[无主力资金数据]";
        quantDataMessage = `已获取 ${stockNameForDisplay}(${stockCodeForData}) 的量化数据: PotScore=${potScore}, 主力资金流入=${totalInflow}\n`;
    } else if (stockCodeForData) {
        quantDataMessage = `注意: 无法在已加载的股票基础数据中找到代码 ${stockCodeForData} (${stockNameForDisplay}) 的量化信息。\n`;
    } else {
        quantDataMessage = `注意: 由于未能识别股票代码，无法获取 ${stockNameForDisplay} 的量化数据。\n`;
    }
    if (analysisDisplayElement) analysisDisplayElement.value += quantDataMessage;
    */

    let analysisReportText = "";
    analysisReportText = await getLatestReportFromOSS(stockNameForDisplay) ;
    //获取历史分析报告，如果获取不到为第一次分析
    if (analysisReportText === "") {	//如果是第一次分析
	    if (!apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
	        if (analysisDisplayElement) {
	            analysisDisplayElement.value += "错误：API设置未完成。请前往“API设置”配置。";
	            analysisDisplayElement.style.color = 'var(--danger-color)';
	        }
	        return;
	    }
	
	    const prompt = agent.promptTemplate(stockNameForDisplay, potScore, totalInflow);
	    agent.latestPrompt = prompt; // <--- 存储prompt到对应的 agent 对象
	    console.log(`agent.latestPrompt=${agent.latestPrompt}`)
	    if (analysisDisplayElement) {
	        analysisDisplayElement.value += `\n正在为 "${stockNameForDisplay}" 生成分析报告 (使用模型: ${apiSettings.model})...\n这将需要一些时间，请耐心等待。\n`;
	    }
	
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
	        } else {
	            if (analysisDisplayElement) {
	                 analysisDisplayElement.value += "错误: 不支持的API接入点配置。";
	                 analysisDisplayElement.style.color = 'var(--danger-color)';
	            }
	            return;
	        }
	
	        const apiResponse = await fetch(requestUrl, { method: 'POST', headers: headers, body: JSON.stringify(requestPayload) });
	
	        if (!apiResponse.ok) {
	            const errorBody = await apiResponse.text();
	            throw new Error(`API请求失败: ${apiResponse.status} ${apiResponse.statusText}. 响应: ${errorBody}`);
	        }
	
	        const responseData = await apiResponse.json();
	        let analysisReportText = "未能从API响应中提取分析报告。";
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
	            } else if (responseData.promptFeedback && responseData.promptFeedback.blockReason) {
	                analysisReportText = `API错误: 您的请求因 "${responseData.promptFeedback.blockReason}" 而被阻止。`;
	            } else if (responseData.error) {
	                 analysisReportText = `API错误: ${responseData.error.message || JSON.stringify(responseData.error)}`;
	            }
	        }
	
	        agent.latestReport = analysisReportText; // <--- 存储报告到对应的 agent 对象

	        if (analysisDisplayElement) {
	            analysisDisplayElement.value = `AI为“${stockNameForDisplay}”生成的分析报告已就绪。\n点击下方按钮查看完整报告。`;
	            analysisDisplayElement.style.color = 'var(--accent-color2)';
	
	            if (!viewReportBtn) {
	                viewReportBtn = document.createElement('button');
	                viewReportBtn.id = `viewReportBtn_${agentId}`;
	                viewReportBtn.className = 'view-report-btn';
	                viewReportBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> 查看完整报告`;
	                if (analysisOutputContainer) {
	                    analysisOutputContainer.appendChild(viewReportBtn);
	                }
	            }
	            viewReportBtn.onclick = function() { openAnalysisReportModal(agentId, stockNameForDisplay); };
	            viewReportBtn.style.display = 'inline-block';
	        }
	
	    } catch (error) {
	        console.error("analyzeStockForAgent API Call Error:", error);
	        agent.latestReport = ""; // 清空报告
		agent.latestPrompt = ""; // 清空Prompt
	        if (analysisDisplayElement) {
	            analysisDisplayElement.value = `调用AI模型分析时出错: ${error.message}\n请检查控制台详情。`;
	            analysisDisplayElement.style.color = 'var(--danger-color)';
	        }
	    }
    } else {		
		agent.latestReport = analysisReportText; // <--- 存储报告到对应的 agent 对象
	
		if (analysisDisplayElement) {
		    analysisDisplayElement.value = `AI为“${stockNameForDisplay}”已经调出上次分析报告。\n点击下方按钮查看完整报告。`;
		    analysisDisplayElement.style.color = 'var(--accent-color2)';
	
		    if (!viewReportBtn) {
			viewReportBtn = document.createElement('button');
			viewReportBtn.id = `viewReportBtn_${agentId}`;
			viewReportBtn.className = 'view-report-btn';
			viewReportBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> 查看完整报告`;
			if (analysisOutputContainer) {
			    analysisOutputContainer.appendChild(viewReportBtn);
			}
		    }
		    viewReportBtn.onclick = function() { openAnalysisReportModal(agentId, stockNameForDisplay); };
		    viewReportBtn.style.display = 'inline-block';
		}	
    }
}


// Agent Portfolio Management Functions
async function addStockToAgentPortfolio(agentId) {
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

    if (typeof HKallStockData === 'undefined' || Object.keys(HKallStockData).length === 0) {
        alert("HK股票基础数据尚未加载。请稍候再试或刷新页面。");
        return;
    }

    if (typeof ETFallStockData === 'undefined' || Object.keys(ETFallStockData).length === 0) {
        alert("ETF基础数据尚未加载。请稍候再试或刷新页面。");
        return;
    }


    const foundStock = await findStockInGlobalData(searchTerm);
    if (!foundStock) {
        alert(`手动输入：未在股票基础数据中找到 "${searchTerm}" 对应的股票。请检查输入。`);
        return;
    }

    if (agent.portfolio.find(s => s.code === foundStock.code)) {
        alert(`股票 ${foundStock.name} (${foundStock.code}) 已在 ${agent.name} 的投资组合中。`);
        return;
    }

    agent.portfolio.push({ code: foundStock.code, name: foundStock.name, allocation: 0 });
    inputElement.value = "";
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
async function syncStocksToMyPortfolio() { // 修正为 async
    if (!await ensureStockDataIsReady()) return;
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
                        //if (agentStock.allocation > (existingUserPortfolioItem.suggestedAllocation || 0) ) {
			if (agentStock.allocation != (existingUserPortfolioItem.suggestedAllocation || 0) ) {
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
