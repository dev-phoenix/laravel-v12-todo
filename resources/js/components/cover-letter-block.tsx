
/*
resource
url
company
name
status
info
text
*/

import { CoverLetterForm } from "./cover-letter-form";
import { CoverLetterItem } from "./cover-letter-item";

interface CoverLetter {
    id: number,
    resource: string,
    url: string,
    company: string,
    name: string,
    status: string,
    info: string,
    text: string,
}

interface PageProps {
    letters: CoverLetter[],
}

export default function CoverLetterBlock ({letters}: PageProps){
    return (
        <>
                <div className="todo-list-container flex flex-col items-center border border-purple-700 w-full rounded-md pb-8 pt-8">
                    <div className="heading flex flex-col items-center w-full">
                        <h2 id="todo-title">Todo List</h2>
                            {/* <todo-form v-on:reloadlist="getList()"/> */}
                            <CoverLetterForm />
                    </div>
                    {/* <todo-list :items="items"
                        v-on:reloadlist="getList()"/> */}
                    <div className="w-full flex items-start justify-between pt-4 pl-4 pr-4 gap-4">
                        <div className="w-full flex flex-col items-center border border-purple-700 w-full rounded-md pb-4 pt-4">
                            <h3>Cover Letters:</h3>
                            {/* <TodoList todos={incompleteTodos}/> */}
                            {letters.map((cl,ind)=>{
                                <>
                                <CoverLetterItem item={cl} />
                                </>
                            })}
                        </div>
                    </div>
                </div>
        </>
    );
}
