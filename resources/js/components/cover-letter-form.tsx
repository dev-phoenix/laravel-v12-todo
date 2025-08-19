// r esources/js/components/NewPage.jsx
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
    id?: number,
    url: string,
    chat: string,
    company: string,
    contact_name: string,
    status: string,
    title: string,
    info: string,
    content: string,
    updated_at: string,
}
interface Dict { [key:string]: string|number }

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZoneName: 'short',
};


function formatDate(date:string) {
    let dt = new Date(date)
    let format: Dict = {year: 'numeric', month: 'long', day: 'numeric'}
    format = {year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',}
    return dt.toLocaleDateString('ru-RU', format)
    return dt.toLocaleDateString('en-Us', format)
}

export function CoverLetterForm({item, close, formHandler}) { //:CoverLetter|null
    console.log('CoverLetterForm', item, formHandler)

    // if(item === null) {
    //     item = {
    //         "url" : '',
    //         "chat" : '',
    //         "company" : '',
    //         "contact_name" : '',
    //         "status" : '',
    //         "title" : '',
    //         "info" : '',
    //         "content" : '',
    //     }
    // }

    const {
        data, setData, post, patch, errors, reset
    } = useForm(item);
    formHandler['setData'] = setData

    const sendLetter = (e) => {
        console.log('sendLetter e', e);
        console.log('sendLetter item', item);
        console.log('sendLetter data', data);
        e.preventDefault();

        if(data.id){
            updateLetter(e)
        } else {
            addLetter(e)
        }
    }

    const addLetter = (e) => {
        post(route('coverletters.store'), {
            preserveScroll: true,
            onSuccess: () => {
                close()
                reset()},
        })
    }

    const updateLetter = (e) => {
        // patch(route('coverletters.update', {...data, 'status': data.status}), {
        patch(route('coverletters.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                close()
                reset()},
        })
    }

    let button_title = 'Add cover letter'
    if(data.id) button_title = 'Update cover letter'

    const handleChange = () => {

    }
    const handleSubmit = () => {

    }

    return (
        <>
            <div className="w-full">
                <form className=" --mx-auto --w-full --w-[calc(100%-(var(--spacing)*8*2))] ml-8 mr-8 mx-8 relative flex flex-wrap --flex-col justify-between gap-4"
                onSubmit={sendLetter}
                >
                <div className="----w-1/2 w-[calc(100%/2-var(--spacing)*4)]">

                    {data.id &&
                        (
                            <>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item ID</label>
                            <input type="number" id="item-id" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item id value"
                                // onChange={e => setData('url', e.target.value)}
                                value={data.id}
                                readOnly
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        {/* { errors.url && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.url || 'empty!'}</p> } */}
                    </div>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-created_at" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Created at</label>
                            <input type="text" id="item-created_at" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item id value"
                                // onChange={e => setData('url', e.target.value)}
                                value={formatDate(data.created_at)}
                                readOnly
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        {/* { errors.url && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.url || 'empty!'}</p> } */}
                    </div>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-updated_at" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Updated at</label>
                            <input type="text" id="item-updated_at" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item id value"
                                // onChange={e => setData('url', e.target.value)}
                                value={formatDate(data.updated_at)}
                                readOnly
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        {/* { errors.url && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.url || 'empty!'}</p> } */}
                    </div>
                            </>
                        )
                    }

                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item url</label>
                            <input type="text" id="item-url" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item url value"
                                onChange={e => setData('url', e.target.value)}
                                value={data.url}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.url && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.url || 'empty!'}</p> }
                    </div>
                    <div className="----w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-chat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item chat</label>
                            <input type="text" id="item-chat" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item chat value"
                                onChange={e => setData('chat', e.target.value)}
                                value={data.chat}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.chat && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.chat || 'empty!'}</p> }
                    </div>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item company</label>
                            <input type="text" id="item-company" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item company value"
                                onChange={e => setData('company', e.target.value)}
                                value={data.company}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.company && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.company || 'empty!'}</p> }
                    </div>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item contact name</label>
                            <input type="text" id="item-contact_name" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item name value"
                                onChange={e => setData('contact_name', e.target.value)}
                                value={data.contact_name}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.contact_name && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.contact_name || 'empty!'}</p> }
                    </div>
                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item status</label>
                            <input type="text" id="item-status" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item status value"
                                onChange={e => setData('status', e.target.value)}
                                value={data.status}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.status && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.status || 'empty!'}</p> }
                    </div>
                    <div className="max-w-xl --grow-3 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item title</label>
                            <input type="text" id="item-title" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item title value"
                                onChange={e => setData('title', e.target.value)}
                                value={data.title}
                                />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.title && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.title || 'empty!'}</p> }
                    </div>
                </div>
                <div className="----w-1/2 w-[calc(100%/2-var(--spacing)*4)]">
                    <div className="max-w-xl --grow-3 --shrink-0 --w-full/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item info</label>
                            <textarea id="item-info" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item info value"
                                onChange={e => setData('info', e.target.value)}
                                rows={5}
                                value={data.info} />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.info && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.info || 'empty!'}</p> }
                    </div>
                    <div className="max-w-xl --grow-3 --shrink-0 --w-full/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item content</label>
                            <textarea id="item-content" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item text value"
                                onChange={e => setData('content', e.target.value)}
                                rows={25}
                                value={data.content} />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.content && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.content || 'empty!'}</p> }
                    </div>
                </div>

                    <div className="w-1 grow-3 flex flex-start items-start">
                        <button type="submit" className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            cursor-pointer"
                            // @click="addItem()"
                            >{button_title}
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
