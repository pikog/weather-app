const request = require ('request')

const pokemonInfo = (name) =>
{
    return new Promise((resolve, reject) =>
    {
        request(
            {
                url: `http://pokeapi.co/api/v2/pokemon/${encodeURIComponent(name)}`,
                json: true
            }, (error, response, body) =>
            {
                if(response.statusCode === 200)
                {
                    resolve({
                        name: body.name,
                        id: body.id,
                        height: body.height,
                        weight: body.weight,
                        type: body.types[0].type.name
                    })
                }
                else if(response.statusCode === 404)
                {
                    reject('Pokemon not found')
                }
                else if(error)
                {
                    reject(error)
                }
                else
                {
                    reject(response.statusCode)
                }
            }
        )
    })
}

pokemonInfo('charmander')
    .then((response) =>
    {
        console.log(response)
        return pokemonInfo('pikachu')
    }).then((response) =>
    {
        console.log(response)
    }).catch((error) =>
    {
        console.log(error)
    })