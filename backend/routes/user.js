import express from "express";
import {updateUser, deleteUser,getUser, add, getUserId } from "../controller/user.js";

const router = express.Router();

router.post("/addUser", add);
router.get("/getUser", getUser);
router.get("/getUserId/:id", getUserId);
router.delete("/deleteUser/:id", deleteUser);
router.put("/updateUser/:id", updateUser);

export default router;