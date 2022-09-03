// Custome data types
type Combinable = number | string;              // We can make our own custom data types
type ConversionDescriptor = 'number' | 'text';  // ConversionDescriptor combines a union type with a literal type
                                                // a variable of this datatype MUST BE one of the 2 string literals
type User = {name: string, age: number};

// Union Types allow different datatypes for any variable if desired
function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {   
    let result;                                                                                             
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'number') {        
        result = +input1 + +input2; //Using + in front of a variable casts it to a number datatype
    }
    else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(3, 4, 'number');
console.log(combinedAges);

const combinedNames = combine('Alex', 'Karah', 'number');
console.log(combinedNames);
