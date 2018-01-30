Tips for Node.js
================

Useful tips and tricks for node.js developement.
This is just a quick memo for me

- [Tips for Node.js](#tips-for-nodejs)
    - [Useful npm packages](#useful-npm-packages)
    - [Callback function](#callback-function)
    - [Tips for print an object](#tips-for-print-an-object)
    - [Encode string for URL](#encode-string-for-url)

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