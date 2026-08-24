/**
 * @jest-environment jsdom
 */

// Mock globals required by app.js
global.d3 = {
    select: jest.fn().mockReturnValue({
        append: jest.fn().mockReturnValue({
            selectAll: jest.fn().mockReturnValue({
                remove: jest.fn(),
                data: jest.fn().mockReturnValue({
                    join: jest.fn().mockReturnValue({
                        attr: jest.fn().mockReturnThis(),
                        on: jest.fn().mockReturnThis()
                    })
                })
            }),
            append: jest.fn().mockReturnValue({
                attr: jest.fn().mockReturnThis(),
                html: jest.fn().mockReturnThis(),
                on: jest.fn().mockReturnThis()
            }),
            attr: jest.fn().mockReturnThis()
        }),
        style: jest.fn().mockReturnThis(),
        call: jest.fn(),
        on: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnValue({
            empty: jest.fn().mockReturnValue(true),
            attr: jest.fn().mockReturnThis()
        }),
        selectAll: jest.fn().mockReturnValue({
            remove: jest.fn()
        }),
        transition: jest.fn().mockReturnValue({
            duration: jest.fn().mockReturnValue({
                call: jest.fn()
            })
        })
    }),
    geoAlbersUsa: jest.fn().mockReturnValue({
        scale: jest.fn().mockReturnThis(),
        translate: jest.fn().mockReturnThis(),
        invert: jest.fn()
    }),
    geoPath: jest.fn().mockReturnValue({
        projection: jest.fn().mockReturnThis(),
        centroid: jest.fn()
    }),
    zoom: jest.fn().mockReturnValue({
        scaleExtent: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis(),
        scaleBy: jest.fn(),
        transform: jest.fn()
    }),
    zoomIdentity: {
        translate: jest.fn().mockReturnThis(),
        scale: jest.fn().mockReturnThis()
    },
    pointer: jest.fn()
};

global.topojson = {
    feature: jest.fn().mockReturnValue({ features: [] })
};

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ objects: { states: {} } }),
  })
);

// Set up minimal HTML needed by app.js
document.body.innerHTML = `
    <div id="us-svg-map"></div>
    <div id="toast-container"></div>
    <div id="sync-status-badge"></div>
    <div id="map-loader"></div>
    <div id="map-parent"></div>
    <div id="map-tooltip"></div>
    <div id="coordinates-hud"></div>
    <div id="states-list-container"></div>
    <input id="search-input" value="" />
    <select id="status-filter"><option value="all">All</option></select>
    <span id="ledger-count"></span>
    <span id="visited-counter"></span>
    <span id="unvisited-counter"></span>
    <span id="percent-counter"></span>
    <svg id="percent-ring" style="stroke-dasharray: 0; stroke-dashoffset: 0;"></svg>
    <span id="landmarks-counter"></span>
    <div id="regions-progress-container"></div>
    <div id="inspector-placeholder"></div>
    <div id="inspector-content" class="hidden"></div>
    <span id="inspector-name"></span>
    <span id="inspector-badge"></span>
    <span id="inspector-status-text"></span>
    <button id="inspector-toggle-btn"></button>
    <span id="info-status-pill"></span>
    <textarea id="state-memo"></textarea>
    <div id="landmarks-list-container"></div>
    <div id="timeline-list-container"></div>
    <div id="timeline-empty-message"></div>
    <input id="trip-name" value="" />
    <input id="trip-date" value="" />
    <input id="trip-type" value="" />
    <button id="theme-classic"></button>
    <button id="theme-vintage"></button>
    <button id="theme-cyber"></button>
    <button id="theme-aurora"></button>
    <input id="traveler-name-input" value="" />
    <input id="backup-upload-input" type="file" />
    <form id="add-trip-form"></form>
    <div id="drop-zone"></div>
    <button id="btn-cloud-sync"></button>
    <span id="display-sync-code"></span>
    <div id="cloud-info-box"></div>
    <div id="sync-success-box"></div>
    <input id="sync-code-input" value="" />
`;

describe("App Tests", () => {
    beforeAll(async () => {
        require('./app.js');
        window.onload();
        await new Promise(r => setTimeout(r, 100));
    });

    beforeEach(() => {
        document.getElementById('toast-container').innerHTML = '';
        localStorage.clear();
        window.onload();
    });

    test("should toggle map theme correctly", () => {
        window.toggleMapTheme('vintage');
        expect(document.body.className).toBe('theme-vintage');
        expect(localStorage.getItem('us_travel_map_theme')).toBe('vintage');
    });

    test("should update state status correctly", () => {
        window.selectState("California");
        const initialTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        const initialState = initialTravels["California"].unvisited;

        window.toggleStateStatus("California");

        const newTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        expect(newTravels["California"].unvisited).toBe(!initialState);
    });

    test("should update state memo correctly", () => {
        window.selectState("California");
        document.getElementById("state-memo").value = "Great trip to SF";

        window.saveStateDetails();

        const newTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        expect(newTravels["California"].notes).toBe("Great trip to SF");
    });

    test("should bulk mark all states", () => {
        window.bulkMarkAll(true);

        const newTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        Object.keys(newTravels).forEach(state => {
            expect(newTravels[state].unvisited).toBe(false);
        });

        window.bulkMarkAll(false);

        const resetTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        Object.keys(resetTravels).forEach(state => {
            expect(resetTravels[state].unvisited).toBe(true);
            expect(resetTravels[state].notes).toBe("");
        });
    });

    test("should add and remove a trip correctly", () => {
        window.selectState("California");

        document.getElementById("trip-name").value = "Disneyland Trip";
        document.getElementById("trip-date").value = "2023-10";
        document.getElementById("trip-type").value = "Vacation";

        const form = document.getElementById("add-trip-form");
        form.dispatchEvent(new Event("submit"));

        const newTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        const trips = newTravels["California"].trips;
        expect(trips.length).toBeGreaterThan(0);
        expect(trips[0].name).toBe("Disneyland Trip");

        const tripId = trips[0].id;
        window.deleteTripEntry("California", tripId);

        const updatedTravels = JSON.parse(localStorage.getItem('us_travel_data_map'));
        expect(updatedTravels["California"].trips.length).toBe(0);
    });

    test("should fetch map data and initialize map", async () => {
        expect(global.fetch).toHaveBeenCalledWith("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
        expect(document.getElementById('map-loader').style.display).toBe('none');
    });

    test("should zoom map correctly", () => {
        window.zoomInMap();
        expect(global.d3.select().transition().duration().call).toHaveBeenCalled();

        window.zoomOutMap();
        expect(global.d3.select().transition().duration().call).toHaveBeenCalled();

        window.resetMapZoom();
        expect(global.d3.select().transition().duration().call).toHaveBeenCalled();
    });
});
