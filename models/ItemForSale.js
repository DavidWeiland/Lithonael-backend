const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const itemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  nameOrigin: { type: String, required: true },
  group: { type: String, required: true },
  chimicalComposition: { type: String, required: true },
  hardnessMin: { type: Number, required: true },
  hardnessMax: { type: Number, required: true },
  crystalSystem: { type: String, required: true },
  deposits: { type: String, required: true },
  colours: { type: String, required: true },
  drawings: { type: String, required: true },
  description:{type:String, required:true},
  historyText: { type: String, required: false },
  originText: { type: String, required: false },
  compositionText: { type: String, required: false },
  PhysicalVirtues: { type: String, required: true },
  SpiritualVirtues: { type: String, required: true },
  psychologicalVirtues: { type: String, required: true },
  environmentalVirtues: { type: String, required: true },
  marriage: { type: Array, required: false },
  maintenance: { type: String, required: true },
  symbolic: { type: Array, required: true },
  tradition: { type: Array, required: true },
  image:{type:String, required:true}
})

itemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Item', itemSchema)