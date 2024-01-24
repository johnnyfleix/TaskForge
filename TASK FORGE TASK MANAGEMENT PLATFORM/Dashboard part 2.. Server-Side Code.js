const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs/promises');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Ensure the 'uploads' and 'images' directories exist
const uploadsDir = path.join(__dirname, 'public', 'uploads');
const imagesDir = path.join(__dirname, 'public', 'images');

fs.mkdir(uploadsDir, { recursive: true })
  .then(() => console.log('Created uploads directory'))
  .catch((err) => console.error('Error creating uploads directory:', err));

fs.mkdir(imagesDir, { recursive: true })
  .then(() => console.log('Created images directory'))
  .catch((err) => console.error('Error creating images directory:', err));

const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3, // 3MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('Only JPEG, JPG, PNG, and GIF files are allowed!'), false);
    }
  },
});

app.get('/dashboard', (req, res) => {
  // Pass additional data like userAvatar to your dashboard
  res.render('dashboard', { userAvatar: 'default_avatar.jpg' });
});

app.post('/upload', upload.single('avatar'), async (req, res, next) => {
  try {
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Validate the uploaded file and save its path to the user's profile (in a real scenario, you'd save this path to a database)
    const userAvatarPath = path.join(imagesDir, `${req.user.username}_avatar.jpg`);
    await fs.rename(req.file.path, userAvatarPath);

    res.json({ success: true, message: 'File uploaded successfully' });
  } catch (error) {
    // Handle errors
    if (error instanceof multer.MulterError) {
      res.status(400).json({ success: false, message: 'Error uploading file: ' + error.message });
    } else {
      next(error);
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
