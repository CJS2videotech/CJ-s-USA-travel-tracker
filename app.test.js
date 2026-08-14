import { describe, it, expect, beforeEach, vi } from 'vitest';
import './app.js';

describe('toggleStateStatus', () => {
    beforeEach(() => {
        window.localStorage.clear();
        const initialData = {
            "California": { unvisited: true, notes: "", date: "", trips: [], landmarks: [] }
        };
        window.localStorage.setItem('us_travel_data_map', JSON.stringify(initialData));

        // Let app load it
        if (window.onload) {
            window.onload();
        }
    });

    it('should toggle unvisited status from true to false', () => {
        // Find California in current localStorage
        let storedData = JSON.parse(window.localStorage.getItem('us_travel_data_map'));
        expect(storedData['California'].unvisited).toBe(true);

        // Call toggleStateStatus
        window.toggleStateStatus('California');

        // Verify it was toggled in localStorage
        storedData = JSON.parse(window.localStorage.getItem('us_travel_data_map'));
        expect(storedData['California'].unvisited).toBe(false);
    });

    it('should toggle unvisited status from false to true', () => {
        window.toggleStateStatus('California');

        let storedData = JSON.parse(window.localStorage.getItem('us_travel_data_map'));
        expect(storedData['California'].unvisited).toBe(false);

        window.toggleStateStatus('California');

        storedData = JSON.parse(window.localStorage.getItem('us_travel_data_map'));
        expect(storedData['California'].unvisited).toBe(true);
    });

    it('should do nothing for invalid state', () => {
        const beforeData = window.localStorage.getItem('us_travel_data_map');

        window.toggleStateStatus('InvalidState');

        const afterData = window.localStorage.getItem('us_travel_data_map');
        expect(beforeData).toEqual(afterData);
    });
});
