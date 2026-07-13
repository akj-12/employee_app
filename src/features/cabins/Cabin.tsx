/** @format */

import type React from "react";
import type { Cabins } from "../../services/cabinApi";

type CabinProps = {
    cabin: Cabins;
    setIsModelOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Cabin = ({ cabin, setIsModelOpen }: CabinProps) => {
    return (
        <>
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
                <span className='text-green-700 font-bold'>
                    {cabin.discount ? cabin.discount : "-"}
                </span>
                <button onClick={() => setIsModelOpen?.(true)}>
                    Edit Delete Duplicate
                </button>
            </div>
        </>
    );
};

export default Cabin;
