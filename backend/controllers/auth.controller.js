import userModel from "../models/user.model.js";
import { isValidEmail, isValidPassword } from "../utils/auth.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user;
    if (!isValidEmail(email)) {
      throw next(errorHandler(422, "Email is not valid"));
    } else {
      try {
        user = await userModel.findOne({ email });
        if (user) {
          throw next(errorHandler(409, "User already exist!"));
        }
      } catch (err) {
        next(err);
      }
    }

    if (!isValidPassword(password)) {
      throw next(
        errorHandler(401, "Password must be atleast 6 characters long!")
      );
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new userModel({ email, password: hashedPassword });
    try {
      const newUserDocument = await newUser.save();
      const { password: pass, ...newDoc } = newUserDocument._doc;
      jwt.sign(
        { email },
        process.env.SECRET_KEY,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log("Token generation failed");
            next(err);
          } else {
            return res
              .cookie("access_token", token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60 * 60 * 1000),
              })
              .status(201)
              .json({ message: "User created succesfully", token, ...newDoc });
          }
        }
      );
    } catch (err) {
      throw next(errorHandler(500, "Error while saving data"));
    }
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user;
    if (!isValidEmail(email)) {
      throw next(errorHandler(422, "Email is not valid"));
    } else {
      try {
        user = await userModel.findOne({ email });
        if (!user) {
          throw next(errorHandler(404, "User not found!"));
        }
      } catch (err) {
        next(err);
      }
    }

    const {password : pass, ...newDoc} = user._doc;

    if (!isValidPassword(password)) {
      throw next(errorHandler(401, "Wrong credentials!!"));
    } else {
      const isSame = bcryptjs.compareSync(password, pass);
      if (!isSame) {
        throw next(errorHandler(401, "Wrong credentials!!"));
      }
    }

    jwt.sign(
      { email },
      process.env.SECRET_KEY,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          console.log("Token generation failed");
          next(err);
        } else {
          return res
            .cookie("access_token", token, {
              httpOnly: true,
            //   expires: new Date(Date.now() + 60 * 60 * 1000),
            })
            .status(201)
            .json({ message: "User logged in succesfully", token, ...newDoc });
        }
      }
    );
  } catch (err) {
    next(err);
  }
};
