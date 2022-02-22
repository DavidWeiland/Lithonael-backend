const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const gemSchema = mongoose.Schema({
  userId:{type:String, required:true},
  name: { type: String, required: true, unique: true },
  nameOrigin: { type: String, required: true },
  group: { type: String, required: true },
  compositionChimique: { type: String, required: true },
  dureteMin: { type: Number, required: true },
  dureteMax: { type: Number, required: true },
  systemCristallin: { type: String, required: true },
  gisements: { type: String, required: true },
  couleurs: { type: String, required: true },
  dessins: { type: String, required: true },
  description:{type:String, required:true},
  histoireText: { type: String, required: false },
  originText: { type: String, required: false },
  compositionText: { type: String, required: false },
  vertusPhysiques: { type: String, required: true },
  vertusSpirituelles: { type: String, required: true },
  vertusPsychologiques: { type: String, required: true },
  vertusEnvironnementales: { type: String, required: true },
  mariage: { type: Array, required: false },
  entretien: { type: String, required: true },
  symbolique: { type: Array, required: true },
  tradition: { type: Array, required: true },
  image:{type:String, required:true}
})

gemSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Gem', gemSchema)