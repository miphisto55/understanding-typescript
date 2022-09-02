// Union Types allow different datatypes for any variable if desired
function combine(input1: number | string, input2: number | string) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number') {
        result = input1 + input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(3, 4);
console.log(combinedAges);

const combinedNames = combine('Alex', 'Karah');
console.log(combinedNames);
