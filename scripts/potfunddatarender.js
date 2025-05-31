// scripts/potfunddatarender.js

let allStockData = {};
let defaultStockCode = '';
let top20TotalInflowStocks = []; // For "Top20 5日总净流入占比"
let top20ContinuousInflowStocks = []; // For "Top20 5日持续净流入占比"

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
        const stockCode = String(row['代码'] || row['代码']).trim(); // Ensure consistent key access
        const stockName = String(row['名称'] || row['名称'] || 'N/A'); // Ensure consistent key access

        if (stockCode && stockCode !== 'undefined' && !seenCodes.has(stockCode)) {
            uniqueStocks.push({ code: stockCode, name: stockName });
            seenCodes.add(stockCode);
        }
    }
    return uniqueStocks;
}


async function loadAndProcessExcelData() {
    const excelFilePath = '../data/AIPEFinanceData.xlsx'; // Path relative to potfunddatarender.js
    try {
        const response = await fetch(excelFilePath);
        if (!response.ok) throw new Error(`Failed to fetch Excel file: ${response.statusText} (URL: ${excelFilePath})`);
        const arrayBuffer = await response.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

        // --- Process "Flow5DaysSort" for main data and first dropdown ---
        const flow5DaysSortSheetName = "Flow5DaysSort";
        const flow5DaysSortSheet = workbook.Sheets[flow5DaysSortSheetName];
        if (!flow5DaysSortSheet) throw new Error(`Sheet "${flow5DaysSortSheetName}" not found.`);
        const flow5DaysSortJsonData = XLSX.utils.sheet_to_json(flow5DaysSortSheet, { raw: false, dateNF: 'yyyy-mm-dd' });

        if (flow5DaysSortJsonData.length === 0) throw new Error(`Sheet "${flow5DaysSortSheetName}" is empty.`);
        
        top20TotalInflowStocks = getTopNUniqueStocks(flow5DaysSortJsonData, 20);

        const groupedByStockCode = {};
        flow5DaysSortJsonData.forEach(row => {
            const stockCode = String(row['代码']).trim();
            if (!stockCode || stockCode === 'undefined') return;
            if (!groupedByStockCode[stockCode]) groupedByStockCode[stockCode] = [];
            groupedByStockCode[stockCode].push(row);
        });

        if (Object.keys(groupedByStockCode).length === 0) throw new Error("No valid stock data from 'Flow5DaysSort'.");

        let firstCodeProcessed = false;
        for (const stockCode in groupedByStockCode) {
            if (!firstCodeProcessed) {
                defaultStockCode = stockCode; // Set default stock from the first group encountered
                firstCodeProcessed = true;
            }
            const stockEntries = groupedByStockCode[stockCode];
            // Sort entries by date descending to easily get the latest and recent 5 days
            stockEntries.sort((a, b) => new Date(formatDate(b['日期'])).getTime() - new Date(formatDate(a['日期'])).getTime());
            
            const latestEntry = stockEntries[0];
            if (!latestEntry) {
                console.warn(`No entries found for stock code ${stockCode} after grouping in Flow5DaysSort.`);
                continue;
            }
            
            // Take up to 5 most recent entries for dailyData
            const dailyDataForStock = stockEntries.slice(0, 5).map(entry => ({
                date: formatDate(entry['日期']),
                potScore: String(entry['PotScore'] ?? '0'), // PotScore
                superLargeInflow: String(entry['超大单净流入-净占比'] ?? '0%'),
                largeInflow: String(entry['大单净流入-净占比'] ?? '0%'),
                change: String(entry['涨跌幅'] ?? '0%'),
                price: parseFloat(entry['收盘价'] ?? 0)
            }));

            allStockData[stockCode] = {
                name: String(latestEntry['名称'] ?? 'N/A'),
                totalInflow: String(latestEntry['总净流入占比_5日总和'] ?? '0%'), // This is the 5-day total from the sheet
                currentPotScore: String(latestEntry['PotScore'] ?? '0'), // PotScore from the latest entry
                latestDate: formatDate(latestEntry['日期']),
                dailyData: dailyDataForStock
            };
        }

        // --- Process "Flow5DaysPositive" for the second dropdown ---
        const flow5DaysPositiveSheetName = "Flow5DaysPositive";
        const flow5DaysPositiveSheet = workbook.Sheets[flow5DaysPositiveSheetName];
        if (flow5DaysPositiveSheet) {
            const flow5DaysPositiveJsonData = XLSX.utils.sheet_to_json(flow5DaysPositiveSheet, { raw: false, dateNF: 'yyyy-mm-dd' });
            if (flow5DaysPositiveJsonData.length > 0) {
                top20ContinuousInflowStocks = getTopNUniqueStocks(flow5DaysPositiveJsonData, 20);
            } else {
                console.warn(`Sheet "${flow5DaysPositiveSheetName}" is empty.`);
            }
        } else {
            console.warn(`Sheet "${flow5DaysPositiveSheetName}" not found. Continuous inflow dropdown will be empty.`);
            top20ContinuousInflowStocks = []; // Ensure it's an empty array if sheet not found
        }
        
        console.log('Excel data processed successfully. Default stock:', defaultStockCode);
        return true;

    } catch (error) {
        console.error("Error loading or processing Excel data:", error);
        alert(`数据加载或处理错误: ${error.message}\n请检查Excel文件 ("Flow5DaysSort", "Flow5DaysPositive" sheets and columns) 和控制台输出。`);
        // Provide some fallback dummy data or clear display
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
        return false; 
    }
}
