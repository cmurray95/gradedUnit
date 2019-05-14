//require express library
let express = require('express');
//require the express router
let router = express.Router();
//require multer for the file uploads
let multer = require('multer');
// set the directory for the uploads to the uploaded to
let DIR = './uploads/';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
let upload = multer({dest: DIR}).single('photo');
/* GET home page. */

router.get('/', function(req, res, next) {
// render the index page, and pass data to it.
  res.render('index', { title: 'Express' });
});

//our file upload function.
router.post('/', function (req, res, next) {
     let path = '';
     upload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading
          console.log(err);
          return res.status(422).send("an Error occured")
        }  
       // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
  });     
})
module.exports = router;