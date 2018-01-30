//NPM package
const yargs = require('yargs')

//Yargs configuration function
module.exports = () =>
{
    return yargs
    .strict()
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address that we want weather',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv
}