// r esources/js/components/NewPage.jsx
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useForm } from '@inertiajs/react';
import { Dict, getColorStatus, getColorText,
    Stages, StatusColor, Statuses, StatusTextColor } from './todo/cl-helper';
import TWSelectMenu from './todo/cl-select';

import { Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/16/solid'
import { CheckIcon, ArrowPathIcon } from '@heroicons/react/20/solid'
import { ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import { cn } from '@/lib/utils';

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
    // console.log('StatusIcon status', status)
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
    // console.log('CLStatusList', field, value, selected)

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

function InputText({field, type='text', data, setData, errors, valueHendler=false, title='',
    required=false, readonly=false,  placeholder="", classname="", classWrapp="", ...props}) {
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(!setData) return
        setData(field, e.target.value)
    }
    let id="item-" + field
    classWrapp = cn("--w-1/2 --w-[calc(100%/2-var(--spacing)*4)]",
        classWrapp
    )
    let className = cn("shadow-xs bg-gray-50 border border-gray-300\
                    text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5\
                    dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white\
                    dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light",
                    classname
                )
    let value = data[field]
    if(valueHendler) value = valueHendler(value)

    return (

        <div className={classWrapp}>
            <div className="mb-5">
                <label htmlFor={id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >{title}</label>
                <input type={type} id={id} className={className}
                    required={required}
                    readOnly={readonly}
                    placeholder={placeholder}
                    onChange={onChange}
                    value={value} {...props}
                    />
                    {/*name="name" v-model="item.name"*/}
            </div>
            { errors && errors[field] && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors[field] || 'empty!'}</p> }
        </div>
    )
}

/** LogText console log text formatting */
const lt = (color='aqua', size=16) => {
    return `color:${color};font-size:${size}px;`
}

export function CoverLetterForm({item, select, close, formHandler, dialogstate}: any) { //:CoverLetter|null

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
    // console.log('CoverLetterForm', item, data)

    const textarea = document.createElement('textarea')
    const textareaC = document.createElement('textarea')
    const infoInputRef = useRef<HTMLTextAreaElement>(textarea)
    const infoContentRef = useRef<HTMLTextAreaElement>(textareaC)

    useEffect(() =>{
        if(infoInputRef.current) {
            // console.log('%c useEffect dialogstate', lt(), infoInputRef.current)
            infoInputRef.current.focus()
            setTimeout(() => {infoInputRef.current.focus()},100)
            setTimeout(() => {infoInputRef.current.blur()},100)
        }
    },[dialogstate])

    const sendLetter = (e) => {
        // console.log('sendLetter e', e);
        // console.log('sendLetter item', item);
        // console.log('sendLetter data', data);
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

    const updateLetterOnly = (e) => {
        e.preventDefault();
        patch(route('coverletters.update', data), {
            preserveScroll: true,
            onSuccess: () => {
                formHandler['setDataItem'](data)
            },
        })
    }

    let button_title = 'Add cover letter'
    if(data.id) button_title = `Update cover letter #${data.id}`

    const handleChange = () => {

    }
    const handleSubmit = () => {

    }
    const copyToClipboard = (e) => {
        e.preventDefault();
        if(!infoContentRef || !infoContentRef.current) return
        let text = infoContentRef.current.value;
        navigator.clipboard.writeText(text)

        if(false && 'old version') {
            let copyText = document.createElement('textarea')
            document.body.appendChild(copyText)
            copyText.value = text
            // copyText.select();
            copyText.focus();
            copyText.setSelectionRange(0, 99999); // For mobile devices
            document.execCommand('copy'); // depricated
            copyText.remove()
            console.log('%c copy 2', lt(), copyText.value)
        }
    }

    return (
        <>
            <div className="w-full">
                <form className=" --mx-auto --w-full --w-[calc(100%-(var(--spacing)*8*2))]
                    ml-8 mr-8 mx-8 relative flex flex-wrap flex-col-reverse lg:flex-row justify-between gap-4"
                onSubmit={sendLetter}
                >

                <div className="----w-1/2 lg:w-[calc(100%/2-var(--spacing)*4)]">
                {/* attributes block */}

                    {data.id &&
                        (
                            <>
                                <InputText
                                    field="id"
                                    title='ID' placeholder="ID value"
                                    classname="" type="text"
                                    required={false} readonly={true}
                                    data={data} setData={false} errors={false}
                                    />

                                <div className="w-full flex gap-4 justify-between">
                                    <InputText
                                        field="created_at"
                                        title='Created at' placeholder="Created value"
                                        classWrapp="w-full" classname="" type="text"
                                        required={true} readonly={true}
                                        data={data} setData={false} errors={false} valueHendler={formatDate}
                                        />
                                    <InputText
                                        field="updated_at"
                                        title='Updated at' placeholder="Updated value"
                                        classWrapp="w-full" classname="" type="text"
                                        required={true} readonly={true}
                                        data={data} setData={false} errors={false} valueHendler={formatDate}
                                        />
                                </div>
                            </>
                        )
                    }
                    <InputText
                        field="url"
                        title='Vacancy url' placeholder="Fill vacancy URL"
                        classname="" type="text"
                        required={true} readonly={false}
                        data={data} setData={setData} errors={errors}
                        />

                    <InputText
                        field="chat"
                        title='Chat url' placeholder="Fill chat URL"
                        classname="" type="text"
                        // required={true} readonly={false}
                        data={data} setData={setData} errors={errors}
                        />

                    <InputText
                        field="company"
                        title='Company url' placeholder="Fill company URL"
                        classname="" type="text"
                        // required={true} readonly={false}
                        data={data} setData={setData} errors={errors}
                        />

                    <InputText
                        field="contact_name"
                        title='Contact name' placeholder="Fill contact name"
                        classname="" type="text"
                        // required={true} readonly={false}
                        data={data} setData={setData} errors={errors}
                        />

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

                    <InputText
                        field="title"
                        title='Title' placeholder="Fill title"
                        classWrapp="max-w-xl" classname="" type="text"
                        required={true} readonly={false}
                        data={data} setData={setData} errors={errors}
                        />
                </div>

                <div className="----w-1/2 lg:w-[calc(100%/2-var(--spacing)*4)]">
                {/* texts block */}
                    <div className="max-w-xl --grow-3 --shrink-0 --w-full/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <label htmlFor="item-info" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Info</label>
                            <textarea ref={infoInputRef} id="item-info" className="shadow-xs bg-gray-50 border border-gray-300
                                text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                                dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
                                dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                                placeholder="Input item info value"
                                onChange={e => setData('info', e.target.value)}
                                rows={8} autoFocus={true} data-test="ok"
                                value={data.info} />
                                {/*name="name" v-model="item.name"*/}
                        </div>
                        { errors.info && <p className="mb-5 text-sm text-red-600 dark:text-red-500"><span className="font-medium">Oops!</span> It's error: {errors.info || 'empty!'}</p> }
                    </div>

                    <div className="max-w-xl --grow-3 --shrink-0 --w-full/2 --w-[calc(100%/2-var(--spacing)*4)]">
                        <div className="mb-5">
                            <div className="flex justify-between">
                                <label htmlFor="item-content"
                                className="grow-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >Content</label>
                                { location.protocol == 'https:'?(<button type="button"
                                    className="grow-0 text-white bg-blue-700 hover:bg-blue-800
                                        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium
                                        rounded-lg text-sm mb-1 px-2 py-1 text-center
                                        dark:bg-purple-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                        cursor-pointer"
                                    // @click="addItem()"
                                    onClick={copyToClipboard}
                                    ><ClipboardDocumentListIcon aria-hidden={true} className="size-5" />
                                </button>):"" }
                            </div>
                            <textarea ref={infoContentRef} id="item-content" className="shadow-xs bg-gray-50 border border-gray-300
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

                    <div className="w-full grow-3 flex flex-start items-start justify-between">
                        <button type="submit" className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            cursor-pointer"
                            // @click="addItem()"
                            >{button_title}
                            {/* <FontAwesomeIcon icon="fa-solid fa-plus-square"
                                :className="[ item.name ? 'active' : 'inactive', 'plus']" /> */}
                        </button>
                    {data.id &&
                        (
                        <button type="button" className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                            focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                            dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                            cursor-pointer"
                            // @click="addItem()"
                            onClick={updateLetterOnly}
                            ><ArrowPathIcon aria-hidden={true} className="size-5" />
                            {/* <FontAwesomeIcon icon="fa-solid fa-plus-square"
                                :className="[ item.name ? 'active' : 'inactive', 'plus']" /> */}
                        </button>
                        )}
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
