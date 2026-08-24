/* ==========================================================================
   US Travel Tracker & Adventure Dashboard Core Logic
   ========================================================================== */

// 1. Initial State Data & Configuration (50 States, DC, & 5 Territories)
const initialTravelData = {
    // Northeast
    "Connecticut": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Maine": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Massachusetts": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "New Hampshire": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "New Jersey": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "New York": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Pennsylvania": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Rhode Island": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Vermont": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },

    // Midwest
    "Illinois": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Indiana": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Iowa": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Kansas": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Michigan": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Minnesota": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Missouri": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Nebraska": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "North Dakota": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Ohio": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "South Dakota": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Wisconsin": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },

    // South
    "Alabama": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Arkansas": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Delaware": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Florida": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Georgia": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Kentucky": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Louisiana": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Maryland": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Mississippi": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "North Carolina": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Oklahoma": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "South Carolina": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Tennessee": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Texas": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Virginia": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "West Virginia": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "District of Columbia": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },

    // West
    "Alaska": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Arizona": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "California": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Colorado": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Hawaii": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Idaho": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Montana": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Nevada": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "New Mexico": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Oregon": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Utah": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Washington": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Wyoming": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },

    // US Territories
    "Puerto Rico": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "US Virgin Islands": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Guam": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "American Samoa": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] },
    "Northern Mariana Islands": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] }
};

// Set some baseline visits matching the original file defaults for a friendly initial experience
const presetData = {
    "Arizona": { unvisited: false, notes: "Current location! Beautiful deserts.", date: "2026-07" },
    "Alabama": { unvisited: false },
    "Arkansas": { unvisited: false },
    "California": { unvisited: false },
    "Colorado": { unvisited: false },
    "Connecticut": { unvisited: false },
    "Florida": { unvisited: false },
    "Georgia": { unvisited: false },
    "Illinois": { unvisited: false },
    "Indiana": { unvisited: false },
    "Iowa": { unvisited: false },
    "Kansas": { unvisited: false },
    "Kentucky": { unvisited: false },
    "Louisiana": { unvisited: false },
    "Maine": { unvisited: false },
    "Maryland": { unvisited: false },
    "Massachusetts": { unvisited: false },
    "Michigan": { unvisited: false },
    "Mississippi": { unvisited: false },
    "Missouri": { unvisited: false },
    "Nebraska": { unvisited: false },
    "Nevada": { unvisited: false },
    "New Hampshire": { unvisited: false },
    "New Jersey": { unvisited: false },
    "New Mexico": { unvisited: false },
    "New York": { unvisited: false },
    "North Carolina": { unvisited: false },
    "Ohio": { unvisited: false },
    "Oklahoma": { unvisited: false },
    "Pennsylvania": { unvisited: false },
    "Rhode Island": { unvisited: false },
    "Tennessee": { unvisited: false },
    "Texas": { unvisited: false },
    "Virginia": { unvisited: false },
    "Washington": { unvisited: false },
    "West Virginia": { unvisited: false },
    "Wisconsin": { unvisited: false },
    // Bucket list preset notes
    "Alaska": { unvisited: true, notes: "Bucket List - Hope to explore the glaciers soon!" },
    "Delaware": { unvisited: true, notes: "Bucket List - First state on the list!" },
    "Hawaii": { unvisited: true, notes: "Bucket List - Aloha adventure!" },
    "Idaho": { unvisited: true, notes: "Bucket List - Looking forward to the national parks." },
    "Minnesota": { unvisited: true, notes: "Bucket List - Land of 10,000 lakes." },
    "Montana": { unvisited: true, notes: "Bucket List - Big Sky Country!" },
    "North Dakota": { unvisited: true, notes: "Bucket List - Exploring Theodore Roosevelt NP." },
    "Oregon": { unvisited: true, notes: "Bucket List - Pacific Northwest roadtrip destination." },
    "South Carolina": { unvisited: true, notes: "Bucket List - Dream of visiting Charleston." },
    "South Dakota": { unvisited: true, notes: "Bucket List - Mt. Rushmore and Badlands." },
    "Utah": { unvisited: true, notes: "Bucket List - Mighty 5 National Parks!" },
    "Vermont": { unvisited: true, notes: "Bucket List - Fall foliage and maple syrup." },
    "Wyoming": { unvisited: true, notes: "Bucket List - Grand Teton & Yellowstone adventures." }
};

// Merge preset visits into initial dataset
Object.keys(presetData).forEach(state => {
    if (initialTravelData[state]) {
        initialTravelData[state].unvisited = presetData[state].unvisited !== undefined ? presetData[state].unvisited : false;
        if (presetData[state].notes) initialTravelData[state].notes = presetData[state].notes;
        if (presetData[state].date) initialTravelData[state].date = presetData[state].date;
    }
});

// Regions Definition
const regions = {
    "Northeast": ["Connecticut", "Maine", "Massachusetts", "New Hampshire", "New Jersey", "New York", "Pennsylvania", "Rhode Island", "Vermont"],
    "Midwest": ["Illinois", "Indiana", "Iowa", "Kansas", "Michigan", "Minnesota", "Missouri", "Nebraska", "North Dakota", "Ohio", "South Dakota", "Wisconsin"],
    "South": ["Alabama", "Arkansas", "Delaware", "Florida", "Georgia", "Kentucky", "Louisiana", "Maryland", "Mississippi", "North Carolina", "Oklahoma", "South Carolina", "Tennessee", "Texas", "Virginia", "West Virginia", "District of Columbia"],
    "West": ["Alaska", "Arizona", "California", "Colorado", "Hawaii", "Idaho", "Montana", "Nevada", "New Mexico", "Oregon", "Utah", "Washington", "Wyoming"],
    "Territories": ["Puerto Rico", "US Virgin Islands", "Guam", "American Samoa", "Northern Mariana Islands"]
};

// Landmarks Data
const preloadedLandmarks = {
    "Alabama": ["US Space & Rocket Center", "Gulf Shores", "Civil Rights Memorial"],
    "Alaska": ["Denali National Park", "Kenai Fjords", "Mendenhall Glacier"],
    "Arizona": ["Grand Canyon", "Sedona Red Rocks", "Monument Valley"],
    "Arkansas": ["Hot Springs National Park", "Crystal Bridges Museum", "Ozark National Forest"],
    "California": ["Golden Gate Bridge", "Yosemite Valley", "Disneyland"],
    "Colorado": ["Rocky Mountain National Park", "Garden of the Gods", "Red Rocks Amphitheatre"],
    "Connecticut": ["Yale University", "Mystic Seaport", "Gillette Castle"],
    "Delaware": ["Rehoboth Beach", "Delaware Water Gap", "Winterthur Museum"],
    "Florida": ["Walt Disney World", "Everglades National Park", "Key West Southernmost Point"],
    "Georgia": ["Georgia Aquarium", "Savannah Historic District", "Stone Mountain"],
    "Hawaii": ["Waikiki Beach", "Pearl Harbor Memorial", "Volcanoes National Park"],
    "Idaho": ["Craters of the Moon", "Shoshone Falls", "Coeur d'Alene Lake"],
    "Illinois": ["Millennium Park (The Bean)", "Willis Tower", "Navy Pier"],
    "Indiana": ["Indianapolis Motor Speedway", "Indiana Dunes", "West Baden Springs"],
    "Iowa": ["Field of Dreams", "Maquoketa Caves", "Iowa State Capitol"],
    "Kansas": ["Monument Rocks", "Boot Hill Museum", "Tallgrass Prairie"],
    "Kentucky": ["Mammoth Cave", "Churchill Downs", "Cumberland Falls"],
    "Louisiana": ["French Quarter New Orleans", "National WWII Museum", "Swamp Tour Bayou"],
    "Maine": ["Acadia National Park", "Portland Head Light", "Mount Katahdin"],
    "Maryland": ["Fort McHenry", "Annapolis Historic District", "National Aquarium Baltimore"],
    "Massachusetts": ["Freedom Trail", "Cape Cod National Seashore", "Harvard Yard"],
    "Michigan": ["Mackinac Island", "Pictured Rocks", "Henry Ford Museum"],
    "Minnesota": ["Mall of America", "Boundary Waters Canoe Area", "Minnehaha Falls"],
    "Mississippi": ["Vicksburg National Military Park", "Natchez Trace Parkway", "Mississippi Delta"],
    "Missouri": ["Gateway Arch", "Branson Strip", "Lake of the Ozarks"],
    "Montana": ["Glacier National Park", "Yellowstone North Entrance", "Little Bighorn Battlefield"],
    "Nebraska": ["Chimney Rock", "Omaha's Henry Doorly Zoo", "Carhenge"],
    "Nevada": ["Las Vegas Strip", "Lake Tahoe", "Hoover Dam"],
    "New Hampshire": ["Mount Washington", "Kancamagus Highway", "Lake Winnipesaukee"],
    "New Jersey": ["Atlantic City Boardwalk", "Liberty State Park", "Cape May Historic District"],
    "New Mexico": ["Carlsbad Caverns", "White Sands National Park", "Santa Fe Plaza"],
    "New York": ["Statue of Liberty", "Times Square", "Niagara Falls"],
    "North Carolina": ["Biltmore Estate", "Outer Banks", "Great Smoky Mountains"],
    "North Dakota": ["Theodore Roosevelt National Park", "Maah Daah Hey Trail", "International Peace Garden"],
    "Ohio": ["Rock & Roll Hall of Fame", "Cedar Point", "Hocking Hills State Park"],
    "Oklahoma": ["National Cowboy Museum", "Route 66 Golden Driller", "Oklahoma City Memorial"],
    "Oregon": ["Crater Lake", "Cannon Beach Haystack Rock", "Columbia River Gorge"],
    "Pennsylvania": ["Independence Hall", "Gettysburg Battlefield", "Hershey's Chocolate World"],
    "Rhode Island": ["Newport Mansions", "Cliff Walk", "Block Island Mohegan Bluffs"],
    "South Carolina": ["Charleston Historic District", "Myrtle Beach", "Hilton Head Island"],
    "South Dakota": ["Mount Rushmore", "Badlands National Park", "Custer State Park"],
    "Tennessee": ["Great Smoky Mountains", "Graceland", "Grand Ole Opry"],
    "Texas": ["The Alamo", "Space Center Houston", "Big Bend National Park"],
    "Utah": ["Zion National Park", "Bryce Canyon", "Arches National Park"],
    "Vermont": ["Green Mountain National Forest", "Ben & Jerry's Factory", "Stowe Mountain Resort"],
    "Virginia": ["Shenandoah National Park", "Colonial Williamsburg", "Monticello"],
    "Washington": ["Space Needle", "Mount Rainier", "Olympic National Park"],
    "West Virginia": ["New River Gorge", "Harpers Ferry", "Greenbrier Resort"],
    "Wisconsin": ["Dells of the Wisconsin River", "Door County Peninsula", "Lambeau Field"],
    "Wyoming": ["Yellowstone National Park", "Grand Teton National Park", "Devils Tower"],
    "District of Columbia": ["Lincoln Memorial", "Smithsonian Museums", "National Mall"],
    "Puerto Rico": ["El Yunque National Forest", "Old San Juan", "Castillo San Felipe del Morro"],
    "US Virgin Islands": ["Trunk Bay", "Buck Island Reef", "Christiansted National Historic Site"],
    "Guam": ["Two Lovers Point", "Tumon Beach", "War in the Pacific National Historical Park"],
    "American Samoa": ["National Park of American Samoa", "Tula Village", "Mount Alava"],
    "Northern Mariana Islands": ["Banzai Cliff", "Grotto", "Managaha Island"]
};

// Map FIPS codes to State Names
const fipsToState = {
    "01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas", "06": "California",
    "08": "Colorado", "09": "Connecticut", "10": "Delaware", "11": "District of Columbia", "12": "Florida", "13": "Georgia",
    "15": "Hawaii", "16": "Idaho", "17": "Illinois", "18": "Indiana", "19": "Iowa",
    "20": "Kansas", "21": "Kentucky", "22": "Louisiana", "23": "Maine", "24": "Maryland",
    "25": "Massachusetts", "26": "Michigan", "27": "Minnesota", "28": "Mississippi", "29": "Missouri",
    "30": "Montana", "31": "Nebraska", "32": "Nevada", "33": "New Hampshire", "34": "New Jersey",
    "35": "New Mexico", "36": "New York", "37": "North Carolina", "38": "North Dakota", "39": "Ohio",
    "40": "Oklahoma", "41": "Oregon", "42": "Pennsylvania", "44": "Rhode Island", "45": "South Carolina",
    "46": "South Dakota", "47": "Tennessee", "48": "Texas", "49": "Utah", "50": "Vermont",
    "51": "Virginia", "53": "Washington", "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming"
};

// Map Themes definitions
const themes = {
    classic: {
        ocean: "#f1f5f9",
        unvisited: "#fef3c7", 
        unvisitedBorder: "#fbbf24",
        visited: "#10b981", 
        visitedBorder: "#ffffff",
        stroke: "#cbd5e1"
    },
    vintage: {
        ocean: "#dfd5be", 
        unvisited: "#f5eedc", 
        unvisitedBorder: "#b89366",
        visited: "#8c6d4f", 
        visitedBorder: "#fdfaf2",
        stroke: "#b8a383"
    },
    cyber: {
        ocean: "#090e1a", 
        unvisited: "#1e293b", 
        unvisitedBorder: "#475569",
        visited: "#f43f5e", 
        visitedBorder: "#ffffff",
        stroke: "rgba(244, 63, 94, 0.4)"
    },
    aurora: {
        ocean: "#032539", 
        unvisited: "#0b2b30", 
        unvisitedBorder: "#34a0a4",
        visited: "#00b4d8", 
        visitedBorder: "#e0f2fe",
        stroke: "rgba(56, 189, 248, 0.3)"
    }
};

// 2. Active Application State
let travels = initialTravelData;
let travelerName = 'My';
let selectedState = null;
let activeTheme = 'classic';
let currentSyncCode = '';
let firebaseReady = false;
let db = null;
let auth = null;

const appId = 'us-travel-tracker';

// D3 Global Variables
const svg = d3.select("#us-svg-map");
const g = svg.append("g");
const projection = d3.geoAlbersUsa().scale(1075).translate([480, 300]);
const path = d3.geoPath().projection(projection);
let usMapData = null;

// Zoom configuration
const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", (event) => {
        g.attr("transform", event.transform);
    });
svg.call(zoom);

// 3. Load & Cache Functions
function loadLocalStorage() {
    try {
        const cachedTravels = localStorage.getItem('us_travel_data_map');
        if (cachedTravels) {
            const parsed = JSON.parse(cachedTravels);
            // Deep merge to safeguard schema updates (trips/landmarks)
            Object.keys(initialTravelData).forEach(state => {
                if (parsed[state]) {
                    travels[state] = {
                        unvisited: parsed[state].unvisited !== undefined ? parsed[state].unvisited : true,
                        notes: parsed[state].notes || "",
                        date: parsed[state].date || "",
                        trips: parsed[state].trips || [],
                        landmarks: parsed[state].landmarks || []
                    };
                }
            });
        }
        
        travelerName = localStorage.getItem('us_travel_traveler_name') || 'My';
        activeTheme = localStorage.getItem('us_travel_map_theme') || 'classic';
        currentSyncCode = localStorage.getItem('us_travel_sync_code') || '';
    } catch (e) {
        console.warn("Failed to load local storage.", e);
    }
}

function saveLocalStorage() {
    try {
        localStorage.setItem('us_travel_data_map', JSON.stringify(travels));
        localStorage.setItem('us_travel_traveler_name', travelerName);
        localStorage.setItem('us_travel_map_theme', activeTheme);
        localStorage.setItem('us_travel_sync_code', currentSyncCode);
    } catch (e) {
        console.error("Local caching failed", e);
    }
}

// 4. UI Toast System
function showToast(title, message, type = 'info') {
    const container = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = `toast`;
    
    let iconClass = "fa-circle-info color-indigo";
    if (type === 'success') iconClass = "fa-circle-check color-green";
    else if (type === 'error') iconClass = "fa-circle-exclamation color-red";
    
    toast.innerHTML = `
        <div class="toast-icon"><i class="fa-solid ${iconClass}"></i></div>
        <div class="toast-details">
            <h5 class="toast-title"></h5>
            <p class="toast-msg"></p>
        </div>
    `;
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-msg').textContent = message;

    container.appendChild(toast);
    
    setTimeout(() => toast.classList.add("visible"), 10);
    setTimeout(() => {
        toast.classList.remove("visible");
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// 5. Firebase Online Sync Layer (Dynamic Module Loader for Offline resilience)
async function initFirebase() {
    // If global configurations exist, attempt Firebase launch
    if (typeof window.__firebase_config !== 'undefined' || typeof window.firebaseConfigGlobal !== 'undefined') {
        const rawConfig = window.__firebase_config || window.firebaseConfigGlobal;
        try {
            const firebaseConfig = typeof rawConfig === 'string' ? JSON.parse(rawConfig) : rawConfig;
            
            // Dynamic ESM imports
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
            const { getAuth, signInAnonymously, signInWithCustomToken } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js");
            const { getFirestore, doc, setDoc, getDoc } = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
            
            const app = initializeApp(firebaseConfig);
            db = getFirestore(app);
            auth = getAuth(app);
            firebaseReady = true;
            
            // Sync status badge update
            const badge = document.getElementById("sync-status-badge");
            badge.textContent = currentSyncCode ? "Cloud Active" : "Cloud Ready";
            badge.className = "sync-badge synced";

            // Expose sync operations globally
            window.firebaseSaveToCloud = async (payload) => {
                let userCreds;
                const token = window.__initial_auth_token || window.initialAuthTokenGlobal;
                if (token) {
                    userCreds = await signInWithCustomToken(auth, token);
                } else {
                    userCreds = await signInAnonymously(auth);
                }
                if (!userCreds.user) throw new Error("Anonymous auth failed");
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'maps', currentSyncCode);
                await setDoc(docRef, payload);
            };

            window.firebaseLoadFromCloud = async (code) => {
                let userCreds;
                const token = window.__initial_auth_token || window.initialAuthTokenGlobal;
                if (token) {
                    userCreds = await signInWithCustomToken(auth, token);
                } else {
                    userCreds = await signInAnonymously(auth);
                }
                const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'maps', code);
                const docSnap = await getDoc(docRef);
                return docSnap.exists() ? docSnap.data() : null;
            };

            console.log("Firebase sync engine loaded successfully.");
            
            // If page loaded with mapId parameter, fetch immediately
            checkSyncQueryParam();
        } catch (err) {
            console.warn("Firebase config found but failed to bootstrap. Running in offline sandbox mode.", err);
        }
    }
}

// 6. Map Rendering & Zoom HUD Methods
async function initMap() {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
        if (!response.ok) throw new Error("Could not fetch standard US TopoJSON data");
        usMapData = await response.json();
        
        document.getElementById('map-loader').style.display = 'none';
        
        renderMap();
        updateDashboard();
        renderLedger();
        
        // Auto select Arizona as default highlight on load if visited
        if (travels["Arizona"] && !travels["Arizona"].unvisited) {
            selectState("Arizona");
        }
    } catch (e) {
        console.error("D3 US Map Render failed", e);
        document.getElementById('map-loader').innerHTML = `
            <div style="color: var(--primary); padding: 1.5rem; text-align: center;">
                <i class="fa-solid fa-triangle-exclamation" style="font-size: 2rem; margin-bottom: 0.5rem;"></i>
                <h4 style="font-weight: 800;">Vector Canvas Error</h4>
                <p style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.25rem;">Could not download geographic boundary assets. Please check your internet connection and refresh.</p>
                <button onclick="window.location.reload()" class="btn btn-secondary btn-sm" style="margin-top: 0.75rem;">Retry Render</button>
            </div>
        `;
    }
}

function renderMap() {
    if (!usMapData) return;
    
    // Clear out D3 group elements
    g.selectAll("*").remove();
    d3.select("#map-parent").style("background-color", themes[activeTheme].ocean);
    
    const statesGeo = topojson.feature(usMapData, usMapData.objects.states).features;
    
    // 1. Draw States
    g.selectAll("path")
        .data(statesGeo)
        .join("path")
        .attr("d", path)
        .attr("class", "state-path")
        .attr("fill", d => {
            const stateName = fipsToState[d.id];
            if (!stateName) return "#e2e8f0";
            const item = travels[stateName];
            if (!item) return themes[activeTheme].unvisited;
            
            const isSelected = selectedState === stateName;
            if (isSelected) return "url(#selected-stripe-pattern)";
            
            return item.unvisited ? themes[activeTheme].unvisited : themes[activeTheme].visited;
        })
        .attr("stroke", d => {
            const stateName = fipsToState[d.id];
            if (!stateName) return themes[activeTheme].stroke;
            const isUnvisited = travels[stateName]?.unvisited;
            return isUnvisited ? themes[activeTheme].unvisitedBorder : themes[activeTheme].visitedBorder;
        })
        .attr("stroke-width", "1.5px")
        .on("mouseover", function(event, d) {
            const stateName = fipsToState[d.id] || "Unknown Territory";
            const isUnvisited = travels[stateName]?.unvisited;
            const status = isUnvisited ? "Bucket List" : "Visited";
            
            document.getElementById("map-tooltip").innerHTML = `<strong>${stateName}</strong> (${status})`;
            d3.select(this)
                .attr("stroke", "var(--primary)")
                .attr("stroke-width", "2.5px")
                .raise(); // Pull hovered boundary to front
        })
        .on("mouseout", function(event, d) {
            const stateName = fipsToState[d.id];
            document.getElementById("map-tooltip").textContent = selectedState ? `Inspecting ${selectedState}` : "Hover over a state";
            
            const isUnvisited = travels[stateName]?.unvisited;
            d3.select(this)
                .attr("stroke", isUnvisited ? themes[activeTheme].unvisitedBorder : themes[activeTheme].visitedBorder)
                .attr("stroke-width", "1.5px");
        })
        .on("click", (event, d) => {
            const stateName = fipsToState[d.id];
            if (stateName) {
                selectState(stateName);
                zoomToState(stateName);
            }
        });

    // 2. Draw patterns for selected states
    svg.append("defs")
        .append("pattern")
        .attr("id", "selected-stripe-pattern")
        .attr("width", 8)
        .attr("height", 8)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("patternTransform", "rotate(45)")
        .html(`
            <rect width="8" height="8" fill="${themes[activeTheme].visited}" />
            <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.25)" stroke-width="3" />
        `);

    // 3. Render Orange Pin Markers for unvisited states
    statesGeo.forEach(d => {
        const stateName = fipsToState[d.id];
        if (!stateName || !travels[stateName]?.unvisited) return;
        
        const centroid = path.centroid(d);
        if (!centroid || isNaN(centroid[0]) || isNaN(centroid[1])) return;
        
        let [x, y] = centroid;
        
        // Minor visual offsets for optimal centroid pin layouts
        if (stateName === "California") { x -= 8; y += 12; }
        else if (stateName === "Michigan") { x += 15; y += 15; }
        else if (stateName === "Florida") { x += 12; y += 5; }
        else if (stateName === "Alaska") { x += 15; y -= 5; }
        else if (stateName === "Hawaii") { x -= 5; y += 5; }
        
        const pinGroup = g.append("g")
            .attr("class", "pin-marker cursor-pointer")
            .attr("transform", `translate(${x}, ${y - 12})`)
            .on("click", (event) => {
                event.stopPropagation();
                selectState(stateName);
                zoomToState(stateName);
            });
            
        // Pulse background circle
        pinGroup.append("circle")
            .attr("r", 9)
            .attr("fill", "var(--primary-light)")
            .attr("class", "pulse-pin-active");
            
        // Solid pin top
        pinGroup.append("circle")
            .attr("r", 4)
            .attr("fill", "var(--primary)")
            .attr("stroke", "var(--bg-card)")
            .attr("stroke-width", "1px");
            
        // Pin pointer stem
        pinGroup.append("path")
            .attr("d", "M -4 -4 L 0 5 L 4 -4 Z")
            .attr("fill", "var(--primary)");
    });

    // 4. Coordinates Mouse tracking
    svg.on("mousemove", (event) => {
        const coords = projection.invert(d3.pointer(event));
        if (coords && !isNaN(coords[0]) && !isNaN(coords[1])) {
            const lat = coords[1];
            const lng = coords[0];
            const latDir = lat >= 0 ? "N" : "S";
            const lngDir = lng >= 0 ? "E" : "W";
            document.getElementById("coordinates-hud").textContent = 
                `LAT: ${Math.abs(lat).toFixed(4)}° ${latDir} | LNG: ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
        }
    }).on("mouseleave", () => {
        document.getElementById("coordinates-hud").textContent = `LAT: 37.0902° N | LNG: 95.7129° W`;
    });
}

function zoomInMap() {
    svg.transition().duration(300).call(zoom.scaleBy, 1.4);
}

function zoomOutMap() {
    svg.transition().duration(300).call(zoom.scaleBy, 1 / 1.4);
}

function resetMapZoom() {
    svg.transition().duration(400).call(zoom.transform, d3.zoomIdentity);
}

function zoomToState(stateName) {
    if (!usMapData) return;
    const statesGeo = topojson.feature(usMapData, usMapData.objects.states).features;
    const feature = statesGeo.find(d => fipsToState[d.id] === stateName);
    
    if (feature) {
        const centroid = path.centroid(feature);
        if (centroid && !isNaN(centroid[0]) && !isNaN(centroid[1])) {
            const [x, y] = centroid;
            const scale = 2.5;
            const translate = [480 - scale * x, 300 - scale * y];
            
            svg.transition()
                .duration(500)
                .call(zoom.transform, d3.zoomIdentity.translate(translate[0], translate[1]).scale(scale));
        }
    }
}

// 7. Render Left Sidebar Ledger (Checklist)
function renderLedger() {
    const container = document.getElementById("states-list-container");
    const searchVal = document.getElementById("search-input").value.trim().toLowerCase();
    const filterVal = document.getElementById("status-filter").value;
    const ledgerCount = document.getElementById("ledger-count");
    
    container.innerHTML = "";
    
    const sortedStates = Object.keys(travels).sort();
    let renderCount = 0;
    
    sortedStates.forEach(name => {
        const item = travels[name];
        if (searchVal && !name.toLowerCase().includes(searchVal)) return;
        if (filterVal === 'visited' && item.unvisited) return;
        if (filterVal === 'unvisited' && !item.unvisited) return;
        
        renderCount++;
        const isSelected = selectedState === name;
        const stateRow = document.createElement("div");
        stateRow.className = `state-row ${isSelected ? 'selected' : ''}`;
        stateRow.onclick = () => {
            selectState(name);
            zoomToState(name);
        };
        
        const checkedCount = item.landmarks ? item.landmarks.length : 0;
        const tripsCount = item.trips ? item.trips.length : 0;
        let badgeHTML = '';
        if (checkedCount > 0) badgeHTML += `<span class="state-notes-badge"><i class="fa-solid fa-monument"></i> ${checkedCount} </span>`;
        if (tripsCount > 0) badgeHTML += `<span class="state-notes-badge"><i class="fa-solid fa-route"></i> ${tripsCount} </span>`;
        if (item.notes && checkedCount === 0 && tripsCount === 0) badgeHTML += `<span class="state-notes-badge italic">"${item.notes}"</span>`;
        
        stateRow.innerHTML = `
            <div class="state-row-left">
                <button class="btn-state-checkbox ${item.unvisited ? 'unvisited' : 'visited'}" 
                        onclick="toggleStateStatus('${name}'); event.stopPropagation();" 
                        title="Toggle Visited/Bucket List status">
                    <i class="${item.unvisited ? 'fa-solid fa-map-pin' : 'fa-solid fa-check'}"></i>
                </button>
                <div class="state-row-info">
                    <span class="state-name-lbl">${name}</span>
                    <div style="display:flex; gap:0.5rem; align-items:center;">
                        ${badgeHTML}
                    </div>
                </div>
            </div>
            <span class="state-status-lbl ${item.unvisited ? 'unvisited' : 'visited'}">
                ${item.unvisited ? 'Bucket' : 'Visited'}
            </span>
        `;
        container.appendChild(stateRow);
    });
    
    ledgerCount.textContent = `${renderCount} States`;
    
    if (renderCount === 0) {
        container.innerHTML = `
            <div class="loader-centered">
                <i class="fa-solid fa-ban"></i> No states match filters
            </div>
        `;
    }
}

// 8. Update Dashboard Header Progress Metrics & Sidebar Region Bars
function updateDashboard() {
    let visitedCount = 0;
    let landmarkCount = 0;
    const totalStates = 50; // Standard US states for percentage explored
    
    // Count visited states (unvisited === false) excluding territories
    // and count checked landmarks globally
    Object.keys(travels).forEach(name => {
        // Exclude territories from standard 50 count percentage
        if (!regions.Territories.includes(name)) {
            if (!travels[name].unvisited) visitedCount++;
        }

        if (travels[name].landmarks) {
            landmarkCount += travels[name].landmarks.length;
        }
    });
    
    const remainingCount = totalStates - visitedCount;
    const percent = Math.min(100, Math.round((visitedCount / totalStates) * 100));
    
    // Update counters
    document.getElementById("visited-counter").textContent = visitedCount;
    document.getElementById("unvisited-counter").textContent = remainingCount;
    document.getElementById("percent-counter").textContent = `${percent}%`;
    
    // Update SVG animated progress ring
    const ring = document.getElementById("percent-ring");
    const radius = 23;
    const circumference = 2 * Math.PI * radius;
    ring.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - (percent / 100) * circumference;
    ring.style.strokeDashoffset = offset;
    
    document.getElementById("landmarks-counter").textContent = `${landmarkCount}/168`;

    // Recalculate regional progress bars
    const regionalContainer = document.getElementById("regions-progress-container");
    regionalContainer.innerHTML = "";
    
    Object.keys(regions).forEach(regionName => {
        const stateList = regions[regionName];
        let regionVisited = 0;
        
        stateList.forEach(name => {
            if (travels[name] && !travels[name].unvisited) regionVisited++;
        });
        
        const regionPercent = Math.round((regionVisited / stateList.length) * 100);
        
        const meter = document.createElement("div");
        meter.className = "region-meter-group";
        meter.innerHTML = `
            <div class="region-lbl-row">
                <span class="region-title-lbl">${regionName}</span>
                <span class="region-pct-lbl">${regionVisited}/${stateList.length} (${regionPercent}%)</span>
            </div>
            <div class="region-track-bar">
                <div class="region-fill-bar" style="width: ${regionPercent}%"></div>
            </div>
        `;
        regionalContainer.appendChild(meter);
    });
}

// 9. Inspect State Details
function selectState(stateName) {
    selectedState = stateName;
    
    // Rerender checklists to highlight active choice
    renderLedger();
    
    const config = travels[stateName];
    if (!config) return;
    
    document.getElementById("inspector-placeholder").classList.add("hidden");
    document.getElementById("inspector-content").classList.remove("hidden");
    
    // Fill values
    document.getElementById("inspector-name").textContent = stateName;
    document.getElementById("inspector-badge").textContent = stateName.substring(0, 2).toUpperCase();
    
    const subText = document.getElementById("inspector-status-text");
    const toggleBtn = document.getElementById("inspector-toggle-btn");
    const statusPill = document.getElementById("info-status-pill");
    const memoArea = document.getElementById("state-memo");
    
    if (config.unvisited) {
        subText.textContent = "Currently on your Bucket List";
        statusPill.textContent = "Bucket List (Unvisited)";
        statusPill.className = "status-pill color-orange";
        
        toggleBtn.innerHTML = `<i class="fa-solid fa-check"></i> Mark Visited`;
        toggleBtn.className = "btn btn-primary btn-sm";
    } else {
        subText.textContent = "You have visited this state!";
        statusPill.textContent = "Visited";
        statusPill.className = "status-pill color-green";
        
        toggleBtn.innerHTML = `<i class="fa-solid fa-map-pin"></i> Put Pin (Bucket List)`;
        toggleBtn.className = "btn btn-secondary btn-sm";
    }
    
    toggleBtn.onclick = () => {
        toggleStateStatus(stateName);
        selectState(stateName);
    };
    
    memoArea.value = config.notes || "";
    
    // Render Landmarks Checklist
    renderLandmarksChecklist(stateName);
    
    // Render Trip Log Timeline
    renderTripTimeline(stateName);
}

function toggleStateStatus(stateName) {
    if (!travels[stateName]) return;
    travels[stateName].unvisited = !travels[stateName].unvisited;
    saveAndRerender();
}

function saveStateDetails() {
    if (!selectedState) return;
    const memo = document.getElementById("state-memo").value.trim();
    travels[selectedState].notes = memo;
    saveAndRerender();
    showToast("Notes Saved", `Updated general memo details for ${selectedState}`, 'success');
}

// 10. Landmarks Checklist Rendering & Operations
function renderLandmarksChecklist(stateName) {
    const listContainer = document.getElementById("landmarks-list-container");
    listContainer.innerHTML = "";
    
    const stateLandmarks = preloadedLandmarks[stateName] || [];
    const checkedSet = new Set(travels[stateName]?.landmarks || []);
    
    stateLandmarks.forEach(landmark => {
        const isChecked = checkedSet.has(landmark);
        const row = document.createElement("div");
        row.className = `landmark-checkbox-row ${isChecked ? 'checked' : ''}`;
        row.onclick = () => toggleLandmarkStatus(stateName, landmark);
        
        row.innerHTML = `
            <div class="btn-landmark-checkbox ${isChecked ? 'checked' : ''}">
                ${isChecked ? '<i class="fa-solid fa-check"></i>' : ''}
            </div>
            <span class="landmark-name-lbl">${landmark}</span>
        `;
        listContainer.appendChild(row);
    });
}

function toggleLandmarkStatus(stateName, landmarkName) {
    const current = travels[stateName].landmarks || [];
    const index = current.indexOf(landmarkName);
    
    if (index > -1) {
        current.splice(index, 1);
    } else {
        current.push(landmarkName);
        // Automatically mark state as visited if you check off a landmark!
        if (travels[stateName].unvisited) {
            travels[stateName].unvisited = false;
        }
    }
    
    travels[stateName].landmarks = current;
    saveAndRerender();
    selectState(stateName); // Rerender inspector panel
}

// 11. Trip Logs Timeline & Forms CRUD
function renderTripTimeline(stateName) {
    const listContainer = document.getElementById("timeline-list-container");
    const emptyMsg = document.getElementById("timeline-empty-message");
    listContainer.innerHTML = "";
    
    const trips = travels[stateName]?.trips || [];
    
    if (trips.length === 0) {
        emptyMsg.classList.remove("hidden");
        return;
    }
    emptyMsg.classList.add("hidden");
    
    // Sort trips chronologically descending by date
    const sorted = [...trips].sort((a, b) => b.date.localeCompare(a.date));
    
    sorted.forEach(trip => {
        const item = document.createElement("div");
        item.className = "timeline-item";
        item.innerHTML = `
            <div class="timeline-node"></div>
            <div class="timeline-content">
                <div class="timeline-hdr-row">
                    <span class="timeline-entry-title">${trip.name}</span>
                    <button class="btn-delete-trip" onclick="deleteTripEntry('${stateName}', '${trip.id}')" title="Delete entry">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </div>
                <div class="timeline-meta-row">
                    <span>${formatMonthYear(trip.date)}</span>
                    <span>•</span>
                    <span class="timeline-type-badge">${trip.type}</span>
                </div>
                ${trip.notes ? `<p class="timeline-desc">${trip.notes}</p>` : ''}
            </div>
        `;
        listContainer.appendChild(item);
    });
}

function deleteTripEntry(stateName, id) {
    if (!travels[stateName]?.trips) return;
    travels[stateName].trips = travels[stateName].trips.filter(t => t.id !== id);
    saveAndRerender();
    selectState(stateName);
    showToast("Trip Removed", "Entry successfully deleted from timeline log.", "info");
}

function handleAddTrip(e) {
    e.preventDefault();
    if (!selectedState) return;
    
    const nameInput = document.getElementById("trip-name");
    const dateInput = document.getElementById("trip-date");
    const typeInput = document.getElementById("trip-type");
    
    const newTrip = {
        id: 'trip-' + Math.random().toString(36).substr(2, 9),
        name: nameInput.value.trim(),
        date: dateInput.value,
        type: typeInput.value,
        notes: '' // Can be supplemented or kept empty
    };
    
    if (!travels[selectedState].trips) travels[selectedState].trips = [];
    travels[selectedState].trips.push(newTrip);
    
    // Automatically mark state as visited if you log a trip!
    if (travels[selectedState].unvisited) {
        travels[selectedState].unvisited = false;
    }
    
    saveAndRerender();
    selectState(selectedState);
    
    // Reset form fields
    nameInput.value = "";
    dateInput.value = "";
    showToast("Trip Logged", `Successfully added new entry to ${selectedState}!`, "success");
}

const formatMonthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function formatMonthYear(ymString) {
    if (!ymString) return "";
    const [year, month] = ymString.split('-');
    return `${formatMonthsArray[parseInt(month, 10) - 1]} ${year}`;
}

// 12. Global Commands & Theme Switching
function toggleMapTheme(themeName) {
    if (!themes[themeName]) return;
    activeTheme = themeName;
    
    // Set theme classes on body
    document.body.className = `theme-${themeName}`;
    
    // Set active status on picker buttons
    ['classic', 'vintage', 'cyber', 'aurora'].forEach(name => {
        const btn = document.getElementById(`theme-${name}`);
        if (btn) {
            if (name === themeName) btn.classList.add("active");
            else btn.classList.remove("active");
        }
    });
    
    saveLocalStorage();
    renderMap();
}

function bulkMarkAll(toVisited) {
    Object.keys(travels).forEach(name => {
        travels[name].unvisited = !toVisited;
        if (!toVisited) {
            // Reset notes & logs on wipe
            travels[name].notes = "";
            travels[name].date = "";
            travels[name].trips = [];
            travels[name].landmarks = [];
        }
    });
    saveAndRerender();
    if (selectedState) selectState(selectedState);
    showToast("Bulk Operations", toVisited ? "All states marked visited!" : "Tracker successfully reset to blank state.", "success");
}

function saveAndRerender() {
    saveLocalStorage();
    renderMap();
    updateDashboard();
    renderLedger();
}

// 13. File Backup, Restoring, and CSV/PDF Exporters
function downloadBackup() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
        travelerName: travelerName,
        travels: travels,
        activeTheme: activeTheme
    }));
    
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", `us_travels_backup_${travelerName.toLowerCase().replace(/\s+/g, '_')}.json`);
    dlAnchorElem.click();
    showToast("Backup Created", "Offline JSON backup downloaded successfully.", "success");
}

function triggerFileInput() {
    document.getElementById('backup-upload-input').click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    restoreDataFromFile(file);
}

function restoreDataFromFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.travels) {
                // Merge import schema safely
                Object.keys(initialTravelData).forEach(state => {
                    if (imported.travels[state]) {
                        travels[state] = {
                            unvisited: imported.travels[state].unvisited !== undefined ? imported.travels[state].unvisited : true,
                            notes: imported.travels[state].notes || "",
                            date: imported.travels[state].date || "",
                            trips: imported.travels[state].trips || [],
                            landmarks: imported.travels[state].landmarks || []
                        };
                    }
                });
                
                travelerName = imported.travelerName || 'My';
                activeTheme = imported.activeTheme || 'classic';
                
                document.getElementById("traveler-name-input").value = travelerName;
                toggleMapTheme(activeTheme);
                saveAndRerender();
                
                if (selectedState) selectState(selectedState);
                showToast("Import Success", `Successfully loaded records for ${travelerName}'s map!`, "success");
            } else {
                showToast("Invalid Structure", "Imported file does not contain compatible travel tracker states.", "error");
            }
        } catch(err) {
            showToast("Parse Failed", "Could not parse JSON files. Ensure the file is not corrupted.", "error");
        }
    };
    reader.readAsText(file);
}

function exportToCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    // CSV Header
    csvContent += "State Name,Status,General Notes,Checked Landmarks Count,Total Trips Logged,Trip Details\r\n";
    
    const csvRows = [];
    Object.keys(travels).sort().forEach(stateName => {
        const item = travels[stateName];
        const statusText = item.unvisited ? "Bucket List" : "Visited";
        const cleanNotes = (item.notes || "").replace(/"/g, '""');
        const checkedLandmarks = (item.landmarks || []).length;
        
        const trips = item.trips || [];
        const tripDetailsStr = trips.map(t => `${t.name} (${formatMonthYear(t.date)}) [${t.type}]`).join(" | ").replace(/"/g, '""');
        
        csvRows.push(`"${stateName}","${statusText}","${cleanNotes}",${checkedLandmarks},${trips.length},"${tripDetailsStr}"`);
    });
    
    csvContent += csvRows.join("\r\n") + "\r\n";

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `us_travel_statistics_${travelerName.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showToast("CSV Exported", "Stats exported as spreadsheet compatible CSV.", "success");
}

// 14. Drag and Drop triggers
function setupDragAndDrop() {
    const dropZone = document.getElementById("drop-zone");
    
    window.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("dragover");
    });
    
    window.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
    });
    
    window.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("dragover");
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.json')) {
            restoreDataFromFile(file);
        } else {
            showToast("Invalid File Type", "Please drop a .json backup file.", "error");
        }
    });
}

// 15. Cloud Synced Operations & Deep Links
async function saveToCloud() {
    if (!firebaseReady) {
        showToast("Local Only", "Synchronization configuration is not configured. Saving strictly offline.", "info");
        return;
    }
    
    const btn = document.getElementById("btn-cloud-sync");
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Syncing...`;
    
    try {
        if (!currentSyncCode) {
            currentSyncCode = 'MAP-' + Math.random().toString(36).substr(2, 6).toUpperCase();
        }
        
        const payload = {
            travelerName: travelerName,
            travels: travels,
            activeTheme: activeTheme,
            updatedAt: new Date().toISOString()
        };
        
        await window.firebaseSaveToCloud(payload);
        
        saveLocalStorage();
        
        // Update badge UI
        const badge = document.getElementById("sync-status-badge");
        badge.textContent = "Synced to Cloud";
        badge.className = "sync-badge synced";
        
        document.getElementById("display-sync-code").textContent = currentSyncCode;
        document.getElementById("cloud-info-box").classList.add("hidden");
        document.getElementById("sync-success-box").classList.remove("hidden");
        
        showToast("Sync Successful", `Backed up to cloud. Code: ${currentSyncCode}`, "success");
    } catch (e) {
        console.error("Cloud saving failed", e);
        showToast("Cloud Failure", "Could not backup to servers. Running offline instead.", "error");
    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

async function loadFromCloudCode() {
    const rawCode = document.getElementById("sync-code-input").value.trim().toUpperCase();
    if (!rawCode) {
        showToast("Validation Error", "Please key in a valid sync code.", "error");
        return;
    }
    
    if (!firebaseReady) {
        showToast("Local Only", "Cloud database is currently disabled.", "error");
        return;
    }
    
    try {
        const data = await window.firebaseLoadFromCloud(rawCode);
        if (data) {
            // Merge import schema safely
            Object.keys(initialTravelData).forEach(state => {
                if (data.travels[state]) {
                    travels[state] = {
                        unvisited: data.travels[state].unvisited !== undefined ? data.travels[state].unvisited : true,
                        notes: data.travels[state].notes || "",
                        date: data.travels[state].date || "",
                        trips: data.travels[state].trips || [],
                        landmarks: data.travels[state].landmarks || []
                    };
                }
            });
            
            travelerName = data.travelerName || 'My';
            activeTheme = data.activeTheme || 'classic';
            currentSyncCode = rawCode;
            
            document.getElementById("traveler-name-input").value = travelerName;
            toggleMapTheme(activeTheme);
            saveAndRerender();
            
            if (selectedState) selectState(selectedState);
            
            document.getElementById("display-sync-code").textContent = currentSyncCode;
            document.getElementById("cloud-info-box").classList.add("hidden");
            document.getElementById("sync-success-box").classList.remove("hidden");
            
            const badge = document.getElementById("sync-status-badge");
            badge.textContent = "Synced to Cloud";
            badge.className = "sync-badge synced";
            
            showToast("Cloud Load Complete", `Imported records for ${travelerName}'s adventure!`, "success");
        } else {
            showToast("Code Not Found", "No map configuration exists with that sync code.", "error");
        }
    } catch (e) {
        console.error("Cloud fetching failed", e);
        showToast("Sync Loading Error", "Could not query data from servers.", "error");
    }
}


function copyShareableLink() {
    const payload = JSON.stringify({
        travelerName: travelerName,
        travels: travels,
        activeTheme: activeTheme
    });
    const encodedData = btoa(encodeURIComponent(payload));
    const shareUrl = `${window.location.origin}${window.location.pathname}?data=${encodedData}`;

    const tempInput = document.createElement("input");
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast("Link Copied", "Shareable URL copied to clipboard!", "success");
}

function copySyncLink() {
    const shareUrl = `${window.location.origin}${window.location.pathname}?mapId=${currentSyncCode}`;
    const tempInput = document.createElement("input");
    tempInput.value = shareUrl;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    showToast("Link Copied", "Shareable custom URL copied to clipboard!", "success");
}

function resetSyncView() {
    document.getElementById("sync-success-box").classList.add("hidden");
    document.getElementById("cloud-info-box").classList.remove("hidden");
}


function checkDataQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const dataParam = urlParams.get('data');
    if (dataParam) {
        try {
            const decodedData = decodeURIComponent(atob(dataParam));
            const imported = JSON.parse(decodedData);
            if (imported.travels) {
                // Merge import schema safely
                Object.keys(initialTravelData).forEach(state => {
                    if (imported.travels[state]) {
                        travels[state] = {
                            unvisited: imported.travels[state].unvisited !== undefined ? imported.travels[state].unvisited : true,
                            notes: imported.travels[state].notes || "",
                            date: imported.travels[state].date || "",
                            trips: imported.travels[state].trips || [],
                            landmarks: imported.travels[state].landmarks || []
                        };
                    }
                });

                travelerName = imported.travelerName || 'My';
                activeTheme = imported.activeTheme || 'classic';

                const nameInput = document.getElementById("traveler-name-input");
                if (nameInput) nameInput.value = travelerName;
                toggleMapTheme(activeTheme);
                saveAndRerender();

                if (selectedState) selectState(selectedState);

                // Clear the URL parameter so refreshing doesn't keep reloading it
                window.history.replaceState({}, document.title, window.location.pathname);

                showToast("Import Success", `Successfully loaded shared map for ${travelerName}!`, "success");
            }
        } catch (e) {
            console.error("Failed to parse data URL parameter", e);
            showToast("Import Failed", "The shared link is invalid or corrupted.", "error");
        }
    }
}

async function checkSyncQueryParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const urlMapId = urlParams.get('mapId');
    if (urlMapId && firebaseReady) {
        document.getElementById("sync-code-input").value = urlMapId;
        await loadFromCloudCode();
    }
}

// 16. Event Bindings and Setup
function setupEvents() {
    document.getElementById("search-input").addEventListener("input", renderLedger);
    document.getElementById("status-filter").addEventListener("change", renderLedger);
    document.getElementById("backup-upload-input").addEventListener("change", handleFileUpload);
    document.getElementById("add-trip-form").addEventListener("submit", handleAddTrip);
    
    // Bind traveler name changes
    document.getElementById("traveler-name-input").addEventListener("change", function(e) {
        let val = e.target.value.trim();
        if (!val) val = 'My';
        travelerName = val;
        saveLocalStorage();
        showToast("Name Updated", `Personalized map for: ${travelerName}`, "success");
    });
}

// Expose visual operations to window scope for HTML bindings
window.toggleMapTheme = toggleMapTheme;
window.toggleStateStatus = toggleStateStatus;
window.selectState = selectState;
window.saveStateDetails = saveStateDetails;
window.bulkMarkAll = bulkMarkAll;
window.saveToCloud = saveToCloud;
window.loadFromCloudCode = loadFromCloudCode;
window.downloadBackup = downloadBackup;
window.triggerFileInput = triggerFileInput;
window.copySyncLink = copySyncLink;
window.copyShareableLink = copyShareableLink;
window.resetSyncView = resetSyncView;
window.exportToCSV = exportToCSV;
window.zoomInMap = zoomInMap;
window.zoomOutMap = zoomOutMap;
window.resetMapZoom = resetMapZoom;
window.deleteTripEntry = deleteTripEntry;
window.formatMonthYear = formatMonthYear;

// Bootstrapping
window.onload = function() {
    loadLocalStorage();
    setupEvents();
    setupDragAndDrop();
    initMap();
    initFirebase();
    checkDataQueryParam();
    toggleMapTheme(activeTheme);
};
