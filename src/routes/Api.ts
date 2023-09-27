import { Router } from "express";
import UserController from "../apis/user/UserController";

const router = Router();

// User
router.post("/signup", UserController._signup);
router.get("/signin", UserController._signin);

export default router;
