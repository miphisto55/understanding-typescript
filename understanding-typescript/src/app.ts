// This is like interfacing with functions, you can contract functions to use the same parameters
// type AddFn = (a: number, b: number) => number;

interface AddFn {
    (a: number, b: number): number;
}

let myAddFn: AddFn;

myAddFn = (n1: number, n2: number) => {
    return n1 + n2;
}

// Classes can only extend from 1 other class, however you may implement as many interfaces as you want
interface Named {
    // can use readonly modifier
    readonly name: string;
    // This is an optional property
    outputName?: string;
}

interface Greetable extends Named {     // Interfaces can extend other interfaces
    greet(phrase: string): void;
};

let user1: Greetable;
user1 = { 
    name: 'Alex',
    greet(phrase: string) {
        console.log(phrase + ' ' + this.name);
    } 
};
user1.greet('Hello there, I am');

class Orc implements Greetable {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(phrase: string): void {
        console.log(this.name + ' - I am ' + this.age + " years old, " + phrase);
    }  
};

const orc1 = new Orc('Moktar', 121);
orc1.greet('I WILL EAT YOUR BONES!');
console.log(orc1);