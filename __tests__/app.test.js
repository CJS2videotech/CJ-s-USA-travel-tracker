const app = require('../app.js');

describe('initMap error handling', () => {
    // Save original fetch
    const originalFetch = global.fetch;
    const originalConsoleError = console.error;

    beforeEach(() => {
        // Setup DOM
        document.body.innerHTML = `
            <div id="map-loader"></div>
        `;

        // Setup mocks
        jest.resetAllMocks();
        console.error = jest.fn(); // Suppress console.error output during tests

        // Set up required globals that are used in app.js
        global.renderMap = jest.fn();
        global.updateDashboard = jest.fn();
        global.renderLedger = jest.fn();
        global.selectState = jest.fn();
        global.travels = {};
        global.usMapData = null;
    });

    afterAll(() => {
        // Restore original fetch
        global.fetch = originalFetch;
        console.error = originalConsoleError;
    });

    test('should handle fetch network errors gracefully', async () => {
        // Mock fetch to simulate network error (promise rejection)
        global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

        await app.initMap();

        // Assertions
        expect(global.fetch).toHaveBeenCalledWith("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
        expect(console.error).toHaveBeenCalled();

        const loader = document.getElementById('map-loader');
        expect(loader.innerHTML).toContain('Vector Canvas Error');
        expect(loader.innerHTML).toContain('Could not download geographic boundary assets');
        expect(loader.innerHTML).toContain('fa-triangle-exclamation');
        expect(loader.innerHTML).toContain('Retry Render');
    });

    test('should handle non-ok HTTP responses gracefully', async () => {
        // Mock fetch to simulate a 404 response
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
            status: 404,
            statusText: 'Not Found'
        });

        await app.initMap();

        // Assertions
        expect(global.fetch).toHaveBeenCalledWith("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json");
        expect(console.error).toHaveBeenCalled();

        const loader = document.getElementById('map-loader');
        expect(loader.innerHTML).toContain('Vector Canvas Error');
        expect(loader.innerHTML).toContain('Could not download geographic boundary assets');
        expect(loader.innerHTML).toContain('fa-triangle-exclamation');
        expect(loader.innerHTML).toContain('Retry Render');
    });
});
