// First project will be a large 1 file monolith

namespace DragDropProject {

    // Project State Management
    // type MyType = () => {}
    type Listener<T> = (items: T[]) => void;

    class State<T> {
        protected listeners: Listener<T>[] = [];

        // This adds to the list of listener function references
        addListener(listenerFn: Listener<T>) {
            this.listeners.push(listenerFn);
        }
    }

    class ProjectState extends State<Project> {
        private projects: Project[] = [];
        private static instance: ProjectState;

        private constructor() {
            super();
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
            this.updateListeners();
        }

        moveProject(projectId: string, newStatus: ProjectStatus) {
            const project = this.projects.find(prj => prj.id === projectId);
            if (project) {
                project.status === newStatus;
                this.updateListeners();
            }
        }

        updateListeners() {
            for (const listenerFn of this.listeners) {
                // projects.slice() only returns a COPY of that array, and not the original
                listenerFn(this.projects.slice());
            }
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

    // Drag & Drop Interfaces
    interface Draggable {
        dragStartHandler(event: DragEvent): void;
        dragEndHandler(event: DragEvent): void;
    }

    interface DragTarget {
        dragOverHandler(event: DragEvent): void;      // A way to signify that the element being dropped is targeting a valid drop target
        dropHandler(event: DragEvent): void;          // React to the actual drop
        dragLeaveHandler(event: DragEvent): void;     // A way to revert any visual update if the user decides NOT to drop the dragged element, or simply cancels
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

    // Component Base class
    abstract class Component<T extends HTMLElement, U extends HTMLElement> {
        templateElement: HTMLTemplateElement;
        hostElement: T;     // The parent of the element we want to render
        element: U;         // the element that actually gets rendered

        constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
            this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
            this.hostElement = document.getElementById(hostElementId)! as T;

            const importNode = document.importNode(this.templateElement.content, true);
            this.element = importNode.firstElementChild as U;

            // The Id in this case should be dynamic because we want multiple ProjectLists
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }

        private attach(insertAtBeginning: boolean) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element);
        }

        abstract configure(): void;
        abstract renderContent(): void;
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

    // ProjectItem class (responsible for rendering a single project item)
    class ProjectItem extends Component <HTMLUListElement, HTMLLIElement> implements Draggable {
        private project: Project;

        get persons() {
            if (this.project.numOfPeople === 1) {
                return '1 person';
            }
            else {
                return `${this.project.numOfPeople} persons`;
            }
        }

        constructor(hostId: string, project: Project) {
            super('single-project', hostId, false, project.id);
            this.project = project;

            this.configure();
            this.renderContent();
        }

        @Autobind
        dragStartHandler(event: DragEvent): void {
            event.dataTransfer!.setData('text/plain', this.project.id);
            event.dataTransfer!.effectAllowed = 'move';
        }

        dragEndHandler(_: DragEvent): void {
            console.log('DragEnd');
        }

        configure() {
            this.element.addEventListener('dragstart', this.dragStartHandler);
            this.element.addEventListener('dragstart', this.dragEndHandler);
        } 
        
        renderContent() {
            this.element.querySelector('h2')!.textContent = this.project.title;
            this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
            this.element.querySelector('p')!.textContent = this.project.desc;
        }

    }

    // ProjectList class
    class ProjectList extends Component <HTMLDivElement, HTMLElement> implements DragTarget {
        assignedProjects: Project[];

        constructor(private type: ProjectStatus.ACTIVE | ProjectStatus.FINISHED) {
            super('project-list', 'app', false, `${type}-projects`);      // The Id in this case should be dynamic because we want multiple ProjectLists
            this.assignedProjects = [];

            this.configure();
            this.renderContent();
        }

        @Autobind
        dragOverHandler(event: DragEvent): void {
            if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
                event.preventDefault();     // default in JS is to NOT allow things to be dragged and dropped.
                const listElement = this.element.querySelector('ul')!;
                listElement.classList.add('droppable');
            }
            
        }

        @Autobind
        dropHandler(event: DragEvent): void {
            const projectId = event.dataTransfer!.getData('text/plain');
            projectState.moveProject(projectId, this.type === ProjectStatus.ACTIVE ? ProjectStatus.ACTIVE : ProjectStatus.FINISHED);
        }

        @Autobind
        dragLeaveHandler(_: DragEvent): void {
            const listElement = this.element.querySelector('ul')!;
            listElement.classList.remove('droppable');
        }

        configure() {
            this.element.addEventListener('dragover', this.dragOverHandler);
            this.element.addEventListener('dragleave', this.dragLeaveHandler);
            this.element.addEventListener('drop', this.dropHandler);

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
        }

        renderContent() {
            const listId = `${this.type.valueOf()}-project-list`;

            // Dynamically set the unordered list id as the listId
            this.element.querySelector('ul')!.id = listId;
            this.element.querySelector('h2')!.textContent = this.type.valueOf().toUpperCase() + ' PROJECTS';
        }

        private renderProjects() {
            // Get the listElement from the DOM
            const listElement = document.getElementById(`${this.type.valueOf()}-project-list`)! as HTMLUListElement;
            // Clear the listElement if anything is already there because we loop through all assignedProjects and populate the listElement textContent with it
            // Prevents duplicate projects from being rendered
            listElement.innerHTML = '';

            for (const projectItem of this.assignedProjects) {
                // const listItem = document.createElement('li');
                // listItem.textContent = projectItem.title;
                // listElement.appendChild(listItem);
                new ProjectItem(this.element.querySelector('ul')!.id, projectItem);
            }
        }

    }

    // ProjectInput class
    class ProjectInput extends Component <HTMLDivElement, HTMLFormElement> {
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

        private clearInputs() {
            this.titleInputElement.value = '';
            this.descInputElement.value = '';
            this.peopleInputElement.value = '';
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