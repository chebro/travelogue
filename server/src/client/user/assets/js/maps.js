// Initialize and add the map

markers=[];

function initMap(latitude, longitude, zoom) {
    // The location of Uluru
    const uluru = { lat: latitude, lng: longitude };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: zoom,
        center: uluru,
    });
    console.log("Map Initialised");
}

function add_marker(latitude,longitude,url){
    const uluru = { lat: latitude, lng: longitude };
    const marker = new google.maps.Marker({
        position: uluru,
        map: map,
    });
    markers
}

function setup_travel(){
    //database query results have to be available here

    //
    initMap(-25.344,131.036,4);
}

/*Google Map Marker Click Function*/
google.maps.event.addListener(marker, 'click', (function(marker) {
    return function() {
    /*Bootstrap Modal Pop Up Open Code*/
    $(".modal-title").text("This is google map..");
    $(".modal-body").text("Modal Body");
    $("#myModal").modal('show');
    }
})(marker));