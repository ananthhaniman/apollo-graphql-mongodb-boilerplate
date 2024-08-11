const signIn = require("./signin");
const signUp = require("./signup");

module.exports = {
    Mutation: {
        signUp,
        signIn
    }
};