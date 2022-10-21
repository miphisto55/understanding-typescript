import { ProjectInput } from './components/project-input';
import { ProjectList } from './components/project-list';
import { ProjectStatus } from './models/project';

// MAIN

// Initialize components to build the webpage
new ProjectInput();
new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);