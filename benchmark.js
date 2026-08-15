// Baseline benchmark for formatMonthYear

function formatMonthYear_original(ymString) {
    if (!ymString) return "";
    const [year, month] = ymString.split('-');
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
}

const months_array = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatMonthYear_optimized(ymString) {
    if (!ymString) return "";
    const [year, month] = ymString.split('-');
    return `${months_array[parseInt(month, 10) - 1]} ${year}`;
}

const iterations = 10000000;
const testDate = "2023-05";

// Warmup
for (let i = 0; i < 100000; i++) {
    formatMonthYear_original(testDate);
    formatMonthYear_optimized(testDate);
}

const start_original = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    formatMonthYear_original(testDate);
}
const end_original = process.hrtime.bigint();

const start_optimized = process.hrtime.bigint();
for (let i = 0; i < iterations; i++) {
    formatMonthYear_optimized(testDate);
}
const end_optimized = process.hrtime.bigint();

console.log(`Original Time:  ${Number(end_original - start_original) / 1000000} ms`);
console.log(`Optimized Time: ${Number(end_optimized - start_optimized) / 1000000} ms`);
