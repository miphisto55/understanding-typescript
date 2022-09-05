"use strict";
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
        this.id = id;
        this.name = name;
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
// private name: string = 'Default';
// private readonly id: number = 0;
Department.fiscalYear = 2022;
;
// Also can use getters and setters
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, 'ITDepartment');
        this.admins = admins;
        this.admins = admins;
        this.tickets = [];
        this.OnVacation = false;
    }
    ;
    describe() {
        console.log('Deparment: ' + this.name);
        console.log('Id: ' + this.id);
    }
    // Getter
    get isOnVacation() {
        return this.OnVacation;
    }
    // Setter
    set isOnVacation(value) {
        this.OnVacation = value;
    }
    createTicket(ticket) {
        console.log('Creating new ticket');
        this.tickets.push(ticket);
    }
    printTickets() {
        console.log('All outstanding tickets:');
        console.log(this.tickets);
    }
}
;
class AccountingDepartment extends Department {
    constructor(id, admins) {
        super(id, 'Accounting Department');
        this.admins = admins;
        this.admins = admins;
        this.reports = [];
    }
    ;
    describe() {
        console.log('Deparment: ' + this.name);
        console.log('Id: ' + this.id);
    }
    createReport(report) {
        console.log('Creating new report');
        this.reports.push(report);
    }
    printReports() {
        console.log('All reports:');
        console.log(this.reports);
    }
}
;
// Static methods on classes
class MyUtilities {
    static pow(a, b) {
        let result = 0;
        for (let i = 0; i < b; ++b) {
            result += a * a;
        }
        return result;
    }
}
// IT Department
const itDepartment = new ITDepartment(0, ['Alex', 'Karah']);
console.log(itDepartment);
const newEmployees = ['Alex', 'Karah', 'John'];
itDepartment.addEmployees(newEmployees);
itDepartment.addEmployees('Sarah');
itDepartment.describe();
itDepartment.printEmployeeInfo();
itDepartment.createTicket('John\'s computer won\'t start');
itDepartment.printTickets();
console.log(itDepartment.isOnVacation);
itDepartment.isOnVacation = true;
console.log(itDepartment.isOnVacation);
// Accounting Department
const accountingDepartment = new AccountingDepartment(1, ['John', 'Sarah']);
console.log(accountingDepartment);
const newEmployees2 = ['Chris', 'Taylor', 'John', 'Sarah'];
accountingDepartment.addEmployees(newEmployees2);
accountingDepartment.addEmployees('Jeff');
accountingDepartment.describe();
accountingDepartment.printEmployeeInfo();
accountingDepartment.createReport('John from IT has fixed his computer: total cost = $420.69');
accountingDepartment.printReports();
const power = MyUtilities.pow(2, 4);
console.log('2 ^ 4: ' + power.toString);
class MySingleton {
    constructor() {
    }
    static getInstance() {
        if (MySingleton.instance) {
            return this.instance;
        }
        return this.instance = new MySingleton();
    }
}
//# sourceMappingURL=classes.js.map