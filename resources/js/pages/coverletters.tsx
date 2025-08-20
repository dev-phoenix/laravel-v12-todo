import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { TodoBlock } from '@/components/todo-block';
import { TdHeader } from '@/components/todo/todo-ui';
import { LogoSvg } from '@/components/logo-svg';
import { NavMainTop } from '@/components/nav-main-top';
import CoverLetterBlock from '@/components/cover-letter-block';

interface Todo {
    id: number,
    name: string,
    completed: boolean,
    completed_at: string,
}

interface PageProps {
    completeTodos: Todo[],
    incompleteTodos: Todo[],
    laraVersion: string,
    phpVersion: string,
}
/*
resource
url
company
name
status
info
text
*/

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
    laraVersion: string,
    phpVersion: string,
}

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const { letters,
        laraVersion, phpVersion }: PageProps = usePage().props as PageProps;
    // console.log('letters', letters);

    return (
        <>
            <div className="flex min-h-screen flex-col items-center bg-[#FDFDFC] p-6 text-[#1b1b18] lg:justify-center lg:p-8 dark:bg-[#0a0a0a]">

                <TdHeader title="Todo List" />
                <div className="mt-4 max-w-6xl mx-auto sm:px-6 lg:px-8 w-full">
                    <NavMainTop />
                    <div id="-app" className=" mt-4 text-gray-500 todo-container mb-4">
                        {/* <TodoBlock incompleteTodos={incompleteTodos} completeTodos={completeTodos}/> */}
                        <CoverLetterBlock letters={letters} />
                    </div>
                    <div className="flex justify-center mt-4 mb-4 sm:items-center sm:justify-between">
                        <div className="text-center text-sm text-gray-500 sm:text-left">
                            <div className="flex items-center">{/* --stroke="currentColor" */}
                                <svg fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"

                                    className="--ml-4 -mt-px w-5 h-5 text-fuchsia-500 stroke-fuchsia-500 stroke-fuchsia-500">
                                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                </svg>

                            </div>
                        </div>

                        <div className="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                            Laravel v{ laraVersion } (PHP v{ phpVersion })
                        </div>
                    </div>
                </div>

                <div className="flex w-full items-start justify-center opacity-100 transition-opacity duration-750 lg:grow starting:opacity-0">
                    <main className="h-[200px] flex w-full max-w-[335px] flex-col-reverse lg:max-w-4xl lg:flex-row">
                        <div className="flex-1 rounded-br-lg rounded-bl-lg bg-white p-6 pb-12 text-[13px] leading-[20px] shadow-[inset_0px_0px_0px_1px_rgba(26,26,0,0.16)] lg:rounded-tl-lg lg:rounded-br-none lg:p-10 dark:bg-[#161615] dark:text-[#EDEDEC] dark:shadow-[inset_0px_0px_0px_1px_#fffaed2d]">
                            <h1 className="mb-1 font-medium">Laravel v12 Todo list</h1>
                            <p className="mb-2 text-[#706f6c] dark:text-[#A1A09A]">
                                Laravel 12, Tailwindcss 4, React.js 19,
                                <br />
                                MySQL, Fontawesome icons.
                            </p>
                            <ul className="flex gap-3 text-sm leading-normal">
                                {/* <li>
                                    <a
                                        href="https://cloud.laravel.com"
                                        target="_blank"
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Deploy now
                                    </a>
                                </li> */}
                                <li>
                                    <a
                                        href="/"
                                        target="_self"
                                        className="inline-block rounded-sm border border-black bg-[#1b1b18] px-5 py-1.5 text-sm leading-normal text-white hover:border-black hover:bg-black dark:border-[#eeeeec] dark:bg-[#eeeeec] dark:text-[#1C1C1A] dark:hover:border-white dark:hover:bg-white"
                                    >
                                        Home
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <LogoSvg />
                    </main>
                </div>
                {/* <div className="hidden h-14.5 lg:block"></div> */}
            </div>
        </>
    );
}
