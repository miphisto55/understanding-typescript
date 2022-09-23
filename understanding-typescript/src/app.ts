// best practice is name decorators with an uppercase starting character, like a class
// Decorators execute when your classes are DEFINED, not when they are initialized/instantiated.
// Regular decorator
function Logger2(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

// Decorator factory
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

// Decorator factory #2
function WithTemplate(template: string, hookId: string) {
    // We use just an underscore '_' as the parameter name here to tell Typescript 'We know we need an argument, but we aren't going to use it'
    return function(constructor: any) {
        const hookElement = document.getElementById(hookId);
        const person = new constructor();
        // if the hookElement exists/isn't null
        if (hookElement) {
            hookElement.innerHTML = template;                               // Set the html in the DOM to our template string
            hookElement.querySelector('h1')!.textContent = person.name;     // Query select an h1 element, and set the text to person obj.name
        }
    };
}

namespace Temporary {

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

}