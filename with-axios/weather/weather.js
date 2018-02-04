//Import package
const axios = require('axios')

//Function to request Dark Sky API in order to get weather in function to latitude and longitude
module.exports = (lat, lng, key, callback) =>
{
    //We return the promise chain
    return axios.get(`https://api.darksky.net/forecast/${key}/${lat},${lng}`)
    .then((response) => {
        //If it's good we return a promise resolved with the weather summary
        return Promise.resolve({
            summary: response.data.currently.summary
        })
    })
}