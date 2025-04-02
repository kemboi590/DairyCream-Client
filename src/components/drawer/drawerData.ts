import { FaChartLine, FaCow } from "react-icons/fa6";
import { LuMilk } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
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
        // farmer-livestock
        id: 2,
        name: "Farmer Livestock",
        icon: FaCow,
        link: "farmer-livestock"
    },
    {
        // milk production
        id: 3,
        name: "Milk Production",
        icon: LuMilk,
        link: "milk-production"
    },
    {
        // sales
        id: 4,
        name: "Sales",
        icon: RiMoneyDollarCircleLine,
        link: "sales"
    },
    {
        // inventory management
        id: 5,
        name: "Inventory",
        icon: MdOutlineInventory,
        link: "inventory-management"
    },
    // {
    //     // visualization
    //     id: 6,
    //     name: "Visualization",
    //     icon: MdAutoGraph,
    //     link: "visualization"
    // },
    {
        //profile
        id: 7,
        name: "Profile",
        icon: FaUserEdit,
        link: "profile"
    }
    // {
    //     // livestock
    //     id: 8,
    //     name: "Admin Livestock",
    //     icon: FaCow,
    //     link: "livestock"
    // },
]