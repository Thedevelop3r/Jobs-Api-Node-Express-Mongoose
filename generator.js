//------- Test file that generates 100 users with random: name, email, password, 
// ------ With Json Web token ------
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
// connection database //
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const generate = async (req, res) => {
  // 100 users creation
  for (let i = 0; i < 100; i++) {
    let user = generateData(1);
    user = await User.create(user);
    // setup token for own config.
    // token = user.createJWT();
  }
  const allusers = await User.find();
  res.status(201).json(allusers);
};
// route
app.use("/", generate);
// server config-startup
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log(`Server is listning to localhost:port ${port}`);
})
// function: random data for name, email, password. tweek at own risk
// generate a person or large data of persons
function generateData(range) {
    // child function that returns a desired number within range
  function randomNumber(size) {
    return Math.floor(Math.random() * size);
  }
  // predefined alphabets
  const alphabets = [
    "a",
    "b",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  // alphabets size for loop
  const alphabetSize = alphabets.length;
  // adding vovels at predefined indexes - #neverGotDesiredREsults-lols
  const vovels = ["a", "e", "i", "o", "u"];
  // size for vovels to use in loops
  const vovelssize = vovels.length;
  // this array can contain many persons data
  let peoples = [];
  // this is for single user output
  let user = {};
  // index was created for keeping track of users in queries not in use for single person
  let index = 0;
  // provided range of users or it will go with hundred users
  // and will return array instead of single user
  const PEOPLESIZE = range || 100;
  for (let i = 0; i <= PEOPLESIZE; i++) {
    let name = "";
    let email = "";
    let password = "";
    // starting loop name lenght is 5
    // // adding vovles at diffrent indexes
    for (let a = 0; a <= 5; a++) {
      if (a == 0) {
        name += alphabets[randomNumber(alphabetSize)];
        email += vovels[randomNumber(vovelssize)];
      }
      if (a == 1) {
        name += vovels[randomNumber(vovelssize)];
        email += alphabets[randomNumber(alphabetSize)];
      }
      if (a == 2) {
        name += vovels[randomNumber(vovelssize)];
        email += alphabets[randomNumber(alphabetSize)];
      }
      // others wise
      name += alphabets[randomNumber(alphabetSize)];
      email += alphabets[randomNumber(alphabetSize)];
    }
    // password lenght 12
    for (let b = 0; b < 12; b++) {
      password += alphabets[randomNumber(alphabetSize)];
    }
    // adding @email.com for validation success for mongoose (if)
    email += "@email.com";
    // creating a local scope person object with data
    let person = {
      name,
      email,
      password,
    };
    console.log({ ...person });
    // storing it to main scope object variable for returning perpose
    user = person;
    // adding into array if many users
    peoples.push(person);
    // use index with your own constomization
    //index++;
  } // main for loop ends
  // printing a single user
  // if provided with 1 range will return with one user
  if (range == 1) {
    return user;
  }
  // others wise a whole array of users goana return.
  // look for heap stack notic/warning/crash-/
  return peoples;
}