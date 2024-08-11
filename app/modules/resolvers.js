const { merge } = require('lodash');

const authResolvers = require('./auth/resolvers');
const userResolvers = require('./user/resolvers');

const resolvers = merge(
    authResolvers,
    userResolvers
);

module.exports =  resolvers;