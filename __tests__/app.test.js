const fs = require('fs');
const path = require('path');

describe('loadLocalStorage error handling', () => {
    let originalConsoleWarn;

    beforeEach(() => {
        // Setup minimal DOM
        document.body.innerHTML = '<div id="map"></div>';

        // Mock required globals before evaluating script
        window.d3 = {
            select: jest.fn().mockReturnValue({
                append: jest.fn().mockReturnThis(),
                attr: jest.fn().mockReturnThis(),
                style: jest.fn().mockReturnThis(),
                call: jest.fn().mockReturnThis(),
                on: jest.fn().mockReturnThis()
            }),
            zoom: jest.fn().mockReturnValue({
                scaleExtent: jest.fn().mockReturnThis(),
                on: jest.fn().mockReturnThis()
            }),
            geoAlbersUsa: jest.fn().mockReturnValue({
                scale: jest.fn().mockReturnThis(),
                translate: jest.fn().mockReturnThis()
            }),
            geoPath: jest.fn().mockReturnValue({})
        };

        window.topojson = {
            feature: jest.fn().mockReturnValue({ features: [] })
        };

        // Spy on console.warn
        originalConsoleWarn = console.warn;
        console.warn = jest.fn();
    });

    afterEach(() => {
        console.warn = originalConsoleWarn;
        jest.restoreAllMocks();
    });

    it('should catch errors when localStorage access throws (e.g. quota exceeded or disabled)', () => {
        // Mock localStorage.getItem to throw
        const error = new Error('SecurityError: localStorage is disabled');
        const getItemMock = jest.spyOn(window.localStorage.__proto__, 'getItem');
        getItemMock.mockImplementation(() => {
            throw error;
        });

        // Load and evaluate app.js
        const scriptPath = path.resolve(__dirname, '../app.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');

        // Use eval to run script in current context so we can access variables
        // We only want to test loadLocalStorage, so we can isolate it by extracting just the function
        const loadLocalStorageRegex = /function loadLocalStorage\(\) \{[\s\S]*?\} catch \(e\) \{[\s\S]*?\}[\s\S]*?\}/;
        const match = scriptContent.match(loadLocalStorageRegex);

        // Mock initialTravelData and other variables required by loadLocalStorage
        window.initialTravelData = { "Alabama": {} };
        window.travels = {};
        window.travelerName = "";
        window.activeTheme = "";
        window.currentSyncCode = "";

        // Execute the function string
        eval(match[0]);

        // Call it
        expect(() => {
            loadLocalStorage();
        }).not.toThrow(); // Should not crash

        // Check console.warn was called with the error
        expect(console.warn).toHaveBeenCalledWith("Failed to load local storage.", error);

        getItemMock.mockRestore();
    });

    it('should catch errors when JSON.parse throws on invalid data', () => {
        // Mock localStorage to return invalid JSON
        const getItemMock = jest.spyOn(window.localStorage.__proto__, 'getItem');
        getItemMock.mockImplementation((key) => {
            if (key === 'us_travel_data_map') return '{ invalid json';
            return null;
        });

        // Load script
        const scriptPath = path.resolve(__dirname, '../app.js');
        const scriptContent = fs.readFileSync(scriptPath, 'utf8');

        const loadLocalStorageRegex = /function loadLocalStorage\(\) \{[\s\S]*?\} catch \(e\) \{[\s\S]*?\}[\s\S]*?\}/;
        const match = scriptContent.match(loadLocalStorageRegex);

        // Setup state
        window.initialTravelData = { "Alabama": {} };
        window.travels = {};
        window.travelerName = "";
        window.activeTheme = "";
        window.currentSyncCode = "";

        // Execute the function definition
        eval(match[0]);

        // Call it
        expect(() => {
            loadLocalStorage();
        }).not.toThrow(); // Should not crash

        // Check console.warn was called with a SyntaxError
        expect(console.warn).toHaveBeenCalledWith(
            "Failed to load local storage.",
            expect.any(SyntaxError)
        );

        getItemMock.mockRestore();
    });
});
