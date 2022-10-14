import { Component } from './base-component.js';
import * as Validation from '../util/validation.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/state-manager.js';

// ProjectInput class
export class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
    // HTML Elements to store user input
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        // Grab user Input from the forms in index.html
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;  // Lead with # to select an id property on an HTML element
        this.descInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
    }

    // Add event listener to the FormElement so we know when a user submits data.
    configure() {
        // Must bind 'this' class to the event listenener so that the target of the listener isn't inheriting 'this'
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent(): void {
        
    }

    private gatherUserInput(): [string, string, number] | void {
        const title = this.titleInputElement.value;
        const desc = this.descInputElement.value;
        const people = this.peopleInputElement.valueAsNumber;

        const titleValidatable: Validation.Validatable = {
            value: title,
            required: true,
            minLength: 1
        }

        const descValidatable: Validation.Validatable = {
            value: desc,
            required: true,
            minLength: 1
        }

        const peopleValidatable: Validation.Validatable = {
            value: +people,
            required: true,
            min: 1,
            max: 5
        }

        if (
            !Validation.validate(titleValidatable) ||
            !Validation.validate(descValidatable) ||
            !Validation.validate(peopleValidatable)
        ) {
            alert('Invalid input: Title, Description, and number of People are all required.');
            return;
        }
        
        return [title, desc, people];
    }

    // Handle the submited data and do some validation and manipulation
    // the 'this' keyword is naturally bound to the current TARGET of the event unless re-bound in the addEventListener in configure()
    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();     // prevents the default behaviour of triggering an HTTP req
        const userInput = this.gatherUserInput();

        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;    // Use destructuring to get 3 variables of title, desc, and people from userInput
            console.log(title, desc, people.toString());
            projectState.addProject(title, desc, people);

            this.clearInputs();
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}