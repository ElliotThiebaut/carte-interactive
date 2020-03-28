// votre code JS

var mymap = L.map('map').setView([ 48.8566, 2.3522 ], 13);

L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoianVsaWVua29tcCIsImEiOiJjanR1NGFuYjkxMmNvNDBucGI1aXZ4Y285In0.hiSplFD5CODUd9yxRO_qkg',
	{
		attribution:
			'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'your.mapbox.access.token'
	}
).addTo(mymap);

var layerGroup = L.layerGroup().addTo(mymap);

async function getData(query) {
	if (query) {
		var url =
			'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1) ' +
			query +
			'&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';
		layerGroup.clearLayers();
	} else {
		var url =
			'https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-&q=date_start+%3E%3D+%23now()+AND+date_start+%3C+%23now(months%3D1)&rows=50&facet=category&facet=tags&facet=address_zipcode&facet=address_city&facet=pmr&facet=blind&facet=deaf&facet=access_type&facet=price_type';
	}
	let response = await fetch(url);
	let data = await response.json();

	data.records.forEach(function(event) {
		// les infos de l'événement
		let title = event.fields.title;
		let date = event.fields.date_start.replace('T', ' ');
		date = date.slice(0, 16);
		let descirption = event.fields.description;
		let adresse = event.fields.address_street;
		let prix = event.fields.price_type.charAt(0).toUpperCase() + event.fields.price_type.substring(1);
		if (event.fields.price_detail) {
			var prix_detail = ' - ' + event.fields.price_detail;
		} else {
			var prix_detail = '';
		}

		if (!event.fields.lat_lon) {
			return;
		}
		// la latitude
		let latitude = event.fields.lat_lon[0];
		// la longitude
		let longitude = event.fields.lat_lon[1];

		// pour tester, on les affiche dans la console

		console.log(title + ' ' + latitude + ' ' + longitude);
		// .. mais ce serait mieux de les afficher sur la carte !

		var marker = L.marker([ latitude, longitude ]).addTo(layerGroup);
		marker.bindPopup(
			'<b>' +
				title +
				'</b><br><br>' +
				date +
				' - <u>' +
				adresse +
				'</u><br><br><b>' +
				prix +
				'</b><i>' +
				prix_detail +
				'</i><br><br><i>' +
				descirption +
				'</i>',
			{
				maxHeight: '400'
			}
		);
	});
}

getData();

function onFormSubmit(event) {
	event.preventDefault();

	getData(searchInput.value);
}
