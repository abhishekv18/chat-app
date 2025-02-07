import {Server}  from "socket.io";
import http from "http";
import {createServer}  from "http";


import express from "express";

const app=express();
const server=createServer(app);

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
       // methods:["GET","POST"],
       // credentials:true,
    }
})


export  function getReciverSocketId(userId){
     return userSocketMap[userId];
}



const userSocketMap={}//{userId:socketId}

io.on("connection",(socket)=>{
  console.log("a user connected",socket.id);
   
  const userId=socket.handshake.query.userId
  if(userId) userSocketMap[userId]=socket.id
                                                  
   
  
  io.emit("OnlineUsers",Object.keys(userSocketMap));
  socket.on("disconnect",()=>{
            console.log("a user disconnected",socket.id);
            delete userSocketMap[userId];
            io.emit("OnlineUsers",Object.keys(userSocketMap));
  })// emit mtlb bhejna on mtlb lena    
  
  
   


})

export {io,app,server};


