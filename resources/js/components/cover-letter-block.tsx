
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

interface PageProps {
    letters: CoverLetter[],
    title: string,
}
interface DialogArgs {
    isOpen: any,
    onClose: any,
    children: any,
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
    // console.log('%c letters', 'color: yellow');
    // console.table(letters);
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

                                {letters.map((cl,ind)=>(
                                    <CoverLetterItem key={cl.id}
                                        item={cl}
                                        select={selectItem}
                                        formHandler={formHandler}
                                    />
                                ))}

                            </div>
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
