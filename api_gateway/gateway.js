var express = require('express');
var app = express();
const router = express.Router();
const request = require('request');
const bodyparser = require('body-parser');
const cors = require("cors")

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(
    cors({
        origin: "*"
    })
)

app.post('/login', async (req, res) => {

    const options = {
        uri: "http://127.0.0.1:8080/user/login",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {
        console.log(response.statusCode)
        if(response.statusCode==200){
            res.send(true)
        }
        else{
            res.send(false)
        }
        res.end()
    })
})

app.post('/register', async (req, res) => {
    const options = {
        uri: "http://127.0.0.1:8080/user/register",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {
        console.log(response.statusCode)
        if(response.statusCode==200){
            res.send(true)
        }
        else{
            res.send(false)
        }
        res.end()
    })
})

app.post('/save/query', async (req, res) => {
    
    const options = {
        uri: "http://127.0.0.1:8080/query/save",
        method: "POST",
        json: true,

        body: {
            userName: req.params.userName,
            queryDetails: {
                year: req.body.queryDetails.year,
                month: req.body.queryDetails.month,
                day: req.body.queryDetails.day,
                radarInfo: req.body.queryDetails.radarInfo,
            }
        }
    }
    request(options, (error, response, body) => {
        if(response.statusCode==200){
            res.send(true)
        }
        else{
            res.send(false)
        }
        res.end()
    })
})

app.get('/get/query', async (req, res) => {

    let userName = req.body.userName

    const options = {
        uri: `http://127.0.0.1:8080/query/get/${userName}`,
        method: "GET",
        json: true,
    }
    request(options, (error, response, body) => {
        console.log(response.body)
        res.send(response.body)
        res.end()
    })
})

app.get('/plot', async (req, res) => {

    let year_new = req.body.year;
    let month_new = req.body.month;
    let day_new = req.body.day;
    let radar_new = req.body.radar;

    const options = {
        uri: `http://127.0.0.1:8000/api/v1/${year_new}/${month_new}/${day_new}/${radar_new}`,
        method: "GET",
        json: true,
    }
    console.log(options)
    request(options, (error, response, body) => {
        res.send(response.body)
        res.end()
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
})

module.exports = router
