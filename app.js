//Import package
const request = require('request')

//Import our files
const yargsConfig = require('./yargs-config.js')

//Configuration for yargs
const argv = yargsConfig()

//Request Google Maps API to get latitude and longitude in function to an address
request(
    {
        url: 'https://maps.googleapis.com/maps/api/geocode/json',
        qs: {
            address: argv.address,
        },
        json: true
    }, (error, response, body) =>
    {
        //Connection error handling
        if(error)
        {
            console.log('Unable to connect')
        }
        //No result error handling
        else if(body.status === 'ZERO_RESULT')
        {
            console.log('Invalid Address')
        }
        //Good response
        else if(body.status === 'OK')
        {
            console.log(JSON.stringify(response, undefined, 2))
            console.log(`Address: ${body.results[0].formatted_address}`)
            console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
            console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
        }
        //Unknow error handling
        else
        {
            console.log('Error with Google response')
        }
    }
)