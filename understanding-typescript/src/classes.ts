abstract class Department {
    // private name: string = 'Default';
    // private readonly id: number = 0;
    static fiscalYear = 2022;
    protected employees: string[] = [];

    constructor(protected readonly id: number, protected name: string) {    // you can also initialize class object's field members in the constructor param list.
        this.id = id;
        this.name = name;
    }

    abstract describe(this: Department): void;

    addEmployees(employee: string | string[]) {
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

    setName(newName: string) {
        this.name = newName;
    }
    
};

// Also can use getters and setters
class ITDepartment extends Department {
    private tickets: string[];
    private OnVacation: boolean;

    constructor(id: number, public admins: string[]) {
        super(id, 'ITDepartment');
        this.admins = admins;
        this.tickets = [];
        this.OnVacation = false;
    };

    describe() {
        console.log('Deparment: ' + this.name);
        console.log('Id: ' + this.id);
    }

    // Getter
    get isOnVacation() {
        return this.OnVacation;
    }

    // Setter
    set isOnVacation(value: boolean) {
        this.OnVacation = value;
    }

    createTicket(ticket: string) {
        console.log('Creating new ticket');
        this.tickets.push(ticket);
    }

    printTickets(this: ITDepartment) {
        console.log('All outstanding tickets:');
        console.log(this.tickets);
    }

};

class AccountingDepartment extends Department {
    private reports: string[];

    constructor(id: number, public admins: string[]) {
        super(id, 'Accounting Department');
        this.admins = admins;
        this.reports = [];
    };

    describe() {
        console.log('Deparment: ' + this.name);
        console.log('Id: ' + this.id);
    }

    createReport(report: string) {
        console.log('Creating new report');
        this.reports.push(report);
    }

    printReports(this: AccountingDepartment) {
        console.log('All reports:');
        console.log(this.reports);
    }
};

// Static methods on classes
class MyUtilities {

    static pow(a: number, b: number): number {
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
const newEmployees: string[] = ['Alex', 'Karah', 'John'];
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
const newEmployees2: string[] = ['Chris', 'Taylor', 'John', 'Sarah'];
accountingDepartment.addEmployees(newEmployees2);
accountingDepartment.addEmployees('Jeff');

accountingDepartment.describe();
accountingDepartment.printEmployeeInfo();

accountingDepartment.createReport('John from IT has fixed his computer: total cost = $420.69');
accountingDepartment.printReports();

const power = MyUtilities.pow(2, 4);
console.log('2 ^ 4: ' + power.toString);

class MySingleton {
    private static instance: MySingleton;

    private constructor() {

    }

    static getInstance() {
        if (MySingleton.instance) {
            return this.instance;
        }
        return this.instance = new MySingleton()   
    }
}
