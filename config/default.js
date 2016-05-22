(function () {
    'use strict';
    var path = require("path");
    module.exports = {
        cache: {
            dir: "public",
            aliases: [
                ['/', '/index.html']
            ],
            ignoreFile: function (fullPath) {
                var basename = path.basename(fullPath);
                return /^\./.test(basename) || /~$/.test(basename);
            },
            followSymlinks: true,
            cacheControlHeader: "max-age=0, must-revalidate"
        }
    };
}());