namespace TypeGuards {

    function clog(...printData: any) {
        console.log(printData);
    }

    // Way 1 - Creating data types that must inherit/interface with sub-types - Composition-like
    // Can export types, classes, functions etc. out of namespaces using export
    export type Admin = {
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

    // Function overload
    function add(a: string, b: string): string;
    function add(a: string, b: number): number;
    function add(a: number, b: string): number;
    function add(a: number, b: number): number;

    // Type guards
    // This one implementation of add() takes care of all overloads
    function add(a: Combinable1, b: Combinable1) {
        // Type guard here when using union types
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }

    const result = add('Alex', 'Karah'); // now we can call .split() on result because we overloaded the function and it knows if 2 strings go in, a string comes out
    const result2 = add('Bob', 'Dylan') as string;  // can also do this
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
    clog(fetchedUserData?.job?.title);

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

    // Discriminating Union Types
    interface Bird {
        type: 'bird';
        flyingSpeed: number;
    }

    interface Horse {
        type: 'horse';
        runningSpeed: number;
    }

    type Animal = Bird | Horse;

    function moveAnimal(animal: Animal) {
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

    const bird1: Bird = {
        type: 'bird',
        flyingSpeed: 4
    }

    const horse1: Horse = {
        type: 'horse',
        runningSpeed: 8
    }

    moveAnimal(bird1);
    moveAnimal(horse1);

    // const paragraph = document.getElementById('message-output');

    // Type casting
    // const userInput = <HTMLInputElement>document.getElementById('user-input')!;

    // Use this syntax if WE KNOW the element won't be null
    const userInput = document.getElementById('user-input')! as HTMLInputElement;   // Type casting way #2, which is cleaner imo and also wont conflict with react
    userInput.value = "Hi there!";

    // Use this syntax is we aren't sure if the element is null, but know what HTML Element type it should be
    const userInput2 = document.getElementById('user-input');
    if (userInput2) {
        (userInput2 as HTMLInputElement).value = "Type Guard Me";
    }

    interface ErrorContainer {  // can do { email: 'Not a valid email', username: 'Must start with a character' }, not as flexible though
        // We don't necessarily know what the prop/property/key field name will be, but any field that can throw an error will be a string type, 
        // and it's value must be a string type
        // We also don't know how many different keys/props we might check with this container, and this covers all string fields.
        id: string; // This means that all things that interface with this must have an id
        // id: numberl // this wont work cause we can only have strings in this guy
        [key: string]: string;
    }

    const errorBag: ErrorContainer = {
        id: 'email-input-field',
        username: 'Must start with a capital character!'
    };

}

// Namespace exports being used
const admin2: TypeGuards.Admin = {
    name: 'nub',
    privileges: ['ok']
}

console.log(admin2);