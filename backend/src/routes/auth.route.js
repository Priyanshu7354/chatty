import express from "express";
import { checkAuth, login, logout, signup, updateProfile, getAllUsers } from "../controllers/auth.controller.js";
import { protectRoute, protectAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

router.post("/admin/users", protectAdmin, getAllUsers);

export default router;