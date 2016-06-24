# easyServer
a easy server for static file

###



###How to use

```javascript
easyserver('yourStaticFilePath');

node easyserver
```

###configuration
1. port. (default:3333)
2. headers. 

```javascript
var easyserver= require('easyserver');

easyserver('../static', {
	port: 9999,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
})

// start aother server
// easyserver('../static')
```
