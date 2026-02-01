const fs = require('fs');
const path = require('path');
var multer  =   require('multer');

class FileUploadService
{
    constructor(){
      console.log("In constructor FileUploadService");
    }
    
    async uploadFile(req, file, file_pic, filePath) {
      //return new Promise(function(resolve, reject) {

        var storage = multer.diskStorage({
          destination: function (req, file, callback) {
            callback(null, 'assets/uploads/'+filePath);
          },
          filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now());
          }
        });

        var upload = multer({ storage : storage}).single(file_pic)
      //})
    }
}
  module.exports=FileUploadService;

