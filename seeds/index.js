const express = require("express");
const app = express();
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const path = require("path");
const Campground = require("../models/campground");

const mongoose = require("mongoose");
const campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp"),
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: "https://source.unsplash.com/collection/483251",
      description:
        " Lorem ipsum dolor sit, amet consectetur adipisicing elit. Possimus eius asperiores tempora. Laboriosam soluta quod magni blanditiis dignissimos officia doloremque sunt sapiente exercitationem aut, provident placeat consectetur dicta recusandae illum.",
      price,
    });
    await camp.save();
  }
};

//video: 6:02

seedDB().then(() => {
  mongoose.connection.close();
});
