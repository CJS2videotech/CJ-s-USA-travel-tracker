global.d3 = {
    select: jest.fn().mockReturnValue({
        append: jest.fn().mockReturnValue({
            attr: jest.fn().mockReturnThis()
        }),
        call: jest.fn()
    }),
    geoAlbersUsa: jest.fn().mockReturnValue({
        scale: jest.fn().mockReturnValue({
            translate: jest.fn().mockReturnValue({})
        })
    }),
    geoPath: jest.fn().mockReturnValue({
        projection: jest.fn().mockReturnValue({})
    }),
    zoom: jest.fn().mockReturnValue({
        scaleExtent: jest.fn().mockReturnValue({
            on: jest.fn().mockReturnValue({})
        })
    })
};
global.window = {};
global.document = {
    getElementById: jest.fn().mockImplementation((id) => {
        if (id === 'search-input' || id === 'status-filter' || id === 'state-memo') {
            return { value: '' };
        }
        return {
            addEventListener: jest.fn(),
            appendChild: jest.fn(),
            style: {},
            classList: { add: jest.fn(), remove: jest.fn() },
            textContent: ''
        };
    }),
    createElement: jest.fn().mockReturnValue({
        addEventListener: jest.fn(),
        appendChild: jest.fn(),
        style: {}
    }),
    body: {
        appendChild: jest.fn(),
        removeChild: jest.fn(),
        className: ''
    }
};
global.localStorage = {
    getItem: jest.fn(),
    setItem: jest.fn()
};
