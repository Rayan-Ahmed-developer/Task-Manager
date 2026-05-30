const express= require ("express");
const { getTasks, addTask, deleteTask } = require ("../controller/taskController");
const {getUsers,loginUser} = require("../controller/userController")
const checkUser = require("../authMiddleware/checkUser")


const router = express.Router();

router.get("/getTasks",checkUser, getTasks);
router.post("/addTask",checkUser, addTask);
router.delete("/deleteTask/:id",checkUser, deleteTask);
router.post("/signup", getUsers)
router.post("/login",loginUser)

module.exports = router;