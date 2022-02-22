const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const itemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  description:{type:String, required:true},
  stone: { type: String, required: true },
  stoneSizing: { type: String, required: true },
  othersMaterials: { type: Array, required: false },
  images:{type:Array, required:true}
})

itemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Item', itemSchema)