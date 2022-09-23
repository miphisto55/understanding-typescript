"use strict";
//---------------------------------------------------------------------------------------------------------------------------------------
// Decorators
//
// Description: Decorators should be defined at the top of a file.
//              Decorators are usually useful for setting up other things, not event listeners
//              Best practice is name decorators with an uppercase starting character, like a class
//              Decorators execute when your classes/parameters/fields are DEFINED, not when they are initialized/instantiated.
//              Decorators can be used above a lot of places, including classes, interfaces, properties/fields, parameters etc...
//---------------------------------------------------------------------------------------------------------------------------------------
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
// Regular decorator
function Logger2(constructor) {
    console.log('Logging...');
    console.log(constructor);
}
// Decorator factory
function Logger(logString) {
    console.log('LOGGER FACTORY');
    return function (constructor) {
        console.log(logString);
        console.log(constructor);
    };
}
// Decorator factory #2
// This implementation allows us to basically REPLACE the class it decorates to return another class inside of it that extends
// the original class, but with modifications to it whenever it is instantiated.
function WithTemplate(template, hookId) {
    console.log('TEMPLATE FACTORY');
    // We use just an underscore '_' as the parameter name here to tell Typescript 'We know we need an argument, but we aren't going to use it'
    // <T extends { new(...args: any[]): {} }> explaination:
    // This function takes a generic object T, that extends the new() keyword functionality that accepts any amount of args '...args: any[]', and it returns an object with a name property
    return function (originalConstructor) {
        // returning a NEW class, but it returns the constructor function that extends the original class constructor passed in
        // Now we really CAN run this code AFTER we instantiate a new class
        return class extends originalConstructor {
            constructor(...args) {
                super();
                console.log('Rendering template...');
                const hookElement = document.getElementById(hookId);
                // if the hookElement exists/isn't null
                if (hookElement) {
                    hookElement.innerHTML = template; // Set the html in the DOM to our template string
                    hookElement.querySelector('h1').textContent = this.name; // Query select an h1 element, and set the text to person obj.name
                }
            }
        };
    };
}
//---------------------------------------------------------------------------------------------------------------------------------------
// Namespace: Decorators
//---------------------------------------------------------------------------------------------------------------------------------------
var Decorators;
(function (Decorators) {
    //-----------------------------------------------------------------------------------------------------------------------------------
    // Class: Person
    //-----------------------------------------------------------------------------------------------------------------------------------
    // The bottom-most decorator is executed first in there is 2 or more present above a class
    // This is only true in the case of the ACTUAL decorator function inside of factories
    // Otherwise, the decorators run top to bottom before they call their return decorator function inside of themselves
    let Person = class Person {
        constructor() {
            this.name = 'Alex';
            console.log('Creating person object...');
        }
    };
    Person = __decorate([
        Logger('LOGGING - PERSON'),
        WithTemplate('<h1>Person Template</h1>', 'app')
    ], Person);
    const pers = new Person();
    console.log(pers);
    // Decorators
    function Log(target, propertyName) {
        console.log('Property Decorator!');
        console.log(target, propertyName);
    }
    function Log2(target, name, descriptor) {
        console.log('Accesor Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('descriptor');
        console.log(descriptor);
    }
    function Log3(target, name, descriptor) {
        console.log('Method Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('descriptor');
        console.log(descriptor);
    }
    function Log4(target, name, position) {
        console.log('Parameter Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('position');
        console.log(position);
    }
    //-----------------------------------------------------------------------------------------------------------------------------------
    // Class: Product
    //-----------------------------------------------------------------------------------------------------------------------------------
    class Product {
        constructor(t, price) {
            this.title = t;
            this._price = price;
        }
        set price(value) {
            if (value > 0) {
                this._price = value;
            }
            else {
                throw new Error('Invalid price - value cannot be negative');
            }
        }
        getPriceWithTax(taxRate) {
            return this._price * (1 + taxRate);
        }
    }
    __decorate([
        Log
    ], Product.prototype, "title", void 0);
    __decorate([
        Log2
    ], Product.prototype, "price", null);
    __decorate([
        Log3,
        __param(0, Log4)
    ], Product.prototype, "getPriceWithTax", null);
    const product1 = new Product('Book', 19);
    const product2 = new Product('Book2', 8);
    // Decorator
    function Autobind(_1, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor = {
            configurable: true,
            enumerable: false,
            // The 'this' keyword belongs to whatever is responsible for calling the get() method, which in this case is itself since we store the originalMethod.
            get() {
                const boundFunction = originalMethod.bind(this);
                return boundFunction;
            }
        };
        // Now return the old's methods Prop Descriptor with the adjusted method's Prop Descriptor (the property descriptor allows us to configure how methods behave)
        return adjustedDescriptor;
    }
    class Printer {
        constructor() {
            this.message = 'This works!';
        }
        showMessage() {
            console.log(this.message);
        }
    }
    __decorate([
        Autobind
    ], Printer.prototype, "showMessage", null);
    const printer = new Printer();
    const button = document.querySelector('button');
    // printer.showMessage in this case without any modifcation will just return undefined because the 'this' keyword in the showMessage() function actually gets bound to the target
    // of the eventListener, and not the actual Printer object in which the 'this' keyword was originally refering to.
    // Add .bind(printer) to bind the 'this' keyword to specifically the printer object.
    // button.addEventListener('click', printer.showMessage.bind(printer));
    button.addEventListener('click', printer.showMessage); // This works below because of the decorator PropertyDescriptor adjustment
    const registeredValidators = {};
    // @Decorator
    function Required(target, propName) {
        registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['required'] }); // This stores the Course's Constructor's Name (a.k.a Course) as a key in the requiredValidators inteface object.
    }
    // @Decorator
    function PositiveNumber(target, propName) {
        registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: ['positive'] });
    }
    function validate(obj) {
        const objValidatorConfig = registeredValidators[obj.constructor.name];
        if (!objValidatorConfig) {
            return true;
        }
        let isValid = true;
        for (const prop in objValidatorConfig) {
            for (const validator of objValidatorConfig[prop]) {
                switch (validator) {
                    case 'required':
                        isValid = isValid && !!obj[prop]; // obj[prop] will return a "truthy" or "falsey" value, use double !! to convert it to a real boolean
                    case 'positive':
                        isValid = isValid && obj[prop] > 0;
                }
            }
        }
        return isValid;
    }
    class Course {
        constructor(title, price) {
            this.title = title;
            this.price = price;
        }
    }
    __decorate([
        Required
    ], Course.prototype, "title", void 0);
    __decorate([
        PositiveNumber
    ], Course.prototype, "price", void 0);
    const courseForm = document.querySelector('form');
    courseForm.addEventListener('submit', event => {
        event.preventDefault();
        const titleElement = document.getElementById('title');
        const priceElement = document.getElementById('price');
        const title = titleElement.value;
        const price = +priceElement.value; // Again, the '+' infront of the variable name casts it to a number
        const createdCourse = new Course(title, price);
        if (validate(createdCourse)) {
            console.log(createdCourse);
            return;
        }
        alert("Invalid Input.");
        return;
    });
})(Decorators || (Decorators = {}));
//# sourceMappingURL=app.js.map