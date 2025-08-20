// resources/js/components/cover-letter-item.jsx

import React, { ChangeEvent, FormEvent, MouseEvent, MouseEventHandler,
    useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { router, useForm } from '@inertiajs/react';
import { CoverLetter, Dict, Stages, StatusColor, Statuses, StatusTextColor } from './todo/cl-helper';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/20/solid';
// import { Shield } from 'lucide-react';

library.add(fas, far, fab)



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

function classGenerator() {
    let cls: any = [];
    statuses.forEach( status=>{
        let bg = getColorStatus(status)
        let color = getColorText(bg)
        let cl = ["hidden flex items-center text-sm ml-4 px-2 py-1 ",
                "border border-", bg, "-800 rounded-lg bg-", bg, "-500 ",
                "dark:bg-", bg, "-500 text-", color, "-50 dark:border-", bg, "-800"].join('')
        cls.push(cl);
    })
    return cls.join(' ')
}

export function Shield({status='tpl'}) {
    if(!status) status = 'tpl'
    let bg = getColorStatus(status)
    let color = getColorText(bg)
    let cl = ["flex items-center --p-4 --mb-4 text-sm ml-2 px-2 py-1 ",
            "border border-", bg, "-800 rounded-lg bg-", bg, "-500 ",
            "dark:bg-", bg, "-500 text-", color, "-50 dark:border-", bg, "-800"].join('')
    return (
        <>
        {/* <div className="flex items-center --p-4 --mb-4 text-sm ml-4 px-2 py-1 border border-pink-800 rounded-lg bg-pink-500 dark:bg-pink-500 text-blue-400 dark:border-pink-800">
                {status} {bg} {color}
        </div> */}
        <div className={cl}>
                {status}
        </div>
        </>
    )
}

export function DivClassGenerator() {
    return (
        <div class="hidden flex items-center text-sm ml-4 px-2 py-1 border border-slate-800 rounded-lg bg-slate-500 dark:bg-slate-500 text-gray-50 dark:border-slate-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-emerald-800 rounded-lg bg-emerald-500 dark:bg-emerald-500 text-gray-50 dark:border-emerald-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-fuchsia-800 rounded-lg bg-fuchsia-500 dark:bg-fuchsia-500 text-gray-50 dark:border-fuchsia-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-sky-800 rounded-lg bg-sky-500 dark:bg-sky-500 text-gray-50 dark:border-sky-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-lime-800 rounded-lg bg-lime-500 dark:bg-lime-500 text-gray-50 dark:border-lime-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-pink-800 rounded-lg bg-pink-500 dark:bg-pink-500 text-gray-50 dark:border-pink-800 hidden flex items-center text-sm ml-4 px-2 py-1 border border-zinc-800 rounded-lg bg-zinc-500 dark:bg-zinc-500 text-gray-50 dark:border-zinc-800"></div>
    )
}

interface CLItem {
    item: CoverLetter,
    select: any,
    formHandler: Dict,
}

export default function CoverLetterItem({item, select, formHandler}: CLItem){
    const [isChecked, setIsChecked] = useState(item.status == 'offer'? true: false);

    // item['stage'] = item['stage'] || 'tpl';
    const {
        data, setData, patch, put, delete:destroy, errors, reset
    } = useForm(item);

    const formRef = useRef(null)
    // console.log('CoverLetterItem', item.id, isChecked);
    console.log(`%c CoverLetterItem %c${item.id} ${item.stage} %c${item.status}`,
        'font-size:16px;color:aqua;',
        'font-size:16px;color:yellow;',
        'font-size:16px;color:#50c878;',
        // data.stage, data.status
    )

    if(item.id == 8){

        // console.log('CoverLetterItem isChecked', item.id, isChecked);
        // console.log('CoverLetterItem status', item.id, data.status, data.status == 'completed');
        // console.log('CoverLetterItem item', item.id, item);
        // console.log('CoverLetterItem data', item.id, data);
    }

    useEffect(()=>{
        setData(item)
        // if(!data.stage) setData('stage', 'tpl')
        if(item.id in {5:7}){
            console.log('%c useEffect stage','font-size:16px;color:aqua;', data.stage)
            console.log('%c useEffect status','font-size:16px;color:aqua;', data.status)
        }
        // setIsChecked(status => !status ? true: false)

    }, [item])

    // const updateTodo = (e) => {
    //     // console.log(e);
    //     e.preventDefault();
    //     patch(route('todos.update', {...item, 'status': item.status}), {
    //         preserveScroll: true,
    //         onSuccess: () => reset(),
    //     })
    // }

    // let itemdata = {
    //     "id": item.id,
    // }
    // itemdata = item;

    const closeOffer = (e:any) => {
        e.preventDefault();

        let itemdata = {
                ...data,
                'status': data.status == 'completed'? 'open': 'completed'
            }

        // console.log('%citemdata', 'color:#50C878;', itemdata.status);
        console.log('%cdata status', 'color:aqua;', data.status);
        // setData(itemdata)


        // console.log('%cdata status', 'color:green;', data.status);

        // patch(route('letters.complete', data), {
        //     // preserveScroll: true,
        //     // onSuccess: () => reset(),
        // })
        setTimeout(()=>{patch(route('letters.complete', {...data}), {preserveScroll: true,})}, 500)
    }

    const setNextStatus = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        let stat = getNextStatus(data.status)
        setData(dt=>({...dt,'status': stat}))
        let dt = {...data, 'status': stat}
        console.log('%c setNextStatus dt', 'font-size:16px;color:red;', dt)
        console.log('%c setNextStatus data', 'font-size:16px;color:red;', data)
        let ch = false
        if(stat == 'offer' || stat == 'completed')  ch = true
            setIsChecked(ch)
        // setTimeout(()=>{patch(route('letters.complete', dt))}, 500)
        // setTimeout(()=>{patch(route('letters.complete', dt))}, 1500)
        router.patch('coverletters/complete/' + dt.id, dt)

        // if(formRef.current) formRef.current.submit()
    }

    const formSumbit = (ev: FormEvent<HTMLInputElement>) => {
        console.log('%c formSumbit', 'font-size:16px;color:red;', '')
        ev.preventDefault();
        ev.stopPropagation();
        setTimeout(()=>{patch(route('letters.complete', data))}, 500)
        // setTimeout(()=>{patch(route('letters.complete', data))}, 1500)
        return false;
    }

    const hideCL: MouseEventHandler = (ev: MouseEvent<HTMLInputElement>) => {
        ev.preventDefault();
        ev.stopPropagation();
        patch(route('letters.hide', data))
    }

    // console.log('TodoListItem item', item);
    // console.log('CoverLetterItem 2', item);
    return (
        <div
            className="item ml-4 mr-4 item --w-full rounded-md border border-gray-500 bg-gray-800 mt-4 p-4
                flex align-center justify-between"
                onClick={(ev)=>{
                    formHandler['setDataItem'] = setData
                    select(item)}
                }
                >
            {/* <!-- <div className="flex items-center mb-4">
                <input id="checkbox-2" type="checkbox"
                    // @change="updateCheck()" v-model="item.completed"
                    value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                <label for="checkbox-2" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I want</label>
            </div> --> */}

            <form className="inline-flex items-center"
                ref={formRef}
                onSubmit={formSumbit}
            >

                <label className="inline-flex items-center --mb-5 cursor-pointer">
                    <input type="checkbox"
                        // // @change="updateCheck()" v-model="item.completed"
                        checked={isChecked? true: false}
                        // // onChange={updateTodo}
                        onChange={e=> {
                            // let status = item.status == 'completed'? 'open': 'completed'
                            // setIsChecked(status == 'completed'? true: false)
                            setIsChecked(ch => !ch ? true: false)
                            setData('status', isChecked ? 'tpl': 'offer');
                            // console.log('%c onChange isChecked, status', 'color:violet;', isChecked, data.status);
                            // console.log('%c onChange data', 'color:violet;', data);

                            // item.status = status
                            closeOffer(e)
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
                            (item.status == 'completed' ? 'completed line-through text-gray-500' : 'text-gray-300')
                        ].join(' ')}
                        // :class="[item.completed ? 'completed text-gray-500' : 'text-gray-300', '']"
                        onClick={setNextStatus}
                    > { item.title } {/* data.stage } { data.status */}</span>
            </form>
            {/* <!-- input type="checkbox" @change="updateCheck()" v-model="item.completed" className="" --> */}

            <div className="grow-0 flex items-start justify-center gap-0">
                {/* <div className={classGenerator()} ></div> */}
                {/* <div className={classGenerator()} ></div> */}
                <Shield status={data.status} />
                <Shield status={data.stage} />
                <button type="submit" className=" ml-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4
                focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-1 text-center
                dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800
                        cursor-pointer"
                // @click="removeItem()"
                    // onClick={deleteTodo}
                    onClick={hideCL}
                >
                    {/* <FontAwesomeIcon icon="fa-solid fa-eye-slash" /> */}
                    {data.hide?<EyeIcon aria-hidden="true" className="size-5" />:<EyeSlashIcon aria-hidden="true" className="size-5" />}
                </button>
            </div>
        </div>
    )
}

// export {CoverLetterItem}
// export default CoverLetterItem;
