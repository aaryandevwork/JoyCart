import { matchedData } from "express-validator";
import userModel from "./user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
  readRefreshToken,
} from "./auth.util.js";

export const registerController = async (req, res) => {
  const { email, name, password } = matchedData(req);

  const isUserAllreadyExists = await userModel.findOne({ email });

  if (isUserAllreadyExists) {
    return res.status(400).json({
      message: "User allready exists with this Email address",
      errors: [
        {
          path: "email",
          msg: "User allready exists with this Email address",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  // const accessToken = generateAccessToken({userId : user._id, role : user.role});

  // const refreshToken = generateRefreshToken({userId : user._id, role : user.role});

  // res.cookie("refreshToken", refreshToken, {
  //     httpOnly : true
  // })

  // await userModel.findByIdAndUpdate(user._id, {
  //     refreshToken
  // });

  res.status(201).json({
    message: "User registered successfully",
    data: {
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
    },
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+passwordHash");

  if (!user) {
    return res.status(400).json({
      message: "Invalid email and password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email and password",
    });
  }

  const accessToken = generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    userId: user._id,
    role: user.role,
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
  });

  res.status(200).json({
    message: "User login successfully",
    data: {
      user: {
        email : user.email,
        name : user.name,
        id : user._id
      },
      accessToken,
    },
  });
};

export const refreshController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({
      message: "Refresh token is required",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);

    const { userId, role } = decoded;

    const user = await userModel.findById(userId);

    if(user.refreshToken != refreshToken){
        await userModel.findByIdAndUpdate(user._id, {
            refreshToken : null,
        });

        return res.status(401).json({
            message : "Refresh token mismatch"
        })
    }

    const accessToken = generateAccessToken({userId , role});

    const newRefreshToken = generateRefreshToken({userId , role});

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken : newRefreshToken
    });

    res.cookie("refreshToken", newRefreshToken, {
        httpOnly : true
    })

    res.status(200).json({
      message: "token rotated successfully",
      data : {
        user : {
            name : user.name,
            email :user.email,
            id : user._id
        },
        accessToken
      }
    });

  } catch (error) {
    return res.status(401).json({
        message : "Invalid refresh Token"
    })
  }
};

export const getMeController = async (req, res) => {
    const {userId , role} = req.user;

    const user = await userModel.findById(userId);

    res.status(200).json({
        message : "User Data fetched successfully",
        data : {
            email : user.email,
            name : user.name,
            id : user._id,
            role : user.role
        }
    })
}

export const logoutController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const {userId , role} = readRefreshToken(refreshToken);

    if(refreshToken){
        await userModel.findByIdAndUpdate(userId, {
            $unset : {
                refreshToken : 1
            }
        });

        // await userModel.findByIdAndUpdate(userId, {
        //     refreshToken : null
        // });


    }

    res.clearCookie("refreshToken", {
        httpOnly : true,
    });

    return res.status(200).json({
        message: "Logged out successfully"
    });
}