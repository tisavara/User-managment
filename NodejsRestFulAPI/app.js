var express = require('express');
var app = express();
var fs = require('fs');

app.get('/getUser', function (req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data){
        console.log(data);
        res.end( data );
    })
})

app.get('/getUser/:id', function (req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data){
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end( JSON.stringify(user) );
    })
})

app.post('/addUser', function (req, res){
    fs.readFile(__dirname + "/" + "user.json", 'utf8', function (err, data){
        data = JSON.parse( data );
        data["user4"] = user["user4"];
        console.log( data );
        res.end(JSON.stringify(data));
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Application run at http://%s:%s", host, port);
})

var user = {
    "user4" : {
        "name": "VV",
        "password": "1234567890",
        "id": "4"
    }
}