/** @format */

import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

const AppLayout = () => {
    return (
        <div className='h-screen bg-gray-100 p-4'>
            <div className='grid h-full grid-cols-[250px_1fr] grid-rows-[80px_1fr] gap-4'>
                <SideBar />
                <Header />
                <main className='rounded-3xl border-2 border-black bg-white p-6 shadow-md overflow-y-auto'>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
