const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const gemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  nameOrigin: { type: String, required: false },
  historyText: { type: String, required: false },
  chimicalComposition: { type: Array, required: false },
  hardnessMin: { type: Number, required: false },
  hardnessMax: { type: Number, required: false },
  crystalSystem: { type: String, required: false },
  deposits: { type: Array, required: false },
  colours: { type: Array, required: true },
  descriptionVirtues:{type:String, required:false},
  physicalVirtues: { type: Array, required: true },
  psychologicalVirtues: { type: Array, required: true },
  image:{type:String, required:true}
})

gemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Gem', gemSchema)