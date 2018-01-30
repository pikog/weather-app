Tips for Node.js
================

Useful tips and tricks for node.js developement.
This is just a quick memo for me

- [Tips for Node.js](#tips-for-nodejs)
    - [Useful npm packages](#useful-npm-packages)
    - [Callback function](#callback-function)

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