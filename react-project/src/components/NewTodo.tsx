import React, { useRef } from 'react';

interface NewTodoProps {
    onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = props => {
    const textInputRef = useRef<HTMLInputElement>(null);

    const todoSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault(); // prevents the req from being handled by the server, WE want to handle the event.
        const enteredText = textInputRef.current!.value;
        props.onAddTodo(enteredText);
    };

    return (
    <form onSubmit={todoSubmitHandler}>
        <div>
            <label htmlFor="todo-text">Todo Text</label>
            <input type="text" id="todo-text" ref={textInputRef}/>
        </div>
        <button type="submit">ADD TODO</button>
    </form>
    );
};

export default NewTodo;