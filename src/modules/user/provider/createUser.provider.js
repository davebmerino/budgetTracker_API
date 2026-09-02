const { matchedData } = require("express-validator");
const bcrypt = require("bcrypt");

const errorLogger = require("../../../helpers/errorLogger.js");
const User = require("../user.schema.js");
const { StatusCodes } = require("http-status-codes");

async function createUserProvider(req, res) {
  const validatedData = matchedData(req);

  //Check if user already exists
  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }
  //Hash and salt the password
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(validatedData.password, salt);

  try {
    const user = new User({
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: passwordHash,
    });

    await user.save();
    delete user.password;

    return res.status(StatusCodes.CREATED).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  } catch (error) {
    errorLogger("Error creating user", req, error);
    return res.status(500).json({ message: "Error creating user" });
  }
}

module.exports = createUserProvider;
