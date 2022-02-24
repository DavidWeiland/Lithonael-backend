const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const gemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  nameOrigin: { type: String, required: true },
  historyText: { type: String, required: true },
  chimicalCompositionText: { type: String, required: true },
  chimicalCompositionTags: { type: Array, required: true },
  hardnessMin: { type: Number, required: true },
  hardnessMax: { type: Number, required: true },
  crystalSystem: { type: String, required: true },
  deposits: { type: Array, required: true },
  coloursText: { type: String, required: true },
  coloursTags: { type: Array, required: true },
  descriptionVirtues:{type:String, required:true},
  physicalVirtues: { type: String, required: true },
  psychologicalVirtues: { type: String, required: true },
  image:{type:String, required:true}
})

gemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Gem', gemSchema)