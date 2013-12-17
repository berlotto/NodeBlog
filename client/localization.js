'use strict';

(function (exports) {

    var resources = {
        blog: {en: 'blog', zh: '博客', ko: '블로그'},
        recentposts: {en: 'Recent Posts', zh: '最近文章', ko: '최근포스트'},
        comments: {en: 'comments', zh: '评论', ko: '댓글'},
        comment: {en: 'comment', zh: '评论', ko: '댓글'},
        junglelaw: {en: 'The Law of the Jungle', zh: '丛林里的法则', ko: '정글의 법칙'},
        welcomeMessage: {en: "Welcome to Jeff Jin's blog. Main topics include Single Page Application with Angular.JS, Node.JS, C#, ASP.net web api, NoSQL with MongoDB and RavenDB. Any interesting topics about .Net and JavaScript.",
            zh: '欢迎来到我的博客', ko: '정글의 법칙 블로그에 온것을 환영합니다.'}
    }
    exports.user = {locale: ''};
    exports.r = function (key, locale) {
        if (!key) {
            return '';
        }
        if (!locale) {
            //get user profile settings
            locale = exports.user.locale;
            if (!locale) {
                //get browser settings
                locale = navigator.language.split('-')[0];
                //console.log('navigator.language => ' + locale);
            }
        }
        var temp = resources[key];
        if (!temp) {
            return key;
        }
        var value = temp[locale];
        if (!value && locale !== 'en') {
            value = temp['en'];
            if (!value) {
                return key;
            }
        }
        return value;
    };

})(window);
