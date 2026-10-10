// ==========================================
// 1. LEAFLET HARİTASI (Hacettepe Geomatik)
// ==========================================

// Hacettepe Üniversitesi Beytepe Kampüsü Geomatik Müh. Koordinatları
var hacettepeCoords = [39.8671, 32.7335];

// Haritayı uzak bir açıyla başlatıyoruz (Zoom Seviyesi: 5)
var leafletMap = L.map('leaflet-map').setView(hacettepeCoords, 5);

// OpenStreetMap katmanı ekleniyor
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap',
    noWrap: true // DÜZELTME: Dünyanın sağa/sola tekrar etmesini engeller
}).addTo(leafletMap);

// Marker direkt olarak haritaya ekleniyor ve yok olmuyor
var geomatikMarker = L.marker(hacettepeCoords).addTo(leafletMap);

// Popup yazısı ekleniyor ve otomatik açık kalması sağlanıyor
geomatikMarker.bindPopup('<b>You can find me here</b>').openPopup();


// ==========================================
// 2. OPENLAYERS HARİTASI (Kurtuluş Metro)
// ==========================================

// Kurtuluş Metro İstasyonu Koordinatları (Boylam, Enlem)
var kurtulusCoords = ol.proj.fromLonLat([32.8732, 39.9324]);

// Marker'ın Geometrisi
var markerFeature = new ol.Feature({
  geometry: new ol.geom.Point(kurtulusCoords),
});

// Marker'a Sarı-Siyah tasarım veriyoruz
var markerStyle = new ol.style.Style({
  image: new ol.style.Circle({
    radius: 9,
    fill: new ol.style.Fill({color: '#FFD700'}),
    stroke: new ol.style.Stroke({color: '#000000', width: 3})
  })
});
markerFeature.setStyle(markerStyle);

var vectorLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [markerFeature]
  })
});

// Harita Yükleniyor
var olMap = new ol.Map({
  target: 'ol-map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM({
          wrapX: false // Dünyanın tekrar etmesini engeller
      })
    }),
    vectorLayer
  ],
  view: new ol.View({
    center: kurtulusCoords,
    zoom: 15,
    minZoom: 2 
  })
});

// ==========================================
// OPENLAYERS İÇİN POPUP (You can find me here) YAZISI EKLENİYOR
// ==========================================

// Popup için sıfırdan bir HTML kutusu oluşturuyoruz
var popupElement = document.createElement('div');
popupElement.style.backgroundColor = 'white';
popupElement.style.padding = '5px 10px';
popupElement.style.borderRadius = '5px';
popupElement.style.border = '1px solid black';
popupElement.style.fontSize = '14px';
popupElement.style.fontWeight = 'bold';
popupElement.style.color = 'black';
popupElement.innerHTML = 'You can find me here';

// Bu kutuyu OpenLayers haritasında marker'ın tam üstüne (offset ile) sabitliyoruz
var popupOverlay = new ol.Overlay({
  element: popupElement,
  position: kurtulusCoords,
  positioning: 'bottom-center',
  offset: [0, -15], // Sarı noktanın tam üstünde durması için biraz yukarı kaydırıyoruz
  stopEvent: false
});

olMap.addOverlay(popupOverlay);