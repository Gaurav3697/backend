import express from "express";
import path from "path";

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

app.post("/",(req,res)=>{
    console.log(req.body);
    res.redirect("/success")
});

app.listen(5000,()=>{          //listening the server
    console.log("server is working");
});