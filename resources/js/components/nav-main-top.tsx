


function NavMainTop() {
    return (
        <>
            <div className="flex justify-center mt-4 sm:items-center sm:justify-between">
                <div className="text-center text-sm text-gray-500 sm:text-left">
                    <div className="flex items-center gap-5">
                        <a href="/" className="ml-1 underline">
                            Home
                        </a>
                        <a href="/todos" className="ml-1 underline">
                            Todos
                        </a>
                        <a href="/coverletters" className="ml-1 underline">
                            Cover Letters
                        </a>
                    </div>
                </div>

                <div className="ml-4 text-center text-sm text-gray-500 sm:text-right sm:ml-0">
                </div>
            </div>
        </>
    )
}

export {
    NavMainTop
}
