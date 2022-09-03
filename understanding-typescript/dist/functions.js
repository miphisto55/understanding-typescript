"use strict";
function add(n1, n2) {
    return n1 + n2;
}
;
function add2(n1, n2) {
    return n1 + n2;
}
;
function add3(n1, n2) {
    return n1.toString() + n2.toString();
}
;
function add4(n1, n2) {
    return n1.toString() + n2.toString();
}
;
function printResult(num) {
    console.log('Result: ' + num);
}
;
function printResult2(num) {
    console.log('Result: ' + num);
    return;
}
;
let someValue; // this is a value datatype,  
printResult(add(2, 3));
// We can also declare pointers to functions by using the "any" type
let combineValues;
let combineValues2;
// But its best to use the "Function" datatype for this purpose
let combineValues3;
combineValues = add;
combineValues3 = add;
console.log(combineValues(1, 3));
console.log(combineValues3(1, 9));
let log = console.log;
log('Sup everyone');
// We can create functions which take callbacks or functions as parameters too.
function addAndHandle(n1, n2, cb) {
    const result = n1 + n2;
    cb(result);
}
addAndHandle(10, 20, (result) => { log(result); });
