var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');
var mime = require('mime');


function easyServer(root, options){

	var opt = options || {};

	var port = opt.port || 3000;

	var headers = opt.headers;

	var mtime;

	var size;

	http.createServer(function(req, res){

		//ignore favicon.ico
		if(req.url === "/favicon.ico"){
			return;
		}

		var file = path.join(root, url.parse(req.url).pathname);

		console.info(Date() + ": GET file:" + file);

		fs.exists(file, function(exists){
			if(exists){
				var stats = fs.statSync(file);
				mtime = stats.mtime;
				size = stats.size;

				// console.log(mtime);
				// console.log(mtime.toUTCString())
				// console.log(new Date(mtime.getTime()).toUTCString())
				// console.log(req.headers['if-modified-since'])
			}else{
				res.writeHead(404);
				res.end('can not found the file:' + file);
				console.log('GET file(' + file + ') Fail.')
				return;
			}

			if(req.headers['if-modified-since'] && req.headers['if-modified-since'] === mtime.toUTCString()){
				res.writeHead(304);
				res.end();
			}else{
				res.setHeader('Content-Length', size);
				res.setHeader('Content-type', mime.lookup(file));
				res.setHeader('Server', 'EasyServer');
				res.setHeader('X-Powered-By', 'C.J.L');
				res.setHeader('Last-Modified', new Date(mtime.getTime()).toUTCString());

				//自定义header
				if(headers){
					var keys = Object.keys(headers);

					for (var i = 0; i < keys.length; i++) {
					    var key = keys[i];
					    res.setHeader(key, headers[key]);
					}
				}

				res.writeHead(200);

				var s = fs.createReadStream(file);

				var chunkTemp;
				s.on('data', function(chunk){
					// console.log(chunk.length)
					//res.write(chunk);
					chunkTemp += chunk;
				})

				s.on('end', function(){
					res.end(chunkTemp);
				})

				s.on('close', function(){
					console.log('GET file(' + file + ') Success.')
				})

				s.on('error', function(err){
					res.writeHead(500);
					res.end('Server Error');
				})
			}
		})
 
	}).listen(port)

	console.info("start server at port: " + port);
}

module.exports = easyServer;
