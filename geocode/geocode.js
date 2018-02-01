//Import package
const request = require('request')

//Function to Request Google Maps API in order to get latitude and longitude in function to an address
module.exports = (address, key, callback) =>
{
    request(
        {
            url: 'https://maps.googleapis.com/maps/api/geocode/json',
            qs: {
                address,
                key,
            },
            json: true
        }, (error, response, body) =>
        {
            //Connection error handling
            if(error)
            {
                callback('Unable to connect Google Maps API')
            }
            //No result error handling
            else if(body.status === 'ZERO_RESULT')
            {
                callback('Invalid Address')
            }
            //No result error handling
            else if(body.status === 'OVER_QUERY_LIMIT')
            {
                callback('Daily request quota exceeded')
            }
            //Good response
            else if(body.status === 'OK')
            {
                callback(undefined, {
                    address: body.results[0].formatted_address,
                    lat: body.results[0].geometry.location.lat,
                    lng: body.results[0].geometry.location.lng
                })
            }
            //Unknow error handling
            else
            {
                callback(body)
            }
        }
    )
}