function Form({ todos, setTodos }: { todos: any[]; setTodos: (callback: (prevTodos: any[]) => any[]) => void }) {
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const value = event.target.todo.value;
        const newTodo = {
            title: value,
            id: self.crypto.randomUUID(),
            is_completed: false,
        }
        setTodos((prevTodos: any) => [...prevTodos, newTodo]);
        const updatedTodoList = JSON.stringify([...todos, newTodo]);
        localStorage.setItem("todos", updatedTodoList);
        event.target.reset();
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="todo">
                <input 
                type="text" 
                name="todo" 
                id="todo" 
                placeholder="Write your next task here!" 
                />
            </label>
            <button>
                <span className="visually-hidden">Submit</span>
                <svg width="150" height="20">
                    <path d="" />
                </svg>
            </button>
        </form>
    )
}

export default Form