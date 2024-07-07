if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoose = require("mongoose");
const Campground = require("../models/campground");
const sites = require("./sites");

const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to the database"))
    .catch((err) => console.log("Database connection error:", err));

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 18; i++) {
        const camp = new Campground({
            location: `${sites[i].town}`,
            title: `${sites[i].name}`,
            author: "668a4ae7090e9d89e1aa5753",
            description: `${sites[i].description}`,
            price: `${sites[i].price}`,
            geometry: {
                type: "Point",
                coordinates: [`${sites[i].longitude}`, `${sites[i].latitude}`],
            },
            image: {
                url: `https://yalpcamp-images.s3.ca-central-1.amazonaws.com/image${i + 1}.png`,
                filename: `image${i + 1}.png`,
            },
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
