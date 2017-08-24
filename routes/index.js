const express = require("express");
const Movie   = require("../models/movies.js")
const router  = express.Router();

let results = [];

let getData;

// getData();


///////////////////////////////////////////////

router.get("/", function(req, res) {

   getData = function() {
    Movie.find({})
   .then(function(data) {
     results = data;
     res.render("collection", {movies: results})
   })
   .catch(function(err) {
     console.log(err);
   });
  };

 getData();
  // res.render("collection", {movies: results})
});

///////////////////////////////////////////////

router.post("/create", function(req, res) {


  Movie.create({
    name: req.body.title,
    yearReleased: req.body.year,
    characters: [{
      character: req.body.character,
    }],
    mainCast: [{
      cast: req.body.cast
    }],
    director: req.body.director,
    genre: req.body.genre
  });


  res.redirect("/");
});

///////////////////////////////////////////////

router.post("/remove/:id", function(req, res) {

  let reqId = req.params.id;
  let newId = reqId.substr(1);
  console.log("newId: ", newId);
  console.log("req.params.id: ", reqId);


  Movie.remove({ _id: newId }, function(err) {
      if (!err) {
              console.log("Yay");;
      }
      else {
              console.log(err);;
      }
  });

  getData();

  res.redirect("/");
});










module.exports = router;
