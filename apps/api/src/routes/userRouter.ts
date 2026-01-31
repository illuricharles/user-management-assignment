import express, { Router } from "express"
import { createUser, deleteUser, exportToCSV, getUserById, getUsers, updateStatus, updateUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { userSchema } from "@repo/shared";

const router:Router = Router()

router.get('/export', exportToCSV)

router.get("/", getUsers);
router.post("/", validate(userSchema), createUser);

router.patch("/:id/status", updateStatus);
router.get("/:id", getUserById);
router.put("/:id", validate(userSchema), updateUser);
router.delete("/:id", deleteUser);



export default router