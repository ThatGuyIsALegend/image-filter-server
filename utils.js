const fs = require('fs');
const path = require('path');

function deleteOldFiles(path, maxAge) {
    walkDir(path, function(filePath) {
        fs.stat(filePath, function(err, stat) {
        var now = new Date().getTime();
        var endTime = new Date(stat.mtime).getTime() + maxAge;
    
        if (err) { return console.error(err); }
    
        if (now > endTime) {
            //console.log('DEL:', filePath);
          return fs.unlink(filePath, function(err) {
            if (err) return console.error(err);
          });
        }
      })  
    });
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach( f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? 
        walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
};

module.exports = {deleteOldFiles}