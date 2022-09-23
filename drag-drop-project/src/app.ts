// First project will be a large 1 file monolith

namespace DragDropProject {

    class ProjectInput {
        templateElement: HTMLTemplateElement;
        hostElement: HTMLDivElement;
        formElement: HTMLFormElement;

        constructor() {
            this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
            this.hostElement = document.getElementById('app')! as HTMLDivElement;

            const importNode = document.importNode(this.templateElement.content, true);
            this.formElement = importNode.firstElementChild as HTMLFormElement;
            this.attach();
        }

        private attach() {
            this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
        }
    }

    const projectInput = new ProjectInput();
    console.log(projectInput);
}