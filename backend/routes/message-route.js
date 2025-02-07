import express from "express"
import { protectedRoute } from "../middleware/auth-middleWare.js";
import { getUsersForSidebar,getMessages,sendMessage,searchFriends,deleteMessages } from "../controllers/message-controller.js";


const router=express.Router();
router.get("/users",protectedRoute,getUsersForSidebar);
router.get("/:id",protectedRoute,getMessages);
router.delete("/delete/:id",protectedRoute,deleteMessages);
router.get("/friends/:id",protectedRoute,searchFriends);
router.post("/send/:id",protectedRoute,sendMessage);
export default router;


