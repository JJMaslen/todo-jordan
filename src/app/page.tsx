"use client";

import React from 'react';
import Link from 'next/link';
import './globals.css';
import Header from '@/components/Header';
import Form from '@/components/Form';
import TODOList from '@/components/TODOList';

export default function Page() {
  const [todos, setTodos] = React.useState<{ id: string; title: string; is_completed: boolean }[]>([]);

  React.useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos))
    }
  }, [])
  
  return (
    <div className="wrapper">
      <header>
        <nav>
          <ul>
            <li><Link href="/">Todo List</Link></li>
            <li><Link href="/higherOrLowerGame">Higher or lower game</Link></li>
            <li><Link href="/nodeClickAndDrag">Bus Route Creator</Link></li>
          </ul>
        </nav>
      </header>
      <Header />
      <Form todos={todos} setTodos={setTodos}/>
      <TODOList todos={todos} setTodos={setTodos}/>
    </div>
  );
}