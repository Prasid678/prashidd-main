const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images')
    },
    filename: function (req, file, cb) {
      const extension = file.originalname.split(".")[file.originalname.split(".").length -1]
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + "." + extension)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload;