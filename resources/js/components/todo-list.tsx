// resources/js/components/NewPage.jsx
import React from 'react';
// import TodoListItem from './todo-list-item';

import { TodoListItem } from '@/components/todo-list-item';

interface Todo {
    id: number,
    nme: string,
    completed: boolean,
    completed_at: string,
}

interface Todos {
    todos: Todo[],
    // completeTodos: Todo[],
    // incompleteTodos: Todo[],
}

export function TodoList({todos}: Todos) {
    // console.log('TodoList todos', todos);
    return (
        <div className="w-full">
            <div
            //  v-for="(item, index) in items" :key="index"
            >
                {todos.map((todo, index) => (
                    <>
                        <TodoListItem key={todo.id} item={todo}/>
                    </>
                ))}
                {/* // <TodoListItem :item="item"
                // v-on:itemchanged="$emit('reloadlist')"
                // className=" ml-4 mr-4 item --w-full rounded-md border border-gray-500 bg-gray-800 mt-4 p-4
                // flex align-center justify-between" /> */}
            </div>
        </div>
    );
}
