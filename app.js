require('dotenv').config()

//Import our files
const yargsConfig = require('./yargs-config')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

//Configuration for yargs
const argv = yargsConfig()

geocode(argv.address, (geocodeError, geocodeResults) =>
{
    if(geocodeError)
    {
        console.log(geocodeError)
    }
    else
    {
        weather(geocodeResults.lat, geocodeResults.lng, (weatherError, weatherResults) =>
        {
            if(weatherError)
            {
                console.log(weatherError)
            }
            else
            {
                console.log(JSON.stringify(weatherResults, undefined, 2))
            }
        })
    }
})