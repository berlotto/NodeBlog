/**
 * Created by jeffjin on 2014-03-22.
 */

(function(module){
   module.directive('jjImageSlider', ['$timeout', function ($timeout) {
        var def = {
            restrict: 'AE',
            templateUrl: '/app/js/directives/templates/ios-slider.html',
            controller: 'ImageListCtrl',
//               function($scope){
//                console.log('cnkImageSlider controller is called');
//                $scope.images = [
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSC7370.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSC7371.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSC7372.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7378.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7397.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7494.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7493.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7391.JPG'
//                    },
//                    {
//                        title: 'Title 1',
//                        desc: 'Desc 1',
//                        url: 'public/images/mason/_DSL7488.JPG'
//                    }
//                ];
//            },

            link: function(scope, element, attrs){
                console.log('cnkImageSlider link is called');
                $timeout(function(){
                    $('.iosSlider').iosSlider({
                        scrollbar: true,
                        snapToChildren: true,
                        desktopClickDrag: true,
                        infiniteSlider: true,
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

            }
        };
        return def;
    }]);
})(window.DirectiveModule);