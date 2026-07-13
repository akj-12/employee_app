/** @format */

import { useEffect } from "react";
import { getAllCabins } from "../../services/cabinApi";

const CabinTable = () => {
    useEffect(function () {
        async function fetchRecords() {
            const cabins = await getAllCabins();
        }

        fetchRecords();
    }, []);
    return <div>CabinTable</div>;
};

export default CabinTable;
