const express = require('express')
const router = express.Router()

const auth = require('../middleware/authAdmin')
const GemCtrl = require('../controllers/Gem')
const multer = require('../middleware/multer-config')

router.post('/', auth, multer, GemCtrl.createGem)
router.get('/', GemCtrl.getAllGems)
router.put('/:id', auth, multer, GemCtrl.modifyOneGem)
router.delete('/:id', auth, GemCtrl.deleteOneGem)

module.exports = router