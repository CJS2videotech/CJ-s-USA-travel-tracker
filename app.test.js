global.d3 = {
  select: () => ({ append: () => ({}), call: () => ({}) }),
  geoAlbersUsa: () => ({ scale: () => ({ translate: () => ({}) }) }),
  geoPath: () => ({ projection: () => ({}) }),
  zoom: () => ({ scaleExtent: () => ({ on: () => ({}) }) })
};
global.window = { addEventListener: () => {}, onload: null };
global.document = {
  getElementById: () => ({ addEventListener: () => {} }),
  querySelector: () => ({ addEventListener: () => {} })
};
global.localStorage = { getItem: () => null, setItem: () => {} };

const { formatMonthYear } = require('./app.js');

describe('formatMonthYear', () => {
    test('returns empty string when input is falsy', () => {
        expect(formatMonthYear(null)).toBe('');
        expect(formatMonthYear(undefined)).toBe('');
        expect(formatMonthYear('')).toBe('');
    });

    test('formats valid YYYY-MM correctly', () => {
        expect(formatMonthYear('2023-01')).toBe('Jan 2023');
        expect(formatMonthYear('2023-12')).toBe('Dec 2023');
        expect(formatMonthYear('2000-06')).toBe('Jun 2000');
    });

    test('handles single digit months if provided', () => {
        expect(formatMonthYear('2023-1')).toBe('Jan 2023');
        expect(formatMonthYear('2023-5')).toBe('May 2023');
    });

    test('handles invalid month format safely', () => {
        // According to the function code:
        // const [year, month] = ymString.split('-');
        // const months = [...];
        // return `${months[parseInt(month, 10) - 1]} ${year}`;
        // If month is unparseable (e.g. 'XX'), parseInt returns NaN
        // NaN - 1 is NaN, months[NaN] is undefined.
        expect(formatMonthYear('2023-XX')).toBe('undefined 2023');
    });
});
