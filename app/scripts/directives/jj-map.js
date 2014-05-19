'use strict';

(function(module){
   module.directive('jjMap', ['gmaps', 'FloorPlan', function (gmaps, FloorPlan) {
      var def = {
         restrict: 'AE',
         replace: true,
         scope: {
            lat: '=',
            lnt: '='
         },
         templateUrl: 'views/templates/jj-map.html',
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
            var swBound = new gmaps.LatLng(lat - 0.00013, lnt - 0.00028);
            var neBound = new gmaps.LatLng(lat + 0.00018, lnt + 0.00009);
            var bounds = new gmaps.LatLngBounds(swBound, neBound);
            // The photograph is courtesy of the U.S. Geological Survey.
            var srcImage = 'http://docs.elevenworks.com/download/attachments/3246818/floor_plan_example.png';

            // The custom USGSOverlay object contains the USGS image,
            // the bounds of the image, and a reference to the map.
            var overlay = new FloorPlan(bounds, srcImage, map);

            var marker = new gmaps.Marker({
               title: "145 Front Street",
               position: poi,
               map: map});

            var marker1 = new gmaps.Marker({
               title: "North East",
               position: new gmaps.LatLng(lat + 0.00018, lnt + 0.00009),
               map: map});

            var marker2 = new gmaps.Marker({
               title: "South West",
               position: new gmaps.LatLng(lat - 0.00013, lnt - 0.00028),
               map: map});

            var populationOptions = {
               strokeColor: '#FF0000',
               strokeOpacity: 0.8,
               strokeWeight: 1,
               fillColor: '#FF0000',
               fillOpacity: 0.35,
               map: map,
               center: poi,
               radius: 5
            };
            // Add the circle for this city to the map.
            var cityCircle = new gmaps.Circle(populationOptions);
//            map.enableKeyDragZoom({
//               key: "shift",
//               boxStyle: {
//                  border: "2px dashed black",
//                  backgroundColor: "red",
//                  opacity: 0.25
//               },
//               paneStyle: {
//                  backgroundColor: "maroon",
//                  opacity: 0.2
//               }
//            });
         }
      };

      return def;
   }]);
})(window.DirectiveModule);