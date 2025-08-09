// resources/js/components/NewPage.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useForm } from '@inertiajs/react';

library.add(fas, far, fab)

export function TodoForm() {

    const {
        data, setData, post, errors, reset
    } = useForm({
        "name" : '',
        "completed" : '',
    });

    const addTodo = (e) => {
        console.log(e);
        e.preventDefault();
        post(route('todos.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        })
    }

    const handleChange = () => {

    }
    const handleSubmit = () => {

    }

    return (
        <>
            <div className="w-full">
                <form className="max-w-md --mx-auto --w-full ml-8 mr-8 mx-8"
                onSubmit={addTodo}
                >
                    <div className="mb-5">
                        <label htmlFor="item-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item name</label>
                        <input type="text" id="item-name" className="shadow-xs bg-gray-50 border border-gray-300
                            text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                            dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                            placeholder="Input item name value" r--equired
                            onChange={e => setData('name', e.target.value)}
                            value={data.name}
                            />
                            {/*name="name" v-model="item.name"*/}
                    </div>
                    { errors.name && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.name || 'empty!'}</p> }

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                        focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                        cursor-pointer"
                        // @click="addItem()"
                        >Add todo item
                        {/* <FontAwesomeIcon icon="fa-solid fa-plus-square"
                            :className="[ item.name ? 'active' : 'inactive', 'plus']" /> */}
                    </button>
                </form>
                <div className="some flex items-center justify-center text-fuchsia-700">
                    <FontAwesomeIcon icon="fa-solid fa-user-secret" className="text-fuchsia-700" />
                    <FontAwesomeIcon icon="fa-solid fa-thumbs-up" className="text-teal-200" />
                    <FontAwesomeIcon icon="fa-brands fa-facebook" className="text-lime-400" />
                </div>
            </div>
        </>
    );
}
