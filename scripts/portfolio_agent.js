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
6.  **量化因子**: 关于 ${stockName}，其当前标的动能(PotScore)为 ${potScore}，而近5日主力资金总净流入占比为 ${totalInflow}。请分析这些量化指标如何反映市场对该股票创新故事的看法，以及它们是否支持其成长潜力。
7.  **投资配置思路**: 基于对 ${stockName} 的分析，如果认为其具备投资潜力，请阐述如何将其整合进一个符合您投资理念的成长型多元化组合中，以及它可能占据的权重范围和理由。
8.  **语言风格**: 尝试模仿 Cathie Wood 可能的沟通风格（例如，直接、富有远见、严谨、强调数据、关注伦理等）。 如果其风格未知，则采用清晰、专业、有深度的表达。
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
function findStockInGlobalData(searchTerm) {
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

    if (typeof HKallStockData === 'undefined' || Object.keys(HKallStockData).length === 0) {
        alert("HK股票基础数据尚未加载。请稍候再试或刷新页面。");
        //return;
    }

    if (typeof ETFallStockData === 'undefined' || Object.keys(ETFallStockData).length === 0) {
        alert("ETF基础数据尚未加载。请稍候再试或刷新页面。");
        //return;
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
        const foundStockInfo = findStockInGlobalData(stockToAnalyze);
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
}


// Agent Portfolio Management Functions
function addStockToAgentPortfolio(agentId) {
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

        if(endpointSelect) endpointSelect.value = "";
        if(apiKeyInput) apiKeyInput.value = "";

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

    endpointSelect.innerHTML = ""; 

    let deepSeekEndpointValue = null; 
    for (const endpointUrl in endpointModelMap) { 
        if (endpointUrl.includes("deepseek.com")) { 
            deepSeekEndpointValue = endpointUrl;    
        }
        const option = document.createElement('option'); 
        option.value = endpointUrl;                      
        option.textContent = endpointUrl;                
        endpointSelect.appendChild(option);              
    }

    endpointSelect.addEventListener('change', (event) => {
        const newSelectedEndpoint = event.target.value; 
        populateApiModelDropdown(newSelectedEndpoint, apiSettings.model);
    });

    const savedSettings = localStorage.getItem('apiSettings'); 
    let initialEndpointToSelect = null; 
    let initialModelToSelect = null;    

    if (savedSettings) { 
        try {
            apiSettings = JSON.parse(savedSettings); 
            if (apiSettings.endpoint && endpointModelMap[apiSettings.endpoint]) {
                initialEndpointToSelect = apiSettings.endpoint; 
                if (apiSettings.model && endpointModelMap[apiSettings.endpoint].some(m => m.value === apiSettings.model)) {
                    initialModelToSelect = apiSettings.model; 
                }
            }
            apiKeyInput.value = apiSettings.key || ""; 
        } catch (e) {
            console.error("解析已存API设置时出错:", e); 
            localStorage.removeItem('apiSettings');   
            apiSettings = { endpoint: '', key: '', model: '' }; 
        }
    }

    if (!initialEndpointToSelect && deepSeekEndpointValue) {
        initialEndpointToSelect = deepSeekEndpointValue;
    }

    if (initialEndpointToSelect) {
        endpointSelect.value = initialEndpointToSelect;
    } else if (endpointSelect.options.length > 0) {
        endpointSelect.selectedIndex = 0;
        initialEndpointToSelect = endpointSelect.value; 
    }

    if (initialEndpointToSelect) {
        if (initialEndpointToSelect === deepSeekEndpointValue && 
            !initialModelToSelect && 
            endpointModelMap[deepSeekEndpointValue] && 
            endpointModelMap[deepSeekEndpointValue].length > 0) {
            initialModelToSelect = endpointModelMap[deepSeekEndpointValue][0].value;
        }
        populateApiModelDropdown(initialEndpointToSelect, initialModelToSelect);
    } else {
        populateApiModelDropdown("", null); 
    }

    apiSettings.endpoint = endpointSelect.value; 
    apiSettings.model = modelSelect.value;     
}


// Performance Backtest Modal
const performanceModal = document.getElementById('performanceModal');

/**
 * 从指定的Excel文件和Sheet中异步获取、并根据日期范围过滤投资组合的收益数据。
 *
 * @param {string} excelUrl - AIPEEarningYield.xlsx文件在服务器上的URL。
 * @param {string} sheetName - 需要处理的Sheet名称 (例如: "积极型收益")。
 * @param {string} startDate - 开始日期 (格式 "YYYY-MM-DD")。
 * @param {string} endDate - 结束日期 (格式 "YYYY-MM-DD")。
 * @returns {Promise<Object>} - 一个Promise，解析后返回一个包含labels, dataPoints, 和 totalReturn 的对象。
 */
async function processPortfolioEarningYieldDataFromExcel(excelUrl, sheetName, startDate, endDate) {
    // 将输入的 YYYY-MM-DD 日期字符串转换为 Date 对象，以便比较
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);

    try {
        const response = await fetch(excelUrl);
        if (!response.ok) throw new Error(`无法获取Excel文件: ${response.statusText}`);
        
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array' });

        if (!workbook.SheetNames.includes(sheetName)) {
            console.error(`错误: 在Excel文件中找不到名为 "${sheetName}" 的Sheet。`);
            return { labels: [], dataPoints: [], totalReturn: 0 };
        }

        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) return { labels: [], dataPoints: [], totalReturn: 0 };

        const dailyData = new Map();
        jsonData.forEach(row => {
            const timestamp = String(row['修改时间']);
            const totalValue = parseFloat(row['总价值']);
            if (!timestamp || isNaN(totalValue)) return;

            const dateStr = `${timestamp.substring(0, 4)}-${timestamp.substring(4, 6)}-${timestamp.substring(6, 8)}`;
            dailyData.set(dateStr, totalValue);
        });

        // [核心修改] 过滤和排序
        const labels = [];
        const dataPoints = [];
        
        // 1. 获取所有日期并排序
        const allSortedDates = Array.from(dailyData.keys()).sort();

        // 2. 根据用户选择的日期范围进行过滤
        const filteredDates = allSortedDates.filter(date => {
            const currentDate = new Date(date);
            return currentDate >= filterStartDate && currentDate <= filterEndDate;
        });

        // 3. 生成最终的 labels 和 dataPoints
        filteredDates.forEach(date => {
            labels.push(date);
            dataPoints.push(dailyData.get(date).toFixed(2));
        });

        // 计算 totalReturn
        let totalReturn = 0;
        if (dataPoints.length > 1) {
            const initialValue = parseFloat(dataPoints[0]);
            const finalValue = parseFloat(dataPoints[dataPoints.length - 1]);
            if (initialValue > 0) {
                totalReturn = ((finalValue / initialValue) - 1) * 100;
            }
        }
        
        return { labels, dataPoints, totalReturn };

    } catch (error) {
        console.error("处理Excel数据时发生错误:", error);
        return { labels: [], dataPoints: [], totalReturn: 0 };
    }
}

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
    const infoMessageElement = document.getElementById('backtestInfoMessage');
    if (infoMessageElement) {
        infoMessageElement.innerHTML = "请选择日期范围并开始测算";
        infoMessageElement.style.color = ''; // Reset color if previously error
        infoMessageElement.style.display = 'block';
    }
    const chartCanvas = document.getElementById('performanceChart');
    console.log(`chartCanvas variables: chartCanvas=${chartCanvas}`);
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
    console.log("runBacktest call enter")
    console.log(`Backtest variables: startDateInput=${startDateInput}, endDateInput=${endDateInput}, resultsDiv=${resultsDiv}, chartCanvas=${chartCanvas}`);
    if (!startDateInput || !endDateInput || !resultsDiv || !chartCanvas) return;
    
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    const infoMessageElement = document.getElementById('backtestInfoMessage');
    if (!currentBacktestTarget) {
	if (infoMessageElement) {
	        infoMessageElement.innerHTML = "<p style='color: var(--danger-color);'>错误：未指定测算目标组合。</p>";
	        infoMessageElement.style.color = ''; // Reset color if previously error
	        infoMessageElement.style.display = 'block';
        }
        return;
    }
    if (!startDate || !endDate) { 
	if (infoMessageElement) {
	        infoMessageElement.innerHTML = "<p style='color: var(--danger-color);'>请选择开始和结束日期。</p>";
	        infoMessageElement.style.color = ''; // Reset color if previously error
	        infoMessageElement.style.display = 'block';
        }
        return;
    }
    if (new Date(startDate) >= new Date(endDate)) {
	if (infoMessageElement) {
	        infoMessageElement.innerHTML = "<p style='color: var(--danger-color);'>开始日期必须早于结束日期。</p>";
	        infoMessageElement.style.color = ''; // Reset color if previously error
	        infoMessageElement.style.display = 'block';
        }
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
	   	if (infoMessageElement) {
		        infoMessageElement.innerHTML = "<p style='color: var(--danger-color);'>错误：无效的测算目标组合。</p>";
		        infoMessageElement.style.color = ''; // Reset color if previously error
		        infoMessageElement.style.display = 'block';
        	} 
        	return;
    }

    const allocatedStocks = portfolioToBacktest.filter(s => (s[allocationField] || 0) > 0);
    if (allocatedStocks.length === 0) {
	if (infoMessageElement) {
		infoMessageElement.innerHTML = `<p style='color: var(--danger-color);'>“${portfolioNameForDisplay}”中没有配置股票，无法测算。</p>`;
		infoMessageElement.style.color = ''; // Reset color if previously error
		infoMessageElement.style.display = 'block';
	} 
        return;
    }

		
     //定义Excel文件的URL
    const excelFileUrl = '/data/AIPEEarningYield.xlsx';
    let portfolioEYSheetName;
    if (currentBacktestTarget === 'myPortfolio') {
	        // [修复 2] 使用 `${myPortfolioTitle}` 插入变量
	        //portfolioEYSheetName = `${myPortfolioTitle}收益`; 
	    	portfolioEYSheetName = `我的投资组合收益`; 
    } else if (agents[currentBacktestTarget]) {
        	portfolioEYSheetName = `${agents[currentBacktestTarget].name}投资组合收益`;
    } else {
	        infoMessageElement.innerHTML = "<p style='color: var(--danger-color);'>错误：无效的测算目标组合。</p>";
	        infoMessageElement.style.display = 'block';
	        return;
    }

    if (infoMessageElement) {
		infoMessageElement.innerHTML = `<p>正在为 “${portfolioNameForDisplay}” 进行 ${startDate} 至 ${endDate} 的收益测算...</p>`;
		infoMessageElement.style.color = ''; // Reset color if previously error
		infoMessageElement.style.display = 'block';
     } 
	
    setTimeout(async() => {
        //const labels = [];
        //const dataPoints = [];
        //let currentDateLoop = new Date(startDate);
        //let currentValue = 100;

	/**
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
	*/

	// 调用新函数，并等待结果
	const { labels, dataPoints, totalReturn } = await processPortfolioEarningYieldDataFromExcel(excelFileUrl, portfolioEYSheetName, startDate, endDate );
	    
	// 如果没有获取到数据，可以提前退出或显示提示信息
    	if (labels.length === 0) {
		console.log("没有可用于生成图表的数据。");
		// 例如：显示一个 "暂无数据" 的提示
		return;
    	}
	if (infoMessageElement) {
	    infoMessageElement.innerHTML = `
            <p><strong>模拟测算结果 (“${portfolioNameForDisplay}”):</strong></p>
            <ul>
                <li>期间: ${startDate} to ${endDate}</li>
                <li>期初价值: 100000.00 </li>
                <li>期末价值: ${dataPoints.length > 0 ? dataPoints[dataPoints.length-1] : 'N/A'}</li>
                <li>总回报率: <span style="color: ${totalReturn >= 0 ? 'var(--accent-color2)' : 'var(--danger-color)'}; font-weight: bold;">${totalReturn.toFixed(2)}%</span></li>
            </ul>
            `;  
	    infoMessageElement.style.color = ''; // Reset color if previously error
	    infoMessageElement.style.display = 'block';
     	} 
	    
        chartCanvas.style.display = 'block';
        if (window.Chart && Chart) {
            if (performanceChartInstance) {
		console.log("runBacktest call 6-1")
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
                        borderColor: '#3498db',  //var(--accent-color1)
                        backgroundColor: 'rgba(52, 152, 219, 0.15)', //'rgba(52, 152, 219, 0.1)',
                        tension: 0.3, //0.1
                        fill: true,
                        pointRadius: dataPoints.length > 100 ? 0 : 3,  //0 : 2,
                        borderWidth: 3 //1.5
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        //y: { beginAtZero: false, ticks: { color: 'var(--text-muted)'}, grid: { color: 'var(--border-color)' } }, Add commentMore actions
                        //x: { ticks: { color: 'var(--text-muted)', maxRotation: 45, minRotation: 30, autoSkip: true, maxTicksLimit: 20 }, grid: { color: 'var(--border-color)' } }
			y: {
	                            beginAtZero: false,
	                            ticks: {
	                                color: '#90A4AE'// 使用更亮的 --text-color (E0E0E0)
	                                // color: '#FFFFFF' // 或者纯白
	                            },
	                            grid: {
	                                color: 'rgba(255, 255, 255, 0.12)' // 网格线颜色，比 var(--border-color) 亮一些
	                            }
                        },
                        x: {
	                            ticks: {
	                                color: '#90A4AE', // 使用更亮的 --text-color
	                                // color: '#FFFFFF' // 或者纯白
	                                maxRotation: 45,
	                                minRotation: 30,
	                                autoSkip: true,
	                                maxTicksLimit: 20
	                            },
	                            grid: {
	                                color: 'rgba(255, 255, 255, 0.12)' // 网格线颜色
	                            }
                        }                    
		    },
                    plugins: { legend: { labels: { color: '#EAEAEA' } } },
		    titleColor: '#B0BEC5', bodyColor: '#EAEAEA',   
                    titleFont: { size: 16 }, bodyFont: { size: 14 },
                }
            });
        } else {
	     console.log("runBacktest call 6-4")
	     if (infoMessageElement) {
		     infoMessageElement.innerHTML = "<p>Chart.js 未加载，无法显示图表。</p>";
		     infoMessageElement.style.color = ''; // Reset color if previously error
		     infoMessageElement.style.display = 'block';
    	    } 
        }
    }, 1000);
    console.log("runBacktest call 7")
}


// Save/Load Agent Data
function saveAgentData() {
    const dataToSave = {
        agent1StockPool: agents.agent1.stockPoolList,
        agent1Portfolio: agents.agent1.portfolio,
        agent1LatestReport: agents.agent1.latestReport, // <--- 保存 report
        agent2StockPool: agents.agent2.stockPoolList,
        agent2Portfolio: agents.agent2.portfolio,
        agent2LatestReport: agents.agent2.latestReport  // <--- 保存 report
    };
    localStorage.setItem('agentsData_v3', JSON.stringify(dataToSave)); // Consider versioning if schema changes often
}

function loadAgentData() {
    const savedData = localStorage.getItem('agentsData_v3');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        agents.agent1.stockPoolList = parsedData.agent1StockPool || [];
        agents.agent1.portfolio = parsedData.agent1Portfolio || [];
        agents.agent1.latestReport = parsedData.agent1LatestReport || ""; // <--- 加载 report
        agents.agent2.stockPoolList = parsedData.agent2StockPool || [];
        agents.agent2.portfolio = parsedData.agent2Portfolio || [];
        agents.agent2.latestReport = parsedData.agent2LatestReport || ""; // <--- 加载 report
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

// Analysis Report Modal Functions
const analysisReportModal = document.getElementById('analysisReportModal'); // Already correct

// 修改后的 openAnalysisReportModal 函数
function openAnalysisReportModal(agentId, stockName) { // 参数名简化为 agentId
    const modal = document.getElementById('analysisReportModal');
    if (!modal) return;

    // 1. 存储当前 agentId，以便“保存”功能使用
    currentAgentIdForReport = agentId; 
    currentStockNameForReport = stockName; 

    const agentWhoseReport = agents[agentId];
    
   
    if (!agentWhoseReport) {
        console.error("无法找到 Agent 对象: ", agentId);
        const modalBody = document.getElementById('analysisReportModalBody');
        if (modalBody) modalBody.textContent = "错误：无法加载指定智能体的报告。";
        modal.style.display = "block";
        return;
    }

    //console.log(`openAnalysisReportModal:agent.latestPrompt=${agentWhoseReport.latestPrompt}`)

    const modalTitle = document.getElementById('analysisReportModalTitle');
    const modalBody = document.getElementById('analysisReportModalBody');

    if (modalTitle) {
        modalTitle.innerHTML = `<i class="fas fa-file-alt"></i> ${agentWhoseReport.name} 对 ${stockName} 的分析报告`;
    }
    
    if (modalBody) {
        // 2. 获取报告内容，并将其存储到全局变量中，以备“取消”时使用
        originalReportContent = agentWhoseReport.latestReport || "未能加载报告内容或报告为空。";
        modalBody.textContent = originalReportContent;

        // 3. 关键：让报告内容区域变为可编辑状态
        modalBody.setAttribute('contenteditable', 'true');
        
        // (可选) 为了更好的用户体验，自动将光标聚焦到编辑区
        modalBody.focus();
    }

    modal.style.display = "block";
}

// 修改后的 closeAnalysisReportModal 函数
function closeAnalysisReportModal() {
    const modal = document.getElementById('analysisReportModal');
    if (modal) {
        modal.style.display = "none";
    }
    
    // 关键：在关闭模态框时，执行清理工作
    const modalBody = document.getElementById('analysisReportModalBody');
    if (modalBody) {
        // 1. 恢复为不可编辑状态
        modalBody.setAttribute('contenteditable', 'false');
    }

    // 清空所有全局暂存变量
    originalReportContent = '';
    currentAgentIdForReport = null;
    currentStockNameForReport = null; 
}

/** * 新增函数：保存对报告的修改 */
function saveReportChanges() {
    if (currentAgentIdForReport === null) {
        alert('保存失败：无法确定当前报告属于哪个智能体。');
        return;
    }
    
    const modalBody = document.getElementById('analysisReportModalBody');
    // 使用 .innerText 获取内容，可以更好地保留用户输入的换行
    const updatedReport = modalBody.innerText;

    // 更新 agents 数据对象中对应智能体的报告
    agents[currentAgentIdForReport].latestReport = updatedReport;
    // 增强将 "originalReportContent" 更新为当前已保存的版本。
    // 这确保了在保存后，如果用户继续编辑然后点击“取消”，
    // 内容会恢复到这次保存的状态，而不是最初打开时的状态。
    originalReportContent = updatedReport;

    console.log(`Agent ${currentAgentIdForReport} 的报告已更新。`);
    alert('修改已成功保存！');

    // 【核心修改】移除下面这行代码，这样窗口就不会在保存后关闭
    // closeAnalysisReportModal();
}

/** 新增函数：取消对报告的修改 */
function cancelReportChanges() {
    const modalBody = document.getElementById('analysisReportModalBody');
    
    // 将报告内容恢复为打开时保存的原始版本
    modalBody.textContent = originalReportContent;
    
    console.log("修改已取消，内容已恢复。");
    // 这里可以根据需要添加提示，或直接关闭模态框
    // 如果希望取消后也关闭模态框，可以取消下面这行的注释
    // closeAnalysisReportModal(); 
}

async function copyAnalysisReportToClipboard() {
    const modalBody = document.getElementById('analysisReportModalBody');    
    // 修改点：使用 .innerText 而不是 .textContent
    // .innerText 能更好地保留用户在编辑时输入的换行。
    const reportToCopy = modalBody ? modalBody.innerText : "";

    // 验证逻辑保持不变，非常完善
    if (!reportToCopy || reportToCopy.trim() === "" || reportToCopy === "未能加载报告内容或报告为空。" || reportToCopy === "错误：无法加载指定智能体的报告。") {
        alert("没有有效的报告内容可供复制。");
        return;
    }

    try {
        // 核心复制逻辑保持不变，是最佳实践
        await navigator.clipboard.writeText(reportToCopy);
        alert("分析报告已复制到剪贴板！");
    } catch (err) {
        console.error('无法复制报告: ', err);
        alert("复制失败。请检查浏览器控制台或手动复制。");
    }
}

/**
 * 启动对当前报告的深度搜索。
 * 1. 构造Prompt。
 * 2. 更新UI以显示加载状态，并禁用按钮。
 * 3. 调用后端代理API。
 * 4. 处理成功或失败的结果。
 * 5. 恢复UI状态。
 */
async function deepSearchReport() {
    // --- 1. 数据准备和验证 ---
    const agentId = currentAgentIdForReport;
    const stockName = currentStockNameForReport;

    if (!agentId || !stockName) {
        alert("无法执行深度搜索：缺少智能体或股票信息。");
        return;
    }
    
    // 验证 API 设置是否存在
    if (!apiSettings || !apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
        alert("API设置不完整，无法执行深度搜索。请先在设置中配置。");
        return;
    }

    const agent = agents[agentId];
    const modal = document.getElementById('analysisReportModal');
    const modalBody = document.getElementById('analysisReportModalBody');
    const allButtons = modal.querySelectorAll('button');
    const originalContentBeforeSearch = modalBody.innerText; // 保存当前内容以备失败时恢复
    const today = new Date();
	
    //console.log(`deepSearchReport:agent.latestPrompt=${agent.latestPrompt}`)

    // --- 2. 构筑 Prompt ---
    const deepSearchPrompt = `## 任务指令：深度分析报告生成

${agent.name}，你好。你已基于现有知识库对 **${stockName}** 完成了初步分析。现在需要你执行一项深度研究任务来更新和优化你的报告。

### 核心任务清单：

1.  **联网深度搜索**：
    *   **时间范围**：切记：今天日期是${today}, 聚焦于【最近三个月】。
    *   **信息来源**：所有公开可信的信息渠道（如新闻、财报、公告、行业报告等）。

2.  **搜索与验证目标**：
    *   **验证与修正**：核实或修正你前期分析中的关键假设（例如：成本优势、政策影响、管理层动态、技术壁垒等）。
    *   **发现新洞察**：挖掘任何可能从根本上改变你前期判断的最新动态、数据或市场情绪。

3.  **整合与报告**：
    *   **撰写报告**：将搜索到的新信息与你的前期分析进行整合，生成一份逻辑严密、更具时效性的最终深度分析报告。
    *   **关键要求**：报告中必须明确指出：
        *   哪些初步判断得到了新信息的【验证】。
        *   哪些判断因新信息而需要【修正或补充】。
        *   有哪些是基于新信息的【全新发现】。

---
### 前期分析参考

**[前期问题]**
${agent.latestPrompt || '无'}
---
**[前期答复]**
${agent.latestReport || '无'}
---
`;

    console.log("构筑的深度搜索Prompt:", deepSearchPrompt);

    // --- 3. UI 更新和 API 调用 ---
    try {
        // 3a. 进入加载状态：更新UI并禁用所有按钮
        modalBody.innerText = `正在使用模型: ${apiSettings.model} 进行深度搜索...\n\n这将需要一些时间，请耐心等待。\n(联网搜索和深度分析通常需要 30-90 秒)`;
        allButtons.forEach(btn => btn.disabled = true);

        // 3b. 调用后端代理 API
        const response = await fetch('/api/deepSearchProxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: deepSearchPrompt,
                settings: apiSettings // 将完整的设置对象发送给后端
            })
        });

        // 3c. 处理后端返回的错误
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: '无法解析服务器错误信息' }));
            throw new Error(`服务器返回错误: ${response.status} - ${errorData.message || '未知错误'}`);
        }

        // 3d. 处理成功返回的数据
        const result = await response.json();
        
        if (result && result.report) {
            // 更新报告区域为新内容
            modalBody.innerText = result.report;
            // 更新核心数据源
            agent.latestReport = result.report;
            // 将“取消修改”的还原点设置为新生成的内容
            originalReportContent = result.report;
            console.log("深度搜索成功，已更新报告内容。");
        } else {
            throw new Error("API返回的数据格式不正确，缺少 'report' 字段。");
        }

    } catch (error) {
        // --- 4. 错误处理 ---
        console.error('深度搜索失败:', error);
        alert(`深度搜索失败: ${error.message}`);
        
        // 恢复到搜索前的内容，避免用户看到错误信息后，之前的编辑丢失
        modalBody.innerText = originalContentBeforeSearch;

    } finally {
        // --- 5. 恢复 UI ---
        // 无论成功还是失败，最后都要重新启用按钮
        allButtons.forEach(btn => btn.disabled = false);
    }
}

// Close modal if clicked outside - Consolidated
window.onclick = function(event) {
    const apiModal = document.getElementById('apiSettingsModal');
    const perfModal = document.getElementById('performanceModal');
    const reportModal = document.getElementById('analysisReportModal'); 

    if (apiModal && event.target == apiModal) {
        closeApiSettingsModal();
    }
    if (perfModal && event.target == perfModal) {
        closePerformanceModal();
    }
    if (reportModal && event.target == reportModal) {
        closeAnalysisReportModal();
    }
};

// --- 新增: Excel 生成与应用函数 ---
// 获取 YYMMDDHHMM 格式的本地时间字符串
function getLocalTimestamp() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const MIN = String(now.getMinutes()).padStart(2, '0');
    return `${YYYY}${MM}${DD}${HH}${MIN}`;
}

async function generatePortfolioExcelBlob() {
    await ensureStockDataIsReady(); // 确保 allStockData 可用
    if (typeof XLSX === 'undefined') {
        console.error("XLSX library is not loaded!");
        alert("错误：Excel处理库未加载，无法生成文件。");
        throw new Error("XLSX library not loaded.");
    }
    const wb = XLSX.utils.book_new();
    const timestamp = getLocalTimestamp();

    const createSheetData = (portfolioArray, portfolioTitleForColumn) => {
        if (!Array.isArray(portfolioArray)) {
            console.warn(`提供的 portfolioArray 不是数组:`, portfolioArray, `标题: ${portfolioTitleForColumn}`);
            return [];
        }
        return portfolioArray.map(item => ({
            "组合名称": portfolioTitleForColumn,
            "股票代码": item.code,
            "股票名称": item.name,
            "配置比例 (%)": item.allocation !== undefined ? item.allocation : item.userAllocation,
            "修改时间": timestamp,
            // 如果是我的投资组合，可以额外添加来源和建议比例
            ...(item.userAllocation !== undefined && { // 仅为我的投资组合添加
                "来源": item.source || '',
                "建议比例 (%)": item.suggestedAllocation || 0
            })
        }));
    };
    
    const myPortfolioHeader = ["组合名称", "股票代码", "股票名称", "来源", "建议比例 (%)", "配置比例 (%)", "修改时间"];
    const agentPortfolioHeader = ["组合名称", "股票代码", "股票名称", "配置比例 (%)", "修改时间"];


    // 1. 大智投资组合
    const agent1PortfolioName = `${agents.agent1.name} (${agents.agent1.role})`;
    const agent1SheetData = createSheetData(agents.agent1.portfolio, agent1PortfolioName);
    const ws1 = XLSX.utils.json_to_sheet(agent1SheetData, {header: agentPortfolioHeader});
    XLSX.utils.book_append_sheet(wb, ws1, "大智投资组合");

    // 2. 大成投资组合
    const agent2PortfolioName = `${agents.agent2.name} (${agents.agent2.role})`;
    const agent2SheetData = createSheetData(agents.agent2.portfolio, agent2PortfolioName);
    const ws2 = XLSX.utils.json_to_sheet(agent2SheetData, {header: agentPortfolioHeader});
    XLSX.utils.book_append_sheet(wb, ws2, "大成投资组合");

    // 3. 我的投资组合
    const myPortfolioSheetData = createSheetData(myPortfolio, myPortfolioTitle);
    const ws3 = XLSX.utils.json_to_sheet(myPortfolioSheetData, {header: myPortfolioHeader});
    XLSX.utils.book_append_sheet(wb, ws3, "我的投资组合");

    const excelArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    return excelArrayBuffer;
}

async function applyCloudPortfolioData(excelArrayBuffer) {
    await ensureStockDataIsReady();
    if (typeof XLSX === 'undefined') {
        console.error("XLSX library is not loaded!");
        alert("错误：Excel处理库未加载，无法解析文件。");
        throw new Error("XLSX library not loaded.");
    }
    try {
        const wb = XLSX.read(excelArrayBuffer, { type: 'array' });

        const parseSheet = (sheetName, targetPortfolio, isMyPortfolio = false) => {
            const ws = wb.Sheets[sheetName];
            if (!ws) {
                console.warn(`Excel中未找到名为 "${sheetName}" 的工作表。`);
                return false;
            }
            const jsonData = XLSX.utils.sheet_to_json(ws);
            if (jsonData.length > 0) {
                targetPortfolio.length = 0;
                let portfolioTitleFromSheet = "";

                jsonData.forEach(row => {
                    const stockCode = String(row["股票代码"] || "").trim();
                    let stockName = String(row["股票名称"] || "").trim();
                    const allocationStr = String(row["配置比例 (%)"] || "0");
                    const allocation = parseFloat(allocationStr.replace('%',''));


                    if (!stockCode || isNaN(allocation)) {
                        console.warn(`跳过无效行 (代码: ${stockCode}, 原始比例: '${allocationStr}') in sheet ${sheetName}`);
                        return;
                    }

                    if (allStockData && allStockData[stockCode] && allStockData[stockCode].name) {
                        stockName = allStockData[stockCode].name;
                    } else if (!stockName && stockCode) { // 如果Excel没名，代码有效，尝试从allStockData补
                        stockName = allStockData[stockCode] ? allStockData[stockCode].name : "未知股票";
                    } else if (!stockName && !stockCode) { //都没名没代码
                        console.warn(`跳过无效行 (无代码无名称) in sheet ${sheetName}`);
                        return;
                    }


                    const portfolioItem = { code: stockCode, name: stockName };
                    if (isMyPortfolio) {
                        portfolioItem.userAllocation = allocation;
                        portfolioItem.source = String(row["来源"] || ""); // 确保是字符串
                        const suggestedAllocStr = String(row["建议比例 (%)"] || "0");
                        portfolioItem.suggestedAllocation = parseFloat(suggestedAllocStr.replace('%','')) || 0;
                    } else {
                        portfolioItem.allocation = allocation;
                    }
                    targetPortfolio.push(portfolioItem);

                    if (isMyPortfolio && row["组合名称"] && !portfolioTitleFromSheet) {
                         portfolioTitleFromSheet = String(row["组合名称"]).trim();
                    }
                });
                if (isMyPortfolio && portfolioTitleFromSheet) {
                    myPortfolioTitle = portfolioTitleFromSheet;
                    const portfolioTitleEl = document.getElementById("myPortfolioTitleText");
                    if (portfolioTitleEl) portfolioTitleEl.textContent = myPortfolioTitle;
                }
                return true;
            }
            return false;
        };

        let agent1Updated = parseSheet("大智投资组合", agents.agent1.portfolio);
        let agent2Updated = parseSheet("大成投资组合", agents.agent2.portfolio);
        let myPortUpdated = parseSheet("我的投资组合", myPortfolio, true);

        renderAgentPortfolio('agent1');
        renderAgentPortfolio('agent2');
        renderMyPortfolio();

        saveAgentData();
        saveMyPortfolio();
            
        if (agent1Updated || agent2Updated || myPortUpdated) {
            console.log("云端数据已应用。");
            // alert("云端投资组合数据已成功加载并应用到页面。"); // 可选的用户提示
        } else {
            console.log("云端Excel文件为空或格式不符，未应用任何数据。");
        }
    } catch (error) {
        console.error("解析并应用云端Excel数据时出错:", error);
        alert("解析云端Excel文件失败，请检查文件格式。");
    }
}
