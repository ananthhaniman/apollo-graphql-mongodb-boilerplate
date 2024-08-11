const mongoose = require('mongoose');
const { GraphQLError } = require("graphql");
const { User } = require('../../../schemas');
const { generateAccessToken } = require('../../../helpers/jwt-helper');
const { displayErrorCode } = require('../../../helpers/gql-error-handler');


async function signUp(_, args) {
    try {
        // Define User Schema
        const user = new User();
        user.firstName = args.firstName;
        user.lastName = args.lastName;
        user.email = args.email;
        user.password = args.password;
        const accessKey = new mongoose.Types.ObjectId;
        user.accessKey = accessKey;

        // Validate and save User
        await user.validate();
        await user.save();

        // Generate JWT Auth Token
        const jwtToken = generateAccessToken(user.accessKey);
        return {
            token: jwtToken
        };
    } catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: displayErrorCode(err)
            }
        });
    }
};

module.exports = signUp;