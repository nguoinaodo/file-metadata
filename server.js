var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({dest: './upload/'});
var fs = require('fs');


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/home.html'); 
});

app.post('/getfilesize', upload.single('file'), function(req, res, next) {
    res.json({size: req.file.size});
    var path = __dirname + '/upload/' + req.file.filename;
    fs.stat(path, function(err, stats) {
        if (err) 
            return console.error(err);
        console.log(stats);
        fs.unlink(path, function(err) {
            if (err) 
                return console.error(err);
            console.log('file has been removed');
        });
    });
});

app.listen(process.env.PORT, function() {
    console.log('app is running'); 
});