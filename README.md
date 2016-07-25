# easyServer
a easy server for static file

###



###How to use
```javascript
npm install easy-static-server --save-dev

npm install
```

in server.js
```javascript
var server= require('easy-static-server');
server('yourStaticFilePath');
```

run like this
```javascript
node server
```

###configuration
1. port. (default:3333)
2. headers. 

```javascript
var server= require('easy-static-server');

server('../static', {
	port: 9999,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
})

// start aother server
// server('../static')
```
