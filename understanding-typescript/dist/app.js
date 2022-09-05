"use strict";
// const are constant and can never change
const userName1 = 'Alex';
// let sets variables that are scoped, and can change
let age = 30;
age = 29;
// We shouldn't use var anymore apparently, it only has global and functional scope
var myVar = 54;
// var can be accessed outside of if statement scope for example which is wtf?
if (age > 20) {
    var isOld = true;
}
// console.log(isOld);     // Of course TypeScript is complaining about this, but we could totally compile this and it would work.
// regular way of defining a function
function addRegular(n1, n2 = 5) {
    return n1 + n2;
}
// arrow function way of defining a function, these all do the same thing
const addArrow1 = (n1, n2) => n1 + n2;
const addArrow2 = (n1, n2) => {
    n1 + n2;
};
const addArrow3 = (n1, n2) => {
    return n1 + n2;
};
const printOutput = (output) => {
    console.log(output);
};
const button1 = document.querySelector('button');
if (button1) {
    button1.addEventListener('click', event => console.log(event));
}
printOutput(addArrow1(1, 4));
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking', ...hobbies];
// The Spread operator, write elipses and then a list. It can be used anytime we have a ',' separated list
activeHobbies.push(...hobbies);
const person1 = {
    firstname: 'Alex',
    currentAge: 30
};
const copiedPerson = Object.assign({}, person1);
// Rest/spread operator to create a function with an unlimited amount of arguments if desired.
const add69 = (...numbers) => {
    return numbers.reduce((currentResult, currentValue) => { return currentResult + currentValue; }, 0);
};
const addedNumbers = add69(5, 2, 1, 4, 3, 6);
printOutput(addedNumbers);
// Array and Object Destructuring
const [hobby1, hobby2, ...remainingHobbies] = hobbies;
console.log(hobby1);
console.log(hobby2);
// With object destructuring the variables in the curly braces are not arbitrary, the must be property values
const { firstname, currentAge } = person1;
const { firstname: newName, currentAge: newAge } = person1;
console.log(firstname);
console.log(currentAge);
console.log(newName);
console.log(newAge);
//# sourceMappingURL=app.js.map