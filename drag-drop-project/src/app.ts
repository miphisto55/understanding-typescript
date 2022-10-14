import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';
import { ProjectStatus } from './models/project.js';

// MAIN

// Initialize components to build the webpage
new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);