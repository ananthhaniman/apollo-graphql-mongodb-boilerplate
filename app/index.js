const mongoose = require('mongoose');
const { server } = require('./server');
const { startStandaloneServer } = require("@apollo/server/standalone");

// JWT Authentication
const authenticateUser = require('./modules/auth/middleware/authenticate-user');

const start = async () => {
    try {
        // Connect Mongo database
        await mongoose.connect(process.env.MONGO_URL);

        // Start Express server
        const { url } = await startStandaloneServer(
            server,
            {
                context: authenticateUser,
                listen: { port: process.env.PORT },
            }
        );

        console.log(`🚀  Server live at: ${url}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

start();