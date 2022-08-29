const fs = require('fs');
const { response } = require('express');
const express = require('express');
const app = express();
const port = process.env.PORT || 4000;

let { users } = require('./state');

// middleware
app.use(express.json());
app.use(express.urlencoded());

/* BEGIN - create routes here */
app.get('/', (req, res) => {
  res.send('Welcome to Port 4000');
});

// * Give your server the ability to respond to a GET request with a path "
// * /users" and return the users array from state.js
app.get('/users', (req, res) => {
  res.json(users);
});

// * Give your server the ability to respond to a GET request with a path "
// * /users/1" and return the 1st user object from the users array from state.js
app.get('/users/:id', (req, res) => {
  const userID = req.params.id;
  const getUser = users.find((user) => user._id === +userID);
  if (!getUser) {
    res.status(500).send('Account not found.');
  } else {
    res.json(getUser);
  }
});

// * Give your server the ability to respond to a POST request with a path
// *  "/users" and add a hard coded user object to the users array from state.js.
// *  Use res.json() to send the last user in the array (should be the new one)
// *  back to the client.
app.post('/users', (req, res) => {
  const newUser = req.body;
  users.push(newUser);
  res.json(users);
});

// * Give your server the ability to respond to a PUT request with a path
// *  "/users/1" and just change any key value (ex. name, occupation) on the
// *  first user object in the users array in state.js. Use res.json() to send
// *  this user back to the client.
app.put('/users/:id', (req, res) => {
  const userID = req.params.id;
  // console.log(userID);
  const body = req.body;
  const user = users.find((user) => user._id === +userID);
  // console.log(user);
  const index = users.indexOf(user);

  if (!user) {
    res.status(500).send('User not found.');
  } else {
    const updatedUser = { ...user, ...body };

    users[index] = updatedUser;

    res.send(updatedUser);
  }
});

// * Give your server the ability to respond to a DELETE request with a path
// *  "/users/1" and remove the first item from the users array. Use res.send()
// *  to send back a message, "deleted"

app.delete('/users/:id', (req, res) => {
  const userID = req.params.id;
  console.log(userID);
  let newUsersArray = users.filter((user) => user._id !== +userID);

  if (!newUsersArray) {
    res.status(500).send('User not found.');
  } else {
    users = newUsersArray;
    res.send(users);
  }
});
/* END - create routes here */

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
