'use strict';

(function(module){
   module.directive('jjFloorPlan', ['gmaps', 'FloorPlan', function (gmaps, FloorPlan) {
      var def = {
         restrict: 'AE',
         replace: true,
         scope: {
            lat: '=',
            lnt: '='
         },
         templateUrl: 'views/templates/jj-floor-plan.html',
         link: function ($scope, element, attrs) {
            var self = this;

            var lat = parseFloat($scope.lat),
               lnt = parseFloat($scope.lnt),
               poi = new gmaps.LatLng(lat, lnt),
               markers = [],
               infoWindows = [],
               mapOptions = {
                  zoom: 20,
                  center: poi,
                  mapTypeId: gmaps.MapTypeId.ROADMAP
               };

            var map = new gmaps.Map(element[0], mapOptions);

            //Add custom controls
            var controlDiv = document.createElement('div');
            controlDiv.style.padding = '5px 5px 0 0';

            var beaconControlUI = document.createElement('div');
            beaconControlUI.style.backgroundColor = 'white';
            beaconControlUI.style.borderStyle = 'solid';
            beaconControlUI.style.borderWidth = '1px';
            beaconControlUI.style.cursor = 'pointer';
            beaconControlUI.style.textAlign = 'center';
            beaconControlUI.title = 'Click to add new beacon';
            beaconControlUI.style.height = '17px';

            controlDiv.appendChild(beaconControlUI);
            var beaconControlTxt = document.createElement('div');
            beaconControlTxt.style.fontFamily = 'Arial,sans-serif';
            beaconControlTxt.style.fontSize = '12px';
            beaconControlTxt.style.paddingLeft = '4px';
            beaconControlTxt.style.paddingRight = '4px';
            beaconControlTxt.style.textAlign = 'center';
            beaconControlTxt.style.lineHeight = '1.5';
            beaconControlTxt.innerHTML = '<b>Add iBeacon</b>';
            beaconControlUI.appendChild(beaconControlTxt);

            var clearControlUI = document.createElement('div');
            clearControlUI.style.backgroundColor = 'white';
            clearControlUI.style.borderStyle = 'solid';
            clearControlUI.style.borderWidth = '1px';
            clearControlUI.style.marginTop = '3px';
            clearControlUI.style.cursor = 'pointer';
            clearControlUI.style.textAlign = 'center';
            clearControlUI.title = 'Click to clear controls';
            clearControlUI.style.height = '17px';

            controlDiv.appendChild(clearControlUI);
            var clearControlTxt = document.createElement('div');
            clearControlTxt.style.fontFamily = 'Arial,sans-serif';
            clearControlTxt.style.fontSize = '12px';
            clearControlTxt.style.paddingLeft = '4px';
            clearControlTxt.style.paddingRight = '4px';
            clearControlTxt.style.textAlign = 'center';
            clearControlTxt.style.lineHeight = '1.5';
            clearControlTxt.innerHTML = '<b>Clear iBeacons</b>';
            clearControlUI.appendChild(clearControlTxt);

            controlDiv.index = 1;
            map.controls[gmaps.ControlPosition.RIGHT_TOP].push(controlDiv);
            gmaps.event.addDomListener(clearControlUI, 'click', function() {
               clearMarkers();
            });
            gmaps.event.addDomListener(beaconControlUI, 'click', function() {
               createMarker();
            });
            gmaps.event.addListener(map, "click",function(event){
               hideContextMenu();
            });

            var contextmenuDiv;
            var rightClickLocation;
            var geocoder = new google.maps.Geocoder();

            function getPointerLocation(currentLatLng){
               var scale = Math.pow(2, map.getZoom());
               // The NorthWest corner of the current viewport corresponds
               // to the upper left corner of the map.
               // The script translates the coordinates of the map's center point
               // to screen coordinates. Then it subtracts the coordinates of the
               // coordinates of the map's upper left corner to translate the
               // currentLatLng location into pixel values in the <div> element that hosts the map.
               var nw = new gmaps.LatLng(
                  map.getBounds().getNorthEast().lat(),
                  map.getBounds().getSouthWest().lng()
               );
               // Convert the nw location from geo-coordinates to screen coordinates
               var worldCoordinateNW = map.getProjection().fromLatLngToPoint(nw);
               // Convert the location that was clicked to screen coordinates also
               var worldCoordinate = map.getProjection().fromLatLngToPoint(currentLatLng);
               var currentLocation = new google.maps.Point(
                  Math.floor((worldCoordinate.x - worldCoordinateNW.x) * scale),
                  Math.floor((worldCoordinate.y - worldCoordinateNW.y) * scale)
               );
               return currentLocation;
            }

            function positionMenu(currentLatLng){
               // the map's dimensions:
               var mapWidth = $('#map_container').width();
               var mapHeight = $('#map_container').height();
               // the menu's dimensions:
               var menuWidth = $('.contextmenu').width();
               var menuHeight = $('.contextmenu').height();
               // the position that was clicked in pixel coordinates in the map's placeholder
               var clickedPosition = getPointerLocation(currentLatLng);
               // The x and y coordinates of the point that was clicked
               // in the <div> element that holds the map.
               // THEY ARE NOT ABSOLUTE SCREEN COORDINATES MEASURED FROM THE UPPER LEFT CORNER OF THE SCREEN!
               // Instead, they are measured from the upper left corner of the map's placeholder.
               var x = clickedPosition.x ;
               var y = clickedPosition.y ;
               // if there's no space to display the context menu to the right of the
               // point that was clicked, display it to the left of the same point.
               if((mapWidth - x ) < menuWidth)
                  x = x - menuWidth;
               // if there's no space to display the context menu below the
               // point that was clicked, display it above the same point.
               // THE SCRIPT ASSUMES THAT THE MAP IS LARGE ENOUGH FOR THE CONTEXT MENU!
               if((mapHeight - y ) < menuHeight)
                  y = y - menuHeight;
               // Now set the location of the context menu's upper left corner.
               $('.contextmenu').css('left',x  );
               $('.contextmenu').css('top',y );
            }

            function hideContextMenu() {
               if (contextmenuDiv != null) contextmenuDiv.style.visibility = "hidden";
            }


            // The codeLatLng() function uses the geocode method to retrieve
            // the physical address at any geo-location. The process of geocoding
            // locations is discussed in detail in Chapter 17.
            function codeLatLng(location) {
               geocoder.geocode({'latLng': location}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                     if (results[0]) {
                        alert(results[0].formatted_address);
                     }
                  } else {
                     alert("Geocoder failed due to: " + status);
                  }
               });
            }

            function showContextMenu(currentLocation  ) {
               console.log('displaying context menu');
               $('.contextmenu').remove();
               contextmenuDiv = document.createElement("div");
               contextmenuDiv.className  = 'contextmenu';
               rightClickLocation=currentLocation;
               // create the context menu. It's a <div> element with three hyperlinks,
               // one for each command.
               contextmenuDiv.innerHTML =
                  "<a id='itemAddress' style='cursor: pointer'>" +
                  "    <div class=context>set radius<\/div><\/a>" +
                  "<a id='itemZoom' style='cursor: pointer'>" +
                  "    <div class=context>remove iBeacon<\/div><\/a>";
               $(map.getDiv()).append(contextmenuDiv);
               // Call the positionMenu function to place the menu on the page and then make the context menu visible.
               positionMenu(currentLocation);
               contextmenuDiv.style.visibility = "visible";
            }


            function createMarker(){
               //create new beacon and add to the center
               var tempMarker = new gmaps.Marker({
                  icon: 'http://localhost:3000/images/icons/ibeacon.svg',
                  title: "Beacon",
                  position: poi,
                  draggable: true,
                  map: map});
               markers.push(tempMarker);
               // create InfoWindow object for airport #1
               var info = new gmaps.InfoWindow({
                  content:
                     '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon;"><b>iBeacon</b></span>'
               });
               infoWindows.push(info);
               gmaps.event.addListener(tempMarker, 'click', function () {
                  closeAll();
                  info.open(map, tempMarker)
               });
               gmaps.event.addListener(tempMarker, 'dragstart', function () {
                  console.log('marker is started dragging at ', tempMarker.getPosition().toString())
               });
               gmaps.event.addListener(tempMarker, 'dragend', function () {
                  console.log('marker is dropped at ', tempMarker.getPosition().toString())
               });
               gmaps.event.addListener(tempMarker, "rightclick",function(event){
                  showContextMenu(event.latLng);
               });

            }

            function closeAll(){
               _.each(infoWindows, function(info){
                  info.close();
               })
            }

            function clearMarkers(){
               _.each(markers, function(m){
                  m.setMap(null);
               })
               markers = [];
               infoWindows = [];
            }

            var populationOptions = {
               strokeColor: 'blie',
               strokeOpacity: 0.8,
               strokeWeight: 1,
               fillColor: 'grey',
               fillOpacity: 0.35,
               map: map,
               center: poi,
               radius: 5
            };
            // Add the circle for this city to the map.
            map.enableKeyDragZoom({
               key: "shift",
               boxStyle: {
                  border: "2px dashed black",
                  backgroundColor: "red",
                  opacity: 0.25
               },
               paneStyle: {
                  backgroundColor: "maroon",
                  opacity: 0.2
               }
            });
         }
      };

      return def;
   }]);
})(window.DirectiveModule);