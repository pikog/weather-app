//Import package
const axios = require('axios')

//Function to Request Google Maps API in order to get latitude and longitude in function to an address
module.exports = (address, key) =>
{
    //Axios is a Promise
    //We return the promise chain
    return axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address,
            key
        }
    }).then((response) => {
        //No result error handling, we throw an error (displayed with catch)
        if(response.data.status === 'ZERO_RESULT')
        {
            throw new Error('Invalid Address')
        }
        //No quota error handling, we throw an error (displayed with catch)
        else if(response.data.status === 'OVER_QUERY_LIMIT')
        {
            throw new Error('Daily request quota exceeded')
        }
        //If it's good we return a resolved promise with data
        else if(response.data.status === 'OK')
        {
            return Promise.resolve({
                address: response.data.results[0].formatted_address,
                lat: response.data.results[0].geometry.location.lat,
                lng: response.data.results[0].geometry.location.lng
            })
        }
        //Unknown Error, we throw an error (displayed with catch)
        else
        {
            throw new Error(`Code ${response.status}`)
        }
    })
}