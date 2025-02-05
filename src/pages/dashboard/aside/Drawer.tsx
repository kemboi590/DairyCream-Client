import { useState } from "react"
import { drawerData } from "../../../components/drawer/drawerData"
// import { FaBars } from "react-icons/fa6"
import { MdClose } from "react-icons/md"
import { Link } from "react-router-dom"
import { FaCircleArrowRight } from "react-icons/fa6";

export const Drawer = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleDrawer = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <button
                className="lg:hidden btn btn-ghost btn-circle fixed top-4 left-4 z-50 text-white"
                onClick={toggleDrawer}
            >
                <FaCircleArrowRight size={24} />
            </button>
            <div
                className={`fixed inset-0 z-40 bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleDrawer}
            ></div>
            <div
                className={`fixed inset-0 z-50 w-64 bg-white transform transition-transform lg:static lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="p-4 h-full">
                    <button onClick={toggleDrawer} className='btn btn-ghost btn-circle absolute top-4 right-4 lg:hidden'>
                        <MdClose size={24} />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Menu</h2>
                    <ul className="menu">
                        {drawerData.map((item) => (
                            <li key={item.id}>
                                <Link to={item.link} className="flex items-center space-x-2 border-b-2 border-transparent hover:border-blue-600" onClick={toggleDrawer}>
                                    <item.icon size={20} />
                                    <span className="text-lg ">
                                        {item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Drawer