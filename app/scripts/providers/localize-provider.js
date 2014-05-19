'use strict';

/* Providers */


// Demonstrate how to register services
// In this case it is a simple value service.
(function(module, exports){

   var resources = exports.resources || {
      blog: {en:'blog', zh: '博客', ko: '블로그'},
      recentposts: {en:'Recent Posts', zh: '最近文章', ko: '최근포스트'},
      comments: {en:'comments', zh: '评论', ko: '댓글'},
      comment: {en:'comment', zh: '评论', ko: '댓글'},
      junglelaw: {en:'The Law of the Jungle', zh: '丛林里的法则', ko: '정글의 법칙'},
      welcomeMessage: {en:'Welcome to Jeff Jin\'s blog. Main topics include Single Page Application with Angular.JS, Node.JS, C#, ASP.net web api, NoSQL with MongoDB and RavenDB. Any interesting topics about .Net and JavaScript.',
         zh: '欢迎来到我的博客', ko: '정글의 법칙 블로그에 온것을 환영합니다.'}
   };

   function Localizer(defaultLocale){

      return function(key, locale){
         if(!key){
            return '';
         }
         locale = locale || defaultLocale || navigator.language.split('-')[0];
         var temp = resources[key];
         if(!temp){
            return key;
         }
         var value = temp[locale];
         if(!value && locale !== defaultLocale){
            value = temp[defaultLocale];
            if(!value){
               return key;
            }
         }
         return value;
      };

   }

   module.provider('localize', function LocalizeProvider() {
      var defaultLocale = 'en';

      this.setDefaultLocale = function(value) {
         defaultLocale = value || defaultLocale;
      };

      this.$get = ['locale', function localizeFactory(locale) {

         // let's assume that the UnicornLauncher constructor was also changed to
         // accept and use the useTinfoilShielding argument
         return new Localizer(locale);
      }];
   });
})(window.ProviderModule, window);
