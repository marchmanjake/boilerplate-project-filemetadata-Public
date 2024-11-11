var express = require('express');
var cors = require('cors');
require('dotenv').config()
var multer = require('multer')

var app = express();

app.use(cors());
app.use(express.json())
const upload = multer({ dest: "uploads/" });
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single("upfile"), function (req, res){
  console.log("Endpoint hit")
  console.log(req.file)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
