// Way 1 - Creating data types that must inherit/interface with sub-types - Composition-like
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
};

type ElevatedEmployee = Admin & Employee;   // Similar to inheritance

const e1: ElevatedEmployee = {
    name: 'Alex',
    privileges: ['programmer'],
    startDate: new Date()
}

// Way 2 - Basically the same thing as Way 1, except we accomplish this through interfaces - Composition-like
interface Admin1 {
    name: string;
    privileges: string[];
};

interface Employee1 {
    name: string;
    startDate: Date;
};

interface ElevatedEmployee1 extends Employee, Admin {}

const e2: ElevatedEmployee1 = {
    name: 'Alex',
    privileges: ['programmer'],
    startDate: new Date()
}

type Combinable1 = string | number;
type Numberic = number | boolean;

// Intersection type
// Hover over Universion and see that it is just a 'number' type because of the intersection between the two union types it is composed of.
type Universal = Combinable1 & Numberic;

// Type guards
function add4(a: Combinable1, b: Combinable1) {
    // Type guard here when using union types
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
