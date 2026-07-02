import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function Layout({ children }) {

    return (

        <div className="flex bg-gray-100">

            <Sidebar/>

            <div className="flex-1 flex flex-col">

                <Navbar/>

                <main className="p-8">

                    {children}

                </main>

            </div>

        </div>

    );

}