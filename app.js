require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const adminRoutes = require('./routes/Admin')
const gemRoutes = require('./routes/Gem')

mongoose.connect(process.env.DB_URI, {
  dbName:process.env.DB_NAME,
  user:process.env.DB_USER,
  pass:process.env.DB_PASS,
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(()=>console.log('Connexion à MongoDB  : Connecté'))
.catch(()=>console.log('Connexion à MongoDB  : Echec'))

const app = express()

app.use((req, res, next)=>{
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, x-Requested-With, Content, Accept, Content-type, Authorization')
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
})

app.use(express.json())

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/admin/auth', adminRoutes)
app.use('/api/gems', gemRoutes)

module.exports = app
