//Import package
const request = require('request')

//Function to request Dark Sky API in order to get weather in function to latitude and longitude
module.exports = (lat, lng, key, callback) =>
{
    request(
        {
            url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
            json: true
        }, (error, response, body) =>
        {
            //Error handling
            if(!error && response.statusCode === 200)
            {
                callback(undefined, {
                    summary: body.currently.summary
                })
            }
            else
            {
                callback('Unable to find weather at the location')
            }
        }
    )
}