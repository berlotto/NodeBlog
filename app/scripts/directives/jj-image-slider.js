'use strict';

(function(module){
   module.directive('jjImageSlider', ['$timeout', '$routeParams',  '$location', '$anchorScroll', 'imageService',
      function ($timeout, $routeParams, $location, $anchorScroll, imageService) {
         var scope;
         var originalImages = [];
         var pageIndex = 0, pageSize = 45, currentSlideIndex = 0;

         var setupSlider = function(defaultIndex){
            if($('.iosSlider').iosSlider){
               $('.iosSlider').iosSlider('destroy');
            }
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
//
//            $('.iosSliderButtons .button').removeClass('selected');
//            $('.iosSliderButtons .button:eq(' + (args.currentSlideNumber - 1) + ')').addClass('selected');
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
                  $scope.folders = JSON.parse(result.data);
                  if($routeParams.folder){
                     $scope.selectedFolder = _.find($scope.folders, function(f){
                        return f.name === $routeParams.folder;
                     });
                  }
                  else{
                     $scope.selectedFolder = $scope.selectedFolder || $scope.folders[0];
                  }
                  $timeout(function(){
                     console.log('scrolling...', $scope.selectedFolder)
                     $location.hash($scope.selectedFolder.name);
                     $anchorScroll();
                  });
               }).then(function(){
                  imageService.getList($scope.selectedFolder.name, pageIndex, 100)
                     .then(function(result) {
                        originalImages = result.data;

                        init($scope);
                     }, function(data, status) {
                        console.error(status + ',' +data);
                     });
               });

               $scope.$watch('selectedFolder', function(newVal, oldVal){
                  if(!newVal || newVal ===oldVal){
                     return;
                  }


               });
            }
         };
         return def;
      }]);
})(window.DirectiveModule);