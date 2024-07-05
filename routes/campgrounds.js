const express = require("express");
const router = express.Router();
const campgrounds = require("../controllers/campgrounds");
const catchAsync = require("../utils/catchAsync.js");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const upload = require("../AWS/index.js");

const logSuccess = (req, res, next) => {
    console.log("Success: Image uploaded and campground created successfully!");
    next();
};

router
    .route("/")
    .get(catchAsync(campgrounds.index))
    .post(
        isLoggedIn,
        upload.single("image"),
        validateCampground,
        catchAsync(campgrounds.createCampground),
        logSuccess
    );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
    .route("/:id")
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
