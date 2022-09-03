// Union Types allow different datatypes for any variable if desired
function combine(input1, input2, resultConversion) {
    var result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'number') {
        result = +input1 + +input2; //Using + in front of a variable casts it to a number datatype
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}
var combinedAges = combine(5, 4, 'number');
console.log(combinedAges);
var combinedNames = combine('Alex', 'Karah', 'number');
console.log(combinedNames);
