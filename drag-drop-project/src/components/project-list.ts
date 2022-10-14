import { Component } from './base-component.js';
import { ProjectItem } from './project-item.js';
import { DragTarget } from '../models/drag-drop.js';
import { Project, ProjectStatus } from '../models/project.js';
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../state/state-manager.js';

// ProjectList class
export class ProjectList extends Component <HTMLDivElement, HTMLElement> implements DragTarget {
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