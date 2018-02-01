Tips for Node.js
================

Useful tips and tricks for node.js developement.
This is just a quick memo for me

- [Tips for Node.js](#tips-for-nodejs)
    - [Useful npm packages](#useful-npm-packages)
    - [Callback function](#callback-function)
    - [Tips for print an object](#tips-for-print-an-object)
    - [Encode string for URL](#encode-string-for-url)
    - [Promises with ES6](#promises-with-es6)

## Useful npm packages

* **[request](https://github.com/request/request)** : Simplify HTTP calls.

## Callback function

This is a function calls when another function is finished

```javascript
const getUser = (id, callback) =>
{
    //some code to find user
    callback(user)
}

getUser(15, (user) =>
{
    //I can use user data
})
```

## Tips for print an object

Use `JSON.stringify` to have a string indented (identation is the third parameter)

```javascript
console.log(JSON.stringify(object, undefined, 2))
```

## Encode string for URL

To encode string to URL

```javascript
encodeURIComponent('my string') //return 'my%20string'
```

To decode URL to string

```javascript
decodeURIComponent('my%20string') //return 'my string'
```

## Promises with ES6

This is a Promise example with [request](https://github.com/request/request) and [PokeAPI](https://github.com/PokeAPI/pokeapi)

```javascript
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
        //First function of .then() executed when resolve
        console.log(response)
        return pokemonInfo('pikachu')
    }, (error) =>
    {
        //Second function of .then() executed when reject
        console.log(error)
    })
    .then((response) =>
    //Problem: This .then() will be launched even if the past promise is rejected (so the promise pokemonInfo('pikachu') is not returned and the response of second .then() is undefined)
    {
        console.log(response)
    }, (error) =>
    {
        console.log(error)
    })
```

* `resolve()` and `reject()` can contain only one parameter

* We can chain multiple Promises by return a new promise in functions of `.then()`

* When the promise is not *resolved* or *rejected* **yet**
    * the promise is **pending**

* When the promise is *resolved* or *rejected*
    * the promise is **settled**

* When the promise is *resolved*
    * the first function of `.then()` is executed, the chaining **continues** (go to next `.then()`)

* When the promise is *rejected*
    * the second function of `.then()` is executed, the chaining **continues** (go to next `.then()`)
    * **if there is a `.catch()`** the `.catch()` is called and the chaining **stops** (don't go to next `.then()`)

So in order to handle error and avoid to continue the chain if there is an error (=if the promise is rejected), we used `.catch()` instead of the second function of `.then()`

```javascript
pokemonInfo('charmader')
    .then((response) =>
    {
        console.log(response)
        return pokemonInfo('pikachu')
    }).then((response) =>
    {
        console.log(response)
    }).catch((error) =>
    //Solution: we used .catch() to stop the chain when there is an error (when the promise is rejected)
    {
        console.log(error)
    })
```
