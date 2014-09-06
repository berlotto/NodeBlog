'use strict';

(function(module){
   module.directive('eMainMenu', ['$window', function ($window) {


      return {
         restrict: 'AE',
         replace: true,
         scope: {
         },
         templateUrl: 'views/templates/main-menu.html',
         link: function (scope, element, attrs) {

            var anim_in = "pt-page-rotateCubeLeftIn";
            var anim_out = "pt-page-rotateCubeLeftOut";

            var anim_in_inv = "pt-page-rotateCubeRightIn";
            var anim_out_inv = "pt-page-rotateCubeRightOut";

            var curr_page_loaded = true;
            var next_page_loaded = false;

            var next_page, curr_page;
            var jsp_destroyed = false;

            //main menu navigation and go to page button
//            $(".main_menu ul li a, .goto_page_btn").click(function(e){
//               console.log('menu button clicked...');
//               var win_width = $(window).width();
//
//               if (win_width <= 991){
//
//                  var current_page = $("div.pt-page-current").attr("id");
//
//                  if ($(this).hasClass("goto_page_btn")){
//                     next_page = $(this).attr("data-page");
//                  }else{
//                     next_page = $(this).attr("href");
//                     next_page = next_page.split("#");
//                     next_page = next_page[1];
//                  }
//
//                  if (current_page == next_page)
//                     return false;
//
//                  $(".content > div#"+current_page).removeClass("pt-page-current");
//                  $(".content > div#"+current_page).fadeOut(200);
//
//                  setTimeout(function(){
//                     $(".content > div#"+next_page).addClass("pt-page-current");
//                     $(".content > div#"+next_page).fadeIn(200);
//                  }, 300);
//
//
//                  $(".main_menu ul li a.active").removeClass("active");
//                  if ($(this).hasClass("goto_page_btn")){
//                     $(".main_menu ul li a."+$(this).attr("data-page")).addClass("active");
//                  }else{
//                     $(this).addClass("active");
//                  }
//
//                  if (!$(this).hasClass("goto_page_btn")){
//                     $(".responsive_menu_btn").next().slideUp();
//                  }
//
//                  $('html,body').animate({
//                     scrollTop: $(".content > div#"+next_page).offset().top
//                  }, 1000);
//
//                  return false;
//
//               }else{
//
//
//                  if ($(this).hasClass("link")){
//                     window.location.href = $(this).attr("href");
//                     return false;
//                  }
//
//                  if ($(this).hasClass("active"))
//                     return false;
//
//                  if (curr_page_loaded == false && next_page_loaded == false)
//                     return false;
//
//                  curr_page = $("div.pt-page-current").attr("id");
//                  $("#hdn_page_id").val($window.curr_page);
//
//                  if ($(this).hasClass("goto_page_btn")){
//                     next_page = $(this).attr("data-page");
//                  }else{
//                     next_page = $(this).attr("href");
//                     next_page = next_page.split("#");
//                     next_page = next_page[1];
//                  }
//
//                  if (curr_page == next_page)
//                     return false;
//
//                  var curr_page_id = $(".main_menu ul li a.active").attr("data-id");
//                  var next_page_id;
//
//                  if ($(this).hasClass("goto_page_btn")){
//                     next_page_id = $(".main_menu ul li a."+$(this).attr("data-page")).attr("data-id");
//                  }else{
//                     next_page_id = $(this).attr("data-id");
//                  }
//
//                  var animEndEventNames = {
//                        'WebkitAnimation' : 'webkitAnimationEnd',
//                        'OAnimation' : 'oAnimationEnd',
//                        'msAnimation' : 'MSAnimationEnd',
//                        'animation' : 'animationend'
//                     },
//
//                  // animation end event name
//                     animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];
//
//                  var anim_in_f = anim_in;
//                  var anim_out_f = anim_out;
//                  if (next_page_id < curr_page_id){
//                     anim_in_f = anim_in_inv;
//                     anim_out_f = anim_out_inv;
//                  }
//
//                  curr_page_loaded = false;
//
//                  $(".content > div#"+$window.curr_page+" .cycle-slideshow").cycle("pause");
//
//                  if (curr_page == "home"){
//                     $(".main_slider").cycle("pause");
//                  }
//
//                  if (jsp_destroyed == true){
//                     $(".content > div:not([id='home'])").jScrollPane({
//                        autoReinitialise: true,
//                        verticalGutter: 150
//                     });
//                  }
//
//                  $(".content > div#" + curr_page).removeClass(anim_in_f).addClass(anim_out_f).on(animEndEventName, function(){
//
//                     curr_page_loaded = true;
//
//                     $(this).removeAttr("class");
//
//                     if (next_page == "contact"){
//                        if ($("#gmap").is(":empty")){
//                           new Maplace({
//                              map_options: {
//                                 mapTypeId: google.maps.MapTypeId.HYBRID,
//                                 set_center: [-25.005973, 133.198242],
//                                 zoom: 4
//                              }
//                           }).Load();
//                        }
//                     }else if (next_page == "blog"){
//                        if ($(".blog_tweets > .tweets").is(":empty")){
//                           $('.blog_tweets > .tweets').twittie({
//                              dateFormat: '%b. %d, %Y',
//                              template: '<strong class="date">{{date}}</strong> - <span class="tweet">{{tweet}}</span>',
//                              count: 4
//                           });
//                        }
//                     }
//
//                  });
//
//                  next_page_loaded = false;
//
//                  $(".content > div#"+next_page).addClass("pt-page-current "+anim_in_f).on(animEndEventName, function(){
//
//                     $(".content > div#"+next_page+" .cycle-slideshow").cycle("resume");
//
//                     //home slider resume
//                     if (next_page == "home"){
//                        $(".main_slider").cycle("resume");
//                     }
//
//                     next_page_loaded = true;
//
//                     $(this).removeClass(anim_in_f);
//                     if (!$(this).hasClass("pt-page-current")){
//                        $(this).addClass("pt-page-current");
//                     }
//
//                  });
//
//
//                  $(".main_menu ul li a.active").removeClass("active");
//                  if ($(this).hasClass("goto_page_btn")){
//                     $(".main_menu ul li a."+$(this).attr("data-page")).addClass("active");
//                  }else{
//                     $(this).addClass("active");
//                  }
//
//                  return false;
//
//               }
//
//            });

//------------------------------------------------------------------------------------------------/


            console.log('hash change triggered...');
            var hash = location.hash;
            if (hash == "")
               return false;


            var split = hash.split("/");

            var page = split[1];

            var pages_array = [
               'home',
               'about',
               'resume',
               'portfolio',
               'blog',
               'contact'
            ];

            if (!($.inArray(page, pages_array) > -1)){
               return false;
            }

            var win_width = $(window).width();

            if (win_width <= 991){

               var current_page = $("div.pt-page-current").attr("id");

               var next_page = $(".main_menu ul li a[href='#/"+page+"']").attr("href");
               next_page = next_page.split("/");
               next_page = next_page[1];

               if (current_page == next_page)
                  return false;

               $(".content > div#"+current_page).removeClass("pt-page-current");
               $(".content > div#"+current_page).fadeOut(200);

               setTimeout(function(){
                  $(".content > div#"+next_page).addClass("pt-page-current");
                  $(".content > div#"+next_page).fadeIn(200);
               }, 300);


               $(".main_menu ul li a.active").removeClass("active");
               $(".main_menu ul li a[href='#"+page+"']").addClass("active");

               $('html,body').animate({
                  scrollTop: $(".content > div#"+next_page).offset().top
               }, 1000);

               return false;

            }else{

               if ($(".main_menu ul li a[href='#/"+page+"']").hasClass("active"))
                  return false;

               if (curr_page_loaded == false && next_page_loaded == false)
                  return false;

               curr_page = $("div.pt-page-current").attr("id");
               $("#hdn_page_id").val(curr_page);

               var next_page = $(".main_menu ul li a[href='#/"+page+"']").attr("href");
               next_page = next_page.split("#");
               next_page = next_page[1];

               var init_page = $(".pt-page-current").attr("id");
               $("#hdn_page_id").val(init_page);

               if (curr_page == next_page)
                  return false;

               var curr_page_id = $(".main_menu ul li a[href='#/"+curr_page+"']").attr("data-id");
               var next_page_id;

               next_page_id = $(".main_menu ul li a[href='#/"+page+"']").attr("data-id");

               console.log(curr_page_id);
               console.log(next_page_id);

               var animEndEventNames = {
                     'WebkitAnimation' : 'webkitAnimationEnd',
                     'OAnimation' : 'oAnimationEnd',
                     'msAnimation' : 'MSAnimationEnd',
                     'animation' : 'animationend'
                  },

               // animation end event name
                  animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

               var anim_in_f = anim_in;
               var anim_out_f = anim_out;
               if (next_page_id < curr_page_id){
                  anim_in_f = anim_in_inv;
                  anim_out_f = anim_out_inv;
               }

               curr_page_loaded = false;

               $(".content > div#"+curr_page+" .cycle-slideshow").cycle("pause");

               if (curr_page == "home"){
                  $(".main_slider").cycle("pause");
               }

               if (jsp_destroyed == true){
                  $(".content > div:not([id='home'])").jScrollPane({
                     autoReinitialise: true,
                     verticalGutter: 150
                  });
               }

               $(".content > div#"+curr_page).removeClass(anim_in_f).addClass(anim_out_f).on(animEndEventName, function(){

                  curr_page_loaded = true;

                  $(this).removeAttr("class");

                  if (next_page == "contact"){
                     if ($("#gmap").is(":empty")){
                        new Maplace({
                           map_options: {
                              mapTypeId: google.maps.MapTypeId.HYBRID,
                              set_center: [-25.005973, 133.198242],
                              zoom: 4
                           }
                        }).Load();
                     }
                  }else if (next_page == "blog"){
                     if ($(".blog_tweets > .tweets").is(":empty")){
                        $('.blog_tweets > .tweets').twittie({
                           dateFormat: '%b. %d, %Y',
                           template: '<strong class="date">{{date}}</strong> - <span class="tweet">{{tweet}}</span>',
                           count: 4
                        });
                     }
                  }

               });

               next_page_loaded = false;

               $(".content > div#"+next_page).addClass("pt-page-current "+anim_in_f).on(animEndEventName, function(){

                  $(".content > div#"+next_page+" .cycle-slideshow").cycle("resume");

                  //home slider resume
                  if (next_page == "home"){
                     $(".main_slider").cycle("resume");
                  }

                  next_page_loaded = true;

                  $(this).removeClass(anim_in_f);
                  if (!$(this).hasClass("pt-page-current")){
                     $(this).addClass("pt-page-current");
                  }

               });


               $(".main_menu ul li a.active").removeClass("active");
               $(".main_menu ul li a[href='#/"+page+"']").addClass("active");

               return false;
            }
         }
      };
   }]);
})(window.DirectiveModule);
