const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// define where save the images, and the name
const storage = multer.diskStorage({
    destination: path.join(__dirname, '..', 'public', 'uploads'),
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

// only accept images extensions
const fileFilter = (req, file, cb) => {
    let filetypes = /jpeg|jpg|png/;
    let mimetype = filetypes.test(file.mimetype);
    let extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());

    if (mimetype && extname) {        
        return cb(null, true);
    }
    cb({ message: "Error : File upload only supports the following filetypes - " + filetypes});
}


// middleware configuration
const upload = multer({
    storage,
    limits: {
        filesize: 10000000
    },
    fileFilter
});

module.exports = upload;
