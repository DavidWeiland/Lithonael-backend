const express = require('express')
const router = express.Router()

const adminCtrl = require('../controllers/Admin')

router.post('/signup', adminCtrl.signup)
router.post('/login', adminCtrl.login)
router.put('/:id', adminCtrl.modifyAdmin)

module.exports = router