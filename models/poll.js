const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pollSchema = new Schema({
  name: {type: String},
  options: {type: Array, default: []},
  user: {type: String},
  timestamp: {type: Date, default: Date.now}
})

const ModelClass = mongoose.model('poll',pollSchema)

module.exports = ModelClass
