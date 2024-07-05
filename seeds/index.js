const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");
    console.log("Connected to the database");
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}, ${sample(places)}`,
            author: "66864f0a598cd6074effdbd4",
            description:
                "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi iusto sunt vel laborum magnam dolor aperiam, impedit numquam hic pariatur ut incidunt perferendis ducimus sed qui ab quos, fugiat iste.",
            price: Math.floor(Math.random() * 20) + 10,
            image: {
                url: "https://yalpcamp-images.s3.ca-central-1.amazonaws.com/test.png",
                filename: "test",
            },
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
