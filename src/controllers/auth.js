const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const {
  jwtSecret,
  emailService,
  UserResponseCodes,
  ResponseCodes,
  appUrl
} = require("../../constants");
const { encrypt, decrypt } = require("../services/encrypt_decrypt");
const { addUserValidation } = require("../validations/user");

// Signup
exports.signup = async (req, res) => {
  console.log("Request hit")
  return addUserValidation(req.body)
    .then(async (data) => {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        profilePhoto,
        role,
        country,
      } = data;
      console.log("Data singup ", data)
      try {
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(ResponseCodes.BAD_REQUEST)
            .json({
              code: UserResponseCodes.USER_ALREADY_EXIST,
              success: false,
              message: "User already exists with this email address",
            });
        }

        user = new User({
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
          profilePhoto,
          role,
          country
        });
        const encryptedPassword = encrypt(password);
        user.password = encryptedPassword;
        await user.save();
        console.log("created new user ", user);
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
          if (err) throw err;
          res
            .status(ResponseCodes.CREATED)
            .json({
              code: UserResponseCodes.USER_SUCCESS,
              success: true,
              message: "Signup successfully",
              token,
            });
        });
      } catch (err) {
        console.error(err.message);
        res
          .status(ResponseCodes.INTERNAL_SERVER_ERROR)
          .json({
            code: ResponseCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Internal server error",
          });
      }
    })
    .catch((error) => {
      return res
        .status(ResponseCodes.INTERNAL_SERVER_ERROR)
        .json({
          code: ResponseCodes.INTERNAL_SERVER_ERROR,
          message: "Schema validation error",
          error,
          success: false,
        });
    });
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("login body ", req.body);
  try {
    const user = await User.findOne({ email });
    console.log("user ", user);
    if (!user) {
      return res
        .status(ResponseCodes.BAD_REQUEST)
        .json({
          code: UserResponseCodes.USER_FETCH_FAILED,
          success: false,
          message: "Invalid Credentials",
        });
    }

    const decryptedPassword = (await decrypt(user.password)).toString();
    const isMatch = decryptedPassword === password;
    if (!isMatch) {
      return res
        .status(ResponseCodes.BAD_REQUEST)
        .json({
          code: UserResponseCodes.USER_PASSWORD_MATCH_ERROR,
          success: false,
          message: "Invalid Credentials",
        });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, jwtSecret, { expiresIn: "1d" }, (err, token) => {
      if (err) throw err;
      res
        .status(ResponseCodes.CREATED)
        .json({
          code: UserResponseCodes.USER_SUCCESS,
          success: true,
          message: "Login successfully",
          token,
        });
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
      });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(ResponseCodes.BAD_REQUEST)
        .json({
          code: UserResponseCodes.USER_FETCH_FAILED,
          success: false,
          message: "No account with that email found",
        });
    }

    const token = CryptoJS.lib.WordArray.random(20).toString(CryptoJS.enc.Hex);

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "razgovor6367829@gmail.com",
        pass: "knwdhnpcuvsrevir",
      },
    });

    const mailOptions = {
      to: user.email,
      from: "razgovor6367829@gmail.com",
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${appUrl}/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error("Error sending email:", err);
        return res
          .status(ResponseCodes.INTERNAL_SERVER_ERROR)
          .json({
            code: ResponseCodes.INTERNAL_SERVER_ERROR,
            success: false,
            message: "Error sending email",
          });
      }
      res
        .status(ResponseCodes.OK)
        .json({
          code: ResponseCodes.OK,
          success: true,
          message: "Recovery email sent successfully",
        });
    });
  } catch (err) {
    console.error(err.message);
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
      });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(ResponseCodes.BAD_REQUEST)
        .json({
          code: ResponseCodes.BAD_REQUEST,
          success: false,
          message: "Password reset token is invalid or has expired",
        });
    }

    const encryptedPassword = encrypt(newPassword);
    user.password = encryptedPassword;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res
      .status(ResponseCodes.OK)
      .json({
        code: ResponseCodes.OK,
        success: true,
        message: "Password has been reset",
      });
  } catch (err) {
    console.error(err.message);
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
      });
  }
};

// Send OTP through email
exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res
        .status(ResponseCodes.INTERNAL_SERVER_ERROR)
        .json({
          code: UserResponseCodes.USER_NOT_FOUND,
          success: false,
          message: "User not found",
        });
    }

    let generatedOTP = "";
    for (let index = 0; index < 6; index++) {
      generatedOTP += Math.floor(Math.random() * 9);
    }
    console.log("opt is ", generatedOTP);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "razgovor6367829@gmail.com",
        pass: "knwdhnpcuvsrevir",
      },
    });

    const mailOptions = {
      to: email,
      from: "razgovor6367829@gmail.com",
      subject: 'Password Reset',
      text: `You are receiving this because you (or someone else) have requested to update your account's email address.\n\n
        Please use the verification code below to update email:\n\n
        ${generatedOTP}
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('Error sending email:', err);
        return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({code: ResponseCodes.INTERNAL_SERVER_ERROR, success: false, message: 'Error sending email'});
      }
      res.status(ResponseCodes.OK).json({ code: ResponseCodes.OK, success: true, message: 'Recovery email sent successfully' });
    });

    user.otp = String(generatedOTP);
    user.otpExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    res
      .status(ResponseCodes.OK)
      .json({
        code: ResponseCodes.OK,
        success: true,
        message: "OTP send successfully",
        opt: generatedOTP,
      });
  } catch (err) {
    console.error(err.message);
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
      });
  }
};

// Update Email
exports.updateEmail = async (req, res) => {
  const { newEmail, otp } = req.body;
  try {
    const user = await User.findById(req.user_id);

    if (!user) {
      return res
        .status(ResponseCodes.INTERNAL_SERVER_ERROR)
        .json({
          code: UserResponseCodes.USER_NOT_FOUND,
          success: false,
          message: "User not found",
        });
    }

    // Assume OTP verification step is completed here
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res
        .status(ResponseCodes.BAD_REQUEST)
        .json({
          code: UserResponseCodes.USER_PASSWORD_MATCH_ERROR,
          success: false,
          message: "Invalid OTP",
        });
    }

    user.email = newEmail;
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res
      .status(ResponseCodes.OK)
      .json({
        code: ResponseCodes.OK,
        success: true,
        message: "Email updated successfully",
      });
  } catch (err) {
    console.error(err.message);
    res
      .status(ResponseCodes.INTERNAL_SERVER_ERROR)
      .json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
      });
  }
};
