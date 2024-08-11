const { GraphQLError } = require("graphql");
const { errorCodes } = require("../helpers/gql-error-handler");
const { Otp } = require("../schemas");
const otpGenerator = require('otp-generator');

async function generateOtp(email, label) {
    const checkEligible = await canCreateOtp(email);
    
    // Clear previous top records of user
    await Otp.deleteMany({ "email": email });
    // generate otp code
    const otp = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    const otpModel = new Otp();

    // Save otp
    otpModel.email = email;
    otpModel.otp = otp;
    otpModel.label = label;

    if (process.env.NODE_ENV == "local") {
        console.log(otp);
    }

    await otpModel.validate();
    await otpModel.save();

    return otp;
};

async function verifyOtp(email, otp) {
    // Check Otp
    const otpModel = await Otp.findOne({ "email": email });
    if (otpModel) {
        const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000);
        // Check if otp is too old
        if (otpModel.createdAt > oneMinAgo) {
            const isValidOtp = await otpModel.validateOtp(otp);
            if (isValidOtp) {
                // delete all Otps of user
                await Otp.deleteMany({ "email": email });
                return true;
            } else {
                throw new GraphQLError("Invalid Otp", {
                    extensions: {
                        code: errorCodes.INVALID_OTP
                    }
                });
            }
        } else {
            // delete all Otps of user
            await Otp.deleteMany({ "email": email });
            throw new GraphQLError("Otp Expired", {
                extensions: {
                    code: errorCodes.EXPIRED_OTP
                }
            });
        }
    } else {
        throw new GraphQLError("Invalid Otp", {
            extensions: {
                code: errorCodes.INVALID_OTP
            }
        });
    }
};

async function canCreateOtp(email) {
    // Check Otp
    const otpModel = await Otp.findOne({ "email": email });
    if (otpModel) {
        const oneMinAgo = new Date(Date.now() - 1 * 60 * 1000);
        return otpModel.createdAt > oneMinAgo;
    } else {
        return true;
    }
}

module.exports = {
    generateOtp,
    verifyOtp
};