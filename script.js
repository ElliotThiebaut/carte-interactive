// votre code JS


var mymap = L.map('map').setView([48.8566, 2.3522], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

var markerEiffel = L.marker([48.8584, 2.2945]).addTo(mymap);
markerEiffel.bindPopup("<b>La Tour Eiffel</b><br><i>Une belle oeuvre</i>")

var markerLouvre = L.marker([48.8606, 2.3376]).addTo(mymap);
markerLouvre.bindPopup("<b>Le louvre</b><br><i>Une belle oeuvre également</i>")



async function getData() {
    let url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&rows=30&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type"
    let response = await fetch(url)
    let data = await response.json()
    data.records.forEach(function(event) {
    // le titre de l'événement
    let title = event.fields.title
    // la latitude
    let latitude = event.fields.lat_lon[0]
    // la longitude
    let longitude = event.fields.lat_lon[1]
    // on pourrait récupérer d'autres infos..
    // pour tester, on les affiche dans la console

    console.log(title + " " + latitude + " " + longitude)
    // .. mais ce serait mieux de les afficher sur la carte !

    let marker = L.marker([latitude, longitude]).addTo(mymap);
    marker.bindPopup(title);
    })
}

getData()