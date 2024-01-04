
const fs = require("fs");
const path = require("path");


/**
 * 
 * file delete in a director all/specific file
 * @param {string} directory 
 * @param {string} file_to_delete 
 */

const handleFileDeletion = async (directory, file_to_delete) => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        console.log(error);
        throw new Error('Could not read directory');
      }
  
      files.forEach((file) => {
        const file_path = path.join(directory, file);
  
        fs.stat(file_path, (error, stat) => {
          if (error) {
            console.log(error);
            throw new Error('Could not stat file');
          }
  
          if (stat.isDirectory()) {
            // Here instead of doing a consle.log(),
            // we recursively search for the file in subdirectories
            handleFileDeletion(file_path, file_to_delete);
          } else if (file === file_to_delete) {
            fs.unlink(file_path, (error) => {
              if (error) {
                console.log(error);
                throw new Error('Could not delete file');
              }
  
              isDeletedFile = true;
            
            });
          }
        });
      });
    });
  };


  module.exports = { handleFileDeletion}


