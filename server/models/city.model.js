const mongoose = require('mongoose');
const { Schema } = mongoose;

const citySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    enum: ['rs', 'sc', 'pr'],
    required: true
  },
  population: {
    type: Number,
    required: true
  }
});

citySchema.index( { "name": 1, "state": 1 }, { unique: true } );

module.exports = mongoose.model('City', citySchema);
