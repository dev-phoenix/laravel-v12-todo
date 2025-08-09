// resources/js/components/NewPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useForm } from '@inertiajs/react';

library.add(fas, far, fab)


// export default
function TodoListItem({item}) {
    const [isChecked, useIsChecked] = useState(item.completed? true: false);

    console.log('TodoListItem item', item);
    const updateCheck = () => {console.log('updateCheck', item);
        useIsChecked((state) => {state = !state; return state;});
    }

    const {
        data, setData, patch, put, delete: destroy, errors, reset
    } = useForm({
        "id" : item.id,
        "name" : item.name,
        "completed" : !item.completed,
    });

    const updateTodo = (e) => {
        // console.log(e);
        e.preventDefault();
        patch(route('todos.update', {...item, 'completed': !item.completed}), {
            preserveScroll: true,
            onSuccess: () => reset(),
        })
    }

    const deleteTodo = (e) => {
        // console.log(e);
        e.preventDefault();
        destroy(route('todos.destroy', {...item}), {
            preserveScroll: true,
            onSuccess: () => reset(),
        })
    }

    const completeTodo = (e) =>{
        put(route('todos.updateCompletion', item), {
            preserveScroll: true,
            onSuccess: () => reset(),
        })
    }

    return (

        <div className="item ml-4 mr-4 item --w-full rounded-md border border-gray-500 bg-gray-800 mt-4 p-4
                flex align-center justify-between">
            {/* <!-- <div className="flex items-center mb-4">
                <input id="checkbox-2" type="checkbox"
                    // @change="updateCheck()" v-model="item.completed"
                    value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want</label>
            </div> --> */}
            <label className="inline-flex items-center --mb-5 cursor-pointer">
                <input type="checkbox"
                    // @change="updateCheck()" v-model="item.completed"
                    checked={isChecked? true: false}
                    onChange={updateTodo}
                    value=""
                    className="sr-only peer"/>
                <div className="shrink-0 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600
                dark:peer-checked:bg-green-600"></div>
                <span className={[
                        "ms-3 text-sm font-medium --text-gray-900 --dark:text-gray-300",
                        "cursor-pointer text-gray-500/50",
                    ].join(' ')}
                    // :class="[item.completed ? 'completed text-gray-500' : 'text-gray-300', '']"
                >#{ item.id }</span>
                <span className={[
                        "ms-3 text-sm font-medium",
                        // "ms-3 text-sm font-medium text-gray-900 dark:text-gray-300",
                        "cursor-pointer",
                        (item.completed ? 'completed line-through text-gray-500' : 'text-gray-300')
                    ].join(' ')}
                    // :class="[item.completed ? 'completed text-gray-500' : 'text-gray-300', '']"
                > { item.name }</span>
            </label>
            {/* <!-- input type="checkbox" @change="updateCheck()" v-model="item.completed" className="" --> */}

            <div className="grow-0 flex items-start justify-center">
                <button type="submit" className=" ml-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4
                focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 text-center
                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                        cursor-pointer"
                // @click="removeItem()"
                    onClick={deleteTodo}
                ><FontAwesomeIcon icon="fa-solid fa-trash" />
                </button>
            </div>
        </div>
    );
}

export {
    TodoListItem
}
