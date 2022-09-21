
const express = require("express");
const https = require("https");

// body parser is used to parse the payload data coming in as a POST request from the client, in the form of a JSON object
const bodyParser = require("body-parser");

// app is a function that represents the express module. We are just binding the word 'app' to the function express()
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
let port = 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/', (req,res) => {

    const url = "https://api.openweathermap.org/data/2.5/weather";
    const city = "london";
    const units = "imperial";
    const appid = "d6cb3f891806944d6df035d7343904db";
    https.get(`${url}?q=${city}&units=${units}&mode=json&appid=${appid}`, (response) => {
        console.log(response.statusCode);
        
        response.on("data", function(data){
            // console.log(JSON.parse(data));
            
            let weatherDataObj = JSON.parse(data);
            let temp = weatherDataObj.main.temp;
            let icon = weatherDataObj.weather[0].icon;
            const imageUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`
            let description = weatherDataObj.weather[0].description;
            let pressure = weatherDataObj.main.pressure;
            let humidity = weatherDataObj.main.humidity;

            // after everything has been written, use res.send() to send the information all together.
            // ** Note : We can only send string data using res.send() or res.write(), we cannot send integers, so wither send it as an object, or stringify it
            res.write(JSON.stringify(temp));
            res.write(description);
            res.write(`<img src=${imageUrl} />`);
            res.write("<img src=" + imageUrl + ">");
            res.send();
        })
        
    }).on("error", (e) => {
        console.log(e);
    })
    // res.sendFile(__dirname + "/index.html");
})

app.post('/', (req,res) => {
    var cityName = req.body.cityName;
    // console.log(cityName);
})