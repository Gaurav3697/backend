import express from "express";
import path from "path";
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017",{      //go to mongo in programm file and type mongod in cmd then go to mongosh file and type mongo to get mongodbURL
    dbName:"backend",
}).then(()=>console.log("Database conected"))
.catch((e)=>console.log(e));

const messageSchema = new mongoose.Schema({
    name:String ,
    email: String,
})

const message = mongoose.model("Message",messageSchema);
const app = express();            //creating server

//using middlewares
app.use(express.static(path.join(path.resolve(),"public")));       //to use the public path to show static files like css file , script file etc
app.use(express.urlencoded({extended: true}))

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

app.get("/success",(req,res)=>{
    res.render("success.ejs",{name:"Gaurav"});     //using ejs
})

app.post("/",async(req,res)=>{
    const {firstname ,email} =req.body    //destucturing firstname and email from req.body
    await message.create({name:firstname , email: email});
    res.redirect("/success")
});

app.listen(5000,()=>{          //listening the server
    console.log("server is working");
});