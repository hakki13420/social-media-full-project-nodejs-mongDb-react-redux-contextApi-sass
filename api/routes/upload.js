const { uploadFile } = require('../controllers/upload')
const { upload } = require('../middlewares/middlewares')

const router = require('express').Router()

router.post('/', upload.single('file'), uploadFile)

module.exports = router
