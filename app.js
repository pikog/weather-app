//Import our files
const yargsConfig = require('./yargs-config')
const geocode = require('./geocode/geocode')

//Configuration for yargs
const argv = yargsConfig()

geocode(argv.address, (error, results) =>
{
    if(error)
    {
        console.log(error)
    }
    else
    {
        console.log(JSON.stringify(results, undefined, 2))
    }
})