var express = require('express'); 
var app = express();
const router = express.Router();
const request = require('request');
const bodyparser = require('body-parser');
const cors = require("cors")

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(
    cors({
        origin: "*"
    })
)

app.post('/login', async(req, res) => {
    console.log(req.body)
    
    const options={
        uri:"http://localhost:8080/user/login",
        method: "POST",
        json: true,
        body:{
            username: req.body.username,
            password: req.body.password,
        } 
    }
    request(options, (error, response, body) =>{
        //console.log(response.body)
        console.log(body)
        res.send(body)
        res.end()
    })
})

app.post('/register', async(req, res) => {
    res.end()
    const options={
        uri:"http://localhost:8080/user/register",
        method: "POST",
        json: true,
        body:{
            username: req.body.username,
            password: req.body.password,
        } 
    }
    request(options, (error, response, body) =>{
        console.log(response.body)
    })
})

app.post('/query', async(req, res) => {
    res.end()
    const options={
        uri:"http://localhost:8080/query/save",
        method: "POST",
        json: true,
        body:{
            date: req.body.date,
            month: req.body.month,
            time: req.body.time,
            radarInfo: req.body.radarInfo,
        } 
    }
    request(options, (error, response, body) =>{
        console.log(response.statusCode)
    })
})

app.get('/userquery', async(req, res) => {
    res.sendStatus(200)
    const options={
        uri:"http://localhost:8080/query/{user}",
        method: "GET",
        json: true,
        body:{
            date: req.body.date,
            month: req.body.month,
            time: req.body.time,
            radarInfo: req.body.radarInfo,
        } 
    }
    request(options, (error, response, body) =>{
        console.log(response.body)
    })
})


var server = app.listen(8081, function(){
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})
module.exports = router