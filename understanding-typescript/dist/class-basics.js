"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        // private name: string = 'Default';
        // private readonly id: number = 0;
        this.employees = [];
        this.id = id;
        this.name = name;
    }
    describe() {
        console.log('Deparment: ' + this.name);
        console.log('Id: ' + this.id);
    }
    addEmployees(employee) {
        if (typeof employee == 'string') {
            this.employees.push(employee);
        }
        else {
            this.employees.push(...employee);
        }
    }
    printEmployeeInfo() {
        console.log('Employee List:');
        console.log(this.employees.length);
        console.log(this.employees);
    }
    setName(newName) {
        this.name = newName;
    }
}
;
const accounting = new Department(0, 'Accounting');
console.log(accounting);
accounting.describe();
const accountCopy = new Department(1, 'Product');
const newEmployees = ['Alex', 'Karah', 'John'];
accountCopy.addEmployees(newEmployees);
accountCopy.addEmployees('Sarah');
accountCopy.describe();
accountCopy.printEmployeeInfo();
//# sourceMappingURL=class-basics.js.map