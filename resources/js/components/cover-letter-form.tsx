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

interface CoverLetter {
    id: number,
    resource: string,
    url: string,
    company: string,
    contact_name: string,
    status: string,
    title: string,
    info: string,
    text: string,
}

export function CoverLetterForm() {

    const {
        data, setData, post, errors, reset
    } = useForm({
        "resource" : '',
        "url" : '',
        "company" : '',
        "contact_name" : '',
        "status" : '',
        "title" : '',
        "info" : '',
        "text" : '',
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
                <form className=" --mx-auto w-full ml-8 mr-8 mx-8 flex flex-col justify-between gap-4"
                onSubmit={addTodo}
                >
                    <div className="w-1/2">
                        <div className="mb-5">
                            <label htmlFor="item-resource" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item resource</label>
                            <input type="text" id="item-resource" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item resource value" r--equired
                                onChange={e => setData('resource', e.target.value)}
                                value={data.resource}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.resource && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.resource || 'empty!'}</p> }
                    </div>
                    <div className="w-1/2">
                        <div className="mb-5">
                            <label htmlFor="item-url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item url</label>
                            <input type="text" id="item-url" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item url value" r--equired
                                onChange={e => setData('url', e.target.value)}
                                value={data.url}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.url && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.url || 'empty!'}</p> }
                    </div>
                    <div className="w-1/2">
                        <div className="mb-5">
                            <label htmlFor="item-company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item company</label>
                            <input type="text" id="item-company" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item company value" r--equired
                                onChange={e => setData('company', e.target.value)}
                                value={data.company}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.company && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.company || 'empty!'}</p> }
                    </div>
                    <div className="w-1/2">
                        <div className="mb-5">
                            <label htmlFor="item-contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item contact name</label>
                            <input type="text" id="item-contact_name" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item name value" r--equired
                                onChange={e => setData('contact_name', e.target.value)}
                                value={data.contact_name}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.contact_name && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.contact_name || 'empty!'}</p> }
                    </div>
                    <div className="w-1/2">
                        <div className="mb-5">
                            <label htmlFor="item-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item status</label>
                            <input type="text" id="item-status" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item status value" r--equired
                                onChange={e => setData('status', e.target.value)}
                                value={data.status}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.status && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.status || 'empty!'}</p> }
                    </div>
                    <div className="max-w-xl grow-3">
                        <div className="mb-5">
                            <label htmlFor="item-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item title</label>
                            <input type="text" id="item-title" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item title value" r--equired
                                onChange={e => setData('title', e.target.value)}
                                value={data.title}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.title && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.title || 'empty!'}</p> }
                    </div>
                    <div className="max-w-xl grow-3 --shrink-0 --w-full/2">
                        <div className="mb-5">
                            <label htmlFor="item-info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item info</label>
                            <textarea id="item-info" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item info value" r--equired
                                onChange={e => setData('info', e.target.value)}
                                rows={5}
                                >{data.info}</textarea>
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.info && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.info || 'empty!'}</p> }
                    </div>
                    <div className="max-w-xl grow-3 --shrink-0 --w-full/2">
                        <div className="mb-5">
                            <label htmlFor="item-text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item text</label>
                            <textarea id="item-text" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item text value" r--equired
                                onChange={e => setData('text', e.target.value)}
                                rows={10}
                                >{data.text}</textarea>
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.text && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.text || 'empty!'}</p> }
                    </div>

                    <div className="grow-3 flex flex-start items-start">
                        <button type="submit" className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            cursor-pointer"
                            // @click="addItem()"
                            >Add todo item
                            {/* <FontAwesomeIcon icon="fa-solid fa-plus-square"
                                :className="[ item.name ? 'active' : 'inactive', 'plus']" /> */}
                        </button>
                    </div>
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
