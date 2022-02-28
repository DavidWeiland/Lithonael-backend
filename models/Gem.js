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
  colours: { type: Array, required: false },
  descriptionVirtues:{type:String, required:false},
  physicalVirtues: { type: Array, required: false },
  psychologicalVirtues: { type: Array, required: false },
  image:{type:String, required:true}
})

gemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Gem', gemSchema)