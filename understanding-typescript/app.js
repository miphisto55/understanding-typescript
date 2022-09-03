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
var someValue; // this is a value datatype,  
printResult(add(2, 3));
// We can also declare pointers to functions by using the "any" type
var combineValues;
var combineValues2;
// But its best to use the "Function" datatype for this purpose
var combineValues3;
combineValues = add;
combineValues3 = add;
console.log(combineValues(1, 3));
console.log(combineValues3(1, 9));
var log = console.log;
log('Sup everyone');
function addAndHandle(n1, n2, callback) {
    var result = n1 + n2;
    callback(result);
}
addAndHandle(10, 20, function () { });
