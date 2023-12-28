import express from "express";
import path from "path";

const app = express();            //creating server

app.get("/",(req,res)=>{
    res.json({                  //sending json data
        success:true,
        "product":[],
    })
})

app.get("/getproducts",(req,res)=>{
    const pathlocation = path.resolve();  //to get path in module but in common js you can get it by simply "__dirname"
    res.sendFile(path.join(pathlocation,"./index.html"));   //to send static file ie.index.js

})


app.listen(5000,()=>{          //listening the server
    console.log("server is working");
});