
// Drag & Drop Interfaces
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

export interface DragTarget {
    dragOverHandler(event: DragEvent): void;      // A way to signify that the element being dropped is targeting a valid drop target
    dropHandler(event: DragEvent): void;          // React to the actual drop
    dragLeaveHandler(event: DragEvent): void;     // A way to revert any visual update if the user decides NOT to drop the dragged element, or simply cancels
}