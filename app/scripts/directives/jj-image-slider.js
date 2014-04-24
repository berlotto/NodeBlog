'use strict';

(function(module){
   module.directive('jjImageSlider', ['$timeout', 'imageService',
      function ($timeout, imageService) {
         var def = {
            restrict: 'AE',
            templateUrl: 'views/templates/ios-slider.html',
            controller: 'ImageListCtrl',
            link: function($scope, element, attrs){
               console.log('cnkImageSlider link is called');
               var pageIndex = 0, pageSize = 15, currentSlideIndex = 0;
               function slideContentChange(args) {
                  /* indicator */
                  currentSlideIndex = args.currentSlideNumber - 1;
                  //console.log('args', args);
                  //increasing direction
                  if(currentSlideIndex >= (pageSize - 2) && args.targetSlideNumber > args.prevSlideNumber){
                     console.log('currentSlideIndex', currentSlideIndex);
                     pageIndex++;
                     console.log('pageIndex', pageIndex);
                     imageService.getList(pageIndex, pageSize)
                        .then(function(result) {
                           $scope.images = $scope.images.concat(result.data);
                           initSlider();
                        }, function(data, status) {
                           console.error(status + ',' +data);
                        });
                  }
                  //decreasing direction
//                  else if
                  $('.iosSliderButtons .button').removeClass('selected');
                  $('.iosSliderButtons .button:eq(' + (currentSlideIndex) + ')').addClass('selected');
               }

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

                  });
               };
               imageService.getList(pageIndex, pageSize)
                  .then(function(result) {
                     $scope.images = $scope.images.concat(result.data);
                     initSlider();
                  }, function(data, status) {
                     console.error(status + ',' +data);
                  });
            }
         };
         return def;
      }]);
})(window.DirectiveModule);