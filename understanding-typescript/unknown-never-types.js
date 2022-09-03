"use strict";
let userInput; // Maybe we don't know if the user will enter a number, or a string etc. Similar to the any type, but almost always a better choice than any
// If we know that userInput will be a number or string for example, we should use the union type string | number
let userName;
userInput = 5;
userInput = 'Alex';
// userName = userInput;    // this is not allowed since the userName variable (string) is NOT the same type as userInput (unknown)
// However we can introduce some logic to check the value of userInput to assign it to userName
if (typeof userInput === 'string') {
    userName = userInput; // allowed
}
function generateError(message, code) {
    throw { message: message, errorCode: code }; // of course we could encapsulate this in a try catch still
} // it actually returns the 'never' type, which may be a niche use-case
generateError('An error occured!', 500);
