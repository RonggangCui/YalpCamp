if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const ExpressError = require("./utils/ExpressError");
const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("connect-flash");
const mongoSanitize = require("express-mongo-sanitize");
const LocalStrategy = require("passport-local");
const User = require("./models/user");
const MongoStore = require("connect-mongo");

const userRoutes = require("./routes/users");
const campgroundRoutes = require("./routes/campgrounds");
const reviewRoutes = require("./routes/reviews");

const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Force HTTPS middleware
function forceHttps(req, res, next) {
    if (req.secure || req.headers["x-forwarded-proto"] === "https") {
        return next();
    }
    res.redirect(`https://${req.hostname}${req.url}`);
}

// Apply HTTPS redirection middleware in production
if (process.env.NODE_ENV === "production") {
    app.use(forceHttps);
}

const mongoURI = process.env.NODE_ENV === "production" ? process.env.MONGO_URI : "mongodb://127.0.0.1:27017/yelp-camp";
const port = process.env.PORT || (process.env.NODE_ENV === "production" ? 443 : 3000);

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Database connection error:", err));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(mongoSanitize({ replaceWith: "_" }));

const secret = process.env.SECRET || "thisshouldbeabettersecret";

const store = MongoStore.create({
    mongoUrl: mongoURI,
    touchAfter: 24 * 60 * 60,
    crypto: { secret },
});

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e);
});

const sessionConfig = {
    store: store,
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    },
};

app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.use("/", userRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/reviews", reviewRoutes);

app.get("/", (req, res) => {
    res.render("home");
});

app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).render("error", { err });
});

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});
