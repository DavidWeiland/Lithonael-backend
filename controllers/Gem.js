const fs = require('fs')
const Gem = require('../models/Gem')

exports.createGem = (req, res, next) => {
  const gemObject = JSON.parse(req.body.thing)
  delete gemObject._id
  const gem = new Gem({
    ...gemObject,
    image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  gem.save()
    .then(() => res.status(201).json({message : 'New Gem created !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllGems = (req, res, next) => {
  Gem.find()
    .then(gems => res.status(200).json(gems))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneGem = (req, res, next) => {
  Gem.findOne({ _id: req.params.id })
  .then((gem) => res.status(200).json(gem))
  .catch(error=> res.status(500).json({error}))
}

exports.modifyOneGem = (req, res, next) => {
  if (req.file) {
    const gemObject = {
      ...JSON.parse(req.body.thing),
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Gem.findOne({ _id: req.params.id })
      .then(gem => {
        const filename = gem.image.split('/images/')[ 1 ]
        fs.unlink(`images/${filename}`, () => {
          Gem.updateOne({ _id: req.params.id }, { ...gemObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Gem modified !' }))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch (error => res.status(500).json({ error }))
  } else {
    const gemObject = { ...req.body }
    Gem.updateOne({ _id: req.params.id },{...gemObject, _id:req.params.id})
    .then(() => res.status(200).json({message:'Gem modified !'}))
    .catch(error=> res.status(400).json({error}))
  }
}

exports.deleteOneGem = (req, res, next) => {
  Gem.findOne({ _id: req.params.id })
    .then(gem => {
      if (!gem) {
        return res.status(404).json({
          error: new Error('Gem not found')
        })
      }
      /* if (gem.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('request non authorized')
        })
      } */
      const filename = gem.image.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Gem.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({message: 'Gem deleted !'}))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}
