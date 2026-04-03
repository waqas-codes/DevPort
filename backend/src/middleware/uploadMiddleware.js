const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const path = require('path');

// Configure Cloudinary
const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

// Defensive check for Cloudinary configuration
if (!cloud_name || !api_key || !api_secret) {
    console.error('CLOUDINARY ERROR: Missing required environment variables. Uploads will fail.');
}

cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
});

// Configure CloudinaryStorage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'devport/projects',
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformation: [{ width: 1200, height: 800, crop: 'limit', quality: 'auto' }],
    },
});

// File filter — allow only images
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5 MB
});

module.exports = upload;
