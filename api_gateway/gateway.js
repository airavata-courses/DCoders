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
    //console.log(req.body)

    const options = {
        uri: "http://localhost:8080/user/login",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {
        console.log(response.statusCode)
        res.send(body)
        res.end()
    })
})

app.post('/register', async (req, res) => {
    const options = {
        uri: "http://localhost:8080/user/register",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {
        console.log("Mere niche")
        console.log(response.statusCode)
        console.log("Mere upar")
        res.send(body)
        res.end()
    })
})

app.post('/save/query/:userName', async (req, res) => {

    const options = {
        uri: "http://localhost:8080/query/save",
        method: "POST",
        json: true,

        body: {
            userName: req.params.userName,
            queryDetails: {
                date: req.body.queryDetails.date,
                month: req.body.queryDetails.month,
                time: req.body.queryDetails.time,
                radarInfo: req.body.queryDetails.radarInfo
            }
        }
    }
    request(options, (error, response, body) => {
        console.log(response.statusCode)
        res.send(body)
        res.end()
    })
})

app.get('/get/query/:userName', async (req, res) => {
    console.log(req.params.userName)
    let id_new = req.params.userName;
    const options = {
        uri: `http://localhost:8080/query/get/${id_new}`,
        method: "GET",
        json: true,
    }
    request(options, (error, response, body) => {
        console.log(JSON.stringify(response.body))
        res.send(response.body)
        res.end()
    })
})

app.get('/get/:year/:month/:day/:radar', async (req, res) => {

    let year_new = req.params.userName;
    let month_new = req.params.month;
    let day_new = req.params.day;
    let radar_new = req.params.radar;

    const options = {
        uri: `http://localhost:8080/get/v1/${year_new}/${month_new}/${day_new}/${radar_new}`,
        method: "GET",
        json: true,
    }
    request(options, (error, response, body) => {
        console.log(JSON.stringify(response.body))
        res.send(response.body)
        res.end()
    })
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("REST API demo app listening at http://%s:%s", host, port)
})

module.exports = router