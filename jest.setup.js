// Basic setup for app.js tests
global.d3 = {
    select: jest.fn().mockReturnValue({
        append: jest.fn(),
        selectAll: jest.fn().mockReturnValue({
            data: jest.fn().mockReturnValue({
                join: jest.fn().mockReturnValue({
                    attr: jest.fn().mockReturnThis(),
                    on: jest.fn().mockReturnThis()
                })
            })
        }),
        call: jest.fn()
    }),
    geoAlbersUsa: jest.fn().mockReturnValue({
        scale: jest.fn().mockReturnValue({
            translate: jest.fn()
        })
    }),
    geoPath: jest.fn().mockReturnValue({
        projection: jest.fn()
    }),
    zoom: jest.fn().mockReturnValue({
        scaleExtent: jest.fn().mockReturnThis(),
        on: jest.fn().mockReturnThis()
    }),
    zoomIdentity: {
        translate: jest.fn().mockReturnThis(),
        scale: jest.fn().mockReturnThis()
    }
};

global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn()
};
