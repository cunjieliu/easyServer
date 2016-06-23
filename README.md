# easyServer
a easy server for static file

###How to use

```javascript
var easyserver= require('easyserver');

easyserver('../static', {
	port: 9999,
	headers: {
		'Access-Control-Allow-Origin': '*'
	}
})

// easyserver('../static')
```
