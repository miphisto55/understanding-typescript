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
        // Again can use the in keyword to check for properties... or
        // use instanceof
        if (vehicle instanceof Truck) {
            vehicle.loadCargo();
        }
    }
    useVehicle(v1);
    useVehicle(v2);
})(TypeGuards || (TypeGuards = {}));
//# sourceMappingURL=app.js.map