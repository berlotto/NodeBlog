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
            var lat = parseFloat($scope.lat);
            var lnt = parseFloat($scope.lnt);
            var poi = new gmaps.LatLng(lat, lnt);

            var mapOptions = {
               zoom: 20,
               center: poi,
               mapTypeId: gmaps.MapTypeId.ROADMAP
            };

            var map = new gmaps.Map(element[0], mapOptions);
            var marker = new gmaps.Marker({
               icon: 'http://localhost:3000/images/icons/ibeacon.svg',
               title: "PC Room",
               position: poi,
               map: map});
            // create InfoWindow object for airport #1
            var info = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Beacon 1</b></span>'
            });
            gmaps.event.addListener(marker, 'click', function () {
               closeAll();
               info.open(map, marker)
            });

            var marker0 = new gmaps.Marker({
               icon: 'http://localhost:3000/images/icons/ibeacon.svg',
               title: "Washroom",
               position: new gmaps.LatLng(lat + 0.0001, lnt + 0.00005),
               map: map});
            var info0 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Beacon 2</b></span>'
            });
            gmaps.event.addListener(marker0, 'click', function () {
               closeAll();
               info0.open(map, marker0)
            });

            var marker1 = new gmaps.Marker({
               icon: 'http://localhost:3000/images/icons/ibeacon.svg',
               title: "Coffee Shop",
               position: new gmaps.LatLng(lat + 0.00006, lnt),
               map: map});
            var info1 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Beacon 3</b></span>'
            });
            gmaps.event.addListener(marker1, 'click', function () {
               closeAll();
               info1.open(map, marker1)
            });

            var marker2 = new gmaps.Marker({
               icon: 'http://localhost:3000/images/icons/ibeacon.svg',
               title: "Kitchen",
               position: new gmaps.LatLng(lat - 0.00008, lnt - 0.0002),
               map: map});
            var info2 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Beacon 4</b></span>'
            });
            gmaps.event.addListener(marker2, 'click', function () {
               closeAll();
               info2.open(map, marker2)
            });

            function closeAll(){
               info.close();
               info1.close();
               info2.close();
               info0.close();
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