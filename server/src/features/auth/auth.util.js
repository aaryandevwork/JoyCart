import jwt from 'jsonwebtoken';
import config from '../../shared/config/config.js'

export const generateAccessToken = ({userId, role}) => {
    const accessToken = jwt.sign({userId, role},config.ACCESS_TOKEN_SECRET, {expiresIn : "15m"});

    return accessToken;
}

export const generateRefreshToken = ({userId, role}) => {
    const refreshToken = jwt.sign({userId, role}, config.REFRESH_TOKEN_SECRET, {expiresIn : "7d"});

    return refreshToken;
}