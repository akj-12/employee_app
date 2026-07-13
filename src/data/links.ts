/** @format */
import type { IconType } from "react-icons";
import { LiaHomeSolid, LiaWarehouseSolid } from "react-icons/lia";

interface Links {
    label: string;
    href: string;
    title: string;
    icon?: IconType;
}

export const sideBarLinks: Links[] = [
    {
        label: "Dashboard",
        href: "dashboard",
        title: "Dashboard",
        icon: LiaHomeSolid,
    },
    {
        label: "Cabins",
        href: "cabins",
        title: "Cabins",
        icon: LiaWarehouseSolid,
    },
];
