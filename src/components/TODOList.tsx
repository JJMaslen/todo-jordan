import { title } from "process";
import React from "react";

interface ItemProps {
    item: { id: string; title: string; is_completed: boolean };
    setTodos: React.Dispatch<React.SetStateAction<{ id: string; title: string; is_completed: boolean }[]>>;
}

function Item({ item, setTodos }: ItemProps) {
    const [editing, setEditing] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const completeTodo = () => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, is_completed: !todo.is_completed } : todo
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    const handleEdit = () => {
        setEditing(true);
    };

    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
            );
        }
    }, [editing]);

    const handleInputSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: inputRef.current?.value || todo.title } : todo
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
        setEditing(false);
    };

    const handleInputBlur = () => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: inputRef.current?.value || todo.title } : todo
            );
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
        setEditing(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === item.id ? { ...todo, title: e.target.value } : todo
            )
        );
    };

    const handleDelete = () => {
        setTodos((prevTodos) => {
            const updatedTodos = prevTodos.filter((todo) => todo.id !== item.id);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        });
    };

    return (
        <li id={item?.id} className="todo_item">
            {editing ? (
                <form className="edit-form" onSubmit={handleInputSubmit}>
                    <label htmlFor="edit-todo">
                        <input
                            ref={inputRef}
                            type="text"
                            name="edit-todo"
                            id="edit-todo"
                            defaultValue={item?.title}
                            onBlur={handleInputBlur}
                            onChange={handleInputChange}
                        />
                    </label>
                </form>
            ) : (
                <>
                    <button className="todo_items_left" onClick={completeTodo}>
                        <svg
                            fill={item.is_completed ? "#22C55E" : "#0d0d0d"}
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                        >
                            <circle cx="12" cy="12" r="10" />
                        </svg>
                        <p style={item.is_completed ? { textDecoration: "line-through" } : {}}>
                            {item?.title}
                        </p>
                    </button>
                    <div className="todo_items_right">
                        <button onClick={handleEdit}>
                            <span>Edit</span>
                            <svg>
                                <path d="" />
                            </svg>
                        </button>
                        <button onClick={handleDelete}>
                            <span>Delete</span>
                            <svg>
                                <path d="" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

interface TODOListProps {
    todos: { id: string; title: string; is_completed: boolean }[];
    setTodos: React.Dispatch<React.SetStateAction<{ id: string; title: string; is_completed: boolean }[]>>;
}

function TODOList({ todos, setTodos }: TODOListProps) {
    return (
        <ol className="todo_list">
            {todos && todos.length > 0 ? (
                todos.map((item, index) => (
                    <Item key={index} item={item} setTodos={setTodos} />
                ))
            ) : (
                <p>No tasks yet!</p>
            )}
        </ol>
    );
}

export default TODOList;