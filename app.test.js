const test = require('node:test');
const assert = require('node:assert');
const { formatMonthYear } = require('./app.js');

test('formatMonthYear - happy paths', (t) => {
    assert.strictEqual(formatMonthYear('2023-01'), 'Jan 2023');
    assert.strictEqual(formatMonthYear('2023-12'), 'Dec 2023');
    assert.strictEqual(formatMonthYear('2022-06'), 'Jun 2022');
});

test('formatMonthYear - edge cases and error conditions', (t) => {
    // Null/undefined/empty string should return empty string
    assert.strictEqual(formatMonthYear(null), '');
    assert.strictEqual(formatMonthYear(undefined), '');
    assert.strictEqual(formatMonthYear(''), '');

    // Non-string input should return empty string
    assert.strictEqual(formatMonthYear(123), '');

    // Out-of-bounds months should return original string
    assert.strictEqual(formatMonthYear('2023-00'), '2023-00');
    assert.strictEqual(formatMonthYear('2023-13'), '2023-13');

    // Invalid format should return original string
    assert.strictEqual(formatMonthYear('invalid-date'), 'invalid-date');
    assert.strictEqual(formatMonthYear('2023'), '2023');
    assert.strictEqual(formatMonthYear('2023-01-01'), '2023-01-01');

    // Invalid month format should return original string
    assert.strictEqual(formatMonthYear('2023-xx'), '2023-xx');
});
