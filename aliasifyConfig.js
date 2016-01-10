var fs = require('fs');

function filePathInModule(moduleName, filepath) {
    var m = module.paths.find(function (path) {
        try {
            return fs.statSync(`${path}/${moduleName}`).isDirectory();
        } catch (e) {
            return false;
        }
    });

    return m ? `${m}/${moduleName}/${filepath}` : undefined;
}


module.exports = {
    aliases: {
        "PhotoSwipe": filePathInModule('photoswipe', 'dist/photoswipe.js'),
        "PhotoSwipeUI_Default": filePathInModule('photoswipe', 'dist/photoswipe-ui-default.js'),
        "jqueryPhotoswipe": "./src/jquery.photoswipe.js"
    }
};