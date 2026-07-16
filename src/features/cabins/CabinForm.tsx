/** @format */

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/cabinApi";
import FormField from "../../ui/FormField";
import Toast from "../../ui/Toast";
import type { Inputs } from "../../types/types";

const classForInput =
    "w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500";

const CabinForm = () => {
    const [toast, setToast] = useState<{
        message?: string;
        error?: Error | string | null;
        type: "success" | "error" | "info";
    } | null>(null);

    const { register, handleSubmit, formState } = useForm<Inputs>();
    // Access the client
    const queryClient = useQueryClient();

    // Mutations - mutationFn should accept the form data, not the click event
    const mutation = useMutation({
        mutationFn: (data: Inputs) => createCabin(data),
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ["todos"] });
            setToast({
                message: "Cabin created successfully!",
                type: "success",
            });
        },
        onError: (err: any) => {
            setToast({
                error: err,
                type: "error",
            });
        },
    });

    const { errors } = formState;

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        mutation.mutate(data);
    };

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm'>
            <h2 className='text-2xl font-semibold text-slate-900 mb-5'>
                Create Cabin
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                >
                    Add Cabin
                </button>
            </form>
            {toast && (
                <Toast
                    message={toast.message}
                    error={toast.error}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </div>
    );
};

export default CabinForm;
