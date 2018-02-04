require('dotenv').config()

//Import our files
const yargsConfig = require('../yargs-config')
const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

//Configuration for yargs
const argv = yargsConfig()

//Get lat & lng from a location and then get weather from this location
//Geocode is a promise
geocode(argv.address, process.env.GOOGLE_MAPS_SECRET).then((response) =>
{
    //When we get the address we display it
    console.log(`Address: ${response.address}`)
    //And we call weather wich is a promise
    return weather(response.lat, response.lng, process.env.DARKSKY_SECRET)
}).then((response) =>
{
    //When we get the weather we display it
    console.log(`Weather summary: ${response.summary}`)
})
.catch((error) =>
{
    //When there is an error
    console.log(error.message)
})