var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var exec = require('child_process').execFile;
var bodyParser = require('body-parser');  
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('pub'));


app.post('/exec', function(req, res) {
    var commend = req.body.c;
    console.log(commend);

    exec(String(commend), function(error, stdout, stderr) {
        console.log(stdout);

        io.on('connection', function (socket) {
            socket.emit('stdout', String(stdout));
        
        });
    });

});

app.get('/', function(req, res) {
    res.render("index");
});



server.listen(5001);