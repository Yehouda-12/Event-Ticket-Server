import express from "express";
import { addUser } from "../controllers/usersController.js";

const router = express.Router()
router.route("/register").post(addUser)




export default router