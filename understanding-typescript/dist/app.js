"use strict";
var TypeGuards;
(function (TypeGuards) {
    var _a;
    function clog(...printData) {
        console.log(printData);
    }
    const ee1 = {
        name: 'Alex',
        privileges: ['programmer'],
        startDate: new Date()
    };
    ;
    ;
    const ee2 = {
        name: 'Alex',
        privileges: ['programmer'],
        startDate: new Date()
    };
    // Type guards
    // This one implementation of add() takes care of all overloads
    function add(a, b) {
        // Type guard here when using union types
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }
    const result = add('Alex', 'Karah'); // now we can call .split() on result because we overloaded the function and it knows if 2 strings go in, a string comes out
    const result2 = add('Bob', 'Dylan'); // can also do this
    result.split(' ');
    result2.split(' ');
    // Lets pretend we're fetching user data from some backend or database
    // What if the job field was empty?
    const fetchedUserData = {
        id: 'user1',
        name: 'Alex',
        job: { title: 'CEO', description: 'My own company' }
    };
    // Well we can check first if job is null before trying to access job.title
    clog(fetchedUserData.job && fetchedUserData.job.title);
    // Or use optional chaining operator
    clog((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
    function printEmployeeInformation(emp) {
        console.log("Type of employee: " + emp);
        console.log("Name: " + emp.name);
        // We can't use typeof here since its not a basic javascript type,
        // but we can use the property name + in to check if it's there
        if ('privileges' in emp) {
            console.log("Privileges: " + emp.privileges);
        }
        if ('startDate' in emp) {
            console.log("Start Date: " + emp.startDate);
        }
    }
    printEmployeeInformation(ee1);
    // And with the more basic types
    const a1 = {
        name: 'Karah',
        privileges: ['Lots of money', 'cutie pie']
    };
    const e1 = {
        name: 'Bob',
        startDate: new Date()
    };
    printEmployeeInformation(a1);
    printEmployeeInformation(e1);
    class Car {
        drive() {
            console.log("Driving...");
        }
    }
    class Truck {
        drive() {
            console.log("Driving a truck...");
        }
        loadCargo() {
            console.log("Loading cargo...");
        }
    }
    const v1 = new Car();
    const v2 = new Truck();
    function useVehicle(vehicle) {
        vehicle.drive();
        // Again can use the 'in' keyword to check for properties, or use instanceof
        // instanceof will NOT WORK on interfaces since interfaces compile to... well nothing on the javascript side.
        if (vehicle instanceof Truck) {
            vehicle.loadCargo();
        }
    }
    useVehicle(v1);
    useVehicle(v2);
    function moveAnimal(animal) {
        let speed;
        switch (animal.type) {
            case 'bird':
                speed = animal.flyingSpeed;
                break;
            case 'horse':
                speed = animal.runningSpeed;
                break;
        }
        console.log("Moving with incredible speed at: " + speed + " m/s");
    }
    const bird1 = {
        type: 'bird',
        flyingSpeed: 4
    };
    const horse1 = {
        type: 'horse',
        runningSpeed: 8
    };
    moveAnimal(bird1);
    moveAnimal(horse1);
    // const paragraph = document.getElementById('message-output');
    // Type casting
    // const userInput = <HTMLInputElement>document.getElementById('user-input')!;
    // Use this syntax if WE KNOW the element won't be null
    const userInput = document.getElementById('user-input'); // Type casting way #2, which is cleaner imo and also wont conflict with react
    userInput.value = "Hi there!";
    // Use this syntax is we aren't sure if the element is null, but know what HTML Element type it should be
    const userInput2 = document.getElementById('user-input');
    if (userInput2) {
        userInput2.value = "Type Guard Me";
    }
    const errorBag = {
        id: 'email-input-field',
        username: 'Must start with a capital character!'
    };
})(TypeGuards || (TypeGuards = {}));
// Namespace exports being used
const admin2 = {
    name: 'nub',
    privileges: ['ok']
};
console.log(admin2);
//# sourceMappingURL=app.js.map