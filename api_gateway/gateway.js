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

global.token = ""

app.post('/login', async (req, res) => {

    const options = {
        uri: "http://um-svc:8080/user/login",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {

        if (response.statusCode == 200) {
            global.token = response.body
            console.log(token)
            res.send(true)
        }
        else {
            res.send(false)
        }
        res.end()
    })
})

app.post('/register', async (req, res) => {
    const options = {
        uri: "http://um-svc:8080/user/register",
        method: "POST",
        json: true,
        body: {
            userName: req.body.userName,
            password: req.body.password,
        }
    }
    request(options, (error, response, body) => {
        console.log(response.statusCode)
        if (response.statusCode == 200) {
            res.send(true)
        }
        else {
            res.send(false)
        }
        res.end()
    })
})

app.post('/save/query', async (req, res) => {


    const options = {
        uri: "http://um-svc:8080/query/save",
        method: "POST",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: {
            userName: req.body.userName,
            queryDetails: {
                year: req.body.queryDetails.year,
                month: req.body.queryDetails.month,
                day: req.body.queryDetails.day,
                radarInfo: req.body.queryDetails.radarInfo,
            }
        }
    }
    request(options, (error, response, body) => {
        if (response.statusCode == 200) {
            res.send(true)
        }
        else {
            res.send(false)
        }
        res.end()
    })
})

app.get('/get/query', async (req, res) => {


    // Revisit this once
    let userName = req.query.userName
    // console.log(userName)


    const options = {

        uri: `http://um-svc:8080/query/get/${userName}`,
        method: "GET",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    request(options, (error, response, body) => {

        if (response.statusCode == 200) {
            console.log(response.body)
            res.send(response.body)
            res.end()
        }
        else {
            res.send("Unauthorized user")
        }

    })
})

app.get('/logout', async (req, res) => {

    const options = {
        uri: `http://um-svc:8080/user/logout/`,
        method: "GET",
        json: true,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    request(options, (error, response, body) => {

        global.token = ""
        console.log(token)
        if (response.body == "Logout Successful") {
            res.send(true)
            res.end()
        }
    })
})


app.get('/plotmerra',async(req,res) => {

    conn.createChannel(function (channelError, channel) {

        console.log("Inside Produce of node js");
        if (channelError) {
            console.log("Inside channelError");
            console.log(err);
            throw channelError;
        }
        console.log(req.body)
        const QUEUE = 'Meera';
        channel.assertQueue(QUEUE,{
            durable: false
        });
        channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(req.query)));
    })        

    conn.createChannel(function (err, channel_new) {
        console.log("Inside Consume of node js");
        if (err) {
            console.log("Inside err");
            console.log(err);
            throw err;
        }

        const QUEUE_R = 'Meerareturn';
        channel_new.assertQueue(QUEUE_R,{
            durable: false
        });

         channel_new.consume(QUEUE_R, (msg) => {

            console.log("Message received");
            console.log(msg.content.toString());
            
            channel_new.ack(msg);
            channel_new.close();
            res.send(msg.content.toString())
            //return res.status(200).json(JSON.stringify(msg["content"].toString()));
        });     
    })


    console.log("Nowhere");
})


app.get('/plot', async (req, res) => {

    year_new = req.query.year;
    month_new = req.query.month;
    day_new = req.query.day;
    radar_new = req.query.radarInfo;


    const promise = auth()
    console.log(promise)
    promise.then((data) => {
        console.log(data)
        if (data) {
            const options = {
                uri: `http://datasource-svc:8000/api/v1/${year_new}/${month_new}/${day_new}/${radar_new}`,
                method: "GET",
                json: true,
            }
            request(options, (error, response, body) => {
                res.send(response)
                res.end()
            })
        }
    });

})

function auth() {

    const options_auth = {
        uri: 'http://um-svc:8080/user/authentication',
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    return new Promise((resolve, reject) => {
        request(options_auth, (error, response, body) => {
            resolve(response.body)
            return (response.body)
        })
    });

}


function findMore(id) {
    var options = {
        method: 'GET',
        uri: 'https://api.call2.com',
        qs: {
            access_token: _accessToken,
        }
    };
    return request(options);
}


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Server stated at Port Number: ", +port)
})

global.conn = null
const amqp = require('amqplib/callback_api');
amqp.connect('amqp://127.0.0.1', function (connError, connection) {

    if (connError) {
        console.log("Inside Error");
        throw connError;
    }
    conn = connection;
})

module.exports = router

