import { Outlet } from "react-router-dom"
import Navbar from "../../components/Navbar"
import Drawer from "./aside/Drawer"

export const Dashboard = () => {
    return (
        <>
            <Navbar />
            <div className="flex">
                <aside className="lg:w-64 h-full bg-white shadow-lg">
                    <Drawer />
                </aside>
                <main className="flex-1 p-4 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </>

    )
}

export default Dashboard