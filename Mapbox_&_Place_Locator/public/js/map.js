mapboxgl.accessToken =
  "API KEY from: https://www.mapbox.com/"

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true
})

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}

async function setupMap(center) {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14
  });
  var marker = new mapboxgl.Marker({
    color: "#FFFFFF",
    draggable: true
    }).setLngLat(center)
    .addTo(map);

  const nav = new mapboxgl.NavigationControl()
  map.addControl(nav)

   //For Uber or PassApp
  var directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken
  })
  map.addControl(directions, "top-left") 

  // get recorded data from database
  const res = await fetch('/api/v1/stores');
  const data = await res.json();
  
  const stores = data.data.map(store => {
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [
          store.location.coordinates[0],
          store.location.coordinates[1]
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'shop'
      }
    };
  });


  //loaded the data to the existed map
  map.on('load', function() {
    map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: stores
        }
      },
      layout: {
        'icon-image': '{icon}-15',
        // 'icon-size': 1.5,
        'text-field': '{storeId}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.9],
        'text-anchor': 'top'
      }
    });
  });
}
