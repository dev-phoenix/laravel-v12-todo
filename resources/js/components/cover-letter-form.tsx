// r esources/js/components/NewPage.jsx
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useForm } from '@inertiajs/react';
import { Dict, Stages, StatusColor, Statuses, StatusTextColor } from './todo/cl-helper';
import TWSelectMenu from './todo/cl-select';

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon } from '@heroicons/react/20/solid'

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

// interface Dict { [key:string]: string|number }

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

let stages = Stages
let statuses = Statuses
let statusColor = StatusColor
let statusTextColor = StatusTextColor
let somedict: Dict = {}

function getNextStatus(status: any, list: null|string[] = statuses) {
    if(!list) list = statuses
    let pos = list.indexOf(status)
    if(pos == -1) return list[0]
    pos += 1
    if(pos >= list.length) pos = 0
    return list[pos]
}
function getColorStatus(status:string) {
    if(!(status in statusColor)) status = 'tpl'
    return statusColor[status]
}
function getColorText(color:string) {
    if(!(color in statusTextColor)) color = 'tpl'
    return statusTextColor[color]
}


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

function StatusIcon({status}:any){
    console.log('StatusIcon status', status)
    let bg = getColorStatus(status)
    let color = getColorText(bg)
    let cl = ["--hidden size-5 flex items-center text-sm ml-4 px-2 py-1 ",
            "border border-", bg, "-800 rounded-full bg-", bg, "-500 ",
            "dark:bg-", bg, "-500 text-", color, "-50 dark:border-", bg, "-800"].join('')
    return (

        <div
            // alt=""
            // src={person.avatar}
            className={cl}
            // "size-5 shrink-0 rounded-full outline -outline-offset-1 outline-white/10"
        ></div>
    )
}

function CLStatusList({list, value='tpl', setdata, field, defaultValue='tpl'}: any) {
    // const [selected, setSelected] = useState(value)
    if(value == '') value = defaultValue;

    let selected = value
    console.log('CLStatusList', field, value, selected)

    return (

        <Listbox value={selected} onChange={s=>{
            console.log('Listbox change', s)
            setdata(field, s)
            // setSelected(s)
            }}>
            {/* <Label className="block text-sm/6 font-medium text-white">Assigned to</Label> */}
            <div className="relative mt-2">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-gray-800/50 py-1.5 pr-2 pl-3 text-left text-white outline-1 -outline-offset-1 outline-white/10 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-500 sm:text-sm/6">
                    <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        {/* <img
                            alt=""
                            src={selected.avatar}
                            className="size-5 shrink-0 rounded-full bg-gray-700 outline -outline-offset-1
                                outline-white/10"
                        /> */}

                        <StatusIcon status={selected} />
                        <span className="block truncate">{selected}</span>
                    </span>
                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
                    />
                </ListboxButton>

                <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-66 w-full overflow-auto rounded-md
                        bg-gray-800 py-1 text-base outline-1 -outline-offset-1 outline-white/10
                        data-leave:transition data-leave:duration-100 data-leave:ease-in
                        data-closed:data-leave:opacity-0 sm:text-sm"
                >
                    {list.map((status:string, idx:number, arr:string[]) => {
                        return (
                        <ListboxOption
                            key={idx}
                            value={status}
                            className="group relative cursor-default py-2 pr-9 pl-3 text-white select-none data-focus:bg-indigo-500 data-focus:outline-hidden"
                        >
                            <div className="flex items-center">
                                <StatusIcon status={status} />
                                <span className="ml-3 block truncate font-normal group-data-selected:font-semibold">{status}</span>
                            </div>

                            <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-400 group-not-data-selected:hidden group-data-focus:text-white">
                                <CheckIcon aria-hidden="true" className="size-5" />
                            </span>
                        </ListboxOption>
                    )})}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

export function CoverLetterForm({item, select, close, formHandler}: any) { //:CoverLetter|null

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

    //const [selected, setSelected] = useState(statuses[3])
    item['stage'] = item['stage'] || 'tpl'
    const {
        data, setData, post, patch, errors, reset
    } = useForm(item);
    formHandler['setData'] = setData
    formHandler['formData'] = data
    console.log('CoverLetterForm', item, data)

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
        // select(data)
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
                formHandler['setDataItem'](data)
                close()
                reset()
            },
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
                            <label htmlFor="item-id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ID</label>
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
                    <div className="w-full flex gap-4 justify-between">
                        <div className="w-full --w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
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
                        <div className="w-full --w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
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
                    </div>
                            </>
                        )
                    }

                    <div className="--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-url" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vacancy url</label>
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
                            <label htmlFor="item-chat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chat url</label>
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
                            <label htmlFor="item-company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company url</label>
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
                            <label htmlFor="item-contact_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact name</label>
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

                    {/* <div className="w-full flex gap-4 justify-between flex-col">
                        <TWSelectMenu />
                        <CLStatusList list={statuses} />
                    </div> */}

                    <div className="w-full flex gap-4 justify-between">

                        <div className="w-full --w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                            <div className="mb-5">
                                <label htmlFor="item-stage" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stage</label>
                                <CLStatusList
                                    list={stages}
                                    value={data.stage}
                                    setdata={setData}
                                    field="stage"
                                    defaultValue='tpl'
                                    />
                            </div>
                            { errors.stage && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.stage || 'empty!'}</p> }
                        </div>
                        <div className="w-full --w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                            <div className="mb-5">
                                <label htmlFor="item-status" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Status</label>

                                <CLStatusList
                                    list={statuses}
                                    value={data.status}
                                    setdata={setData}
                                    field="status"
                                    defaultValue='tpl'
                                    />
                            </div>
                            { errors.status && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.status || 'empty!'}</p> }
                        </div>
                        <div className="w-full --w-1/2 --w-[calc(100%/2-var(--spacing)*4)]">
                            <div className="mb-5">
                                <label htmlFor="item-hide" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hide</label>

                                <label className="inline-flex items-center --mb-5 cursor-pointer p-2.5">
                                    <input type="checkbox" id="item-hide"
                                        // // @change="updateCheck()" v-model="item.completed"
                                        checked={data.hide}
                                        // // onChange={updateTodo}
                                        onChange={e=> {
                                            setData('hide', e.target.checked);
                                            // let status = item.status == 'completed'? 'open': 'completed'
                                            // setIsChecked(status == 'completed'? true: false)
                                            // setIsChecked(ch => !ch ? true: false)
                                            // setData('status', isChecked ? 'tpl': 'offer');
                                            // console.log('%c onChange isChecked, status', 'color:violet;', isChecked, data.status);
                                            // console.log('%c onChange data', 'color:violet;', data);

                                            // item.status = status
                                            // closeOffer(e)
                                        }}
                                        // value=""
                                        className="sr-only peer"/>
                                    <div className="shrink-0 relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                                    peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700
                                    peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                                    peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px]
                                    after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
                                    after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600
                                    dark:peer-checked:bg-green-600"></div>
                                </label>
                            </div>
                            { errors.hide && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.hide || 'empty!'}</p> }
                        </div>
                    </div>

                    <div className="max-w-xl --grow-3 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
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
                            <label htmlFor="item-info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
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
                            <label htmlFor="item-content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
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
