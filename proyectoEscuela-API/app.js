var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);

var router = require('./routes/routes');

app.use('/api', router);

app.use('/', express.static(__dirname + '/public'));

const port = 4200

//server.listen(port)

server.listen(port, function(){
    console.log('Server is running Port:',port);
});


