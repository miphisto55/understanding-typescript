// First project will be a large 1 file monolith

namespace DragDropProject {

    // Project State Management
    // type MyType = () => {}
    type Listener = (items: Project[]) => void;

    class ProjectState {
        private listeners: Listener[] = [];
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
        }

        // Singleton pattern for the ProjectState
        static getInstance(): ProjectState {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }

        addProject(title: string, desc: string, numOfPeople: number) {
            const newProject = new Project(title, desc, numOfPeople, ProjectStatus.ACTIVE);
            this.projects.push(newProject);

            for (const listenerFn of this.listeners) {
                // projects.slice() only returns a COPY of that array, and not the original
                listenerFn(this.projects.slice());
            }
        }

        // This adds to the list of listener function references
        addListener(listenerFn: Listener) {
            this.listeners.push(listenerFn);
        }
    }

    // Global Project State object is available everywhere in the application
    const projectState = ProjectState.getInstance();

    // Validation
    interface Validatable {
        value: string | number;
        required?: boolean;
        minLength?: number;
        maxLength?: number;
        min?: number;
        max?: number;
    }

    // Utility function
    function validate(input: Validatable) {
        let isValid = true;

        if (input.required) {
            isValid = isValid && (input.value.toString().trim().length !== 0);
        }
        if ((input.minLength != null) && (typeof input.value === 'string')) {
            isValid = isValid && (input.value.trim().length >= input.minLength);
        }
        if (input.maxLength && typeof input.value === 'string') {
            isValid = isValid && (input.value.trim().length <= input.maxLength);
        }
        if (input.min && typeof input.value === 'number') {
            isValid = isValid && (input.value > input.min);
        }
        if (input.max && typeof input.value === 'number') {
            isValid = isValid && (input.value <= input.max);
        }
        return isValid;
    } 

    // Autobind decorator
    function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        const adjustedDescriptor: PropertyDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            }
        };
        return adjustedDescriptor;
    }

    enum ProjectStatus {
        ACTIVE = 'active',
        FINISHED = 'finished'
    }

    // Project class
    class Project {
        id: string;
        title: string;
        desc: string;
        numOfPeople: number;
        status: ProjectStatus;

        constructor(title: string, desc: string, numOfPeople: number, status: ProjectStatus) {
            this.id = Math.random().toString();
            this.title = title;
            this.desc = desc;
            this.numOfPeople = numOfPeople;
            this.status = status;
        }
    }

    // ProjectList class
    class ProjectList {
        templateElement: HTMLTemplateElement;
        hostElement: HTMLDivElement;
        sectionElement: HTMLElement;
        assignedProjects: Project[];

        constructor(private type: ProjectStatus.ACTIVE | ProjectStatus.FINISHED) {
            this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
            this.hostElement = document.getElementById('app')! as HTMLDivElement;
            this.assignedProjects = [];

            const importNode = document.importNode(this.templateElement.content, true);
            this.sectionElement = importNode.firstElementChild as HTMLElement;

            // The Id in this case should be dynamic because we want multiple ProjectLists
            this.sectionElement.id = `${this.type.valueOf()}-projects`;

            // Subscribe to the Project State class's list of listeners
            projectState.addListener((projects: Project[]) => {
                // array.filter() returns only items that are true in the function body
                const relevantProjects = projects.filter(project => {
                    if (this.type === ProjectStatus.ACTIVE) {
                        return project.status === ProjectStatus.ACTIVE;
                    }
                    else {
                        return project.status === ProjectStatus.FINISHED;
                    }
                    
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });

            this.attach();
            this.renderContent();
        }

        private renderProjects() {
            // Get the listElement from the DOM
            const listElement = document.getElementById(`${this.type.valueOf()}-project-list`)! as HTMLUListElement;
            // Clear the listElement if anything is already there because we loop through all assignedProjects and populate the listElement textContent with it
            // Prevents duplicate projects from being rendered
            listElement.innerHTML = '';

            for (const projectItem of this.assignedProjects) {
                const listItem = document.createElement('li');
                listItem.textContent = projectItem.title;
                listElement.appendChild(listItem);
            }
        }

        private renderContent() {
            const listId = `${this.type.valueOf()}-project-list`;

            // Dynamically set the unordered list id as the listId
            this.sectionElement.querySelector('ul')!.id = listId;
            this.sectionElement.querySelector('h2')!.textContent = this.type.valueOf().toUpperCase() + ' PROJECTS';
        }

        private attach() {
            this.hostElement.insertAdjacentElement('beforeend', this.sectionElement);
        }
    }

    // ProjectInput class
    class ProjectInput {
        // Form Related HTML Elements in index.html
        templateElement: HTMLTemplateElement;
        hostElement: HTMLDivElement;
        formElement: HTMLFormElement;

        // HTML Elements to store user input
        titleInputElement: HTMLInputElement;
        descInputElement: HTMLInputElement;
        peopleInputElement: HTMLInputElement;

        constructor() {
            // Get the HTML Form elements
            this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            this.hostElement = document.getElementById('app')! as HTMLDivElement;

            const importNode = document.importNode(this.templateElement.content, true);
            this.formElement = importNode.firstElementChild as HTMLFormElement;
            this.formElement.id = 'user-input';

            // Grab user Input from the forms in index.html
            this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;  // Lead with # to select an id property on an HTML element
            this.descInputElement = this.formElement.querySelector('#description') as HTMLInputElement;
            this.peopleInputElement = this.formElement.querySelector('#people') as HTMLInputElement;

            this.configure();
            this.attach();
        }

        private gatherUserInput(): [string, string, number] | void {
            const title = this.titleInputElement.value;
            const desc = this.descInputElement.value;
            const people = this.peopleInputElement.valueAsNumber;

            const titleValidatable: Validatable = {
                value: title,
                required: true,
                minLength: 1
            }

            const descValidatable: Validatable = {
                value: desc,
                required: true,
                minLength: 1
            }

            const peopleValidatable: Validatable = {
                value: +people,
                required: true,
                min: 1,
                max: 5
            }

            if (
                !validate(titleValidatable) ||
                !validate(descValidatable) ||
                !validate(peopleValidatable)
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

        // Add event listener to the FormElement so we know when a user submits data.
        private configure() {
            // Must bind 'this' class to the event listenener so that the target of the listener isn't inheriting 'this'
            this.formElement.addEventListener('submit', this.submitHandler);
        }

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descInputElement.value = '';
            this.peopleInputElement.value = '';
        }

        // Insertion of manipulated data
        private attach() {
            this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
        }
    }

    // -----------------------------------------------------------------------------------------------------------------
    // MAIN
    // -----------------------------------------------------------------------------------------------------------------

    // Construct a new ProjectInput object that runs the constructor code.
    const projectInput = new ProjectInput();
    console.log(projectInput);

    const projectList1 = new ProjectList(ProjectStatus.ACTIVE);
    const projectList2 = new ProjectList(ProjectStatus.FINISHED);

    console.log(projectList1);
    console.log(projectList2);
}