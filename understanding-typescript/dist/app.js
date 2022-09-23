"use strict";
//---------------------------------------------------------------------------------------------------------------------------------------
// Decorators
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
// Decorators should be defined at the top of a file.
// Best practice is name decorators with an uppercase starting character, like a class
// Decorators execute when your classes are DEFINED, not when they are initialized/instantiated.
// Decorators can be used above a lot of places, including classes, interfaces, properties/fields etc...
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
function WithTemplate(template, hookId) {
    // We use just an underscore '_' as the parameter name here to tell Typescript 'We know we need an argument, but we aren't going to use it'
    return function (constructor) {
        console.log('TEMPLATE FACTORY');
        const hookElement = document.getElementById(hookId);
        const person = new constructor();
        // if the hookElement exists/isn't null
        if (hookElement) {
            console.log('Rendering template...');
            hookElement.innerHTML = template; // Set the html in the DOM to our template string
            hookElement.querySelector('h1').textContent = person.name; // Query select an h1 element, and set the text to person obj.name
        }
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
    //-----------------------------------------------------------------------------------------------------------------------------------
    // Class: Product
    //-----------------------------------------------------------------------------------------------------------------------------------
    // Decorator
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
})(Decorators || (Decorators = {}));
//# sourceMappingURL=app.js.map