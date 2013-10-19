
module.exports = {
    development: {
        db: 'mongodb://localhost/',
        app: {
            name: 'Node Blog Application'
        },
        facebook: {
            clientID: "554201907965369",
            clientSecret: "29399a70385f12dea73564f93c3ff938",
            callbackURL: "http://localhost:3000/auth/facebook/callback"
        }
    },
    production: {
        db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL,
        app: {
            name: 'Node Blog Application'
        },
        facebook: {
            clientID: "554201907965369",
            clientSecret: "29399a70385f12dea73564f93c3ff938",
            callbackURL: "http://www.jeffjin.com/auth/facebook/callback"
        }
    }
}