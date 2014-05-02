'use strict';

(function(module){
   module.directive('jjImageSlider', ['$timeout', 'imageService',
      function ($timeout, imageService) {
         var scope;
         var originalImages = [];
         var pageIndex = 0, pageSize = 15, currentSlideIndex = 0;

         var setupSlider = function(defaultIndex){
            if($('.iosSlider').iosSlider){
               $('.iosSlider').iosSlider('destroy');
            }
            $timeout(function(){
               $('.iosSlider').iosSlider({
                  scrollbar: true,
                  snapToChildren: true,
                  desktopClickDrag: true,
                  infiniteSlider: false,
                  snapSlideCenter: true,
                  navSlideSelector: $('.iosSliderButtons .button'),
                  scrollbarHeight: '2px',
                  scrollbarBorderRadius: '0',
                  scrollbarOpacity: '0.5',
                  onSlideChange: slideContentChange,
                  onSliderLoaded: slideContentChange,
                  keyboardControls: true
               });
//               $timeout(function() {
//                  $('.iosSlider').iosSlider('goToSlide', defaultIndex);
//               }, 500);
            }, 200);
         };

         var calculateImageRange = function(imgs, index, size){
            console.log('resetting pages', 'start', index, 'end', index + size);
            return imgs.slice(index, index + size);
         };

         var addSlides = function(currentIndex, size){
            scope.$apply(function(){
               scope.images = calculateImageRange(originalImages, currentIndex, size);
               setupSlider(1);
            })
         };

         var removeSlides = function(currentIndex, size){
            scope.$apply(function(){
               scope.images = calculateImageRange(originalImages, currentIndex - size, size);
               setupSlider(size );
            });
         };

         function slideContentChange(args) {
            /* indicator */
            console.log('targetSlideNumber', args.targetSlideNumber);
            console.log('prevSlideNumber', args.prevSlideNumber);

            $('.iosSliderButtons .button').removeClass('selected');
            $('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');

            //increasing direction
            if(args.targetSlideNumber > args.prevSlideNumber) {
               currentSlideIndex ++;
            }
            else if(args.targetSlideNumber < args.prevSlideNumber) {
               currentSlideIndex --;
            }
            console.log('slideContentChange', 'currentSlideIndex', currentSlideIndex);
            if(args.currentSlideNumber === pageSize && args.targetSlideNumber > args.prevSlideNumber){
               console.log('adding slides');
               $timeout(function() {
                  addSlides(currentSlideIndex, pageSize);
               }, 500);
            }
            if((currentSlideIndex + 1) >= pageSize && args.currentSlideNumber == 1 && args.targetSlideNumber < args.prevSlideNumber){
               console.log('removing slides');
               $timeout(function() {
                  removeSlides(currentSlideIndex + 1, pageSize);
               }, 500);
            }
         }

         var init = function(s){
            scope = s;
            scope.images = calculateImageRange(originalImages, currentSlideIndex, pageSize);
            setupSlider(1);
         };

         var def = {
            restrict: 'AE',
            templateUrl: 'views/templates/ios-slider.html',
            controller: 'ImageListCtrl',
            link: function($scope, element, attrs){
               console.log('cnkImageSlider link is called');
               imageService.getFolderList().then(function(result){
                  $scope.folders = result.data;
                  $scope.selectedFolder = $scope.folders[4];
               }).then(function(){
                  imageService.getList($scope.selectedFolder, pageIndex, 100)
                     .then(function(result) {
                        originalImages = result.data;

                        init($scope);
                     }, function(data, status) {
                        console.error(status + ',' +data);
                     });
               });
            }
         };
         return def;
      }]);
})(window.DirectiveModule);