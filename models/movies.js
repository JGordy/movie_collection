const mongoose   = require("mongoose");
mongoose.Promise = require("bluebird");
const Schema     = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/movieDB");


const movieSchema = new Schema ({
  name: {type: String, required: true, unique: true},
  yearReleased: {
    type: Number,
    // validate: [function(year) {
    //   const yearLength = year.length
    //   return yearLength === 4;
    // }],
    min: [1900, "Only movies after 1900 count"]
  },
  characters: [{
    character: {type: String, required: true},
  }],
  mainCast: [{
    cast: {type: String, required: true},
  }],
  director: {type: String},
  genre: {type: String, required: true}
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
