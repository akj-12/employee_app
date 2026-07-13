/** @format */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Cabins from "./pages/Cabins";
import AppLayout from "./ui/AppLayout";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route
                        index
                        element={<Navigate replace to='dashboard' />}
                    />
                    <Route path='dashboard' element={<Dashboard />} />
                    <Route path='cabins' element={<Cabins />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
