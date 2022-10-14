import { Project, ProjectStatus } from '../models/project.js';

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

export class ProjectState extends State<Project> {
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
        if (project && project.status !== newStatus) {
            project.status = newStatus;
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
export const projectState = ProjectState.getInstance();