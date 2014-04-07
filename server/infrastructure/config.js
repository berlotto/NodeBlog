(function(exports){
   exports.init = function(nodeEnv){
      if(!mode){
         nodeEnv = process.env.NODE_ENV;
      }
      if(nodeEnv === 'dev'){
         return
         {
            baseImageFolder: '/Users/jeffjin/Pictures/'
            //db: 'mongodb://localhost:27017/',
               //app: { name: 'Node Blog Application' },
//            facebook: {
//               clientID: "554201907965369",
//               clientSecret: "29399a70385f12dea73564f93c3ff938",
//               callbackURL: "http://localhost:3000/auth/facebook/callback"
//            }
            //baseImageFolder: '/Users/jeffjin/Pictures/'
         };
      }
//   else
//   {
//      return {
//         db: (process.env.MONGOLAB_URI || process.env.MONGOHQ_URL),
//      app: {
//         name: 'Node Blog Application'
//      },
//      facebook: {
//         clientID: "554201907965369",
//         clientSecret: "29399a70385f12dea73564f93c3ff938",
//         callbackURL: "http://www.jeffjin.com/auth/facebook/callback"
//      }
//   }
   }

})(module.exports);