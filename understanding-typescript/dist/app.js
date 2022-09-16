"use strict";
var TypeGuards;
(function (TypeGuards) {
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
    function add(a, b) {
        // Type guard here when using union types
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }
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
})(TypeGuards || (TypeGuards = {}));
//# sourceMappingURL=app.js.map