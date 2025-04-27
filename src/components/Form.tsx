function Form() {
    const handleSubmit = (event: any) => {
        event.preventDefault();
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