const { GraphQLError } = require("graphql");
const { errorCodes } = require("../../../helpers/gql-error-handler");

async function getUser(_, _, context) {
    const user = context.user;
    if (user) {
        return user;
    } else {
        throw new GraphQLError("Please Sign in", {
            extensions: {
                code: errorCodes.UNAUTHENTICATED
            }
        });
    }
}

module.exports = getUser;