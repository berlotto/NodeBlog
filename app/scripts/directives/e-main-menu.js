'use strict';

(function(module){
   module.directive('eMainMenu', ['$window', function ($window) {


      return {
         restrict: 'AE',
         replace: true,
         scope: {
            transition: '='
         },
         templateUrl: 'views/templates/e-main-menu.html',
         link: function (scope, element, attrs) {

            var anim_in = "pt-page-rotateCubeLeftIn";
            var anim_out = "pt-page-rotateCubeLeftOut";

            var anim_in_inv = "pt-page-rotateCubeRightIn";
            var anim_out_inv = "pt-page-rotateCubeRightOut";

            var curr_page_loaded = true;
            var next_page_loaded = false;

            var next_page, curr_page;
            var jsp_destroyed = false;

            scope.currentPage = 'home';

            function removeCurrentPage(){

               $(".content > div#" + scope.currentPage).removeClass("pt-page-rotateCubeRightIn").addClass("pt-page-rotateCubeRightOut");
               setTimeout(function(){
                  $(".content > div#about").removeAttr("class");
               }, 600);

            }

            scope.goHome = function(){
               removeCurrentPage();
               scope.currentPage = 'home';
               $(".content > div#home").addClass("pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#home").addClass("pt-page-current");
               }, 600);
            };

            scope.goAbout = function(){
               removeCurrentPage();
               scope.currentPage = 'about';
               $(".content > div#about").addClass("pt-page-rotateCubeLeftIn");
               setTimeout(function(){
                  $(".content > div#about").addClass("pt-page-current");
               }, 600);
            };

         }
      };
   }]);
})(window.DirectiveModule);
