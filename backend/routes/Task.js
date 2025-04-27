import express from "express"
import { createTask, deleteTask, getTask, toggleTask, updateTask } from "../controllers/TaskController.js"
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,createTask);
router.get("/",verifyToken,getTask);
router.patch("/:id",verifyToken,toggleTask);
router.delete("/:id",verifyToken,deleteTask);
router.put("/:id",verifyToken,updateTask);
export default router;