const User = require("../../modules/user/user.schema.js");
const generateTokenProvider = require("./generateToken.provider.js");
const erroroLogger = require("../../helpers/errorLogger.js");

const { StatusCodes } = require("http-status-codes");
const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

async function loginProvider(req, res) {
  const validatedData = matchedData(req);

  try {
    //Get by email
    const user = await User.findOne({ email: validatedData.email });

    //Check if user exists
    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: "Invalid email. Please check your credentials and try again.",
      });
    }

    //Check and compare password
    const passwordMatch = await bcrypt.compare(
      validatedData.password,
      user.password,
    );

    if (!passwordMatch) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message:
          "Invalid password, Please check your credentials and try again.",
      });
    }

    //Generate JWT token
    const token = generateTokenProvider(user);

    //Return response
    return res.status(StatusCodes.OK).json({
      accessToken: token,
      email: user.email,
      name: user.name,
    });
  } catch (error) {
    erroroLogger("Error occurred while logging in", req, error);
    return res.status(StatusCodes.GATEWAY_TIMEOUT).json({
      message: "An error occurred while logging in. Please try again later.",
    });
  }
}

module.exports = loginProvider;
