
document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("pointTable").getElementsByTagName('tbody')[0];

    fetch("waypoint.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Point") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.Nama;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polygonTable").getElementsByTagName('tbody')[0];

    fetch("polygon.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "Polygon") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.Nama;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});

document.addEventListener("DOMContentLoaded", () => {
    const pointTable = document.getElementById("polylineTable").getElementsByTagName('tbody')[0];

    fetch("polyline.json") // Ganti "data.json" dengan nama file JSON Anda
        .then(response => response.json())
        .then(data => {
            data.features.forEach(feature => {
                if (feature.geometry.type === "LineString") {
                    const row = pointTable.insertRow();
                    const nameCell = row.insertCell(0);
                    const coordinatesCell = row.insertCell(1);
                    const typeCell = row.insertCell(2);
                    nameCell.innerText = feature.properties.Nama;
                    coordinatesCell.innerText = JSON.stringify(feature.geometry.coordinates);
                    typeCell.innerText = feature.geometry.type;
                    
                }
            });
        })
        .catch(error => console.error("Terjadi kesalahan:", error));
});
document.addEventListener('DOMContentLoaded', () => {
    const map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([ 107.60526591089713, -6.907379177291697,]),
            zoom: 17
        })
    });

    // Mendownload data waypoint, line string, dan polyline
    const waypointSource = new ol.source.Vector({
        url: 'waypoint.json',
        format: new ol.format.GeoJSON()
    });

    const lineStringSource = new ol.source.Vector({
        url: 'polygon.json',
        format: new ol.format.GeoJSON()
    });

    const polylineSource = new ol.source.Vector({
        url: 'polyline.json',
        format: new ol.format.GeoJSON()
    });

    // Membuat layer untuk waypoint, line string, dan polyline
    const waypointLayer = new ol.layer.Vector({
        source: waypointSource,
        style: new ol.style.Style({
            image: new ol.style.Circle({
                radius: 5,
                fill: new ol.style.Fill({
                    color: 'blue'
                })
            })
        })
    });

    const lineStringLayer = new ol.layer.Vector({
        source: lineStringSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 5
            })
        })
    });

    const polylineLayer = new ol.layer.Vector({
        source: polylineSource,
        style: new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'grey',
                width: 5
                
            })
        })
    });

    // Menambahkan layer ke peta
    map.addLayer(waypointLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polylineLayer);

    // Mendapatkan koordinat dari GeoJSON
    const getCoordinates = (source) => {
        const features = source.getFeatures();
        const coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    };

    // Menampilkan koordinat di dalam tabel
    waypointSource.once('change', () => {
        const waypointCoords = getCoordinates(waypointSource);
        document.getElementById('featureName').textContent = 'Waypoint';
        document.getElementById('featureType').textContent = 'Point';
        document.getElementById('featureCoords').textContent = waypointCoords.toString();
    });

    lineStringSource.once('change', () => {
        const lineStringCoords = getCoordinates(lineStringSource);
        document.getElementById('featureName').textContent = 'Line String';
        document.getElementById('featureType').textContent = 'Line String';
        document.getElementById('featureCoords').textContent = lineStringCoords.toString();
    });

    polylineSource.once('change', () => {
        const polylineCoords = getCoordinates(polylineSource);
        document.getElementById('featureName').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = polylineCoords.toString();
    });
});


    // Menambahkan layer ke peta
    map.addLayer(waypointLayer);
    map.addLayer(lineStringLayer);
    map.addLayer(polylineLayer);

    // Mendapatkan koordinat dari GeoJSON
    function getCoordinates(source) {
        var features = source.getFeatures();
        var coordinates = features[0].getGeometry().getCoordinates();
        return coordinates;
    }

    // Menampilkan koordinat di dalam tabel
    waypointSource.once('change', function() {
        var waypointCoords = getCoordinates(waypointSource);
        document.getElementById('featurename').textContent = 'Waypoint';
        document.getElementById('featureType').textContent = 'Point';
        document.getElementById('featureCoords').textContent = waypointCoords.toString();
    });

    lineStringSource.once('change', function() {
        var lineStringCoords = getCoordinates(lineStringSource);
        document.getElementById('featurename').textContent = 'Line String';
        document.getElementById('featureType').textContent = 'Line String';
        document.getElementById('featureCoords').textContent = lineStringCoords.toString();
    });

    polylineSource.once('change', function() {
        var polylineCoords = getCoordinates(polylineSource);
        document.getElementById('featurename').textContent = 'Polyline';
        document.getElementById('featureType').textContent = 'Polyline';
        document.getElementById('featureCoords').textContent = polylineCoords.toString();
    });