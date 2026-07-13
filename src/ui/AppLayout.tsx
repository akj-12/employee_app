/** @format */

import { Outlet } from "react-router-dom";

const AppLayout = () => {
    return (
        <div>
            <h1>Header</h1>
            <p>sidebar</p>
            <nav>navbar</nav>
            <Outlet />
        </div>
    );
};

export default AppLayout;
