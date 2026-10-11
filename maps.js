// =======================================================
// 1. LEAFLET HARİTASI (You can find me here - 3 Sabit Marker)
// =======================================================

var leafletMap = L.map('leaflet-map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    noWrap: true 
}).addTo(leafletMap);

// İstediğin 3 Konumun Koordinatları ve İsimleri
var locations = [
    { name: "Kurtuluş Metro", coords: [39.928656, 32.869898] },
    { name: "Bölüm Önü", coords: [39.865575, 32.733657] },
    { name: "Başka Bir Yer", coords: [39.905614, 32.859376] }
];

var bounds = [];

locations.forEach(function(loc) {
    var marker = L.marker(loc.coords).addTo(leafletMap);
    
    // YAZILARIN SÜREKLİ AÇIK (Permanent) KALMASINI SAĞLAYAN KISIM
    marker.bindTooltip("<div style='text-align:center; font-family:sans-serif; font-weight:bold; font-size:12px;'>You can find me here<br><span style='color:#216fcf;font-size:10px;'>" + loc.name + "</span></div>", {
        permanent: true,   // Marker üstünde hep açık kalır
        direction: 'top',  // Marker'ın üstünde durur
        offset: [0, -10]   // Biraz yukarı boşluk verir
    }).openTooltip();
    
    bounds.push(loc.coords);
});

// Haritayı 3 marker'ı da görecek şekilde otomatik ortalar
leafletMap.fitBounds(bounds, { padding: [50, 50] });


// =======================================================
// 2. OPENLAYERS HARİTASI (Gezilen Şehirler - Poligon)
// =======================================================

// GEZDİĞİN ŞEHİRLERİN TAM LİSTESİ (GeoJSON ile eşleşmesi için resmi isimleriyle eklendi)
var visitedCities = [
    'Adana', 'Ankara', 'Antalya', 'Bursa', 'Çanakkale', 
    'Diyarbakır', 'Gaziantep', 'Mersin', 'İstanbul', 'İzmir', 
    'Kocaeli', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Siirt', 
    'Şanlıurfa', 'Van', 'Batman', 'Yalova'
];

// DETAYLI YÜKSEK ÇÖZÜNÜRLÜKLÜ GEOJSON LİNKİ
var geojsonUrl = 'https://raw.githubusercontent.com/cihadturhan/tr-geojson/master/geo/tr-cities-utf8.json';

var vectorSource = new ol.source.Vector({
    url: geojsonUrl,
    format: new ol.format.GeoJSON()
});

var styleFunction = function(feature) {
    var cityName = feature.get('name'); 
    
    if (cityName && visitedCities.includes(cityName)) {
        return new ol.style.Style({
            fill: new ol.style.Fill({ color: 'rgba(255, 215, 0, 0.6)' }), // Temamıza uygun sarı
            stroke: new ol.style.Stroke({ color: '#000000', width: 2 })    // Keskin siyah sınırlar
        });
    }
    
    // Gezilmeyen şehirler için çok hafif saydam gri
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
            source: new ol.source.OSM({ wrapX: false }) 
        }),
        vectorLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([35.2433, 38.9637]), // Haritayı Türkiye'ye odaklar
        zoom: 6,
        minZoom: 4
    })
});