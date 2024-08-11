const jwt = require('jsonwebtoken');

function authenticateJwtToken(token) {
    const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
    return data;
};

function generateAccessToken(accessKey) {
    return jwt.sign(
        {
            accessKey: accessKey
        },
        process.env.JWT_TOKEN_SECRET,
        {
            expiresIn: '6h' // Put your token expire time
        }
    );
};

module.exports = {
    generateAccessToken,
    authenticateJwtToken
};