import multer from "multer";
import path from "path";

const storage = multer.memoryStorage(); // Store file in memory

const fileFilter = (req, file, cb) => {
  if (path.extname(file.originalname) !== ".csv") {
    return cb(new Error("Only CSV files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
