/** @format */

import { Link } from "react-router-dom";
import { sideBarLinks } from "../data/links";
import { LiaHomeSolid } from "react-icons/lia";

const SideBar = () => {
    return (
        <aside className='row-span-2 rounded-3xl border border-gray-300 bg-white p-6 shadow-md '>
            <div className='logo'>
                <img src='logo-light.png' alt='Logo' />
            </div>
            <nav className='mt-7'>
                <ul className='flex flex-col gap-6'>
                    {sideBarLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <li
                                key={link.href}
                                className='border-b border-gray-200 p-2'
                            >
                                <Link
                                    to={link.href}
                                    title={link.title}
                                    className='flex gap-2 align-baseline'
                                >
                                    <span>
                                        {Icon ? <Icon size={20} /> : null}
                                    </span>
                                    <span className='uppercase'>
                                        {link.label}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
