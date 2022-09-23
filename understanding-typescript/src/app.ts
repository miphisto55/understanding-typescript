//---------------------------------------------------------------------------------------------------------------------------------------
// Decorators
//---------------------------------------------------------------------------------------------------------------------------------------

// Decorators should be defined at the top of a file.
// Best practice is name decorators with an uppercase starting character, like a class
// Decorators execute when your classes are DEFINED, not when they are initialized/instantiated.
// Decorators can be used above a lot of places, including classes, interfaces, properties/fields, parameters etc...
// Regular decorator
function Logger2(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

// Decorator factory
function Logger(logString: string) {
    console.log('LOGGER FACTORY');
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// Decorator factory #2
function WithTemplate(template: string, hookId: string) {
    // We use just an underscore '_' as the parameter name here to tell Typescript 'We know we need an argument, but we aren't going to use it'
    return function(constructor: any) {
        console.log('TEMPLATE FACTORY');
        const hookElement = document.getElementById(hookId);
        const person = new constructor();
        // if the hookElement exists/isn't null
        if (hookElement) {
            console.log('Rendering template...')
            hookElement.innerHTML = template;                               // Set the html in the DOM to our template string
            hookElement.querySelector('h1')!.textContent = person.name;     // Query select an h1 element, and set the text to person obj.name
        }
    };
}

//---------------------------------------------------------------------------------------------------------------------------------------
// Namespace: Decorators
//---------------------------------------------------------------------------------------------------------------------------------------
namespace Decorators {

    //-----------------------------------------------------------------------------------------------------------------------------------
    // Class: Person
    //-----------------------------------------------------------------------------------------------------------------------------------
    
    // The bottom-most decorator is executed first in there is 2 or more present above a class
    // This is only true in the case of the ACTUAL decorator function inside of factories
    // Otherwise, the decorators run top to bottom before they call their return decorator function inside of themselves
    @Logger('LOGGING - PERSON')
    @WithTemplate('<h1>Person Template</h1>', 'app')
    class Person {
        name = 'Alex';

        constructor() {
            console.log('Creating person object...');
        }
    }

    const pers = new Person();
    console.log(pers);

    //-----------------------------------------------------------------------------------------------------------------------------------
    // Class: Product
    //-----------------------------------------------------------------------------------------------------------------------------------

    // Decorator
    function Log(target: any, propertyName: string | Symbol) {
        console.log('Property Decorator!');
        console.log(target, propertyName);
    }

    function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
        console.log('Accesor Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('descriptor');
        console.log(descriptor);
    }

    function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
        console.log('Method Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('descriptor');
        console.log(descriptor);
    }

    function Log4(target: any, name: string | Symbol, position: number) {
        console.log('Parameter Decorator!');
        console.log('target');
        console.log(target);
        console.log('name');
        console.log(name);
        console.log('position');
        console.log(position);
    }

    class Product {
        @Log
        title: string;
        private _price: number;

        @Log2
        set price(value: number) {
            if (value > 0) {
                this._price = value;
            }
            else {
                throw new Error('Invalid price - value cannot be negative');
            }
        }

        constructor(t: string, price: number) {
            this.title = t;
            this._price = price;
        }

        @Log3
        getPriceWithTax(@Log4 taxRate: number) {
            return this._price * (1 + taxRate);
        }
    }

}