const { requireGql } = require("../tools/gql-tools");

// Auth
const signUp = requireGql("./auth/queries/signUp");
const signIn = requireGql("./auth/queries/signIn");
const authType = requireGql("./auth/types/auth");

// User
const userType = requireGql("./user/types/user");
const getUser = requireGql("./user/queries/getUser");

module.exports = [
    signUp,
    signIn,
    authType,
    userType,
    getUser
];