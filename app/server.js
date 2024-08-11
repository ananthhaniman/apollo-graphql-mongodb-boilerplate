const { ApolloServer } = require("@apollo/server");
const dotEnv = require('dotenv');

// Configure Environment file
const runEnv = process.argv[2];
if (runEnv) {
    if (runEnv === "dev") {
        dotEnv.config({ path: `.env.development`, override: true });
    } else if (runEnv === "prod") {
        dotEnv.config({ path: `.env.production`, override: true });
    } else {
        dotEnv.config({ path: `.env.local`, override: true });
    }
} else {
    dotEnv.config({ path: `.env.local`, override: true });
}

// GQL Queries and resolvers
const typeDefs = require("./modules/types");
const resolvers = require("./modules/resolvers");

// Configure Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    includeStacktraceInErrorResponses: process.env.NODE_ENV !== "production"
});

module.exports = { server };