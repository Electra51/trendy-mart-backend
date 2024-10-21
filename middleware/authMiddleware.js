import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token-based
export const requireSignIn = async (req, res, next) => {
  try {
    // extract token from the "Bearer <token>" format
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    // verify the token
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: "Invalid or missing token",
    });
  }
};

// ddmin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
