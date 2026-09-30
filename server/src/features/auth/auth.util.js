import jwt from 'jsonwebtoken';
import config from '../../shared/config/config.js'

export const generateAccessToken = ({userId, role}) => {
    const accessToken = jwt.sign({userId, role},config.ACCESS_TOKEN_SECRET, {expiresIn : "30s"});

    return accessToken;
}

export const readAccessToken = (accessToken) => {
    return jwt.verify(accessToken, config.ACCESS_TOKEN_SECRET)
}

export const generateRefreshToken = ({userId, role}) => {
    const refreshToken = jwt.sign({userId, role}, config.REFRESH_TOKEN_SECRET, {expiresIn : "7d"});

    return refreshToken;
}

export const readRefreshToken = (refreshToken) => {
    return jwt.verify(refreshToken, config.REFRESH_TOKEN_SECRET)
}