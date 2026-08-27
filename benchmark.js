const regions = {
    "Territories": ["Puerto Rico", "US Virgin Islands", "Guam", "American Samoa", "Northern Mariana Islands"]
};

const travels = {};
for (let i = 0; i < 50; i++) {
    travels[`State_${i}`] = { unvisited: false, landmarks: [1, 2, 3] };
}
for (const terr of regions.Territories) {
    travels[terr] = { unvisited: false, landmarks: [1] };
}

function originalUpdateDashboard() {
    let visitedCount = 0;
    let landmarkCount = 0;

    Object.keys(travels).forEach(name => {
        if (!regions.Territories.includes(name)) {
            if (!travels[name].unvisited) visitedCount++;
        }
        if (travels[name].landmarks) {
            landmarkCount += travels[name].landmarks.length;
        }
    });
    return visitedCount;
}

// Global Set optimization
const territoriesSet = new Set(regions.Territories);
function optimizedUpdateDashboardGlobal() {
    let visitedCount = 0;
    let landmarkCount = 0;

    Object.keys(travels).forEach(name => {
        if (!territoriesSet.has(name)) {
            if (!travels[name].unvisited) visitedCount++;
        }
        if (travels[name].landmarks) {
            landmarkCount += travels[name].landmarks.length;
        }
    });
    return visitedCount;
}

// Local Set optimization
function optimizedUpdateDashboardLocal() {
    let visitedCount = 0;
    let landmarkCount = 0;
    const localTerritoriesSet = new Set(regions.Territories);

    Object.keys(travels).forEach(name => {
        if (!localTerritoriesSet.has(name)) {
            if (!travels[name].unvisited) visitedCount++;
        }
        if (travels[name].landmarks) {
            landmarkCount += travels[name].landmarks.length;
        }
    });
    return visitedCount;
}

const ITERS = 1000000;

const startOriginal = performance.now();
for (let i = 0; i < ITERS; i++) {
    originalUpdateDashboard();
}
const endOriginal = performance.now();
console.log(`Original: ${(endOriginal - startOriginal).toFixed(2)} ms`);

const startOptimizedGlobal = performance.now();
for (let i = 0; i < ITERS; i++) {
    optimizedUpdateDashboardGlobal();
}
const endOptimizedGlobal = performance.now();
console.log(`Optimized Global: ${(endOptimizedGlobal - startOptimizedGlobal).toFixed(2)} ms`);

const startOptimizedLocal = performance.now();
for (let i = 0; i < ITERS; i++) {
    optimizedUpdateDashboardLocal();
}
const endOptimizedLocal = performance.now();
console.log(`Optimized Local: ${(endOptimizedLocal - startOptimizedLocal).toFixed(2)} ms`);

