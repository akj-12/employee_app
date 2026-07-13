/** @format */

import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/cabinApi";
import Cabin from "./Cabin";
import OverLay from "../../ui/OverLay";
import { useState } from "react";

const CabinTable = () => {
    const [isModelOpen, setIsModelOpen] = useState(false);

    // Queries
    const {
        data: cabins,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getAllCabins,
    });

    function onCloseModel() {
        setIsModelOpen(false);
    }

    console.log(cabins, isError, isLoading);

    return (
        <div role='table'>
            <header
                role='row'
                className='table_header rounded-md mt-5 grid grid-cols-6 text-center  bg-gray-700 text-cyan-50 p-3 uppercase'
            >
                <div></div>
                <div>Cabins</div>
                <div>capacity</div>
                <div>price</div>
                <div>discount</div>
                <div></div>
            </header>

            <section className='table_content' role='row'>
                {cabins?.map((cabin) => (
                    <Cabin cabin={cabin} key={cabin.id} setIsModelOpen={ setIsModelOpen} />
                ))}
            </section>
            {isModelOpen && (
                <OverLay onClose={onCloseModel}>
                    <h1>Hello I am content</h1>
                </OverLay>
            )}
        </div>
    );
};

export default CabinTable;
