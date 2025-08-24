
/*
resource
url
company
name
status
info
text
*/

import { useEffect, useRef, useState } from "react";
import { CoverLetterForm } from "./cover-letter-form";
import CoverLetterItem from "./cover-letter-item";
import { CoverLetter } from "./todo/cl-helper";
import { EyeIcon } from "@heroicons/react/20/solid";
// import { CoverLetterItem } from "./cover-letter-item";

// interface CoverLetter {
//     id: number,
//     url: string,
//     chat: string,
//     company: string,
//     contact_name: string,
//     status: string,
//     title: string,
//     info: string,
//     content: string,
// }

interface PaginationLinkInterface {
    url: string,
    label: string,
    active: boolean,
}

interface LettersPagination {
    data: CoverLetter[],
    links: PaginationLinkInterface[],
}

interface PageProps {
    // letters: CoverLetter[],
    letters: LettersPagination,
    title: string,
}
interface DialogArgs {
    isOpen: any,
    onClose: any,
    children: any,
}

interface PaginationData {
    data:LettersPagination
}

const PaginationPrevLink = ({data}) => (
    <a href={data.url} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
        <span className="sr-only">Previous</span>
        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
            <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
    </a>
)

const PaginationNextLink = ({data}) => (
    <a href={data.url} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
        <span className="sr-only">Next</span>
        <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
            <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
        </svg>
    </a>
)

const PaginationLink = ({data, isfirst=false, islast=false}) => {
    let label = data.label
    let className = "relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0"
    if(data.active) className="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    return (<>
        <a href={data.url} aria-current={data.active?"page":false} className={className}>{label}</a>
    </>)
}

const Pagination = ({data}:PaginationData) => {
    return (<>
        <div className="w-full flex items-center justify-between --border-t border-white/10 px-4 mt-4 --py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <a href="#" className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Previous</a>
                <a href="#" className="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10">Next</a>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-300 flex gap-2">
                        Showing
                        <span className="font-medium">{data.from}</span>
                        to
                        <span className="font-medium">{data.to}</span>
                        of
                        <span className="font-medium">{data.total}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md">
                    {data.links.map((ln, ind, arr)=>{
                        let isfirst=false, islast=false;
                        if(ind == 0) isfirst = true
                        if(ind == arr.length - 1) islast = true
                        return (<>
                            {isfirst && <PaginationPrevLink data={ln} /> }
                            {!isfirst && !islast && <PaginationLink data={ln} isfirst={isfirst} islast={islast} />}
                            {islast && <PaginationNextLink data={ln} /> }
                        </>
                    )})}
                        {/* <a href="#" className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                <path d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </a> */}
                        {/*<!-- Current: "z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 bg-indigo-500 focus-visible:outline-indigo-500", Default: "inset-ring focus:outline-offset-0 text-gray-200 inset-ring-gray-700 hover:bg-white/5" -->*/}
                        {/* <a href="#" aria-current="page" className="relative z-10 inline-flex items-center bg-indigo-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">1</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">2</a>
                        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 inset-ring inset-ring-gray-700 focus:outline-offset-0">...</span>
                        <a href="#" className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">9</a>
                        <a href="#" className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">10</a>
                        <a href="#" className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
                                <path d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
                            </svg>
                        </a> */}
                    </nav>
                </div>
            </div>
        </div>
        </>)
}

function CLDialog({ isOpen=0, onClose=0, children='' }:DialogArgs) {
    const dialogRef = useRef(null);
    const [mouseDown, setMouseDown] = useState();
    const [mouseUp, setMouseUp] = useState();

    useEffect(() => {
        if (isOpen) {
            dialogRef.current.showModal(); // Opens the dialog as a modal
        } else {
            dialogRef.current.close(); // Closes the dialog
        }
    }, [isOpen, dialogRef]);

    const close = function () {
        dialogRef.current.close();
    }

    const dialogClick = (ev) => {
        if(mouseDown != mouseUp) return;
        // console.log('dialogClick')
        if(ev.target === dialogRef.current) {
            onClose()
        }
        // console.log('dialg click:', ev.target === dialogRef.current, ev.target, dialogRef.current)
    }

    const mouseDownEvent = (e) => {
        // console.log('mouseDownEvent', e.target)
        setMouseDown(e.target)
    }

    const mouseUpEvent = (e) => {
        // console.log('mouseUpEvent', e.target)
        setMouseUp(e.target)
    }

    return (
    <dialog ref={dialogRef}
        // onClose={onClose}
        onClick={dialogClick}
        onMouseDown={mouseDownEvent}
        onMouseUp={mouseUpEvent}
        className="light w-full m-auto max-w-6xl p-6 lg:justify-center lg:p-8 bg-transparen
            bg-[#FDFDFC] text-gray-500 dark:bg-[#0a0a0a]
            rounded-[calc(var(--radius-lg)+var(--spacing)*3)]
            "
        >
            {/*
            rounded-[calc(theme(borderRadius-lg)+var(--spacing)*4)]
            rounded-[calc(theme(borderRadius.lg)-1px)]
            rounded-[calc(var(--radius-lg)+var(--spacing)*3)]
            --lg:rounded-[calc(var(--radius-lg)+var(--spacing)*8)]
             */}
        <div className="todo-list-container flex flex-col items-center border
            border-purple-700 w-full rounded-md pb-8 pt-8
            bg-[#FDFDFC] --text-[#1b1b18] text-gray-500 dark:bg-[#0a0a0a]">
            <div className="heading flex flex-col items-center w-full">
                <h2 id="todo-title">Cover Letter</h2>
                <div className="w-full">

                    {children}
                    {/* <button
                    onClick={close}
                    >Close</button> */}
                    {/* <div className="w-full flex">
                        <div className="mx-8 --w-1 grow-3 flex justify-end items-start">
                            <button type="submit" className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                                focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                cursor-pointer"
                                // @click="addItem()"
                                onClick={onClose}
                                >Dialog close
                                <FontAwesomeIcon icon="fa-solid fa-plus-square"
                                    :className="[ item.name ? 'active' : 'inactive', 'plus']" />
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    </dialog>
    );
}

/** LogText console log text formatting */
const lt = (color='aqua', size=16) => {
    return `color:${color};font-size:${size}px;`
}

function CoverLetterBlock ({letters, title}: PageProps){

    const itemEmpty = {
        "hide" : false,
        "url" : '',
        "chat" : '',
        "company" : '',
        "contact_name" : '',
        "stage" : 'tpl',
        "status" : 'tpl',
        "title" : '',
        "info" : 'Info',
        "content" : '',
    }
    console.log('%c letters', 'color: yellow');
    console.table(letters);
    console.log(letters);
    const [CLDialogOpen, setCLDialogOpen] = useState(false);
    const [clItem, setClItem] = useState(itemEmpty);

    /** testin crash problem riced by headlessui */
    /*
    const [testLimit, setTestLimit] = useState(0);

    const testLimitHendler = () => {
        setTestLimit(n => {n++; return n;} )
        console.log('%c testLimitHendler', lt(), testLimit)
        setTimeout(() => {testLimitHendler()},100)
    }
    useEffect(() => {
        console.log('%c useEffect testLimit', lt(), testLimit)
        testLimitHendler()
    }, [])
    */

    const dialogFormOpen = () => {
        setCLDialogOpen(st=>!st);
    }

    const formHandler = {
        'setData': (e?:any)=>{console.log('no catch set data')},
        'setDataItem': (e?:any)=>{console.log('no catch set data')},
    }

    // set current item on form data
    const selectItem = (clItem:any) => {
        if(!clItem['stage']) clItem['stage'] = 'tpl'
        // console.log('clItem', clItem)
        // setClItem(clItem)
        formHandler['setData'](clItem)
        dialogFormOpen()
    }


    return (
        <>
                <div className="todo-list-container flex flex-col items-center border border-purple-700 w-full rounded-md pb-8 pt-8">
                    <div className="heading flex flex-col items-center w-full">
                        <div className="flex gap-2">

                            <h2 id="todo-title">Cover Letter List{/* (ev: {testLimit})*/}</h2>
                            <div className="shrnk-0 flex">
                                ( <a href="/cl-hidden" className="mx-1 underline"><EyeIcon aria-hidden="true" className="size-5" /></a> )
                            </div>
                        </div>
                            {/* <todo-form v-on:reloadlist="getList()"/> */}
                        {/* <CoverLetterForm /> */}
                        <div className="w-full">

                            <div className="mx-8 -w-full grow-3 flex justify-end items-start">
                                <button className=" mt-7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                                    focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
                                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
                                    cursor-pointer"
                                    // @click="addItem()"
                                    // onClick={dialogFormOpen}
                                    onClick={(ev)=>{selectItem(itemEmpty)}}
                                    >Add cover letter
                                    {/* <FontAwesomeIcon icon="fa-solid fa-plus-square"
                                        :className="[ item.name ? 'active' : 'inactive', 'plus']" /> */}
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <todo-list :items="items"
                        v-on:reloadlist="getList()"/> */}
                    <div className="w-full flex items-start justify-between pt-4 pl-4 pr-4 gap-4">
                        <div className="w-full flex flex-col items-center border border-purple-700 rounded-md pb-4 pt-4">
                            <h3>{title}:</h3>
                            <div className="w-full" key={"some"}>

                                {letters.data.map((cl,ind)=>(
                                    <CoverLetterItem key={cl.id}
                                        item={cl}
                                        select={selectItem}
                                        formHandler={formHandler}
                                    />
                                ))}

                            </div>
                            <Pagination data={letters} />
                        </div>
                    </div>
                </div>
                <CLDialog
                    isOpen={CLDialogOpen}
                    onClose={dialogFormOpen}
                    children={
                        <CoverLetterForm
                            item={clItem}
                            select={selectItem}
                            formHandler={formHandler}
                            close={dialogFormOpen}
                            dialogstate={CLDialogOpen}
                        />}
                />
        </>
    );
}


export default CoverLetterBlock;
// export {CoverLetterBlock}
