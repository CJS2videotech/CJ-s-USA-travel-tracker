const html = `
<div id="us-svg-map"></div>
<div id="toast-container"></div>
<div id="sync-status-badge"></div>
<div id="map-loader"></div>
<div id="map-parent"></div>
<div id="map-tooltip"></div>
<div id="coordinates-hud"></div>
<div id="states-list-container"></div>
<input type="text" id="search-input" value="" />
<select id="status-filter"><option value="all">All</option></select>
<div id="ledger-count"></div>
<div id="visited-counter"></div>
<div id="unvisited-counter"></div>
<div id="percent-counter"></div>
<svg class="progress-ring"><circle id="percent-ring"></circle></svg>
<div id="landmarks-counter"></div>
<div id="regions-progress-container"></div>
<div id="inspector-placeholder"></div>
<div id="inspector-content"></div>
<div id="inspector-name"></div>
<div id="inspector-badge"></div>
<div id="inspector-status-text"></div>
<div id="info-status-pill"></div>
<div id="inspector-toggle-btn"></div>
<div id="state-memo"></div>
<div id="landmarks-list-container"></div>
<div id="timeline-list-container"></div>
<div id="timeline-empty-message"></div>
<input id="backup-upload-input" />
<form id="add-trip-form"></form>
<input id="traveler-name-input" />
<div id="drop-zone"></div>
`;
document.body.innerHTML = html;

import * as d3 from 'd3';
import * as topojson from 'topojson-client';
window.d3 = d3;
window.topojson = topojson;

globalThis.fetch = () => Promise.resolve({ ok: true, json: () => Promise.resolve({ type: "Topology", objects: { states: { type: "GeometryCollection", geometries: [] } }, arcs: [] }) });
