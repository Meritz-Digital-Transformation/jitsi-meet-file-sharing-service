import multer from 'multer';

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: {
        fileSize: 50 * 1024 * 1024 // 50MB limit to match nginx
    },
    fileFilter: (req, file, cb) => {
    // Accept all file types for now, can be restricted later
        cb(null, true);
    }
});
