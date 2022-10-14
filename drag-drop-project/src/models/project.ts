
export enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished'
}

// Project class
export class Project {
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