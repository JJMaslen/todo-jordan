import { Component } from "react";

interface ItemProps {
    item: {
        id: string;
        title: string;
    }
}

function Item({ item }: ItemProps) {
    return(
        <li id={item?.id} className="todo_item">
            <button className="todo_items_left">
                <svg>
                    <circle cx="12" cy="12" fillRule="nonzero" r="10" />
                </svg>
                <p>{item?.title}</p>
            </button>
            <div className="todo_items_right">
                <button>
                    <span className="visually-hidden">Edit</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button>
                <button>
                    <span className="visually-hidden">Delete</span>
                    <svg>
                        <path d="" />
                    </svg>
                </button>
            </div>
        </li>
    )
}

interface TODOListProps {
    todos: { id: string; title: string }[];
}

function TODOList({ todos }: TODOListProps) {
    return(
        <ol className="todo_list">
            {todos && todos.length > 0 ? (
                todos?.map((item, index) => <Item key={index} item={item} />)
            ) : (
                <p>No tasks yet!</p>
            )}
        </ol>
    )
}

export default TODOList;