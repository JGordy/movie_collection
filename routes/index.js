const express = require("express");
const Movie   = require("../models/movies.js")
const router  = express.Router();

let results = [];

let getData;

///////////////////////////////////////////////

router.get("/", function(req, res) {

    Movie.find({})
   .then(function(data) {
     results = data;
     res.render("collection", {movies: results})
   })
   .catch(function(err) {
     console.log(err);
   });
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

///////////////////////////////////////////////

router.post("/edit/:id", function(req, res) {

  let reqId = req.params.id;
  let newId = reqId.substr(1);

  let index = results.findIndex(item => item.id === newId)

  res.render("movie", {singleMovie: results[index], movies: results})
});

//////////////////////////////////////////////
////not done///////
router.post("/update/:id", function(req, res) {
  console.log("Can i get an id: ", req.params.id);
  console.log("Get an id part 2: ", req.body);

  let tempId = req.params.id;
  let index = results.findIndex(item => item.id === tempId )
  let movieData = {};
// name update //
  if (req.body.name) {
    movieData.name = req.body.name;
  };
// year released update //
  if (req.body.year) {
    movieData.yearReleased = req.body.year;
  };
// genre update //
  if (req.body.genre) {
    movieData.genre = req.body.genre;
  };
// character updates //
  if (req.body.characters) {
    movieData.characters = {"character": req.body.characters};
  };
// cast update //
  if (req.body.cast) {
    movieData.mainCast = {"cast": req.body.cast};
  };
// director update //
  if (req.body.director) {
    movieData.director = req.body.director;
  };

console.log(movieData);
//////////////////////
Movie.update({_id: tempId},
  {$set: movieData})
.then(function(data) {
  console.log("director update: ", data);
  next();
})
.catch(function(err) {
  console.log("director update: ", err);
  next();
})

//////////////////////
  res.redirect("/");
});

module.exports = router;
