const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ storage: storage });

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  
  res.json({ 
    message: 'File uploaded successfully',
    filename: req.file.filename
  });
});

app.post('/filter', (req, res) => {
  const { filename, filters } = req.body;
  
  let options = {
    mode: 'json',
    pythonPath: 'python',
    scriptPath: './python',
    args: [
      path.join(__dirname, 'uploads', filename),
      JSON.stringify(filters)
    ]
  };

  PythonShell.run('process_excel.py', options).then(results => {
    res.json({ data: results[0] });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error processing file' });
  });
});

app.get('/column-values/:filename/:column', (req, res) => {
  const { filename, column } = req.params;
  
  let options = {
    mode: 'json',
    pythonPath: 'python',
    scriptPath: './python',
    args: [
      path.join(__dirname, 'uploads', filename),
      column
    ]
  };

  PythonShell.run('get_column_values.py', options).then(results => {
    res.json({ values: results[0] });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Error getting column values' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 