import { matchedData } from "express-validator"
import userModel from "./user.model.js";
import bcrypt from 'bcryptjs'
import { generateAccessToken, generateRefreshToken } from "./auth.util.js";

export const registerController = async (req, res) => {

    const {email, name , password} = matchedData(req);

    const isUserAllreadyExists = await userModel.findOne({email});

    if(isUserAllreadyExists){
        return res.status(400).json({
            message : "User allready exists with this Email address",
            errors : [
                {
                    path : "email",
                    msg : "User allready exists with this Email address"
                },
            ],
        });
    }

    const user = await userModel.create({
        email,
        name,
        passwordHash : await bcrypt.hash(password, 12),
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
        message : "User registered successfully",
        data : {
            user : {
                name : user.name,
                email : user.email,
                id : user._id
            }
        }
    })
}

export const loginController = async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email}).select("+passwordHash");

    if(!user){
        return res.status(400).json({
            message : "Invalid email and password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if(!isPasswordValid){
        return res.status(400).json({
            message : "Invalid email and password"
        })
    }

    const accessToken = generateAccessToken({userId : user._id, role : user.role});

    const refreshToken = generateRefreshToken({userId : user._id, role : user.role});

    await userModel.findByIdAndUpdate(user._id, {
        refreshToken
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly : true
    })

    res.status(200).json({
        message : "User login successfully",
        data : {
            user : {
                email,
                password
            },
            accessToken
        }
    })

}