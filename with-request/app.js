require('dotenv').config()

//Import our files
const yargsConfig = require('../yargs-config')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

//Configuration for yargs
const argv = yargsConfig()

//Get lat & lng from a location and then get weather from this location
geocode(argv.address, process.env.GOOGLE_MAPS_SECRET, (geocodeError, geocodeResults) =>
{
    if(geocodeError)
    {
        console.log(geocodeError)
    }
    else
    {
        console.log(geocodeResults.address)
        weather(geocodeResults.lat, geocodeResults.lng, process.env.DARKSKY_SECRET, (weatherError, weatherResults) =>
        {
            if(weatherError)
            {
                console.log(weatherError)
            }
            else
            {
                console.log(`Weather summary: ${weatherResults.summary}`)
            }
        })
    }
})