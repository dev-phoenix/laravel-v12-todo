// resources/js/components/NewPage.jsx
import React from 'react';
import { TodoForm } from '@/components/todo-form';
import { TodoList } from '@/components/todo-list';

interface Todo {
    id: number,
    nme: string,
    completed: boolean,
    completed_at: string,
}

interface PageProps {
    completeTodos: Todo[],
    incompleteTodos: Todo[],
}


export function TodoBlock({completeTodos, incompleteTodos}: PageProps) {
    // console.log('TodoBlock completeTodos', completeTodos);
    // console.log('TodoBlock incompleteTodos', incompleteTodos);
    return (
        <div className="todo-list-container flex flex-col items-center border border-purple-700 w-full rounded-md pb-8 pt-8">
            <div className="heading flex flex-col items-center w-full">
                <h2 id="todo-title">Todo List</h2>
                    {/* <todo-form v-on:reloadlist="getList()"/> */}
                    <TodoForm />
            </div>
            {/* <todo-list :items="items"
                v-on:reloadlist="getList()"/> */}
            <div className="w-full flex items-start justify-between pt-4 pl-4 pr-4 gap-4">
                <div className="w-full/2 flex flex-col items-center border border-purple-700 w-full rounded-md pb-4 pt-4">
                    <h3>Incompleted:</h3>
                    <TodoList todos={incompleteTodos}/>
                </div>
                <div className="w-full/2 flex flex-col items-center border border-purple-700 w-full rounded-md pb-4 pt-4">
                    <h3>Completed:</h3>
                    <TodoList todos={completeTodos}/>
                </div>
            </div>
        </div>
    );
}
