// =======================================================
// 1. LEAFLET MAP (You can find me here - Marker Zoom Threshold)
// =======================================================

var leafletMap = L.map('leaflet-map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    noWrap: true // 
}).addTo(leafletMap);

// Coordinates and locations
var locations = [
    { name: " ", coords: [39.928656, 32.869898] },
    { name: " ", coords: [39.865575, 32.733657] },
    { name: " ", coords: [39.905614, 32.859376] }
];

var bounds = [];

var markerLayerGroup = L.layerGroup(); 

locations.forEach(function(loc) {
    var marker = L.marker(loc.coords);
    
    
    marker.bindTooltip("<div style='text-align:center; font-family:sans-serif; font-weight:bold; font-size:12px;'>You can find me here<br><span style='color:#216fcf;font-size:10px;'>" + loc.name + "</span></div>", {
        permanent: true,   
        direction: 'top',  
        offset: [0, -10]   
    });
    
    
    markerLayerGroup.addLayer(marker); 
    bounds.push(loc.coords);
});


leafletMap.fitBounds(bounds, { padding: [50, 50] });


// ---------------------------------------------------------
//  ZOOM THRESHOLD 
// ---------------------------------------------------------
var zoomThreshold = 6; 

leafletMap.on('zoomend', function() {
    if (leafletMap.getZoom() >= zoomThreshold) {
        
        if (!leafletMap.hasLayer(markerLayerGroup)) {
            leafletMap.addLayer(markerLayerGroup);
        }
    } else {
        
        if (leafletMap.hasLayer(markerLayerGroup)) {
            leafletMap.removeLayer(markerLayerGroup);
        }
    }
});


if (leafletMap.getZoom() >= zoomThreshold) {
    leafletMap.addLayer(markerLayerGroup);
}


// =======================================================
// 2. OPENLAYERS MAP 
// =======================================================

var visitedCities = [
    'Adana', 'Ankara', 'Antalya', 'Bursa', 'Çanakkale', 
    'Diyarbakır', 'Gaziantep', 'Mersin', 'İstanbul', 'İzmir', 
    'Kocaeli', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Siirt', 
    'Şanlıurfa', 'Van', 'Batman', 'Yalova'
];

var geojsonUrl = 'https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-utf8.json';

var vectorSource = new ol.source.Vector({
    url: geojsonUrl,
    format: new ol.format.GeoJSON()
});

var styleFunction = function(feature) {
    var cityName = feature.get('name'); 
    
    if (cityName && visitedCities.includes(cityName)) {
        return new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(255, 215, 0, 0.6)' }), 
            stroke: new ol.style.Stroke({ color: '#000000', width: 2 })    
        });
    }
    
    return new ol.style.Style({
        fill: new ol.style.Fill({ color: 'rgba(200, 200, 200, 0.1)' }),
        stroke: new ol.style.Stroke({ color: 'rgba(100, 100, 100, 0.3)', width: 1 })
    });
};

var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: styleFunction
});

var olMap = new ol.Map({
    target: 'ol-map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({ wrapX: false }) // HOCANIN İSTEDİĞİ: Dünyanın tekrar etmesini engeller
        }),
        vectorLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([35.2433, 38.9637]), 
        zoom: 6,
        minZoom: 4
    })
});