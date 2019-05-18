const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: mongoose.SchemaTypes.ObjectId,
  my_pic_url: String,
  intro_message: String,
  date_code: String,
  with: String,
  created: {type: Date, default: Date.now},
  last_accessed: {type: Date, default: Date.now},
  questionaire: [{
    id: mongoose.SchemaTypes.ObjectId,
    q: String,
    a: String
  }],
  date_location_options: [{
    id: mongoose.SchemaTypes.ObjectId,
    place: String,
    address: String,
    img_url: String
  }],
  suggestions: String,
  interest_level: Number,
  submitted: Boolean,
  selected_date_location: String,
  selected_date: Date
});

module.exports = mongoose.model('my_date', schema);