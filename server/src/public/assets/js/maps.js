// Initialize and add the map

var coords = []
var text = []
var titles = []
var map = null
var flightPath=null
function initMap(latitude, longitude, zoom) {
	// The location of Uluru
	const uluru = { lat: latitude, lng: longitude }
	// The map, centered at Uluru
	const m = new google.maps.Map(document.getElementById('map'), {
		zoom: zoom,
		center: uluru,
	})
	map = m
	console.log('Map Initialised')
}

function add_marker(latitude, longitude,number) {
	const uluru = { lat: latitude, lng: longitude }
	const marker = new google.maps.Marker({
		position: uluru,
		label:`${number}`,
		map: map,
	})
	coords.push(uluru)
	/*Google Map Marker Click Function*/
	google.maps.event.addListener(
		marker,
		'click',
		(function (marker) {
			return function () {
				//Query text for
				$('#display_modal_title').text(titles[number-1])
				$('#display_modal_body').text(text[number-1])
				$('#display_modal').modal('show')
			}
		})(marker)
	)
}

function draw_lines_and_adjust_zoom() {


	flightPath = new google.maps.Polyline({
		path: coords,
		geodesic: true,
		strokeColor: '#FF0000',
		strokeOpacity: 1.0,
		strokeWeight: 2,
	})

	flightPath.setMap(map)
	var bounds = new google.maps.LatLngBounds()
	bounds.extend(coords[0])
	bounds.extend(coords[coords.length - 1])
	map.fitBounds(bounds)
}

function setup_travel() {
	//database query results have to be available here
	var data={
		uname,
		journey_no,		
	}
	fetch('/api/journeys/coordinates', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(res=>res.json()).then((res)=>{

		let coo=res.data.destinations;
		initMap(-25.344, 131.036, 4)
		for(let i=0;i<coo.length;i++){
			add_marker(coo[i].lat,coo[i].long,i+1);
			text.push(coo[i].description)
			titles.push(coo[i].title)
		}
		// add_marker(-25.344, 131.036)
		// add_marker(-24.344, 130.036)
		// add_marker(20.344, 0.036)
		draw_lines_and_adjust_zoom()
	})
}

function add_destination() {
	$('#addLocation').modal('show')
	$('#lat_box').val("")
	$('#long_box').val("")
	$('#title_box').val("")
	$('#msg_box').val("")
}

function add_destination_loc() {
	let lat=Number($('#lat_box').val())
	let long=Number($('#long_box').val())
	let title=$('#title_box').val()
	let description=$('#msg_box').val()
	let data={
		lat,
		long,
		title,
		description,
		journey_no,
		uname
	}
	fetch('/api/journeys/addlocation', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	}).then(function(){
		console.log("Destination added!");
		coords.push({
			lat,
			lng:long
		})
		text.push(description)
		titles.push(title)
		add_marker(lat,long,text.length)
		alert("Location added!")
		flightPath.setMap(null)
		draw_lines_and_adjust_zoom()
		$('#addLocation').modal('hide')

	})
}

function update_location() {
	if (navigator.geolocation) {
		// timeout at 60000 milliseconds (60 seconds)
		var options = { timeout: 60000 }
		navigator.geolocation.getCurrentPosition(
			pos => {
				console.log(pos.coords)
				$('#lat_box').val(pos.coords.latitude)
				$('#long_box').val(pos.coords.longitude)
			},
			errorHandler,
			options
		)
	} else {
		alert('Sorry, browser does not support geolocation!')
	}
}
function errorHandler(err) {
	if (err.code == 1) {
		alert('Error: Access is denied!')
	} else if (err.code == 2) {
		alert('Error: Position is unavailable!')
	}
}
