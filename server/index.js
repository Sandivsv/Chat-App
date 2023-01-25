const http=require("http");
const express =require("express");
const cors = require("cors");
const socketIO = require("socket.io");
const res = require("express/lib/response");

const app=express();
const port = 4500 || process.env.PORT ;

app.get("/", (req, res)=>{
    res.send("Hello, Its working.")
})


const server = http.createServer(app);

const io=socketIO(server);

io.on("connection",()=>{
    console.log("New Connection")
})


server.listen(port,()=>{
    console.log(`Server is Working on http://localhost:${port}`);
})