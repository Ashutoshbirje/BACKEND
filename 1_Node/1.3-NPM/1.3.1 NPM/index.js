// var generateName = require("sillyname"); // CJS
import generateName from "sillyName"; // ECM

var sillyName = generateName();

console.log(`My name is ${sillyName}.`);

import superheroes from "superheroes";

const name = superheroes.random();

console.log(`I am ${name}!`);
