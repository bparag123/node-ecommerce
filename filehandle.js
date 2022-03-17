const multer = require("multer")

const fileHandle = multer({
    fileFilter: (req, file, cb) => {
        
        //here we can perform file format validation like type of file
        if (file.fieldname !== "image" || file.fieldname !== "avatar") {
            const [data, type] = file.mimetype.split("/")
            if (data !== "image") {
                cb(new Error("Please upload image only"))
            }
        }

        cb(null, true);
    },
    //file size in bytes
    limits: {
        fileSize: 1024 * 1024 * 512
    },

})

module.exports = fileHandle