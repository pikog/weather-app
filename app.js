//Import package
const request = require('request')

//Import our files
const yargsConfig = require('./yargs-config.js')

//Configuration for yargs
const argv = yargsConfig()

console.log(argv)

request(
    {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: argv.address,
        },
        json: true
    }, (error, response, body) =>
    {
        console.log(JSON.stringify(response, undefined, 2))
        console.log(`Address: ${body.results[0].formatted_address}`)
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
    }
)