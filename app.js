// Require modules
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const port = 3000;

// Helper JS functions
let helper = require('./public/js/helper');

// Date 
const date = new Date();

// API KEY
const apiKey = process.env.API_KEY3;
// ******

// Initialize Express instance
const app = express();


// Set view engine to ejs
app.set("view engine", "ejs");

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static("public"));

// Global Variables 
let userName = "";

// *******************************************************************************


// DB and Authentication related
// Session and Cookies
// Initialize session
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
}));

// Initiallize passport
app.use(passport.initialize());
app.use(passport.session()); // tell our app to Use passport to setup our session


// Initialize mongodb
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://127.0.0.1:27017/userDB");


// user Schema
const userSchema = new mongoose.Schema({ // this is object created from mongoose schema class
    userName: String,
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose); // use to hash and salt passport and save users in mongodb

// model or table
const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//********************************************************************* */



// GET AND POST REQUESTS
// HomePage
app.get("/", async (req, res) => {

    // Date 
    let options = { weekday: "long", day: "numeric", month: "short"}
    let today = date.toLocaleDateString("en-US", options);

    // Defining sections name in array
    let sectionNames = ["", "World", "Technology", "Business", "Sports", "Entertainment", "Health"];

    // Making API call to newsapi.org
    const urls = [
        `https://newsapi.org/v2/top-headlines?category=general&country=in&apiKey=${apiKey}&language=en&pageSize=5`,
        `https://newsapi.org/v2/top-headlines?category=general&apiKey=${apiKey}&pageSize=5&language=en`,
        `https://newsapi.org/v2/top-headlines?category=technology&country=in&apiKey=${apiKey}&language=en&pageSize=5`,
        `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${apiKey}&language=en&pageSize=5`,
        `https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${apiKey}&language=en&pageSize=5`,
        `https://newsapi.org/v2/top-headlines?category=entertainment&country=in&apiKey=${apiKey}&language=en&pageSize=5`,
        `https://newsapi.org/v2/top-headlines?category=health&country=in&apiKey=${apiKey}&language=en&pageSize=5`
    ];

    // Home page contains some news about various categories so we're calling many urls parallely
    const requests = urls.map((url) => axios.get(url)); // Setting axios.get() to all urls
    const response = await Promise.all(requests); // Resolving promise for all urls 
    const data = response.map(res => res.data.articles); // storing it into data as array
    // console.log("data: ", data);

    // Render all data to each category of home page
    try {
        if(userName != "") {
            res.render("homepage", { today: today, topNewsData: data[0], newsSections: data, sectionNames: sectionNames, helper: helper, userName: userName, hNo: 1 });
        } else {
            res.render("homepage", { today: today, topNewsData: data[0], newsSections: data, sectionNames: sectionNames, helper: helper, hNo: 2 });
        }
    }
    catch(err) {
        console.log(err);
    }


    // Fetch news using sources
    //https://newsapi.org/v2/top-headlines?sources=bbc-news&apiKey=e09ca36df7854ccf8fe2b1ff69ba8b07

    // res.render("demo");
});

// Search results
app.post("/", async (req, res) => {

    const query = req.body.searchQuery;
    const url = `https://newsapi.org/v2/everything?language=en&q=${query}&apiKey=${apiKey}`;

    let response = await axios.get(url);
    let data = response.data;

    try {
        if(userName != "") {
            res.render("searchedNews", { articles: data.articles, newsSecTitle: query, userName: userName, hNo: 1});
        } else {
            res.render("searchedNews", { articles: data.articles, newsSecTitle: query, hNo: 2 });
        }
    }
    catch (err) {
        console.log(err);
    }
});


// News Reading Page 
app.get("/search/articles/:q/:index", async (req, res) => {

    const query = req.params.q;
    const decodedQuery = decodeURIComponent(query);
    const index = req.params.index;
    const url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${decodedQuery}&pageSize=${index + 1}`;

    let response = await axios.get(url);
    let data = response.data;

    try {
        if(userName != "") {
            res.render("news", { news: data.articles[index], helper: helper, userName: userName, hNo: 1});
        } else {
            res.render("news", { news: data.articles[index], helper: helper, hNo: 2 });
        }
    }
    catch (err) {
        console.log(err);
    }
});

// Category news page 
app.get("/categories/:section/articles", async (req, res) => {

    const section = req.params.section;
    const url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&category=${section}`;

    // Making API call to newsapi.org
    let response = await axios.get(url);
    let data = response.data;

    try {
        console.log(data.articles);
        if(userName != "") {
            res.render("categoryNews", { articles: data.articles, newsSecTitle: section, userName: userName, hNo: 1 }); //
        } else {
            res.render("categoryNews", { articles: data.articles, newsSecTitle: section, hNo: 2 }); //
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/top/categories/:section/articles", async(req, res) => {

    let section = req.params.section;
    console.log({section});

    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}&q=${section}`;

    if(section === "general") {
        url = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${apiKey}&section=${section}&language=en&country=in`;
        section = "Top Stories";
    }
    else if(section == "world") {
        console.log("entered in world");
        url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&q=${section}`;
    }

    let response = await axios.get(url);
    let data = response.data;

    try {
        if(userName != "") {
            res.render("categoryNews", { articles: data.articles, newsSecTitle: section, userName: userName, hNo: 1 }); //
        } else {
            res.render("categoryNews", { articles: data.articles, newsSecTitle: section, hNo: 2 }); //
        }
    }
    catch (err) {
        console.log(err);
    }
});

app.get("/:section/articles/:index", async (req, res) => {
    let index = req.params.index;
    let section = req.params.section;
    console.log(index);

    let url = `https://newsapi.org/v2/top-headlines?language=en&country=in&apiKey=${apiKey}&category=${section}&pageSize=${index + 1}`;

    if(section == "World") 
        url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&q=${section}&pageSize=${index + 1}`;

    // Making API call to newsapi.org
    let response = await axios.get(url);
    let data = response.data;

    try {
        // res.render("categoryNews", { articles: data.articles, newsSecTitle: section }); //
        console.log(data.articles);
        if(userName != "") {
            res.render("news", { news: data.articles[index], helper: helper, userName: userName, hNo: 1 });
        } else {
            res.render("news", { news: data.articles[index], helper: helper, hNo: 2 });
        }
    }
    catch (err) {
        console.log(err);
    }
});


// LOGIN And REGISTRATION
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (err) => {
        if (err) {
            console.log(err);
        } else {
            userName = req.body.username;
            passport.authenticate("local")(req, res, function () {
                res.redirect("/");
            });
        }
    })
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", (req, res) => {
    User.register({ username: req.body.username }, req.body.password, function (err, user) {
        if (err) {
            userName = "";
            console.log(err);
            res.redirect("/register");
        } else {
            userName = req.body.username;
            passport.authenticate("local")(req, res, function () {
                res.redirect("/")
            })
        }
    })
});

app.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) {
            console.log(err);
        } else {
            userName = "";
            res.redirect("/");
        }
    });
})


// Listen on port
app.listen(port, () => console.log("Server started on port 3000"));