const app = require('../app.js');

describe('toggleLandmarkStatus', () => {
    let mockTravels;
    let originalTravels;

    beforeEach(() => {
        // Setup mock data
        mockTravels = {
            "California": {
                unvisited: true,
                landmarks: ["Golden Gate Bridge"]
            },
            "Colorado": {
                unvisited: false,
                landmarks: ["Rocky Mountain National Park"]
            },
            "Nevada": {
                unvisited: true
            }
        };

        // Save original and set mock
        originalTravels = app.travels;
        app.setTravels(mockTravels);

        // We cannot easily mock saveAndRerender or selectState because they are defined and called inside the same module.
        // But we can check that they don't crash by mocking DOM APIs.
        // We did that in setup.js.
    });

    afterEach(() => {
        // Restore original
        app.setTravels(originalTravels);
    });

    it('should add a landmark if it does not exist', () => {
        app.toggleLandmarkStatus("California", "Yosemite Valley");

        expect(mockTravels["California"].landmarks).toContain("Yosemite Valley");
        expect(mockTravels["California"].landmarks.length).toBe(2);
    });

    it('should remove a landmark if it already exists', () => {
        app.toggleLandmarkStatus("California", "Golden Gate Bridge");

        expect(mockTravels["California"].landmarks).not.toContain("Golden Gate Bridge");
        expect(mockTravels["California"].landmarks.length).toBe(0);
    });

    it('should mark state as visited (unvisited: false) when checking off a landmark in an unvisited state', () => {
        // State starts as unvisited = true
        expect(mockTravels["California"].unvisited).toBe(true);

        app.toggleLandmarkStatus("California", "Disneyland");

        expect(mockTravels["California"].landmarks).toContain("Disneyland");
        expect(mockTravels["California"].unvisited).toBe(false);
    });

    it('should not change unvisited status when removing a landmark', () => {
        // State starts as unvisited = true
        expect(mockTravels["California"].unvisited).toBe(true);

        app.toggleLandmarkStatus("California", "Golden Gate Bridge");

        expect(mockTravels["California"].landmarks).not.toContain("Golden Gate Bridge");
        expect(mockTravels["California"].unvisited).toBe(true);
    });

    it('should not change unvisited status when adding a landmark in a visited state', () => {
        expect(mockTravels["Colorado"].unvisited).toBe(false);

        app.toggleLandmarkStatus("Colorado", "Garden of the Gods");

        expect(mockTravels["Colorado"].landmarks).toContain("Garden of the Gods");
        expect(mockTravels["Colorado"].unvisited).toBe(false);
    });

    it('should correctly handle a state with no existing landmarks array', () => {
        app.toggleLandmarkStatus("Nevada", "Las Vegas Strip");

        expect(mockTravels["Nevada"].landmarks).toContain("Las Vegas Strip");
        expect(mockTravels["Nevada"].landmarks.length).toBe(1);
        expect(mockTravels["Nevada"].unvisited).toBe(false);
    });
});
