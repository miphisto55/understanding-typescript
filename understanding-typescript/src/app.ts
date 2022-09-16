namespace TypeGuards {
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

    const ee1: ElevatedEmployee = {
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

    const ee2: ElevatedEmployee1 = {
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
    function add(a: Combinable1, b: Combinable1) {
        // Type guard here when using union types
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }

    type UnkownEmployee = Employee | Admin;

    function printEmployeeInformation(emp: UnkownEmployee): void {
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
    const a1: Admin = {
        name: 'Karah',
        privileges: ['Lots of money', 'cutie pie']
    }

    const e1: Employee = {
        name: 'Bob',
        startDate: new Date()
    }

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

    type Vehicle = Car | Truck;

    const v1 = new Car();
    const v2 = new Truck();

    function useVehicle(vehicle: Vehicle) {
        vehicle.drive();
        // Again can use the 'in' keyword to check for properties, or use instanceof
        // instanceof will NOT WORK on interfaces since interfaces compile to... well nothing on the javascript side.
        if (vehicle instanceof Truck) {
            vehicle.loadCargo();
        }
    }

    useVehicle(v1);
    useVehicle(v2);

}
