/**
 * Created by jeffjin on 2014-03-22.
 */

(function(module){
   module.directive('jjImageSlider', ['$timeout', 'imageService', '$routeParams',
      function ($timeout, imageService, $routeParams) {
         var def = {
            restrict: 'AE',
            templateUrl: 'views/templates/ios-slider.html',
            controller: 'ImageListCtrl',
            link: function($scope, element, attrs){
               console.log('cnkImageSlider link is called');
               var initSlider = function(){
                  $timeout(function(){
                     $('.iosSlider').iosSlider({
                        scrollbar: true,
                        snapToChildren: true,
                        desktopClickDrag: true,
                        infiniteSlider: true,
                        snapSlideCenter: true,
                        navSlideSelector: $('.iosSliderButtons .button'),
                        scrollbarHeight: '2px',
                        scrollbarBorderRadius: '0',
                        scrollbarOpacity: '0.5',
                        onSlideChange: slideContentChange,
                        onSliderLoaded: slideContentChange,
                        keyboardControls: true
                     });

                     function slideContentChange(args) {
                        /* indicator */
                        $('.iosSliderButtons .button').removeClass('selected');
                        $('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
                     }
                  });
               };
               imageService.getList($routeParams.size || 15)
                  .then(function(result) {
                     $scope.images = result.data;
                     initSlider();
                  }, function(data, status) {
                     console.error(status + ',' +data);
                     $scope.images = [];
               });
            }
         };
         return def;
      }]);
})(window.DirectiveModule);