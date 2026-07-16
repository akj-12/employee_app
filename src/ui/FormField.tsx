/** @format */

import type { FieldErrors } from "react-hook-form";
import type { Inputs } from "../features/cabins/CabinForm";

type Props = {
    errors: FieldErrors<Inputs>;
    label?: string;
    id?: string;
    children?: React.ReactNode;
};

const FormField = ({ errors, label, id, children }: Props) => {
    return (
        <>
            <label
                htmlFor={id}
                className='block text-sm font-medium text-slate-700 mb-2'
            >
                {label}
            </label>

            {children}

            {id && errors[id as keyof typeof errors]?.message && (
                <span className='text-red-500 mt-1'>
                    {errors[id as keyof typeof errors]?.message}
                </span>
            )}
        </>
    );
};

export default FormField;
