// scripts/portfolio_agent2.js

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
async function saveReportChanges(button) {
    // --- 1. 初始检查和获取数据 ---
    if (currentAgentIdForReport === null) {
        alert('保存失败：无法确定当前报告属于哪个智能体。');
        return;
    }

    const modalBody = document.getElementById('analysisReportModalBody');
    const updatedReport = modalBody.innerText; // 使用 .innerText 保留换行

    // --- 2. UI反馈：禁用按钮，显示加载状态 ---
    const originalButtonHtml = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 保存中...';

    try {
        // --- 3. 本地数据更新 (立即执行) ---
        // 这一步先执行，确保即时上传失败，用户的编辑内容也已在前端“暂存”
        agents[currentAgentIdForReport].latestReport = updatedReport;
        originalReportContent = updatedReport;
        console.log(`Agent ${currentAgentIdForReport} 的报告已在本地更新。`);

        // --- 4. 准备OSS上传所需信息 ---
        // 4.1. 格式化当前日期为 YYYY-MM-DD
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份从0开始，需要+1，并补零
        const day = String(today.getDate()).padStart(2, '0'); // 补零
        const formattedDate = `${year}-${month}-${day}`;

        // 4.2. 构建OSS文件路径 (Key)，后缀改为 .md
        // 假设 currentStockNameForReport 是一个在当前作用域可访问的全局变量
        const OSS_FILE_KEY = `deepreport/${currentStockNameForReport}_${formattedDate}.md`;
        
        console.log(`准备上传到OSS，文件路径为: ${OSS_FILE_KEY}`);

        // --- 5. 创建文件内容 (Blob) ---
        // 直接从报告文本字符串创建一个 Blob 对象。
        // 指定类型为 'text/markdown'，并设置编码为 'utf-8' 以正确处理中文字符。
        const fileBlob = new Blob([updatedReport], { type: 'text/markdown;charset=utf-8' });

        // --- 6. 执行OSS上传 ---
        console.log("正在获取OSS客户端...");
        const client = await getOSSClient(); // 调用您提供的函数获取OSS客户端实例

        console.log("开始上传文件到OSS...");
        // 使用 client.put(name, file) 方法上传
        const result = await client.put(OSS_FILE_KEY, fileBlob);
        console.log("文件上传成功!", result);

        // --- 7. 最终成功提示 ---
        alert('修改已成功保存，并已作为Markdown文件上传至云端！');

    } catch (error) {
        // --- 错误处理 ---
        console.error("保存或上传过程中发生错误:", error);
        // 提供一个更详细的错误提示，告知用户本地保存成功但上传失败
        alert(`报告内容已在本地成功保存，但上传到云端失败。\n\n错误详情: ${error.message}`);
    } finally {
        // --- UI还原：无论成功或失败，都恢复按钮状态 ---
        button.disabled = false;
        button.innerHTML = originalButtonHtml;
    }
    
    // 根据原代码要求，保存后不关闭模态框
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
 * 启动对当前报告的深度分析和搜索。
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
        alert("无法执行深度分析：缺少智能体或股票信息。");
        return;
    }
    
    // 验证 API 设置是否存在
    if (!apiSettings || !apiSettings.endpoint || !apiSettings.key || !apiSettings.model) {
        alert("API设置不完整，无法执行深度分析。请先在设置中配置。");
        return;
    }

    const agent = agents[agentId];
    const modal = document.getElementById('analysisReportModal');
    const modalBody = document.getElementById('analysisReportModalBody');
    const allButtons = modal.querySelectorAll('button');
    const originalContentBeforeSearch = modalBody.innerText; // 保存当前内容以备失败时恢复
    const today = new Date();
	
    //console.log(`deepSearchReport:agent.latestPrompt=${agent.latestPrompt}`)
    let foundStockCode = null;
    for (let stockCodeForData in allStockData) {
	if (allStockData[stockCodeForData].name === stockName) {
		foundStockCode = stockCodeForData;
		break;
	}
    }

    if (foundStockCode == null)	{
	for (let stockCodeForData in HKallStockData) {
		if (HKallStockData[stockCodeForData].name === stockName) {
			foundStockCode = stockCodeForData;
			break;
		 }
	 }
    }

    if (foundStockCode == null)	{
	for (let stockCodeForData in ETFallStockData) {
		if (ETFallStockData[stockCodeForData].name === stockName) {
			foundStockCode = stockCodeForData;
			break;
		 }
	 }
    }

    if (foundStockCode == null)	{
	for (let stockCodeForData in USallStockData) {
		if (USallStockData[stockCodeForData].name === stockName) {
			foundStockCode = stockCodeForData;
			break;
		 }
	 }
    }

    let potScore = "[数据缺失]";
    let totalInflow = "[数据缺失]";	
    let quantDataMessage = ''
    console.log(foundStockCode, stockName); // 输出代码
    if (typeof allStockData === 'undefined' || Object.keys(allStockData).length === 0) {
	quantDataMessage = "注意: 股票基础数据 (allStockData) 未完全加载，无法获取量化指标。\n";
    } else if (foundStockCode && allStockData[foundStockCode]) {
	const stockData = allStockData[foundStockCode];
	potScore = stockData.currentPotScore !== undefined ? String(stockData.currentPotScore) : "[无PotScore数据]";
	totalInflow = stockData.totalInflow !== undefined ? String(stockData.totalInflow) : "[无主力资金数据]";
	quantDataMessage = `已获取 ${stockName}(${foundStockCode}) 的量化数据: PotScore=${potScore}, 主力资金流入=${totalInflow}\n`;
    } else if (foundStockCode) {
	quantDataMessage = `注意: 无法在已加载的股票基础数据中找到代码 ${foundStockCode} (${stockName}) 的量化信息。\n`;
    } else {
	quantDataMessage = `注意: 由于未能识别股票代码，无法获取 ${stockName} 的量化数据。\n`;
    }

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

3.  **量化因子**: 针对 **${stockName}**，其当前的标的动能(PotScore)为 ${potScore}，(PotScore)是专有算法推理而来，不同于传统动能指标，大于零表明动能正向反之动能不足，近5日主力资金总净流入占比为 ${totalInflow}。请将这些量化数据融入你的分析中，评估它们如何支持或挑战你的价值判断。

4.  **整合与报告**：
    *   **撰写报告**：将搜索到的新信息与你的前期分析进行整合，生成一份逻辑严密、更具时效性的最终深度分析报告。
    *   **报告结构**：包括两部分，第一部分：投资逻辑深入分析。清晰的从第一性原理出发的底层投资逻辑分析。第二部分：季度动态深入分析（括号里标明开始时间~结束时间，结束时间就是当前最新时间，跨度为3个月），如果对投资逻辑有更新，也需要同步更新第一部分分析内容。
    *   **关键要求**：报告中必须明确指出：
    	*   针对第一部分：投资逻辑深入分析 无论前期是否分析过，每次输出都要是完整的投资逻辑，第一性原理出发的底层投资逻辑要在报告里完整说明，不要只输出更新部分或者验证部分，切记！
        *   哪些初步判断得到了新信息的【验证】。
        *   哪些判断因新信息而需要【修正或补充】。
        *   有哪些是基于新信息的【全新发现】。
        *   标的最新季度【经营业绩预测】，围绕核心经营指标，环比同比预测对比。
        *   标的具体配置建议。
        *   分析报告要深刻、抓住本质，入目三分，为后续标的持续动态分析打下坚实基础。



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
	modalBody.innerText =    quantDataMessage
        // 3a. 进入加载状态：更新UI并禁用所有按钮
        modalBody.innerText = modalBody.innerText + `\n正在使用模型: ${apiSettings.model} 进行深度搜索...\n\n这将需要一些时间，请耐心等待。\n(联网搜索和深度分析通常需要 30-90 秒)`;
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

async function generatePortfolioExcelBlob(existingWorkbook) {
    await ensureStockDataIsReady(); // 确保 allStockData 可用
    if (typeof XLSX === 'undefined') {
        console.error("XLSX library is not loaded!");
        alert("错误：Excel处理库未加载，无法生成文件。");
        throw new Error("XLSX library not loaded.");
    }

    const wb = existingWorkbook || XLSX.utils.book_new();
    const timestamp = getLocalTimestamp();

    // createSheetData 函数保持不变，它生成对象的方式没有问题
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
            ...(item.userAllocation !== undefined && {
                "来源": item.source || '',
                "建议比例 (%)": item.suggestedAllocation || 0
            })
        }));
    };

    const myPortfolioHeader = ["组合名称", "股票代码", "股票名称", "来源", "建议比例 (%)", "配置比例 (%)", "修改时间"];
    const agentPortfolioHeader = ["组合名称", "股票代码", "股票名称", "配置比例 (%)", "修改时间"];

    // --- 核心修改点：修改 appendDataToSheet 函数 ---
    const appendDataToSheet = (workbook, sheetName, data, header) => {
        const ws = workbook.Sheets[sheetName];

        if (ws) {
            // --- 如果工作表已存在，则追加数据 ---
            // 1. 将对象数组 (data) 转换为 数组的数组 (dataAsArrayOfArrays)
            //    确保数据顺序与 header 顺序严格一致
            const dataAsArrayOfArrays = data.map(rowObject => 
                header.map(h => rowObject[h] !== undefined ? rowObject[h] : null) // 使用 null 或 '' 作为默认值
            );

            // 2. 使用 sheet_add_aoa 来追加数据，它按数组顺序添加，非常可靠
            XLSX.utils.sheet_add_aoa(ws, dataAsArrayOfArrays, { origin: -1 });
            console.log(`向现有Sheet "${sheetName}" 中追加了 ${data.length} 行数据。`);
        } else {
            // --- 如果工作表不存在，创建新表 ---
            // 首次创建时，使用 json_to_sheet 并传入 header 来保证顺序
            const newWs = XLSX.utils.json_to_sheet(data, { header: header });
            XLSX.utils.book_append_sheet(workbook, newWs, sheetName);
            console.log(`创建了新的Sheet "${sheetName}" 并添加了 ${data.length} 行数据。`);
        }
    };

    // 1. 大智投资组合 (调用方式不变)
    const agent1PortfolioName = `${agents.agent1.name} (${agents.agent1.role})`;
    const agent1SheetData = createSheetData(agents.agent1.portfolio, agent1PortfolioName);
    appendDataToSheet(wb, "大智投资组合", agent1SheetData, agentPortfolioHeader);

    // 2. 大成投资组合 (调用方式不变)
    const agent2PortfolioName = `${agents.agent2.name} (${agents.agent2.role})`;
    const agent2SheetData = createSheetData(agents.agent2.portfolio, agent2PortfolioName);
    appendDataToSheet(wb, "大成投资组合", agent2SheetData, agentPortfolioHeader);

    // 3. 我的投资组合 (调用方式不变)
    const myPortfolioSheetData = createSheetData(myPortfolio, myPortfolioTitle);
    appendDataToSheet(wb, "我的投资组合", myPortfolioSheetData, myPortfolioHeader);

    // 将最终的工作簿转换为 ArrayBuffer 并返回
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
