import { FaChartLine } from "react-icons/fa6";
import { LuMilk } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineInventory, MdAutoGraph } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";

export type DrawerData = {
    id: number;
    name: string;
    icon?: undefined | any;
    link: string;
}

export const drawerData: DrawerData[] = [
    {
        // dashboard 
        id: 1,
        name: "Dashboard",
        icon: FaChartLine,
        link: "main"
    },
    {
        // milk production
        id: 2,
        name: "Milk Production",
        icon: LuMilk,
        link: "milk-production"
    },
    {
        // sales
        id: 3,
        name: "Sales",
        icon: RiMoneyDollarCircleLine,
        link: "sales"
    },
    {
        // inventory management
        id: 4,
        name: "Inventory",
        icon: MdOutlineInventory,
        link: "inventory-management"
    },
    {
        // visualization
        id: 5,
        name: "Visualization",
        icon: MdAutoGraph,
        link: "visualization"
    },
    {
        //profile
        id: 6,
        name: "Profile",
        icon: FaUserEdit,
        link: "profile"
    }
]