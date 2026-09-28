import { Router } from "express";
import { loginController, refreshController, registerController } from "./auth.controller.js";
import { loginValidator, registerValidator } from "./auth.validator.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        message : "fine bsdvroh"
    })
});


/**
 * @POST /api/auth/register
 * @param req Express req
 * @param req.body = { email,name,password, confirmPassword }
 * @response res.status = 201 (if successful)
 */

router.post("/register", registerValidator , registerController);

/**
 * @POST /api/auth/login
 * @param req
 * @param req.body = {email,password}
 * res.status = 200
 */

router.post("/login", loginValidator, loginController)

/**
 * @POST /api/auth/refresh
 */

router.post("/refresh", refreshController)

export default router;