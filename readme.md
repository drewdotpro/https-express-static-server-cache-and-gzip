# HTTPS Express Static Server with Cache and GZIP


## What
HTTPS or HTTP Express Server, that caches files in memory and delivers them as GZIP. This gives blistering serve speed.

## How

### Server
Express as an underlying server.
HTTPS is optional. To revert to plain old HTTP just remove the `https` entry from your config file.

### Cache
Using connect-static on server startup it will immediately scan the requested
directory, gzip all the files, and save the cache into memory, where it
will forever remain. When a request hits the middleware it never touches
the file system. If gzipping a file results in >= 95% of the file size of
the original file size, connect-static discards the gzipped data and instead
serves the file directly.

#### Supported HTTP Headers
 * `ETag`
 * `If-None-Match`
 * `If-Modified-Since`
 * `Accept-Encoding`
 * `Content-Encoding`

### Logging
Logging comes from Winston and logs to a file and the console.

## Usage

Server will work out-of-the-box on Ubuntu in development mode, and HTTPS deliver your files from the `public` folder.
```
npm run dev
```
If you wish to configure development differently just edit `config/development.js`
If you wish to set up a production version, copy `config/development.js` to `config/production.js` and edit it. Start Production with
```
npm run start
```


## Configuration
Notes have been made against the files in config.json