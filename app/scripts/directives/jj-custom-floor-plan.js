'use strict';

(function(module){
   module.directive('jjCustomFloorPlan', ['gmaps', 'FloorPlan', function (gmaps, FloorPlan) {
      var def = {
         restrict: 'AE',
         replace: true,
         scope: {
            lat: '=',
            lnt: '='
         },
         templateUrl: 'views/templates/jj-custom-floor-plan.html',
         link: function ($scope, element, attrs) {
            var lat = parseFloat($scope.lat);
            var lnt = parseFloat($scope.lnt);
            var poi = new gmaps.LatLng(lat, lnt);

            var mapOptions = {
               zoom: 21,
               center: poi,
               mapTypeId: gmaps.MapTypeId.ROADMAP
            };

            var map = new gmaps.Map(element[0], mapOptions);
            var swBound = new gmaps.LatLng(lat - 0.00013, lnt - 0.00028);
            var neBound = new gmaps.LatLng(lat + 0.00018, lnt + 0.00009);
            var bounds = new gmaps.LatLngBounds(swBound, neBound);
            // The photograph is courtesy of the U.S. Geological Survey.
            var srcImage = 'http://docs.elevenworks.com/download/attachments/3246818/floor_plan_example.png';

            // The custom USGSOverlay object contains the USGS image,
            // the bounds of the image, and a reference to the map.
            var overlay = new FloorPlan(bounds, srcImage, map);

            var marker = new gmaps.Marker({
               icon: 'http://www.degreematch.com/blog/wp-content/uploads/2012/05/computer-icon.png',
               title: "PC Room",
               position: poi,
               map: map});
            // create InfoWindow object for airport #1
            var info = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>PC Room</b>Workstations</span>'
            });
            gmaps.event.addListener(marker, 'click', function () {
               closeAll();
               info.open(map, marker)
            });

            var marker0 = new gmaps.Marker({
               icon: 'http://www.mcmaster.ca/uts/maps/images/cooed.png',
               title: "Washroom",
               position: new gmaps.LatLng(lat + 0.0001, lnt + 0.00005),
               map: map});
            var info0 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Washroom</b></span>'
            });
            gmaps.event.addListener(marker0, 'click', function () {
               closeAll();
               info0.open(map, marker0)
            });

            var marker1 = new gmaps.Marker({
               icon: 'http://discoverclearlake.com/wp-content/uploads/2013/03/icon-coffee-shop.png',
               title: "Coffee Shop",
               position: new gmaps.LatLng(lat + 0.00006, lnt),
               map: map});
            var info1 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Coffee Shop</b></span>'
            });
            gmaps.event.addListener(marker1, 'click', function () {
               closeAll();
               info1.open(map, marker1)
            });

            var marker2 = new gmaps.Marker({
               icon: 'https://cdn1.iconfinder.com/data/icons/dining-and-food/32/food-dishes-64.png',
               title: "Kitchen",
               position: new gmaps.LatLng(lat - 0.00008, lnt - 0.0002),
               map: map});
            var info2 = new gmaps.InfoWindow({
               content:
                  '<span style="font-family: Trebuchet MS; font-size:10pt; color: maroon"><b>Coffee Shop</b></span>'
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
            var cityCircle = new gmaps.Circle(populationOptions);
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