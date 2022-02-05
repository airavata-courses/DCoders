//REST API demo in Node.js
var express = require('express'); // requre the express framework
var app = express();
var fs = require('fs'); //require file system object
const bodyparser = require('body-parser')
const request = require('request');
const cors = require("cors")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(
    cors({
        origin: "*"
    })
)


app.get('/dummy',async(req,res,body)=>{
    res.sendStatus(200)
})


app.post('/user/login',async(req,res,body)=>{
    res.send(false)
    //res.sendStatus(200)
    console.log(req.body)
})

app.post('/user/register',async(req,res,body)=>{
    res.sendStatus(200)
})

app.post('/query/save',async(req,res,body)=>{
    res.sendStatus(200)
})

app.get('/query/{user}',async(req,res,body)=>{
    res.sendStatus(200)
})



// Create a server to listen at port 8080
var server = app.listen(8080, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})