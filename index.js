import express from "express";
import path from "path";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    //go to mongo in programm file and type mongod in cmd then go to mongosh file and type mongo to get mongodbURL
    dbName: "backend",
  })
  .then(() => console.log("Database conected"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.model("User", userSchema);
const app = express(); //creating server

//using middlewares
app.use(express.static(path.join(path.resolve(), "public"))); //to use the public path to show static files like css file , script file etc
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const isAuthenticated = async(req, res, next) => {
  //middleware
  const { token } = req.cookies;

  if (token) {
    const decoded = jwt.verify(token,"asdjfsllkljllkjksaf")
    req.user = await User.findById(decoded._id)
    next();
  } else {
    res.render("login.ejs");
  }
};

app.get("/", isAuthenticated, (req, res) => {
  // using middleware
  res.render("logout.ejs");
});

app.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

app.get("/register",()=>{
    res.render("register.ejs")
})

app.post("/login", async(req, res) => {
    const {name,email} = req.body;

    let user = await User.findOne({email});

    user = await User.create({
        name,
        email,
    });
    const token = jwt.sign({_id: user._id},"asdjfsllkljllkjksaf")
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

app.listen(5000, () => {
  //listening the server
  console.log("server is working");
});
