import { useState } from "react";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="min-h-screen bg-gray-100 flex">

            <Sidebar
                open={sidebarOpen}
                setOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col min-w-0">

                <Navbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">

                    {children}

                </main>

            </div>

        </div>

    );

}