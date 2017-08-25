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
  let newMovieData = req.body;
  let index = results.findIndex(item => item.id === tempId )

// name update //
  if (req.body.name) {
    Movie.updateOne({_id: tempId},
      {$set:  {"name": req.body.name}})
    .then(function(data) {
      console.log("Movie title update: ", data);
      next();
    })
    .catch(function(err) {
      console.log("Movie title update: ", err);
      next();
    })
  };
// year released update //
  if(req.body.year) {
    Movie.updateOne({_id: tempId},
      {$set: {"yearReleased": req.body.year}})
    .then(function(data) {
      console.log("Year Released update: ", data);
      next();
    })
    .catch(function(err) {
      console.log("Year Released update: ", err);
      next();
    })
  };
// genre update //
  if(req.body.genre) {
    Movie.updateOne({_id: tempId},
      {$set: {"genre": req.body.genre}})
    .then(function(data) {
      console.log("Genre update: ", data);
      next();
    })
    .catch(function(err) {
      console.log("Genre update: ", err);
      next();
    })
  };
// character updates //
  if(req.body.character) {
    Movie.updateOne({_id: tempId},
      {$set: {"characters": {"character": req.body.character}}})
    .then(function(data) {
      console.log("characters update: ", data);
      next();
    })
    .catch(function(err) {
      console.log("characters update: ", err);
      next();
    })
  };
// cast update //
  if(req.body.cast) {
    Movie.updateOne({_id: tempId},
      {$set: {"mainCast": {"cast": req.body.cast}}})
    .then(function(data) {
      console.log("cast update: ", data);
      next();
    })
    .catch(function(err) {
      console.log("cast update: ", err);
      next();
    })
  };
// director update //
if(req.body.director) {
  Movie.updateOne({_id: tempId},
    {$set: {"director": req.body.director}})
  .then(function(data) {
    console.log("director update: ", data);
    next();
  })
  .catch(function(err) {
    console.log("director update: ", err);
    next();
  })
};

  res.redirect("/");
});

module.exports = router;
