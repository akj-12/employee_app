/** @format */

import { useQuery } from "@tanstack/react-query";
import { getAllCabins } from "../../services/cabinApi";

const CabinTable = () => {
    // Queries
    const {
        data: cabins,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["cabins"],
        queryFn: getAllCabins,
    });

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
                    <div
                        key={cabin.id}
                        className='grid grid-cols-6 text-center my-3 border-b-gray-300 border-b items-center '
                    >
                        <img
                            src={cabin.image}
                            height={100}
                            width={100}
                            alt={cabin.name}
                        />
                        <span>{cabin.name}</span>
                        <span>{cabin.maxCapacity}</span>
                        <span>{cabin.regularPrice}</span>
                        <span>{cabin.discount ? cabin.discount : "-"}</span>
                        <button>Add</button>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default CabinTable;
