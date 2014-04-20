/**
 * Created by jeffjin on 2014-03-22.
 */

(function(module){
   module.directive('jjImageSlider', ['$timeout', function ($timeout) {
        var def = {
            restrict: 'AE',
            templateUrl: 'scripts/directives/templates/ios-slider.html',
            controller: 'ImageListCtrl',
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