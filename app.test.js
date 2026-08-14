const fs = require('fs');
const path = require('path');
const { Script } = require('vm');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const jsCode = fs.readFileSync(path.resolve(__dirname, './app.js'), 'utf8');

describe('deleteTripEntry', () => {
    beforeAll(() => {
        document.documentElement.innerHTML = html.toString();

        const mockD3Selection = {
            append: jest.fn().mockReturnThis(),
            attr: jest.fn().mockReturnThis(),
            style: jest.fn().mockReturnThis(),
            selectAll: jest.fn().mockReturnThis(),
            remove: jest.fn().mockReturnThis(),
            on: jest.fn().mockReturnThis(),
            call: jest.fn().mockReturnThis(),
            data: jest.fn().mockReturnThis(),
            join: jest.fn().mockReturnThis(),
            html: jest.fn().mockReturnThis(),
            transition: jest.fn().mockReturnThis(),
            duration: jest.fn().mockReturnThis(),
            raise: jest.fn().mockReturnThis()
        };

        window.d3 = {
            select: jest.fn().mockReturnValue(mockD3Selection),
            geoAlbersUsa: jest.fn().mockReturnValue({ scale: jest.fn().mockReturnThis(), translate: jest.fn().mockReturnThis() }),
            geoPath: jest.fn().mockReturnValue({ projection: jest.fn().mockReturnThis(), centroid: jest.fn().mockReturnValue([0, 0]) }),
            zoom: jest.fn().mockReturnValue({ scaleExtent: jest.fn().mockReturnThis(), on: jest.fn().mockReturnThis(), scaleBy: jest.fn(), transform: jest.fn() }),
            zoomIdentity: { translate: jest.fn().mockReturnThis(), scale: jest.fn().mockReturnThis() },
            pointer: jest.fn()
        };
        global.d3 = window.d3;

        window.topojson = { feature: jest.fn().mockReturnValue({ features: [] }) };
        global.topojson = window.topojson;
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ objects: { states: { type: "GeometryCollection", geometries: [] } }, arcs: [], type: "Topology" })
        });

        // App.js explicitly sets global bindings on window (e.g. window.deleteTripEntry = deleteTripEntry)
        // Using Function ensures evaluating in a closed scope but the window assignment surfaces
        // the required interface for the tests without vm context cross-pollination errors in JSDOM.
        new Function(jsCode)();
    });

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        localStorage.clear();
    });

    it('removes the specified trip and updates the UI', () => {
        const initialState = {
            "California": {
                unvisited: false,
                notes: "",
                date: "",
                trips: [
                    { id: "trip-1", name: "Yosemite", date: "2023-05", type: "Vacation" },
                    { id: "trip-2", name: "SF Tech Conference", date: "2023-09", type: "Business" }
                ],
                landmarks: []
            }
        };
        localStorage.setItem('us_travel_data_map', JSON.stringify(initialState));

        window.onload();
        window.selectState("California");

        const timelineContainer = document.getElementById("timeline-list-container");
        expect(timelineContainer.innerHTML).toContain("Yosemite");
        expect(timelineContainer.innerHTML).toContain("SF Tech Conference");

        window.deleteTripEntry("California", "trip-1");

        const updatedStorage = JSON.parse(localStorage.getItem('us_travel_data_map'));
        expect(updatedStorage["California"].trips).toHaveLength(1);
        expect(updatedStorage["California"].trips[0].id).toBe("trip-2");

        expect(timelineContainer.innerHTML).not.toContain("Yosemite");
        expect(timelineContainer.innerHTML).toContain("SF Tech Conference");

        const toastContainer = document.getElementById("toast-container");
        expect(toastContainer.innerHTML).toContain("Trip Removed");
    });

    it('returns early if state or trips do not exist', () => {
        window.onload();

        expect(() => {
            window.deleteTripEntry("UnknownState", "trip-1");
        }).not.toThrow();

        expect(() => {
            window.deleteTripEntry("Texas", "trip-1");
        }).not.toThrow();
    });
});
