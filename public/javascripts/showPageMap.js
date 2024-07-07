function initMap() {
    // Create a map centered at the campground's coordinates
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: campground.geometry.coordinates[1], lng: campground.geometry.coordinates[0] },
        zoom: 10,
        mapTypeId: "roadmap",
    });

    // Create a marker at the campground's coordinates
    const marker = new google.maps.Marker({
        position: { lat: campground.geometry.coordinates[1], lng: campground.geometry.coordinates[0] },
        map: map,
    });

    // Create an info window with the campground's title and location
    const infowindow = new google.maps.InfoWindow({
        content: `<h3>${campground.title}</h3><p>${campground.location}</p>`,
    });

    // Show the info window when the marker is clicked
    marker.addListener("click", function () {
        infowindow.open(map, marker);
    });
}

// Make sure to call initMap function after the page has loaded
google.maps.event.addDomListener(window, "load", initMap);
