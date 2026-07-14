/** @format */

import { useForm, type SubmitHandler } from "react-hook-form";

/** @format */
type Inputs = {
    name: string;
    discount: number;
    maxCapacity: number;
    regularPrice: number;
    description: string;
};

const CabinForm = () => {
    const { register, handleSubmit, formState } = useForm<Inputs>();

    const { errors } = formState;

    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm'>
            <h2 className='text-2xl font-semibold text-slate-900 mb-5'>
                Create Cabin
            </h2>
            <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-slate-700 mb-2'
                    >
                        Cabin Name
                    </label>
                    <input
                        id='name'
                        type='text'
                        {...register("name", {
                            required: "This feild is required",
                        })}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                        placeholder='Enter cabin name'
                    />
                    {errors.name?.message && (
                        <span className='text-red-500 mt-1'>
                            {errors?.name.message}
                        </span>
                    )}
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                        <label
                            htmlFor='image'
                            className='block text-sm font-medium text-slate-700 mb-2'
                        >
                            Upload image
                        </label>
                        <input
                            id='image'
                            name='image'
                            type='file'
                            accept='image/*'
                            className='block w-full text-sm text-slate-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-slate-100 file:text-slate-900 hover:file:bg-slate-200'
                        />
                    </div>
                    <div>
                        <label
                            htmlFor='regularPrice'
                            className='block text-sm font-medium text-slate-700 mb-2'
                        >
                            Price
                        </label>
                        <input
                            id='regularPrice'
                            type='number'
                            {...register("regularPrice", {
                                required: "This feild is required",
                            })}
                            min='1'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                            placeholder='400'
                        />
                        {errors.regularPrice?.message && (
                            <span className='text-red-500 mt-1'>
                                {errors?.regularPrice.message}
                            </span>
                        )}
                    </div>
                </div>
                <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                    <div>
                        <label
                            htmlFor='discount'
                            className='block text-sm font-medium text-slate-700 mb-2'
                        >
                            Discount (%)
                        </label>
                        <input
                            id='discount'
                            {...register("discount", {
                                required: "This feild is required",
                                validate: (currentVal, values) => {
                                    if (
                                        currentVal > Number(values.regularPrice)
                                    ) {
                                        return "Discount price must be less than price";
                                    }
                                },
                            })}
                            type='number'
                            min='0'
                            step='0.01'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                            placeholder='0'
                        />
                        {errors.discount?.message && (
                            <span className='text-red-500 mt-1'>
                                {errors?.discount.message}
                            </span>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor='maxCapacity'
                            className='block text-sm font-medium text-slate-700 mb-2'
                        >
                            Max Capacity
                        </label>
                        <input
                            id='maxCapacity'
                            {...register("maxCapacity", {
                                required: "This feild is required",
                            })}
                            type='number'
                            min='1'
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                            placeholder='4'
                        />
                        {errors.maxCapacity?.message && (
                            <span className='text-red-500 mt-1'>
                                {errors?.maxCapacity.message}
                            </span>
                        )}
                    </div>
                </div>

                <div>
                    <label
                        htmlFor='description'
                        className='block text-sm font-medium text-slate-700 mb-2'
                    >
                        Description
                    </label>
                    <textarea
                        id='description'
                        {...register("description", {
                            required: "This feild is required",
                        })}
                        rows={5}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                        placeholder='Write a short description for the cabin'
                    />
                    {errors.description?.message && (
                        <span className='text-red-500 mt-1'>
                            {errors?.description.message}
                        </span>
                    )}
                </div>
                <button
                    type='submit'
                    className='inline-flex items-center justify-center rounded-lg bg-gray-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-gray-700'
                >
                    Add Cabin
                </button>
            </form>
        </div>
    );
};

export default CabinForm;
