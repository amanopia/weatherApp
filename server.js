
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
    res.sendFile(__dirname + "/index.html");
    // before sending the result back to client we use the https module
    const url = "https://api.openweathermap.org/data/2.5/weather";
    const city = "london";
    const units = "imperial";
    const appid = "d6cb3f891806944d6df035d7343904db";
    https.get(`${url}?q=${city}&units=${units}&mode=json&appid=${appid}`, (response) => {
        console.log(response.statusCode);

        // logging the data coming through the API
        response.on('data', function(data){
            // console.log(data);
            // to get the data in an already parsed format, we either use the JSON.parse(data) or we use the process.stdout.write(data).  But this prints the stringified data
            let weatherDataObj = JSON.parse(data);
            let temp = weatherDataObj.main.temp;
            let icon = weatherDataObj.weather[0].icon;
            let description = weatherDataObj.weather[0].description;
            let pressure = weatherDataObj.main.pressure;
            let humidity = weatherDataObj.main.humidity;

            const dataObj = {
                temp: temp,
                icon: icon,
                description: description,
                pressure: pressure,
                humidity: humidity
            }
            console.log(dataObj.temp);

            // To convert the data into a string
            // console.log(JSON.stringify());
        })
        // logging the error if any
        response.on('error', function(e){
            console.log(e);
        })
    })
})

app.post('/', (req,res) => {
    var cityName = req.body.cityName;
    // console.log(cityName);
})