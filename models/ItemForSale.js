const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const itemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  description:{type:String, required:true},
  stones: { type: Array, required: true },
  virtues: { type: Array, required: true },
  image:{type:String, required:true}
})

itemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Item', itemSchema)