describe('loadFromCloudCode Error Paths', () => {
    beforeEach(() => {
        // Reset DOM
        document.body.innerHTML = `
            <input id="sync-code-input" />
            <div id="cloud-info-box"></div>
            <div id="sync-success-box" class="hidden"></div>
            <span id="sync-status-badge"></span>
            <input id="traveler-name-input" />
            <span id="display-sync-code"></span>
            <div id="toast-container"></div>
        `;

        // Reset globals
        global.window.firebaseLoadFromCloud = jest.fn();

        jest.isolateModules(() => {
            require('../app.js');
        });

        window.setFirebaseReadyForTesting(true);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should test validation error (empty code)', async () => {
        document.getElementById("sync-code-input").value = "  "; // empty
        await window.loadFromCloudCode();

        const toasts = document.querySelectorAll('.toast');
        expect(toasts.length).toBeGreaterThan(0);
        expect(toasts[toasts.length - 1].innerHTML).toContain("Validation Error");
        expect(toasts[toasts.length - 1].innerHTML).toContain("Please key in a valid sync code.");
    });

    it('should test local only error (firebase disabled)', async () => {
        document.getElementById("sync-code-input").value = " VALIDCODE ";
        window.setFirebaseReadyForTesting(false);
        await window.loadFromCloudCode();

        const toasts = document.querySelectorAll('.toast');
        expect(toasts.length).toBeGreaterThan(0);
        expect(toasts[toasts.length - 1].innerHTML).toContain("Local Only");
        expect(toasts[toasts.length - 1].innerHTML).toContain("Cloud database is currently disabled.");
    });

    it('should test code not found error (null data)', async () => {
        document.getElementById("sync-code-input").value = " INVALIDCODE ";
        global.window.firebaseLoadFromCloud.mockResolvedValue(null);
        await window.loadFromCloudCode();

        const toasts = document.querySelectorAll('.toast');
        expect(toasts.length).toBeGreaterThan(0);
        expect(toasts[toasts.length - 1].innerHTML).toContain("Code Not Found");
        expect(toasts[toasts.length - 1].innerHTML).toContain("No map configuration exists with that sync code.");
    });

    it('should test sync loading error (exception thrown)', async () => {
        document.getElementById("sync-code-input").value = " VALIDCODE ";

        // Hide console.error for this test
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        global.window.firebaseLoadFromCloud.mockRejectedValue(new Error("Network Error"));
        await window.loadFromCloudCode();

        const toasts = document.querySelectorAll('.toast');
        expect(toasts.length).toBeGreaterThan(0);
        expect(toasts[toasts.length - 1].innerHTML).toContain("Sync Loading Error");
        expect(toasts[toasts.length - 1].innerHTML).toContain("Could not query data from servers.");

        expect(consoleSpy).toHaveBeenCalledWith("Cloud fetching failed", expect.any(Error));
        consoleSpy.mockRestore();
    });
});
