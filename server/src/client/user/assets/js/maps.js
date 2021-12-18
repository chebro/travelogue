// Initialize and add the map

var coords=[];
var map=null;
function initMap(latitude, longitude, zoom) {
    // The location of Uluru
    const uluru = { lat: latitude, lng: longitude };
    // The map, centered at Uluru
    const m = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: uluru,
    });
    map=m;
    console.log("Map Initialised");
}

function add_marker(latitude,longitude){
    const uluru = { lat: latitude, lng: longitude };
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    coords.push(uluru);
    /*Google Map Marker Click Function*/
    google.maps.event.addListener(marker, 'click', (function(marker) {
        return function() {
            //Query text for 
            $("#display_modal_title").text("Sample Modal");
            $("#display_modal_body").text("Lorem Ipsum");
            $('#display_modal').modal('show');
        }
    })(marker));
}

function setup_travel(){
    //database query results have to be available here

    //
    initMap(-25.344,131.036,4);
    add_marker(-25.344,131.036);
    add_marker(-24.344,130.036);
    add_marker(-20.344,130.036);

    const flightPath = new google.maps.Polyline({
        path: coords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

    flightPath.setMap(map);
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(coords[0]);
    bounds.extend(coords[coords.length-1]);
    map.fitBounds(bounds);
}

