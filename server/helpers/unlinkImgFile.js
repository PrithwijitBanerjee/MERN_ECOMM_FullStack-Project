/** Load fs core module **/
const fs = require('fs');

const unlinkImgFile = (path, cb) => {
    if (path) {
        fs.unlink(path, cb);
    } else {
        cb();
    }
};


module.exports = unlinkImgFile;