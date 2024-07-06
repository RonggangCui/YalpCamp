const mongoose = require("mongoose");
const Campground = require("../models/campground");
const sites = require("./sites");

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connected to the database");
}

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 18; i++) {
        const camp = new Campground({
            location: `${sites[i].town}`,
            title: `${sites[i].name}`,
            author: "6688948581d6c9a1bfac20d2",
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
