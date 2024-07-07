const Campground = require("../models/campground");
const { Client } = require("@googlemaps/google-maps-services-js");
const googleMapsClient = new Client({});
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

module.exports.index = async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
    const geoData = await googleMapsClient.geocode({
        params: {
            address: req.body.campground.location,
            key: googleMapsApiKey,
        },
        timeout: 1000,
    });

    const campground = new Campground(req.body.campground);
    campground.geometry = geoData.data.results[0].geometry.location;
    campground.image = { url: req.file.location, filename: req.file.key };
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.showCampground = async (req, res) => {
    const campground = await Campground.findById(req.params.id)
        .populate({
            path: "reviews",
            populate: {
                path: "author",
            },
        })
        .populate("author");
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show", { campground });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    if (!campground) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/edit", { campground });
};

module.exports.updateCampground = async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
    if (req.file) {
        campground.image = { url: req.file.location, filename: req.file.key };
    }
    const geoData = await googleMapsClient.geocode({
        params: {
            address: req.body.campground.location,
            key: googleMapsApiKey,
        },
        timeout: 1000,
    });

    campground.geometry = geoData.data.results[0].geometry.location;
    await campground.save();
    req.flash("success", "Successfully updated campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success", "Successfully deleted campground");
    res.redirect("/campgrounds");
};
