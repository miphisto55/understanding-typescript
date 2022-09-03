function add(n1: number, n2: number) {              // inferred return datatype
    return n1 + n2;
};

function add2(n1: number, n2: number): number {     // explicit return dataype
    return n1 + n2;
};

function add3(n1: number, n2: number) {             // inferred return dataype
    return n1.toString() + n2.toString();
};

function add4(n1: number, n2: number): string {     // explicit return dataype
    return n1.toString() + n2.toString();
};

function printResult(num: number): void {           // explicit void return type, not needed/not best practice to even include it most of the time
    console.log('Result: ' + num);
};

function printResult2(num: number): undefined {      // using undefined as the return type, js EXPECTS a returned value, it just will return "undefined" 
    console.log('Result: ' + num);
    return;
};

let someValue: undefined; // this is a value datatype,  

printResult(add(2, 3));

// We can also declare pointers to functions by using the "any" type
let combineValues;
let combineValues2: any;
// But its best to use the "Function" datatype for this purpose
let combineValues3: Function;

combineValues = add;
combineValues3 = add;

console.log(combineValues(1,3));
console.log(combineValues3(1,9));

let log = console.log;

log('Sup everyone');

// We can create functions which take callbacks or functions as parameters too.
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
    const result = n1 + n2;
    cb(result);
}

addAndHandle(10, 20, (result) => { log(result); } );