const bcrypt = require('bcrypt')
const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const admin = new Admin({
        identifiant: req.body.identifiant,
        password: hash
      })
      admin.save()
        .then(() => res.status(201).json({ message: 'New Admin added' }))
        .catch(error => {
          console.log(error)
          res.status(400).json({ error })
        })
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error })
    })
}

exports.login = (req, res, next) => {
  Admin.findOne({ identifiant: req.body.identifiant })
    .then(admin => {
      if (!admin) {
        return res.status(404).json({ error : 'Admin not found' })
      }
      bcrypt.compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid) {
          return res.status(401).json({ error : 'Incorrect password' })
          }
          res.status(200).json({
            adminId: admin._id,
            name : admin.identifiant,
            token: jwt.sign(
              { adminId: admin._id },
              process.env.DECODE_TOKEN_ADMIN,
              { expiresIn: '24h' }
            )
          })
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.modifyAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      Admin.updateOne({ _id: req.params.id }, { password:hash , _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Admin modified' }))
      .catch(error => res.status(400).json({ error }))
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error })
    })
}
