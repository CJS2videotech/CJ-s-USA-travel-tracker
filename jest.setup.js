// Mock D3 globally since app.js executes on require and depends on it
global.d3 = {
    select: jest.fn().mockReturnValue({
        append: jest.fn().mockReturnValue({
            append: jest.fn().mockReturnThis(),
            attr: jest.fn().mockReturnThis(),
            selectAll: jest.fn().mockReturnThis(),
            data: jest.fn().mockReturnThis(),
            enter: jest.fn().mockReturnThis(),
            on: jest.fn().mockReturnThis(),
            style: jest.fn().mockReturnThis(),
            classed: jest.fn().mockReturnThis(),
            transition: jest.fn().mockReturnThis(),
            duration: jest.fn().mockReturnThis()
        }),
        attr: jest.fn().mockReturnThis(),
        style: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis(),
        selectAll: jest.fn().mockReturnThis(),
        call: jest.fn().mockReturnThis()
    }),
    geoAlbersUsa: jest.fn().mockReturnValue({
        scale: jest.fn().mockReturnThis(),
        translate: jest.fn().mockReturnThis(),
        invert: jest.fn().mockReturnValue([0, 0])
    }),
    geoPath: jest.fn().mockReturnValue({
        projection: jest.fn().mockReturnValue({
             bounds: jest.fn().mockReturnValue([[0, 0], [100, 100]])
        })
    }),
    zoom: jest.fn().mockReturnValue({
        scaleExtent: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis()
    }),
    zoomIdentity: {
        translate: jest.fn().mockReturnThis(),
        scale: jest.fn().mockReturnThis(),
    }
};

global.topojson = {
    feature: jest.fn().mockReturnValue({ features: [] }),
    mesh: jest.fn().mockReturnValue({})
};

// Also app.js uses window
global.window = window;

// DOM setup for app.js initialization
document.body.innerHTML = `
    <svg id="us-svg-map"></svg>
    <div id="map-loader"></div>
    <div class="zoom-hud-btn" onclick="resetZoom()"><i class="fa-solid fa-compress"></i></div>
    <div class="zoom-hud-btn" onclick="zoomIn()"><i class="fa-solid fa-magnifying-glass-plus"></i></div>
    <div class="zoom-hud-btn" onclick="zoomOut()"><i class="fa-solid fa-magnifying-glass-minus"></i></div>
`;
