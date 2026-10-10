// 1. Initialize Leaflet Map
// Zoom seviyesini 2 yaptık ki haritayı uzaklaştırıp Dünyanın tekrar etmediğini test edebilelim
const leafletMap = L.map('leaflet-map').setView([39.92077, 32.85411], 2);

// Adding OSM layer with noWrap to prevent Earth from repeating
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    noWrap: true // Issue 2 Çözümü (Leaflet)
}).addTo(leafletMap);


// 2. Initialize OpenLayers Map
const olMap = new ol.Map({
    target: 'ol-map',
    layers: [
        new ol.layer.Tile({
            // Adding OSM source with wrapX false to prevent Earth from repeating
            source: new ol.source.OSM({
                wrapX: false // Issue 2 Çözümü (OpenLayers)
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([32.85411, 39.92077]), 
        zoom: 2 // Zoom seviyesini 2 yaptık
    })
});
// ==========================================
// ISSUE 1 SOLUTION: ZOOM THRESHOLD FOR MARKERS
// ==========================================

const zoomThreshold = 8; // Markers will only appear if zoom level is 8 or higher

// --- LEAFLET MARKER LOGIC ---
const leafletMarker = L.marker([39.92077, 32.85411]); // Marker at Ankara

// Check zoom level whenever the map is zoomed
leafletMap.on('zoomend', function() {
    if (leafletMap.getZoom() >= zoomThreshold) {
        leafletMap.addLayer(leafletMarker); // Show marker
    } else {
        leafletMap.removeLayer(leafletMarker); // Hide marker
    }
});


// --- OPENLAYERS MARKER LOGIC ---
// 1. Create the marker feature
const olMarkerFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([32.85411, 39.92077]))
});

// 2. Create a vector layer for the marker and use the built-in 'minZoom' property
const olMarkerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        features: [olMarkerFeature]
    }),
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({color: 'red'}),
            stroke: new ol.style.Stroke({color: 'black', width: 2})
        })
    }),
    minZoom: zoomThreshold // This built-in property automatically hides the layer below the threshold
});

// Add the layer to the OpenLayers map
olMap.addLayer(olMarkerLayer);