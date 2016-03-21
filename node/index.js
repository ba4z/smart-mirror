// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var request = require('request');
var async = require("async");

// Set server port
app.listen(1337);
console.log('server is running');

var header = {"Content-Type": "application/json", 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:24.0) Gecko/20100101 Firefox/24.0'};
//Add header accept/type

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


var weatherApi = "092bd05c4c7131c3f741a90730aed2de";
var cityId = "5814616";

// set routes
app.get('/', function(req, res) {
    res.sendStatus(200);
});


app.get('/calendar', function(req, res) {
    var calendarUrls = [
        "http://p09-calendarws.icloud.com/ca/subscribe/1/ftIm44EdGrTFjMJlGkC4BVrMt_-QgewSb8-YYkZIRVk7wOQd_fHA72FaLKSBNHiK4WjUPzSrDSAfd3aamDN2Hp1Ig8XxNjlppI5HhaQJYT4",
        "http://p09-calendarws.icloud.com/ca/subscribe/1/Vl8UDbkP97moaGrFOEvr5dfTkV5Gdzcllb8YoK27Ylx2OAm7THG6MTe0edgmRlb8GNo1C9OLDEskCj-beEMX8ufeAU6YuaAPza9roFzpU4A",
        "https://calendar.google.com/calendar/ical/bas.vanklaarbergen%40gmail.com/private-90a5a5bcea1b7b6ec234a93d1648389b/basic.ics"
    ];

    var functionList = [];
    async.forEachOf(calendarUrls, function(key, value, done){
        functionList.push(function(callback){
            getRequest(key, callback);
        });
        done();
    });

    var getRequest = function(url, callback){
        var options = {
            url: url,
            headers: header
        }

        request(options, function (error, response, body) {
            if (error) {
                console.error(error);
                callback(error)
            } else  {
                callback(null, response.body);
            }
        });
    }

    async.parallel(functionList,
    function(err, results) {
        if(err){
            console.error(err);
            res.sendStatus(500);
        } else {
            res.send(results)
        }
    });
});



app.get('/weather', function(req, res) {
    var url = "http://api.openweathermap.org/data/2.5/weather?id=" + cityId + "&appid=" + weatherApi;
    var options = {
        url: url,
        headers: header
    }

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else  {
            res.send(response.body);
        }
    });
});

app.get('/forecast', function(req, res) {
    var url = "http://api.openweathermap.org/data/2.5/forecast/daily/?id=" + cityId + "&appid=" + weatherApi + "&cnt=6";
    var options = {
        url: url,
        headers: header
    }

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else  {
            res.send(response.body);
        }
    });
});

app.get('/traffic/:location', function(req, res) {

    var location = req.params.location;
    var apiKey = "AIzaSyAagqYBNEwAhyx3RKENw7J9WSO5lQXeECU";
    var origin = "45.612962,-122.5590841";
    var dest = getCoords(location);

    if(!dest){
        return res.send(500);
    }

    var url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=" + origin + "&destinations=" + dest + "&key=" + apiKey;
    var options = {
            url: url,
            headers: header
    }

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            res.sendStatus(500);
        } else  {
            res.send(body);
        }
    });
});

var getCoords = function(location){
    switch (location) {
        case "cbc":
            return "45.5509568,-122.5668637"
        case "cca":
            return "45.6621288,-122.5599899"
    }
};
