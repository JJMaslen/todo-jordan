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
        setTodos((prevTodos: any) =>
            prevTodos.map((todo: any) =>
                todo.id === item.id
                    ? { ...todo, is_completed: !todo.is_completed }
                    : todo
            )
        )
    }
    const handleEdit = () => {
        setEditing(true);
    }
    React.useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.setSelectionRange(
                inputRef.current.value.length,
                inputRef.current.value.length
            )
        }
    }, [editing])
    const handleInputSubmit = (event: any) => {
        event.preventDefault();
        setEditing(false);
    }
    const handleInputBlur = () => {
        setEditing(false);
    }
    const handleInputChange = (e: any) => {
        setTodos((prevTodos) =>
        prevTodos.map((todo) =>
        todo.id === item.id ? { ...todo, title: e.target.value} : todo )
        )
    }
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
                        <svg fill={item.is_completed ? "#22C55E" : "#0d0d0d"}>
                            <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
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
                        <button>
                            <span>Delete</span>
                            <svg>
                                <path d="" />
                            </svg>
                        </button>
                    </div>
                </>

            )}
        </li>
    )
}

interface TODOListProps {
    todos: { id: string; title: string; is_completed: boolean }[];
    setTodos: React.Dispatch<React.SetStateAction<{ id: string; title: string; is_completed: boolean }[]>>;
}

function TODOList({ todos, setTodos }: TODOListProps) {
    return (
        <ol className="todo_list">
            {todos && todos.length > 0 ? (
                todos.map((item) => (
                    <Item key={item.id} item={item} setTodos={setTodos} />
                ))
            ) : (
                <p>No tasks yet!</p>
            )}
        </ol>
    );
}

export default TODOList;