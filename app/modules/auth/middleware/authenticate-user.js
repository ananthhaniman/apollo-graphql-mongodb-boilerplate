const { GraphQLError } = require("graphql");
const { errorCodes } = require("../../../helpers/gql-error-handler");
const { authenticateJwtToken } = require("../../../helpers/jwt-helper");
const { User } = require("../../../schemas");

async function authenticateUser({ req }) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            return;
        }
        
        const { accessKey } = authenticateJwtToken(token);
        const user = await User
            .findOneAndUpdate(
                {
                    "accessKey": accessKey,
                    "active": true
                },
                {
                    "lastActive": new Date()
                }
            );

        if (user) {
            return { user };
        }
    } catch (err) {
        throw new GraphQLError(err.message, {
            extensions: {
                code: errorCodes.UNAUTHENTICATED
            }
        });
    }
}

module.exports = authenticateUser;