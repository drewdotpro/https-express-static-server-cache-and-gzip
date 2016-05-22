(function () {
    'use strict';
    var path = require("path");
    module.exports = {
        /**
         * These are the defaults for the cache, for more details on configuration of this section see
         * https://github.com/andrewrk/connect-static
         */
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