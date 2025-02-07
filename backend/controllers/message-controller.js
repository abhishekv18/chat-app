
import cloudinary from "../lib/cloudinary.js";
import { getReciverSocketId ,io} from "../lib/socket.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";






export const getUsersForSidebar=async(req,res)=>{
                try {
                    const loggedInUserId=req.user._id;
                    const filteredUsers=await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
                    res.status(200).json(filteredUsers);
                } catch (error) {
                    console.error("Error in getUsersForSidebar: ", error.message);
                    res.status(500).json({ error: "Internal server error" });
    }             
}

export const getMessages=async(req,res)=>{
    try {
        const{id:otherPersonId}=req.params;
        const myId=req.user._id;

        const messages=await Message.find({ $or:[
            {senderId:myId, receiverId:otherPersonId},
            {senderId:otherPersonId, receiverId:myId}
        ] });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getUsersForSidebar: ", error.message);
        res.status(500).json({ error: "Internal server error" });
}             
}
export const deleteMessages=async(req,res)=>{
  try {
      const{id:otherPersonId}=req.params;
      const myId=req.user._id;

      await Message.deleteMany({
        $or: [
            { senderId: myId, receiverId: otherPersonId },
            { senderId: otherPersonId, receiverId: myId }
        ]
    });
      res.status(200).json({
        message:'All chats are cleared'
      });
  } catch (error) {
      console.error("Error in getUsersForSidebar: ", error.message);
      res.status(500).json({ error: "Internal server error" });
}             
}
export const sendMessage = async (req, res) => {
  try {
    const { text, url } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if (url) {
      // Upload base64 image to cloudinary
      const uploadResponse = await cloudinary.uploader.upload(url);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
 const reciverSocketId=getReciverSocketId(receiverId);
 if(reciverSocketId){
   io.to(reciverSocketId).emit("newMessage",newMessage);
 }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });//if array mei store so use spread operator
  }
};



export const searchFriends=async(req,res)=>{
  try {
    const loggedInUserId=req.user._id;
    const {id}=req.params;
    if(!id &&  typeof id !== "string"){
      return res.status(400).json({
     
        error: "Keyword is required and must be in string format",
      });
    }

    const regEx=new RegExp(id,'i');
    const createSearchQuery={
      fullName :regEx
    }
    //const searchUser=await User.find({ _id: { $ne: loggedInUserId } ,createSearchQuery});
    const searchUser = await User.find({
      _id: { $ne: loggedInUserId }, // Exclude the logged-in user
      ...createSearchQuery // Spread the search query object
  });
  
    res.status(200).json(
     searchUser
    );
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
}