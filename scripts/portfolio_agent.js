// scripts/portfolio_agent.js

const InvestmentAgentValueStyleName = "稳健智远";
const InvestmentAgentGrowthStyleName = "锐进先锋";
const DEFAULT_MY_PORTFOLIO_TITLE = "我的投资组合";
const LOCAL_STORAGE_KEY_ALL_PORTFOLIOS = 'aipeAllPortfolios_R2_v1';
const SAVE_PORTFOLIO_FUNCTION_URL = '/save-portfolio';
const LOAD_PORTFOLIO_FUNCTION_URL = '/load-portfolio';
const LOCAL_STORAGE_KEY_AGENT_STOCK_POOLS = 'aipeAgentStockPools_v1';


// Agent data structure
let agents = {
    agent1: {
        id: 'agent1', name: "大智", portfolioName: InvestmentAgentValueStyleName + "投资组合", role: InvestmentAgentValueStyleName, photo: "images/female_avatar.png",
        stockPoolList: [], portfolio: [], latestReport: "",
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
        id: 'agent2', name: "大成", portfolioName: InvestmentAgentGrowthStyleName + "投资组合", role: InvestmentAgentGrowthStyleName, photo: "images/male_avatar.png",
        stockPoolList: [], portfolio: [], latestReport: "",
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
let myPortfolioData = { portfolioName: DEFAULT_MY_PORTFOLIO_TITLE, portfolio: [] };
let apiSettings = { endpoint: '', key: '', model: '' };
let performanceChartInstance = null;
let currentBacktestTarget = null;

// API Settings Model/Endpoint Configuration (as provided before)
const endpointModelMap = { /* ... */ };
const modelDisplayStrings = { /* ... */ };


// --- Data Readiness Management ---
let isPortfolioSystemReady = false; // Flag indicating if allStockData (Excel) is loaded

async function ensureStockDataIsReady() {
    if (isPortfolioSystemReady) return true; // Quick exit if already marked ready

    if (typeof allStockData !== 'undefined' && Object.keys(allStockData).length > 0) {
        console.log("ensureStockDataIsReady: allStockData was already populated.");
        isPortfolioSystemReady = true; // Mark as ready
        return true;
    }

    if (window.allStockDataGlobalPromise) {
        console.log("ensureStockDataIsReady: Waiting for allStockDataGlobalPromise to resolve...");
        try {
            await window.allStockDataGlobalPromise;
            console.log("ensureStockDataIsReady: allStockDataGlobalPromise resolved.");
            if (typeof allStockData !== 'undefined' && Object.keys(allStockData).length > 0) {
                isPortfolioSystemReady = true; // Mark as ready
                return true;
            } else {
                console.error("ensureStockDataIsReady: allStockDataGlobalPromise resolved, but allStockData is still empty or undefined.");
                alert("错误：股票基础数据加载后为空。请尝试刷新页面或联系管理员。");
                return false;
            }
        } catch (error) {
            console.error("ensureStockDataIsReady: Error awaiting allStockDataGlobalPromise:", error);
            alert("加载股票基础数据时出错。请尝试刷新页面。");
            return false;
        }
    } else {
        console.warn("ensureStockDataIsReady: allStockDataGlobalPromise not found. This indicates an issue with the Excel data loading flow from potfunddatarender.js or index.html.");
        // Fallback attempt if `loadAndProcessExcelData` is globally available and promise wasn't set
        if (typeof loadAndProcessExcelData === "function" && typeof window.allStockDataGlobalPromise === 'undefined') {
            console.log("ensureStockDataIsReady: Attempting to initiate loadAndProcessExcelData as a fallback.");
            window.allStockDataGlobalPromise = loadAndProcessExcelData(); // This sets the global promise
            return await ensureStockDataIsReady(); // Recurse to await the newly (or re-)set promise
        }
        alert("股票基础数据加载流程似乎未正确启动。请尝试刷新页面。");
        return false;
    }
}

// --- Portfolio Utility Functions ---
function getCurrentLocalTimestamp() {
    const now = new Date();
    const YYYY = now.getFullYear();
    const MM = String(now.getMonth() + 1).padStart(2, '0');
    const DD = String(now.getDate()).padStart(2, '0');
    const HH = String(now.getHours()).padStart(2, '0');
    const MIN = String(now.getMinutes()).padStart(2, '0');
    return `${String(YYYY).slice(-2)}${MM}${DD}${HH}${MIN}`;
}

function debounce(func, delay) {
    let timeout;
    return function(...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}
// Debounced flushable function
function debounceFlushable(func, delay) {
    let timeout;
    let lastArgs;
    let lastThis;

    const execute = () => {
        if (lastArgs) {
            func.apply(lastThis, lastArgs);
            lastArgs = null;
            lastThis = null;
        }
    };

    const debounced = function(...args) {
        lastArgs = args;
        lastThis = this;
        clearTimeout(timeout);
        timeout = setTimeout(execute, delay);
    };

    debounced.flush = () => {
        clearTimeout(timeout);
        execute();
    };
    
    debounced.cancel = () => {
        clearTimeout(timeout);
        lastArgs = null;
        lastThis = null;
    }

    return debounced;
}


let lastKnownR2Timestamp = '';

// --- State Management ---
function getAllPortfoliosState() {
    return {
        agent1Portfolio: { portfolioName: agents.agent1.portfolioName, items: agents.agent1.portfolio },
        agent2Portfolio: { portfolioName: agents.agent2.portfolioName, items: agents.agent2.portfolio },
        myPortfolio: { portfolioName: myPortfolioData.portfolioName, items: myPortfolioData.portfolio },
        agent1StockPool: agents.agent1.stockPoolList,
        agent2StockPool: agents.agent2.stockPoolList,
        timestamp: getCurrentLocalTimestamp()
    };
}

function updateAllPortfoliosFromState(state, source = "unknown") {
    if (!state) return;
    console.log(`Updating portfolios from ${source} with client-side-parsed/generated timestamp: ${state.timestamp}`);

    if (state.agent1Portfolio) {
        agents.agent1.portfolioName = state.agent1Portfolio.portfolioName || (InvestmentAgentValueStyleName + "投资组合");
        agents.agent1.portfolio = state.agent1Portfolio.items || [];
    }
    if (state.agent2Portfolio) {
        agents.agent2.portfolioName = state.agent2Portfolio.portfolioName || (InvestmentAgentGrowthStyleName + "投资组合");
        agents.agent2.portfolio = state.agent2Portfolio.items || [];
    }
    if (state.myPortfolio) {
        myPortfolioData.portfolioName = state.myPortfolio.portfolioName || DEFAULT_MY_PORTFOLIO_TITLE;
        myPortfolioData.portfolio = state.myPortfolio.items || [];
    }
    agents.agent1.stockPoolList = state.agent1StockPool || [];
    agents.agent2.stockPoolList = state.agent2StockPool || [];
    
    if (source.toUpperCase().includes("R2") && state.timestamp) { // If data came from R2, update our known R2 timestamp
        lastKnownR2Timestamp = state.timestamp;
    }
    renderAllPortfolioRelatedUI();
}

function renderAllPortfolioRelatedUI() {
    renderAgentPortfolio('agent1');
    renderAgentPortfolio('agent2');
    renderMyPortfolio();
    renderStockPoolList('agent1');
    renderStockPoolList('agent2');
}

// --- R2 and LocalStorage Interaction ---
const savePortfoliosToR2 = debounceFlushable(async () => { // Use debounceFlushable
    if (!isUserLoggedIn()) return;
    console.log("Attempting to save portfolios to R2...");
    uiShowLoadingPortfolios(true, "正在保存到云端...");
    try {
        const stateToSave = getAllPortfoliosState();
        const response = await fetch(SAVE_PORTFOLIO_FUNCTION_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(stateToSave)
        });
        if (!response.ok) {
            const errData = await response.json().catch(() => ({error: "保存失败，服务器响应无效。"}));
            throw new Error(errData.error || `服务器错误: ${response.status}`);
        }
        const result = await response.json();
        console.log("Save to R2 successful:", result.message);
        lastKnownR2Timestamp = stateToSave.timestamp; // R2 now has this version
        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS, JSON.stringify(stateToSave)); // Sync localStorage
        alert("投资组合已成功保存到云端！");
    } catch (error) {
        console.error("Error saving portfolios to R2:", error);
        alert(`保存投资组合到云端失败: ${error.message}\n您的更改已保存在本地浏览器中。`);
        // Save locally even if R2 fails, so user doesn't lose work
        const stateToSaveLocally = getAllPortfoliosState();
        localStorage.setItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS, JSON.stringify(stateToSaveLocally));
    } finally {
        uiShowLoadingPortfolios(false);
    }
}, 3000); // Debounce R2 save by 3 seconds

async function loadPortfoliosFromR2() {
    if (!isUserLoggedIn()) return null;
    console.log("Attempting to load portfolios from R2...");
    uiShowLoadingPortfolios(true, "正在从云端加载...");
    try {
        const response = await fetch(LOAD_PORTFOLIO_FUNCTION_URL, { method: 'GET' });
        if (response.status === 404) {
            console.log("Portfolio file not found in R2.");
            return null;
        }
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`服务器错误 ${response.status}: ${errText || '无法连接云端存储'}`);
        }
        
        const excelArrayBuffer = await response.arrayBuffer();
        if (!excelArrayBuffer || excelArrayBuffer.byteLength === 0) {
            console.log("Received empty response from R2 load."); return null;
        }
        
        const workbook = XLSX.read(excelArrayBuffer, { type: 'array' });
        const loadedState = {
            agent1Portfolio: { portfolioName: "", items: [] }, agent2Portfolio: { portfolioName: "", items: [] },
            myPortfolio: { portfolioName: "", items: [] }, timestamp: "",
            agent1StockPool: agents.agent1.stockPoolList, agent2StockPool: agents.agent2.stockPoolList
        };

        const parseSheet = (sheetName, targetPortfolio, isMyPortfolio = false) => {
            const worksheet = workbook.Sheets[sheetName];
            if (!worksheet) { console.warn(`Sheet "${sheetName}" not found in R2 Excel.`); return; }
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            if (jsonData.length > 1) {
                const headerInfoRow = jsonData[0];
                let pName = headerInfoRow[0] ? String(headerInfoRow[0]).replace("组合名称：", "").trim() : "";
                if (!pName) { /* fallback names */
                    if (sheetName.includes("大智")) pName = InvestmentAgentValueStyleName + "投资组合";
                    else if (sheetName.includes("大成")) pName = InvestmentAgentGrowthStyleName + "投资组合";
                    else if (sheetName.includes("我的")) pName = DEFAULT_MY_PORTFOLIO_TITLE;
                }
                targetPortfolio.portfolioName = pName;

                const fileTimestamp = headerInfoRow[1] ? String(headerInfoRow[1]).replace("修改时间", "").trim() : "";
                if(fileTimestamp && (!loadedState.timestamp || fileTimestamp > loadedState.timestamp)) {
                    loadedState.timestamp = fileTimestamp;
                }
                const dataRows = jsonData.slice(2); // Actual data from 3rd row
                dataRows.forEach(row => {
                    const code = row[0] ? String(row[0]).trim() : null;
                    const name = row[1] ? String(row[1]).trim() : null;
                    const allocationStr = row[2]; // Config ratio is always 3rd col (index 2) for items
                    const allocation = parseFloat(allocationStr);
                    if (code && name && !isNaN(allocation)) {
                        if (isMyPortfolio) { targetPortfolio.items.push({ code, name, userAllocation: allocation, source: 'R2', suggestedAllocation: 0 });}
                        else { targetPortfolio.items.push({ code, name, allocation }); }
                    }
                });
            }
        };
        parseSheet("大智投资组合", loadedState.agent1Portfolio);
        parseSheet("大成投资组合", loadedState.agent2Portfolio);
        parseSheet("我的投资组合", loadedState.myPortfolio, true);
        
        console.log("Portfolios parsed from R2 Excel:", loadedState);
        if (loadedState.timestamp) lastKnownR2Timestamp = loadedState.timestamp;
        return loadedState;

    } catch (error) {
        console.error("Error loading portfolios from R2:", error);
        alert(`从云端加载投资组合失败: ${error.message}`);
        return null;
    } finally {
        uiShowLoadingPortfolios(false);
    }
}

function loadPortfoliosFromLocalStorage() {
    if (!isUserLoggedIn() && !localStorage.getItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS)) {
        // If not logged in and no local data, don't attempt to parse.
        return null;
    }
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS);
    if (savedState) {
        try { return JSON.parse(savedState); }
        catch (e) { localStorage.removeItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS); return null; }
    }
    return null;
}


// --- Stock Pool Management (Uses ensureStockDataIsReady) ---
async function addStockToPool(agentId) {
    const ready = await ensureStockDataIsReady();
    if (!ready) return;
    
    const agent = agents[agentId];
    const stockInputId = agentId === 'agent1' ? 'agent1StockInput' : 'agent2StockInput';
    const stockInput = document.getElementById(stockInputId);
    if (!stockInput) { console.error(`Stock input ${stockInputId} not found.`); return; }
    const searchTerm = stockInput.value.trim();

    if (searchTerm === "") { alert("请输入股票代码或名称。"); return; }

    const foundStock = findStockInGlobalData(searchTerm);
    if (!foundStock) { alert(`未在股票基础数据中找到 "${searchTerm}"。`); return; }

    if (agent.stockPoolList.find(s => s.code === foundStock.code)) {
        alert(`股票 ${foundStock.name} (${foundStock.code}) 已在 ${agent.name} 的分析池中。`); return;
    }

    agent.stockPoolList.push({ code: foundStock.code, name: foundStock.name });
    stockInput.value = "";
    renderStockPoolList(agentId);
    saveAgentStockPools(); // Save pools locally
}

function removeStockFromPool(agentId, stockCode) {
    agents[agentId].stockPoolList = agents[agentId].stockPoolList.filter(s => s.code !== stockCode);
    renderStockPoolList(agentId);
    saveAgentStockPools();
}

function renderStockPoolList(agentId) {
    const agent = agents[agentId];
    const stockPoolUlId = agentId === 'agent1' ? 'agent1StockPoolList' : 'agent2StockPoolList';
    const stockSelectId = agentId === 'agent1' ? 'agent1StockSelect' : 'agent2StockSelect';
    const addFromPoolSelectId = agentId === 'agent1' ? 'agent1AddFromPoolSelect' : 'agent2AddFromPoolSelect';
    
    const stockPoolUl = document.getElementById(stockPoolUlId);
    const stockSelectForAnalysis = document.getElementById(stockSelectId);
    const addFromPoolSelect = document.getElementById(addFromPoolSelectId);

    if (!stockPoolUl || !stockSelectForAnalysis || !addFromPoolSelect) return;

    stockPoolUl.innerHTML = "";
    stockSelectForAnalysis.innerHTML = '<option value="">--- 从分析池选择 ---</option>';
    addFromPoolSelect.innerHTML = '<option value="">--- 从分析池选择添加到组合 ---</option>';

    agent.stockPoolList.forEach(stock => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${stock.name} (${stock.code})</span> <button class="remove-stock-btn" onclick="removeStockFromPool('${agentId}', '${stock.code}')"><i class="fas fa-trash-alt"></i></button>`;
        stockPoolUl.appendChild(li);
        ['optionForAnalysis', 'optionForPortfolioAdd'].forEach(type => {
            const option = document.createElement('option');
            option.value = type === 'optionForAnalysis' ? `${stock.name} (${stock.code})` : stock.code;
            option.textContent = `${stock.name} (${stock.code})`;
            if (type === 'optionForAnalysis') stockSelectForAnalysis.appendChild(option);
            else addFromPoolSelect.appendChild(option);
        });
    });
}

// --- Stock Analysis (Uses ensureStockDataIsReady) ---
async function analyzeStockForAgent(agentId) {
    const ready = await ensureStockDataIsReady();
    if (!ready) return;

    const agent = agents[agentId];
    const stockSelectId = agentId === 'agent1' ? 'agent1StockSelect' : 'agent2StockSelect';
    const analysisInputId = agentId === 'agent1' ? 'agent1AnalysisInput' : 'agent2AnalysisInput';
    const analysisOutputId = agentId === 'agent1' ? 'agent1AnalysisOutput' : 'agent2AnalysisOutput';

    const stockSelect = document.getElementById(stockSelectId);
    const analysisInput = document.getElementById(analysisInputId);
    const analysisDisplayElement = document.getElementById(analysisOutputId);
    const analysisOutputContainer = analysisDisplayElement ? analysisDisplayElement.parentNode : null;

    let viewReportBtn = document.getElementById(`viewReportBtn_${agentId}`);
    if (viewReportBtn) viewReportBtn.style.display = 'none';
    agent.latestReport = "";

    let stockToAnalyze = analysisInput.value.trim();
    if (stockToAnalyze === "" && stockSelect.value !== "") {
        stockToAnalyze = stockSelect.value;
    }

    if (analysisDisplayElement) {
        analysisDisplayElement.value = analysisDisplayElement.placeholder || "分析结果将在此显示...";
        analysisDisplayElement.style.color = 'var(--text-muted)';
    }
    if (stockToAnalyze === "") { alert("请选择或输入要分析的股票。"); return; }

    if(analysisInput) analysisInput.value = ""; if(stockSelect) stockSelect.value = "";
    if (analysisDisplayElement) analysisDisplayElement.value = "请稍候，准备分析...\n";

    let stockNameForDisplay = stockToAnalyze, stockCodeForData = null;
    const stockNameCodeMatch = stockToAnalyze.match(/(.+?)\s*\((.*?)\)/);
    if (stockNameCodeMatch) {
        stockNameForDisplay = stockNameCodeMatch[1].trim();
        stockCodeForData = stockNameCodeMatch[2].trim().toUpperCase();
    } else {
        const foundStockInfo = findStockInGlobalData(stockToAnalyze); // Uses allStockData
        if (foundStockInfo) {
            stockNameForDisplay = foundStockInfo.name; stockCodeForData = foundStockInfo.code.toUpperCase();
        } else {
            if (analysisDisplayElement) analysisDisplayElement.value += `警告: 未能识别 "${stockToAnalyze}"。量化数据可能无法获取。\n`;
        }
    }
    
    let potScore = "[数据缺失]", totalInflow = "[数据缺失]", quantDataMessage = "";
    if (stockCodeForData && typeof allStockData !== 'undefined' && allStockData[stockCodeForData]) {
        const stockData = allStockData[stockCodeForData];
        potScore = String(stockData.currentPotScore ?? "[无PotScore]");
        totalInflow = String(stockData.totalInflow ?? "[无主力资金]");
        quantDataMessage = `已获取 ${stockNameForDisplay}(${stockCodeForData}) 量化: PotScore=${potScore}, 主力资金=${totalInflow}\n`;
    } else if (stockCodeForData) {
        quantDataMessage = `注意: 无法找到代码 ${stockCodeForData} (${stockNameForDisplay}) 的量化信息。\n`;
    } else {
        quantDataMessage = `注意: 未能识别股票代码，无法获取 ${stockNameForDisplay} 的量化数据。\n`;
    }
    if (analysisDisplayElement) analysisDisplayElement.value += quantDataMessage;

    if (!apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
        if (analysisDisplayElement) { analysisDisplayElement.value += "错误：API未设置。"; analysisDisplayElement.style.color = 'var(--danger-color)';}
        return;
    }
    const prompt = agent.promptTemplate(stockNameForDisplay, potScore, totalInflow);
    if (analysisDisplayElement) analysisDisplayElement.value += `\n正在为 "${stockNameForDisplay}" 生成报告 (模型: ${apiSettings.model})...\n`;

    try {
        // ... (Your existing API call logic using fetch, requestUrl, requestPayload, headers)
        // For brevity, assuming your API call logic is correct.
        // Example (replace with your actual fetch call):
        // const apiResponse = await fetch(...);
        // const responseData = await apiResponse.json();
        // let analysisReportText = parseApiResponse(responseData, apiSettings.endpoint); // You need parseApiResponse

        // Placeholder for API call result
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        let analysisReportText = `对 ${stockNameForDisplay} 的模拟分析报告。\nPotScore: ${potScore}, 主力资金: ${totalInflow}.\n基于 ${agent.name} 的理念... (此处应为真实API响应)`;
        // End placeholder

        agent.latestReport = analysisReportText;
        if (analysisDisplayElement) {
            analysisDisplayElement.value = `AI为“${stockNameForDisplay}”的分析报告已就绪。\n点击下方按钮查看。`;
            analysisDisplayElement.style.color = 'var(--accent-color2)';
            if (!viewReportBtn && analysisOutputContainer) {
                viewReportBtn = document.createElement('button');
                viewReportBtn.id = `viewReportBtn_${agentId}`;
                viewReportBtn.className = 'view-report-btn';
                analysisOutputContainer.appendChild(viewReportBtn);
            }
            if(viewReportBtn) {
                 viewReportBtn.innerHTML = `<i class="fas fa-external-link-alt"></i> 查看完整报告`;
                 viewReportBtn.onclick = function() { openAnalysisReportModal(agentId, stockNameForDisplay); };
                 viewReportBtn.style.display = 'inline-block';
            }
        }
    } catch (error) {
        console.error("analyzeStockForAgent API Call Error:", error);
        agent.latestReport = "";
        if (analysisDisplayElement) {
            analysisDisplayElement.value = `调用AI模型分析出错: ${error.message}`;
            analysisDisplayElement.style.color = 'var(--danger-color)';
        }
    }
}

// --- Modified Portfolio Management UI Functions (Use ensureStockDataIsReady) ---
async function handleAddStockToAgentPortfolioUI(agentId) {
    const ready = await ensureStockDataIsReady();
    if (!ready) return;

    const agent = agents[agentId];
    const inputElementId = agentId === 'agent1' ? 'agent1AddToPortfolioInput' : 'agent2AddToPortfolioInput';
    const inputElement = document.getElementById(inputElementId);
    const searchTerm = inputElement.value.trim();

    if (!searchTerm) { alert("请输入股票代码或名称。"); return; }
    
    const foundStock = findStockInGlobalData(searchTerm);
    if (!foundStock) { alert(`未找到 "${searchTerm}"。`); return; }

    if(addStockToAgentPortfolio(agentId, foundStock.code, foundStock.name)) {
        inputElement.value = "";
    } else {
         alert(`股票 ${foundStock.name} (${foundStock.code}) 已在 ${agent.name} 的投资组合中。`);
    }
}

async function handleAddSelectedStockFromPoolToAgentPortfolioUI(agentId) {
    const ready = await ensureStockDataIsReady(); // Though pool items are already validated, ensureStockDataIsReady is a good check
    if (!ready) return;

    const agent = agents[agentId];
    const selectElementId = agentId === 'agent1' ? 'agent1AddFromPoolSelect' : 'agent2AddFromPoolSelect';
    const selectElement = document.getElementById(selectElementId);
    const selectedStockCode = selectElement.value;

    if (!selectedStockCode) { alert("请从分析池选择股票。"); return; }
    const stockInPool = agent.stockPoolList.find(s => s.code === selectedStockCode);
    if (!stockInPool) { alert("选择的股票未在分析池找到。"); return; }

    if(addStockToAgentPortfolio(agentId, stockInPool.code, stockInPool.name)) {
        selectElement.value = "";
    } else {
        alert(`股票 ${stockInPool.name} (${stockInPool.code}) 已在 ${agent.name} 的投资组合中。`);
    }
}

// --- Agent Portfolio Core Logic (Calls savePortfoliosToR2) ---
function addStockToAgentPortfolio(agentId, stockCode, stockName, allocation = 0) {
    const agent = agents[agentId];
    if (agent.portfolio.find(s => s.code === stockCode)) return false;
    agent.portfolio.push({ code: stockCode, name: stockName, allocation: parseFloat(allocation) || 0 });
    renderAgentPortfolio(agentId);
    savePortfoliosToR2();
    return true;
}
function removeStockFromAgentPortfolio(agentId, stockCode) {
    agents[agentId].portfolio = agents[agentId].portfolio.filter(s => s.code !== stockCode);
    renderAgentPortfolio(agentId);
    savePortfoliosToR2();
}
function updateAgentPortfolioAllocation(agentId, stockCode, newAllocation) {
    const stock = agents[agentId].portfolio.find(s => s.code === stockCode);
    if (stock) {
        stock.allocation = parseFloat(newAllocation) || 0;
        renderAgentPortfolio(agentId); // Re-render to update total and reflect change
        savePortfoliosToR2();
    }
}
function renderAgentPortfolio(agentId) {
    const agent = agents[agentId];
    const portfolioTableId = agentId === 'agent1' ? 'agent1PortfolioTable' : 'agent2PortfolioTable';
    const totalAllocationId = agentId === 'agent1' ? 'agent1PortfolioTotalAllocation' : 'agent2PortfolioTotalAllocation';
    const portfolioNameDisplayClass = agentId === 'agent1' ? 'value-agent-card' : 'growth-agent-card';

    const portfolioTableBody = document.querySelector(`#${portfolioTableId} tbody`);
    const totalAllocationEl = document.getElementById(totalAllocationId);
    const portfolioNameHeader = document.querySelector(`.${portfolioNameDisplayClass} .agent-portfolio-section h4`);

    if (!portfolioTableBody || !totalAllocationEl || !portfolioNameHeader) { return; }
    
    const iconHtml = portfolioNameHeader.querySelector('i') ? portfolioNameHeader.querySelector('i').outerHTML : '<i class="fas fa-briefcase"></i>';
    portfolioNameHeader.innerHTML = `${iconHtml} ${agent.portfolioName}`;

    portfolioTableBody.innerHTML = "";
    let totalAgentAllocation = 0;
    agent.portfolio.forEach(item => {
        const row = portfolioTableBody.insertRow();
        row.innerHTML = `
            <td>${item.name} (${item.code})</td>
            <td><input type="number" value="${item.allocation}" min="0" max="100" step="0.01" oninput="updateAgentPortfolioAllocation('${agentId}', '${item.code}', this.value)">%</td>
            <td><button class="remove-agent-stock-btn" onclick="removeStockFromAgentPortfolio('${agentId}', '${item.code}')"><i class="fas fa-times-circle"></i></button></td>
        `;
        totalAgentAllocation += parseFloat(item.allocation) || 0;
    });
    totalAllocationEl.textContent = `${totalAgentAllocation.toFixed(2)}%`;
    // ... (styling for totalAllocationEl based on sum)
}

// --- My Portfolio Core Logic (Calls savePortfoliosToR2) ---
function syncStocksToMyPortfolio() {
    let changed = false;
    const processAgent = (sourceAgent) => {
        sourceAgent.portfolio.forEach(agentStock => {
            if (agentStock.allocation > 0) {
                let existing = myPortfolioData.portfolio.find(p => p.code === agentStock.code);
                if (!existing) {
                    myPortfolioData.portfolio.push({
                        code: agentStock.code, name: agentStock.name, source: sourceAgent.name,
                        suggestedAllocation: agentStock.allocation, userAllocation: 0
                    });
                    changed = true;
                } else { /* ... (your existing logic for updating source/suggestedAllocation) ... */ }
            }
        });
    };
    processAgent(agents.agent1); processAgent(agents.agent2);
    if (changed) { renderMyPortfolio(); savePortfoliosToR2(); alert("AI组合已同步，请调整您的配置。"); }
    else { alert("无新内容同步。"); }
}
function updateMyPortfolioAllocation(stockCode, newAllocation) {
    const stock = myPortfolioData.portfolio.find(s => s.code === stockCode);
    if (stock) {
        stock.userAllocation = parseFloat(newAllocation) || 0;
        renderMyPortfolio(); savePortfoliosToR2();
    }
}
function removeMyPortfolioItem(stockCode) {
    myPortfolioData.portfolio = myPortfolioData.portfolio.filter(s => s.code !== stockCode);
    renderMyPortfolio(); savePortfoliosToR2();
}
function renderMyPortfolio() {
    const portfolioTableBody = document.querySelector("#myPortfolioTable tbody");
    const totalAllocationEl = document.getElementById("myPortfolioTotalAllocation");
    const portfolioTitleTextEl = document.getElementById('myPortfolioTitleText');
    if (!portfolioTableBody || !totalAllocationEl || !portfolioTitleTextEl) return;
    
    portfolioTitleTextEl.textContent = myPortfolioData.portfolioName;
    portfolioTableBody.innerHTML = "";
    let totalUserAllocation = 0;
    myPortfolioData.portfolio.forEach(item => {
        const row = portfolioTableBody.insertRow();
        const userAlloc = typeof item.userAllocation === 'number' ? item.userAllocation : 0;
        row.innerHTML = `
            <td>${item.name} (${item.code})</td> <td>${item.source || 'N/A'}</td>
            <td>${item.suggestedAllocation || 0}%</td>
            <td><input type="number" value="${userAlloc}" min="0" max="100" step="0.01" oninput="updateMyPortfolioAllocation('${item.code}', this.value)">%</td>
            <td><button class="remove-portfolio-item-btn" onclick="removeMyPortfolioItem('${item.code}')"><i class="fas fa-times-circle"></i></button></td>
        `;
        totalUserAllocation += userAlloc;
    });
    totalAllocationEl.textContent = `${totalUserAllocation.toFixed(2)}%`;
    // ... (styling for totalAllocationEl)
}
function setupMyPortfolioTitleEditing() {
    const portfolioTitleText = document.getElementById('myPortfolioTitleText');
    const editPortfolioTitleBtn = document.getElementById('editMyPortfolioTitleBtn');
    if (portfolioTitleText && editPortfolioTitleBtn) {
        editPortfolioTitleBtn.addEventListener('click', () => {
            const isEditing = portfolioTitleText.contentEditable === 'true';
            if (isEditing) {
                portfolioTitleText.contentEditable = 'false';
                editPortfolioTitleBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                const newTitle = portfolioTitleText.textContent.trim();
                if (newTitle && newTitle !== myPortfolioData.portfolioName) {
                    myPortfolioData.portfolioName = newTitle;
                    savePortfoliosToR2(); // Save on title change
                } else if (!newTitle) { portfolioTitleText.textContent = myPortfolioData.portfolioName; }
            } else { /* ... (logic to enable editing) ... */ }
        });
        // ... (blur and keydown listeners)
    }
}

// Auto Balance
function autoBalancePortfolio(targetId) {
    // ... your existing autoBalancePortfolio logic ...
    if (targetId === 'myPortfolio' || agents[targetId]) {
        savePortfoliosToR2(); // Save to R2 after balancing
    }
}

// --- Initialization ---
async function initializePortfoliosAfterLogin() {
    if (!isUserLoggedIn()) {
        console.log("User not logged in. Portfolio features will use local/defaults.");
        const localData = loadPortfoliosFromLocalStorage();
        if (localData) { updateAllPortfoliosFromState(localData, "localStorage (logged out)"); }
        else { renderAllPortfolioRelatedUI(); } // Render with empty/initial state
        return;
    }

    console.log("User logged in. Initializing portfolios from R2 / localStorage...");
    uiShowLoadingPortfolios(true, "正在初始化组合数据...");

    let r2Data = await loadPortfoliosFromR2(); // This function now handles its own uiShowLoadingPortfolios(false) on completion/error
    const localData = loadPortfoliosFromLocalStorage();
    let dataToApply = null;

    if (r2Data && localData) {
        if (r2Data.timestamp && localData.timestamp) {
            if (r2Data.timestamp >= localData.timestamp) { dataToApply = r2Data; }
            else { dataToApply = localData; /* console.log("Local data is newer, R2 will be updated on next save."); */ }
        } else if (r2Data.timestamp) { dataToApply = r2Data; }
        else { dataToApply = localData; }
    } else if (r2Data) { dataToApply = r2Data; }
    else if (localData) { dataToApply = localData; }
    else { console.log("No data in R2 or localStorage. Using initial defaults."); }

    if (dataToApply) {
        updateAllPortfoliosFromState(dataToApply, dataToApply === r2Data ? "R2" : "localStorage");
        if (dataToApply === r2Data || (dataToApply === localData && (!r2Data || (r2Data.timestamp || "") < (localData.timestamp || "")))) {
             localStorage.setItem(LOCAL_STORAGE_KEY_ALL_PORTFOLIOS, JSON.stringify(dataToApply));
        }
    } else {
        renderAllPortfolioRelatedUI();
    }
    // uiShowLoadingPortfolios(false) is now handled by loadPortfoliosFromR2 or called explicitly if loadPortfoliosFromR2 isn't the last async op.
    if(!r2Data) uiShowLoadingPortfolios(false); // If R2 load didn't happen or failed, ensure loading is hidden.
}

function uiShowLoadingPortfolios(isLoading, message = "处理中...") {
    const loadingIndicator = document.getElementById('portfolioLoadingIndicator');
    if (loadingIndicator) {
        loadingIndicator.textContent = message;
        loadingIndicator.style.display = isLoading ? 'inline' : 'none'; // Assuming inline display is okay
    }
}

// --- Client-side Excel Download & Force Sync ---
function generateClientSideExcelDownload() {
    if (!isUserLoggedIn()) { alert("请先登录GitHub。"); return; }
    const wb = XLSX.utils.book_new();
    const clientState = getAllPortfoliosState();
    const timestamp = clientState.timestamp;

    const createSheetData = (portfolioItems, portfolioName) => {
        const sheetData = portfolioItems.map(item => ({
            "股票代码": item.code, "股票名称": item.name,
            "配置比例 (%)": item.allocation !== undefined ? item.allocation : item.userAllocation
        }));
        sheetData.unshift({ "组合名称：": portfolioName, "修改时间": timestamp });
        return sheetData;
    };

    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(createSheetData(clientState.agent1Portfolio.items, clientState.agent1Portfolio.portfolioName)), "大智投资组合");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(createSheetData(clientState.agent2Portfolio.items, clientState.agent2Portfolio.portfolioName)), "大成投资组合");
    XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(createSheetData(clientState.myPortfolio.items, clientState.myPortfolio.portfolioName)), "我的投资组合");
    
    XLSX.writeFile(wb, `AIPEPortfolio_local_${timestamp}.xlsx`);
}

async function forceSyncToR2() {
    if (!isUserLoggedIn()) { alert("请先登录。"); return; }
    if (confirm("确定要将当前的本地组合数据强制保存到云端吗？")) {
        savePortfoliosToR2.flush(); // Execute the debounced function immediately
    }
}

// --- Stock Pool Local Storage (separate from main portfolio R2 sync) ---
function saveAgentStockPools() {
    if(!isUserLoggedIn() && Object.keys(agents.agent1.stockPoolList).length === 0 && Object.keys(agents.agent2.stockPoolList).length === 0) return; // Don't save empty if not logged in
    const pools = { agent1: agents.agent1.stockPoolList, agent2: agents.agent2.stockPoolList };
    localStorage.setItem(LOCAL_STORAGE_KEY_AGENT_STOCK_POOLS, JSON.stringify(pools));
}
function loadAgentStockPools() {
    // Stock pools can be loaded regardless of login for now, or you can tie it to login
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_AGENT_STOCK_POOLS);
    if(saved) {
        const pools = JSON.parse(saved);
        agents.agent1.stockPoolList = pools.agent1 || [];
        agents.agent2.stockPoolList = pools.agent2 || [];
    } // else they remain empty arrays as initialized
    renderStockPoolList('agent1');
    renderStockPoolList('agent2');
}

// Helper: isUserLoggedIn
function isUserLoggedIn() { return !!localStorage.getItem('github_access_token'); }

// --- API Settings Modal and other UI functions (assumed from previous versions) ---
function openApiSettingsModal() { /* ... */ } function closeApiSettingsModal() { /* ... */ }
function loadApiSettings() { /* ... */ } function saveApiSettings() { /* ... */ } function clearApiSettings() { /* ... */ }
function openPerformanceModal(target) { /* ... */ } function closePerformanceModal() { /* ... */ } function runBacktest() { /* ... */ }
function openAnalysisReportModal(agentId, stockName) { /* ... */ } function closeAnalysisReportModal() { /* ... */ } function copyAnalysisReportToClipboard() { /* ... */ }
function findStockInGlobalData(searchTerm) { // Copied from previous for completeness
    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
        console.warn("findStockInGlobalData: allStockData is not available or empty."); return null;
    }
    let foundStock = null; const upperSearchTerm = searchTerm.toUpperCase();
    const stockMatch = searchTerm.match(/(.+?)\s*\((.*?)\)/);
    if (stockMatch && stockMatch[1] && stockMatch[2]) {
        const codeFromInput = stockMatch[2].trim().toUpperCase();
        const nameFromInput = stockMatch[1].trim();
        if (allStockData[codeFromInput] && allStockData[codeFromInput].name.toLowerCase().includes(nameFromInput.toLowerCase())) {
             return { code: codeFromInput, name: allStockData[codeFromInput].name };
        }
    }
    if (allStockData[searchTerm]) { return { code: searchTerm, name: allStockData[searchTerm].name }; }
    if (allStockData[upperSearchTerm]) { return { code: upperSearchTerm, name: allStockData[upperSearchTerm].name };}
    const searchTermLower = searchTerm.toLowerCase();
    for (const code in allStockData) {
        if (allStockData[code].name && allStockData[code].name.toLowerCase().includes(searchTermLower)) {
            foundStock = { code: code, name: allStockData[code].name }; break;
        }
    }
    return foundStock;
}
function openMainTab(evt, tabName) { /* standard tab logic */
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("main-tab-content");
    for (i = 0; i < tabcontent.length; i++) { tabcontent[i].style.display = "none"; tabcontent[i].classList.remove("active"); }
    tablinks = document.getElementsByClassName("tab-link-main");
    for (i = 0; i < tablinks.length; i++) { tablinks[i].classList.remove("active"); }
    const currentTab = document.getElementById(tabName);
    if (currentTab) { currentTab.style.display = "block"; currentTab.classList.add("active"); }
    if (evt && evt.currentTarget) evt.currentTarget.classList.add("active");
}


// DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    console.log("portfolio_agent.js: DOMContentLoaded.");
    // Setup UI elements that don't depend on async data first
    document.getElementById('agent1NameDisplay').textContent = agents.agent1.name;
    document.getElementById('agent1RoleDisplay').textContent = agents.agent1.role;
    document.getElementById('agent1Logic').textContent = agents.agent1.coreLogic;
    if(document.getElementById('agent1Photo')) document.getElementById('agent1Photo').src = agents.agent1.photo;

    document.getElementById('agent2NameDisplay').textContent = agents.agent2.name;
    document.getElementById('agent2RoleDisplay').textContent = agents.agent2.role;
    document.getElementById('agent2Logic').textContent = agents.agent2.coreLogic;
    if(document.getElementById('agent2Photo')) document.getElementById('agent2Photo').src = agents.agent2.photo;
    
    const agent1AnalysisOutput = document.getElementById('agent1AnalysisOutput');
    if (agent1AnalysisOutput) agent1AnalysisOutput.value = agent1AnalysisOutput.placeholder;
    const agent2AnalysisOutput = document.getElementById('agent2AnalysisOutput');
    if (agent2AnalysisOutput) agent2AnalysisOutput.value = agent2AnalysisOutput.placeholder;

    loadApiSettings();
    setupMyPortfolioTitleEditing();
    loadAgentStockPools(); // Load locally stored stock pools

    document.querySelector('.tab-link-main').click(); // Open default tab

    const balanceUserPortfolioBtn = document.getElementById('balancePortfolioBtn');
    if (balanceUserPortfolioBtn) balanceUserPortfolioBtn.addEventListener('click', () => autoBalancePortfolio('myPortfolio'));
    document.querySelectorAll('.balance-agent-portfolio-btn').forEach(button => {
        button.addEventListener('click', function() { autoBalancePortfolio(this.dataset.agentid); });
    });

    const today = new Date();
    const oneYearAgo = new Date(new Date().setFullYear(today.getFullYear() - 1));
    if(document.getElementById('backtestEndDate')) document.getElementById('backtestEndDate').valueAsDate = today;
    if(document.getElementById('backtestStartDate')) document.getElementById('backtestStartDate').valueAsDate = oneYearAgo;

    // `initializePortfoliosAfterLogin` will be called from index.html's `updateAuthUI` or `displayLoggedInUser`
    // after the login status is determined and after the core Excel data for `allStockData` is ready.
    // If testing this file standalone, you might uncomment a direct call for testing:
    // await ensureStockDataIsReady(); // Make sure excel for validation is ready
    // initializePortfoliosAfterLogin(); // Then init portfolio data
});
