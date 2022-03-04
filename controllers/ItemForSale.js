const fs = require('fs')
const Item = require('../models/ItemForSale')

exports.createItem = (req, res, next) => {
  const itemObject = JSON.parse(req.body.itemObject)
  delete itemObject._id
  const item = new Item({
    ...itemObject,
    image: `${req.protocol}://${req.get('host')}/images/${file.filename}`
  })
  item.save()
    .then(() => res.status(201).json({ message: 'New Item For Sale created !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllItems = (req, res, next) => {
  Item.find()
    .then(itemsList => res.status(200).json({ itemsList }))
    .catch(error => res.status(400).json({ error }))
}

exports.getOneItem = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then((item) => res.status(200).json(item))
  .catch(error=> res.status(500).json({error}))
}

exports.modifyOneItem = (req, res, next) => {
  if (req.file) {
    const itemObject = {
      ...JSON.parse(req.body.itemObject),
      image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
    Item.findOne({ _id: req.params.id })
      .then(item => {
        const filename = item.image.split('/images/')[ 1 ]
        fs.unlink(`images/${filename}`, () => {
          Item.updateOne({ _id: req.params.id }, { ...itemObject, _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Item modified !' }))
            .catch(error => res.status(400).json({ error }))
        })
      })
      .catch (error => res.status(500).json({ error }))
  } else {
    const itemObject = { ...req.body }
    Item.updateOne({ _id: req.params.id },{...itemObject, _id:req.params.id})
      .then(() => res.status(200).json({ message: 'Item modified !' }))
    .catch(error=> res.status(400).json({error}))
  }
}

exports.deleteOneItem = (req, res, next) => {
  Item.findOne({ _id: req.params.id })
    .then(item => {
      if (!item) {
        return res.status(404).json({
          error: new Error('Item not found')
        })
      }
      /* if (item.userId !== req.auth.userId) {
        return res.status(401).json({
          error: new Error('request non authorized')
        })
      } */
      const filename = item.image.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Item.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Item deleted !' }))
          .catch((error) => res.status(400).json({ error }))
      })
    })
    .catch(error => res.status(500).json({ error }))
}
