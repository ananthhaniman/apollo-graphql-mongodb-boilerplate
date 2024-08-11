const { GraphQLError } = require("graphql");
const { User } = require('../../../schemas');
const { generateAccessToken } = require('../../../helpers/jwt-helper');
const { displayErrorCode, errorCodes } = require('../../../helpers/gql-error-handler');


async function signIn(_, args) {
    try {
        // Define User Schema
        const user = await User.findOne({ "email": args.email, "active": true });
        if (!user) {
            throw new GraphQLError("Invalid Email Address", {
                extensions: {
                    code: errorCodes.INVALID_CREDENTIALS
                }
            });
        }

        const isValidPassword = await user.validatePassword(args.password);
        if (isValidPassword) {
            const jwtToken = generateAccessToken(user.accessKey.toString(), user.business.business.toString());
            return {
                token: jwtToken
            };
        } else {
            throw new GraphQLError("Invalid Password", {
                extensions: {
                    code: errorCodes.INVALID_CREDENTIALS
                }
            });
        }
    } catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: displayErrorCode(err)
            }
        });
    }
};

module.exports = signIn;