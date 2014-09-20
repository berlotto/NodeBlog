'use strict';

(function(module){
   module.directive('eMainMenu', ['$q', function ($q) {


      return {
         restrict: 'AE',
         replace: true,
         scope: {
            currentPage: '=?'
         },
         templateUrl: 'views/templates/e-main-menu.html',
         link: function (scope, element, attrs) {

            scope.currentPage = 'home';

            function removeCurrentPage(backward, page){
               var deferred = $q.defer();

               var in_animation =  "pt-page-rotateCubeRightIn";
               var out_animation = "pt-page-rotateCubeRightOut";
               if(backward){
                  in_animation =  "pt-page-rotateCubeLeftIn";
                  out_animation =  "pt-page-rotateCubeLeftOut";
               }

               $(".content > div#" + page).removeClass (function (index, css) {
                  return (css.match (/^pt-page-rotateCube\S+/g));
               }).addClass(out_animation);
               setTimeout(function(){
                  $(".content > div#"  + page).removeAttr("class");
                  deferred.resolve(true);
               }, 600);

               return deferred.promise;

            }

            scope.goHome = function(){

               //remove
               $(".content > div#about").removeClass('pt-page-rotateCubeRightIn').addClass('pt-page-rotateCubeLeftOut');
               setTimeout(function(){
                  $(".content > div#about").removeAttr("class");
               }, 600);

               //add
               $(".content > div#home").addClass("pt-page-current pt-page-rotateCubeLeftIn");
               setTimeout(function(){
                  $(".content > div#home").addClass("pt-page-current");
                  scope.currentPage = 'home';
               }, 600);
            };

            scope.goAbout = function(){
               $(".content > div#home").removeClass('pt-page-rotateCubeLeftIn').addClass('pt-page-rotateCubeRightOut');
               setTimeout(function(){
                  $(".content > div#home").removeAttr("class");
               }, 600);


               $(".content > div#about").addClass("pt-page-current pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#about").addClass("pt-page-current");
                  scope.currentPage = 'about';

               }, 600);
            };

            scope.goResume = function(){
               $(".content > div#about").removeClass('pt-page-rotateCubeRightIn').addClass('pt-page-rotateCubeRightOut');
               setTimeout(function(){
                  $(".content > div#about").removeAttr("class");
               }, 600);


               $(".content > div#resume").addClass("pt-page-current pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#resume").addClass("pt-page-current");
                  scope.currentPage = 'resume';

               }, 600);
            };

            scope.goPortfolio = function(){
               $(".content > div#about").removeClass('pt-page-rotateCubeRightIn').addClass('pt-page-rotateCubeRightOut');
               setTimeout(function(){
                  $(".content > div#about").removeAttr("class");
               }, 600);


               $(".content > div#portfolio").addClass("pt-page-current pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#portfolio").addClass("pt-page-current");
                  scope.currentPage = 'portfolio';

               }, 600);
            };

            scope.goBlog = function(){
               $(".content > div#portfolio").removeClass('pt-page-rotateCubeRightIn').addClass('pt-page-rotateCubeRightOut');
               setTimeout(function(){
                  $(".content > div#portfolio").removeAttr("class");
               }, 600);


               $(".content > div#blog").addClass("pt-page-current pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#blog").addClass("pt-page-current");
                  scope.currentPage = 'blog';

               }, 600);
            };

            scope.goContact = function(){
               $(".content > div#blog").removeClass('pt-page-rotateCubeRightIn').addClass('pt-page-rotateCubeRightOut');
               setTimeout(function(){
                  $(".content > div#blog").removeAttr("class");
               }, 600);


               $(".content > div#contact").addClass("pt-page-current pt-page-rotateCubeRightIn");
               setTimeout(function(){
                  $(".content > div#contact").addClass("pt-page-current");
                  scope.currentPage = 'contact';

               }, 600);
            };

         }
      };
   }]);
})(window.DirectiveModule);
