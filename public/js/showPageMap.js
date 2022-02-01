mapboxgl.accessToken = mapToken;
const camp = JSON.parse(campground);

const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v11', // style URL
  center: camp.geometry.coordinates, // starting position [lng, lat]
  zoom: 7 // starting zoom
});

map.addControl(new mapboxgl.NavigationControl());

new mapboxgl.Marker()
  .setLngLat(camp.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h3>${camp.title}</h3><p>${camp.location}</p>`
      )
  )
  .addTo(map);
