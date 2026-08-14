/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const appJsPath = path.resolve(__dirname, 'app.js');
const appJsCode = fs.readFileSync(appJsPath, 'utf8');

describe('saveToCloud error path', () => {
    let originalConsoleError;

    beforeEach(() => {
        // Reset DOM and provide exactly the elements needed by saveToCloud
        // because they seem to be missing in index.html (or injected dynamically)
        document.body.innerHTML = `
            <div id="toast-container"></div>
            <button id="btn-cloud-sync">Original Sync Text</button>
            <span id="sync-status-badge"></span>
            <div id="display-sync-code"></div>
            <div id="cloud-info-box"></div>
            <div id="sync-success-box" class="hidden"></div>
        `;

        // Mock window methods
        window.firebaseSaveToCloud = jest.fn();

        // Mock D3 and TopoJSON globally
        window.d3 = {
            select: jest.fn().mockReturnValue({
                append: jest.fn().mockReturnValue({
                    selectAll: jest.fn().mockReturnValue({
                        remove: jest.fn()
                    })
                }),
                call: jest.fn(),
                on: jest.fn()
            }),
            geoAlbersUsa: jest.fn().mockReturnValue({
                scale: jest.fn().mockReturnThis(),
                translate: jest.fn().mockReturnThis()
            }),
            geoPath: jest.fn().mockReturnValue({
                projection: jest.fn()
            }),
            zoom: jest.fn().mockReturnValue({
                scaleExtent: jest.fn().mockReturnThis(),
                on: jest.fn().mockReturnThis()
            })
        };

        window.topojson = {
            feature: jest.fn().mockReturnValue({ features: [] })
        };

        // Mock console.error to avoid polluting test output
        originalConsoleError = console.error;
        console.error = jest.fn();
    });

    afterEach(() => {
        console.error = originalConsoleError;
        jest.restoreAllMocks();
    });

    it('should show error toast and reset button when window.firebaseSaveToCloud rejects', async () => {
        // Evaluate the original code directly
        global.d3 = window.d3;
        global.topojson = window.topojson;
        // Evaluate the code to set up global environment
        eval(appJsCode);

        // Explicitly set the now-window property
        window.firebaseReady = true;

        // Setup the reject mock
        const mockError = new Error("Network error");
        window.firebaseSaveToCloud.mockRejectedValueOnce(mockError);

        // Get initial button state
        const btn = document.getElementById("btn-cloud-sync");
        const originalText = btn.innerHTML;

        // Call the function
        await window.saveToCloud();

        // Verification 1: window.firebaseSaveToCloud was called
        expect(window.firebaseSaveToCloud).toHaveBeenCalled();

        // Verification 2: Button should be reset to original state
        expect(btn.disabled).toBe(false);
        expect(btn.innerHTML).toBe(originalText);

        // Verification 3: Toast should be shown
        const toastContainer = document.getElementById("toast-container");
        const toasts = toastContainer.querySelectorAll('.toast');
        expect(toasts.length).toBeGreaterThan(0);

        const lastToast = toasts[toasts.length - 1];
        expect(lastToast.innerHTML).toContain('Cloud Failure');
        expect(lastToast.innerHTML).toContain('Could not backup to servers');
        expect(lastToast.innerHTML).toContain('fa-circle-exclamation');
        expect(lastToast.innerHTML).toContain('color-red');

        // Verification 4: console.error was called
        expect(console.error).toHaveBeenCalledWith("Cloud saving failed", mockError);
    });
});
