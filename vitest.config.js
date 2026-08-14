import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setup.js'],
    alias: {
        'd3': 'd3',
        'topojson': 'topojson-client'
    }
  },
})
