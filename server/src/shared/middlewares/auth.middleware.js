import { readAccessToken } from "../../features/auth/auth.util.js";

export const authenticate = (req, res, next) => {
    const accessToken = req.headers.authorization?.split(" ")[ 1 ];

    if(!accessToken){
        return res.status(400).json({
            message : "Access Token not found in header"
        })
    }

    try {
        const decoded = readAccessToken(accessToken);
        // const {userId , role} = decoded;

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
      message: "Invalid or expired access token",
    });
    }
}

export const authenticateSeller = (req, res, next) => {
    if(req.user.role != "seller"){
        return res.status(403).json({
            message : "User is not authorized for this action"
        })
    }

    next();
}