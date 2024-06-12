import { diskStorage } from 'multer';
import { resolve, extname } from 'path';

 const storage = diskStorage({
    
    destination: (req, file, cb) => {
        const destinationPath = resolve(__dirname, '../../public/images/')
        cb(null, destinationPath); // Set destination folder
    },
    filename: (req, file, cb) => {
        const extension = extname(file.originalname); // Get the original file extension
        const filename = `${Date.now()}${extension}`; // Generate a unique filename
        console.log("im in filename middleware")
        cb(null, filename); // Set the filename for the uploaded file
    }
});
export default storage