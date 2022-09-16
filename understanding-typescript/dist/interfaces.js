"use strict";
// This is like interfacing with functions, you can contract functions to use the same parameters
// type AddFn = (a: number, b: number) => number;
let myAddFn;
myAddFn = (n1, n2) => {
    return n1 + n2;
};
;
let user1;
user1 = {
    name: 'Alex',
    greet(phrase) {
        console.log(phrase + ' ' + this.name);
    }
};
user1.greet('Hello there, I am');
class Orc {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(phrase) {
        console.log(this.name + ' - I am ' + this.age + " years old, " + phrase);
    }
}
;
const orc1 = new Orc('Moktar', 121);
orc1.greet('I WILL EAT YOUR BONES!');
console.log(orc1);
//# sourceMappingURL=interfaces.js.map