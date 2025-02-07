import express from "express"

import {signup,login,logout,updateImage,checkAuth, updateProfile} from "../controllers/auth-controller.js"
import { protectedRoute } from "../middleware/auth-middleWare.js";
const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.post("/updateImage",protectedRoute,updateImage);
router.put("/updateProfile",protectedRoute,updateProfile);
router.get("/check", protectedRoute, checkAuth);
export default router;