/** @format */

import { useForm, type SubmitHandler } from "react-hook-form";
import { createCabin } from "../../services/cabinApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormField from "../../ui/FormField";

/** @format */
export type Inputs = {
    name: string;
    discount: number;
    maxCapacity: number;
    regularPrice: number;
    description: string;
    image: string;
};

const classForInput =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500";

const CabinForm = () => {
    const { register, formState, getValues } = useForm<Inputs>();
    // Access the client
    const queryClient = useQueryClient();

    // Mutations - mutationFn should accept the form data, not the click event
    const mutation = useMutation({
        mutationFn: (data: Inputs) => createCabin(data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const { errors } = formState;

    /**
     * onSubmit={handleSubmit(onSubmit)}
     * const onSubmit: SubmitHandler<Inputs> = async (data) => {
           const res = await createCabin(data);
           console.log(res);
        };
     */

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const values = getValues();
        mutation.mutate(values);
    };

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm'>
            <h2 className='text-2xl font-semibold text-slate-900 mb-5'>
                Create Cabin
            </h2>
            <form className='space-y-6'>
                <div>
                    <FormField id='name' label='Cabin Name' errors={errors}>
                        <input
                            id='name'
                            type='text'
                            {...register("name", {
                                required: "This feild is required",
                            })}
                            className={classForInput}
                            placeholder='Enter cabin name'
                        />
                    </FormField>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                        <FormField
                            id='image'
                            label='Upload image'
                            errors={errors}
                        >
                            <input
                                id='image'
                                type='file'
                                accept='image/*'
                                {...register("image", {
                                    required: "This feild is required",
                                })}
                                className='block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-900 hover:file:bg-slate-200'
                            />
                        </FormField>
                    </div>
                    <div>
                        <FormField
                            id='regularPrice'
                            label='Price'
                            errors={errors}
                        >
                            <input
                                id='regularPrice'
                                type='number'
                                {...register("regularPrice", {
                                    required: "This feild is required",
                                    valueAsNumber: true,
                                })}
                                min='1'
                                className={classForInput}
                                placeholder='400'
                            />
                        </FormField>
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                        <FormField
                            id='discount'
                            label='Discount'
                            errors={errors}
                        >
                            <input
                                id='discount'
                                {...register("discount", {
                                    required: "This feild is required",
                                    valueAsNumber: true,
                                    validate: (currentVal, values) => {
                                        if (
                                            currentVal >
                                            Number(values.regularPrice)
                                        ) {
                                            return "Discount price must be less than price";
                                        }
                                    },
                                })}
                                type='number'
                                min='0'
                                step='0.01'
                                className={classForInput}
                                placeholder='0'
                            />
                        </FormField>
                    </div>
                    <div>
                        <FormField
                            id='maxCapacity'
                            label='Max Capacity'
                            errors={errors}
                        >
                            <input
                                id='maxCapacity'
                                {...register("maxCapacity", {
                                    required: "This feild is required",
                                    valueAsNumber: true,
                                })}
                                type='number'
                                min='1'
                                className={classForInput}
                                placeholder='4'
                            />
                        </FormField>
                    </div>
                </div>

                <div>
                    <FormField
                        id='description'
                        label='description'
                        errors={errors}
                    >
                        <textarea
                            id='description'
                            {...register("description", {
                                required: "This feild is required",
                            })}
                            rows={5}
                            className={classForInput}
                            placeholder='Write a short description for the cabin'
                        />
                    </FormField>
                </div>
                <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-lg bg-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700'
                    onClick={handleSubmit}
                >
                    Add Cabin
                </button>
            </form>
        </div>
    );
};

export default CabinForm;
