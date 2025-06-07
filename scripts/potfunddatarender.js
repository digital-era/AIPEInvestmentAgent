// scripts/potfunddatarender.js

let allStockData = {};
let HKallStockData = {};
let ETFallStockData = {};
let defaultStockCode = '';
let top20TotalInflowStocks = []; // For "Top20 5日总净流入占比"
let top20ContinuousInflowStocks = []; // For "Top20 5日持续净流入占比"
let top20ReboundFactorStocks = []; // For "Top20 5日反弹因子"

// --- SheetJS (xlsx) library is expected to be loaded in index.html ---

function formatDate(dateInput) {
    if (!dateInput) return '';
    let dateObj;
    if (dateInput instanceof Date) {
        dateObj = dateInput;
    } else if (typeof dateInput === 'number') {
        dateObj = XLSX.SSF.parse_date_code(dateInput); // Use SheetJS date parsing
        if (dateObj) {
            return `${dateObj.y}-${String(dateObj.m).padStart(2, '0')}-${String(dateObj.d).padStart(2, '0')}`;
        }
    } else if (typeof dateInput === 'string') {
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateInput)) return dateInput;
        // Try to parse if it's a common format, but be careful not to break already good strings
        const parsed = new Date(dateInput);
        if (parsed && !isNaN(parsed.valueOf())) dateObj = parsed;
    }

    if (dateObj && !isNaN(dateObj.valueOf())) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    // Fallback for already formatted strings or unparseable that might still be valid (e.g. yyyy/mm/dd)
    const parts = String(dateInput).split(/[-/.\s]/);
     if (parts.length === 3 && !isNaN(parseInt(parts[0])) && !isNaN(parseInt(parts[1])) && !isNaN(parseInt(parts[2]))) {
        let year, month, day;
        if (parseInt(parts[0]) > 1000) { year = parts[0]; month = parts[1]; day = parts[2]; }
        else if (parseInt(parts[2]) > 1000) { year = parts[2]; month = parts[0]; day = parts[1];}
        if (year && month && day) return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }
    return String(dateInput);
}

/**
 * Processes a sheet to get the top N unique stocks.
 * @param {Array} jsonData - Data from XLSX.utils.sheet_to_json
 * @param {number} count - Number of unique stocks to get (e.g., 20)
 * @returns {Array} - Array of { code, name } objects
 */
function getTopNUniqueStocks(jsonData, count) {
    const uniqueStocks = [];
    const seenCodes = new Set();
    for (const row of jsonData) {
        if (uniqueStocks.length >= count) break;
        const stockCode = String(row['代码'] || row['代码']).trim(); 
        const stockName = String(row['名称'] || row['名称'] || 'N/A');

        if (stockCode && stockCode !== 'undefined' && !seenCodes.has(stockCode)) {
            uniqueStocks.push({ code: stockCode, name: stockName });
            seenCodes.add(stockCode);
        }
    }
    return uniqueStocks;
}


async function loadAndProcessExcelData() {
    console.log("loadAndProcessExcelData called"); 
    if (window.isExcelDataLoading) {
        console.log("Excel data is already being loaded. Awaiting existing promise.");
        return window.allStockDataGlobalPromise; 
    }
    window.isExcelDataLoading = true;


    let excelFilePath = 'data/AIPEFinanceData.xlsx'; 
    let valReturn = false;
    try {
        const response = await fetch(excelFilePath);
        if (!response.ok) throw new Error(`Failed to fetch Excel file: ${response.statusText} (URL: ${excelFilePath})`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

        const flow5DaysSortSheetName = "Flow5DaysSort";
        const flow5DaysSortSheet = workbook.Sheets[flow5DaysSortSheetName];
        if (!flow5DaysSortSheet) throw new Error(`Sheet "${flow5DaysSortSheetName}" not found.`);
        const flow5DaysSortJsonData = XLSX.utils.sheet_to_json(flow5DaysSortSheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        if (flow5DaysSortJsonData.length === 0) throw new Error(`Sheet "${flow5DaysSortSheetName}" is empty.`);
        
        // Populate top20TotalInflowStocks (assumes sheet might be pre-sorted or we take first unique ones)
        top20TotalInflowStocks = getTopNUniqueStocks(flow5DaysSortJsonData, 20);

        // Populate top20ReboundFactorStocks
        const reboundFactorColumnName = '反弹因子_5日总和';
        const dataForReboundSort = [...flow5DaysSortJsonData].filter(row => row[reboundFactorColumnName] !== undefined && row[reboundFactorColumnName] !== null);

        dataForReboundSort.sort((a, b) => {
            const valAStr = String(a[reboundFactorColumnName]).replace('%', '');
            const valBStr = String(b[reboundFactorColumnName]).replace('%', '');
            
            const valA = parseFloat(valAStr);
            const valB = parseFloat(valBStr);

            if (isNaN(valA) && isNaN(valB)) return 0;
            if (isNaN(valA)) return 1; // NaNs last
            if (isNaN(valB)) return -1; // NaNs last

            return valB - valA; // Descending order
        });
        top20ReboundFactorStocks = getTopNUniqueStocks(dataForReboundSort, 20);


        const groupedByStockCode = {};
        flow5DaysSortJsonData.forEach(row => {
            let stockCode = String(row['代码']).trim();
            if (!stockCode || stockCode === 'undefined') return;
            if (!groupedByStockCode[stockCode]) groupedByStockCode[stockCode] = [];
            groupedByStockCode[stockCode].push(row);
        });

        if (Object.keys(groupedByStockCode).length === 0) throw new Error("No valid stock data from 'Flow5DaysSort'.");

        let firstCodeProcessed = false;
        allStockData = {}; 

        for (const stockCode in groupedByStockCode) {
            if (!firstCodeProcessed && stockCode !== "ERROR") { 
                defaultStockCode = stockCode; 
                firstCodeProcessed = true;
            }
            const stockEntries = groupedByStockCode[stockCode];
            stockEntries.sort((a, b) => new Date(formatDate(b['日期'])).getTime() - new Date(formatDate(a['日期'])).getTime());
            
            const latestEntry = stockEntries[0];
            if (!latestEntry) {
                console.warn(`No entries found for stock code ${stockCode} after grouping in Flow5DaysSort.`);
                continue;
            }
            
            const dailyDataForStock = stockEntries.slice(0, 5).map(entry => ({
                date: formatDate(entry['日期']),
                potScore: String(entry['PotScore'] ?? '0'), 
                superLargeInflow: String(entry['超大单净流入-净占比'] ?? '0%'),
                largeInflow: String(entry['大单净流入-净占比'] ?? '0%'),
                change: String(entry['涨跌幅'] ?? '0%'),
                price: parseFloat(entry['收盘价'] ?? 0)
            }));

            allStockData[stockCode] = {
                name: String(latestEntry['名称'] ?? 'N/A'),
                totalInflow: String(latestEntry['总净流入占比_5日总和'] ?? '0%'), 
                currentPotScore: String(latestEntry['PotScore'] ?? '0'), 
                latestDate: formatDate(latestEntry['日期']),
                dailyData: dailyDataForStock
            };
        }

        const flow5DaysPositiveSheetName = "Flow5DaysPositive";
        const flow5DaysPositiveSheet = workbook.Sheets[flow5DaysPositiveSheetName];
        if (flow5DaysPositiveSheet) {
            const flow5DaysPositiveJsonData = XLSX.utils.sheet_to_json(flow5DaysPositiveSheet, { raw: false, dateNF: 'yyyy-mm-dd' });
            if (flow5DaysPositiveJsonData.length > 0) {
                top20ContinuousInflowStocks = getTopNUniqueStocks(flow5DaysPositiveJsonData, 20);
            } else {
                console.warn(`Sheet "${flow5DaysPositiveSheetName}" is empty.`);
                top20ContinuousInflowStocks = [];
            }
        } else {
            console.warn(`Sheet "${flow5DaysPositiveSheetName}" not found. Continuous inflow dropdown will be empty.`);
            top20ContinuousInflowStocks = []; 
        }
        
        console.log('Excel data processed successfully. Default stock for quant page:', defaultStockCode, 'Total stocks in allStockData:', Object.keys(allStockData).length);
        window.isExcelDataLoading = false;
        //return true;
        valReturn = true;

    } catch (error) {
        console.error("Error loading or processing Excel data in potfunddatarender.js:", error);
        allStockData = { 
            "ERROR": {
                name: "数据加载失败",
                totalInflow: "N/A",
                currentPotScore: "N/A",
                latestDate: formatDate(new Date()),
                dailyData: []
            }
        };
        defaultStockCode = "ERROR";
        top20TotalInflowStocks = [];
        top20ContinuousInflowStocks = [];
        top20ReboundFactorStocks = []; // Ensure this is also reset on error
        window.isExcelDataLoading = false;
        throw error; 
    }

    excelFilePath = 'data/AIPEFinanceDataHK.xlsx'; 
    try {
        const response = await fetch(excelFilePath);
        if (!response.ok) throw new Error(`Failed to fetch HK Excel file: ${response.statusText} (URL: ${excelFilePath})`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

        const flow5DaysSortSheetName = "ARHK";
        const flow5DaysSortSheet = workbook.Sheets[flow5DaysSortSheetName];
        if (!flow5DaysSortSheet) throw new Error(`Sheet "${flow5DaysSortSheetName}" not found.`);
        const flow5DaysSortJsonData = XLSX.utils.sheet_to_json(flow5DaysSortSheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        if (flow5DaysSortJsonData.length === 0) throw new Error(`Sheet "${flow5DaysSortSheetName}" is empty.`);
        
        const groupedByStockCode = {};
        flow5DaysSortJsonData.forEach(row => {
            let stockCode = String(row['代码']).trim();
            stockCode = "HK" + stockCode;
            if (!stockCode || stockCode === 'undefined') return;
            if (!groupedByStockCode[stockCode]) groupedByStockCode[stockCode] = [];
            groupedByStockCode[stockCode].push(row);
        });

        if (Object.keys(groupedByStockCode).length === 0) throw new Error("No valid stock data from 'ARHK'.");

        let firstCodeProcessed = false;
        HKallStockData = {}; 

        for (const stockCode in groupedByStockCode) {
            if (!firstCodeProcessed && stockCode !== "ERROR") { 
                defaultStockCode = stockCode; 
                firstCodeProcessed = true;
            }
            const stockEntries = groupedByStockCode[stockCode];
            stockEntries.sort((a, b) => new Date(formatDate(b['日期'])).getTime() - new Date(formatDate(a['日期'])).getTime());
            
            const latestEntry = stockEntries[0];
            if (!latestEntry) {
                console.warn(`No entries found for HK stock code ${stockCode} after grouping in Flow5DaysSort.`);
                continue;
            }
            
            const dailyDataForStock = stockEntries.slice(0, 5).map(entry => ({
                date: formatDate(entry['日期']),
                change: String(entry['Percent'] ?? '0%'),
                price: parseFloat(entry['Price'] ?? 0)
            }));

        }
        
        console.log('Excel HK data processed successfully. Default stock for quant page:', defaultStockCode, 'Total stocks in HKallStockData:', Object.keys(HKallStockData).length);
        window.isExcelDataLoading = false;
        //return true;
        valReturn = true;

    } catch (error) {
        console.error("Error loading or processing HK Excel data in potfunddatarender.js:", error);
        HKallStockData = { 
            "ERROR": {
                name: "HK数据加载失败",
                latestDate: formatDate(new Date()),
                dailyData: []
            }
        };
        defaultStockCode = "ERROR";
        window.isExcelDataLoading = false;
        throw error; 
        return valReturn;
    }

    excelFilePath = 'data/AIPEFinanceDataETF.xlsx'; 
    try {
        const response = await fetch(excelFilePath);
        if (!response.ok) throw new Error(`Failed to fetch ETF Excel file: ${response.statusText} (URL: ${excelFilePath})`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

        const flow5DaysSortSheetName = "ARETF";
        const flow5DaysSortSheet = workbook.Sheets[flow5DaysSortSheetName];
        if (!flow5DaysSortSheet) throw new Error(`Sheet "${flow5DaysSortSheetName}" not found.`);
        const flow5DaysSortJsonData = XLSX.utils.sheet_to_json(flow5DaysSortSheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        if (flow5DaysSortJsonData.length === 0) throw new Error(`Sheet "${flow5DaysSortSheetName}" is empty.`);
        
        const groupedByStockCode = {};
        flow5DaysSortJsonData.forEach(row => {
            let stockCode = String(row['代码']).trim();
            if (!stockCode || stockCode === 'undefined') return;
            if (!groupedByStockCode[stockCode]) groupedByStockCode[stockCode] = [];
            groupedByStockCode[stockCode].push(row);
        });

        if (Object.keys(groupedByStockCode).length === 0) throw new Error("No valid stock data from 'ARETF'.");

        let firstCodeProcessed = false;
        ETFallStockData = {}; 

        for (const stockCode in groupedByStockCode) {
            if (!firstCodeProcessed && stockCode !== "ERROR") { 
                defaultStockCode = stockCode; 
                firstCodeProcessed = true;
            }
            const stockEntries = groupedByStockCode[stockCode];
            stockEntries.sort((a, b) => new Date(formatDate(b['日期'])).getTime() - new Date(formatDate(a['日期'])).getTime());
            
            const latestEntry = stockEntries[0];
            if (!latestEntry) {
                console.warn(`No entries found for ETF stock code ${stockCode} after grouping in Flow5DaysSort.`);
                continue;
            }
            
            const dailyDataForStock = stockEntries.slice(0, 1).map(entry => ({
                date: formatDate(entry['日期']),
                change: String(entry['Percent'] ?? '0%'),
                price: parseFloat(entry['Price'] ?? 0)
            }));

        }
        
        console.log('Excel HK data processed successfully. Default stock for quant page:', defaultStockCode, 'Total stocks in ETFallStockData:', Object.keys(ETFallStockData).length);
        window.isExcelDataLoading = false;        
        return true;
        //valReturn = true;

    } catch (error) {
        console.error("Error loading or processing ETF Excel data in potfunddatarender.js:", error);
        ETFallStockData = { 
            "ERROR": {
                name: "ETF数据加载失败",
                totalInflow: "N/A",
                currentPotScore: "N/A",
                latestDate: formatDate(new Date()),
                dailyData: []
            }
        };
        defaultStockCode = "ERROR";
        window.isExcelDataLoading = false;
        throw error; 
        return valReturn;
    }

}
