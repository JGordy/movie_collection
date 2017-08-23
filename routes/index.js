const express = require("express");
const Movie   = require("../models/movies.js")
const router  = express.Router();

let data = [];

router.get("/", function(req, res) {

  // creating an entry in the database

  Movie.create({
    name: "Lord of the Rings: The Fellowship of the Ring",
    yearReleased: 2001,
    characters: "Frodo Baggins",
    actors: "Elijah Wood",
    director: "Peter Jackson",
    genre: "Fantasy"
  });
  res.render("collection", )
});



















module.exports = router;
