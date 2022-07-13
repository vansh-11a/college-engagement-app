// let a=2;
// let b=3;
// console.log(a+b);
// // setTimeout(()=>{
// //     alert("hi");
// // },3000);
// // const http=require("http");
// // const server= http.createserver((req,res)=>{
// //     req.write("hello world");
// //     res.end();
// // });
// // server.listen(5500,()=>{
// //     console.log("listening to port 3000");
// // });
// var http = require('http');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello World!');
// }).listen(8080);
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session);
const {flash} = require("express-flash-message")
const csrf = require("csurf");

const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const createRoutes = require("./routes/create");
const searchRoutes = require("./routes/search");
const profileRoutes = require("./routes/profile")
const req = require("express/lib/request");
const MONGODB_URI = "mongodb://localhost:27017/collegeApp"


const store = new MongoDBStore({uri: MONGODB_URI, collection: 'sessions'})

let csrfProtection = csrf()
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.use(session({secret: "my secret", resave: false, saveUninitialized: false, store: store}));
app.use(flash({sessionKeyName: 'flashMessage'}));
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.isLoggedIn = req.session.isLoggedIn;
    if (req.session.user)
        res.locals.username = req.session.user.username;
     else
        res.locals.username = null


    res.locals.csrfToken = req.csrfToken();
    next();
})

app.use(authRoutes);
app.use(createRoutes);
app.use(postRoutes);
app.use(profileRoutes);
app.use(searchRoutes);
app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.listen(3000, () => {
    console.log("Listening at 3000");
});

mongoose.connect(MONGODB_URI, () => {
    console.log("connected to db");
})
let obj = {
  name: "Vansh",
  roll: 11
}
