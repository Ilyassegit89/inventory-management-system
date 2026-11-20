function createNavbar(){
    return (
         <div className="flex items-center justify-between px-6 py-4">

            <div>
                <h2 className="text-xl font-semibold text-slate-800">
                    Dashboard
                </h2>
                <p className="text-sm text-slate-500">
                    Welcome back!
                </p>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right">
                    <p className="text-sm font-semibold text-slate-800">
                        Admin User
                    </p>
                    <p className="text-xs text-slate-500">
                        Administrator
                    </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
                    A
                </div>
            </div>

        </div>
    )
}

export default createNavbar;