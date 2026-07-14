/** @format */

const CabinForm = () => {
    //   const [form, setForm] = useState({
    //     cabinName: '',
    //     discount: '',
    //     maxCapacity: '',
    //     description: '',
    //     image: null as File | null,
    //   })

    //   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //     const { name, value } = e.target
    //     setForm((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }))
    //   }

    //   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     const file = e.target.files?.[0] ?? null
    //     setForm((prev) => ({
    //       ...prev,
    //       image: file,
    //     }))
    //   }

    //   const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault()
    //     const payload = {
    //       ...form,
    //       discount: Number(form.discount),
    //       maxCapacity: Number(form.maxCapacity),
    //     }
    //     console.log('Submitting cabin', payload)
    //   }

    return (
        <div className='max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm'>
            <h2 className='text-2xl font-semibold text-slate-900 mb-5'>
                Create Cabin
            </h2>
            <form className='space-y-6'>
                <div>
                    <label
                        htmlFor='name'
                        className='block text-sm font-medium text-slate-700 mb-2'
                    >
                        Cabin Name
                    </label>
                    <input
                        id='name'
                        name='name'
                        type='text'
                        value=''
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                        placeholder='Enter cabin name'
                        required
                    />
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
                            name='discount'
                            type='number'
                            min='0'
                            step='0.01'
                            value=''
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                            placeholder='0'
                        />
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
                            name='maxCapacity'
                            type='number'
                            min='1'
                            value=''
                            className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                            placeholder='4'
                            required
                        />
                    </div>
                </div>
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
                        htmlFor='price'
                        className='block text-sm font-medium text-slate-700 mb-2'
                    >
                        Price
                    </label>
                    <input
                        id='regularPrice'
                        name='regularPrice'
                        type='number'
                        min='1'
                        value=''
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                        placeholder='400'
                        required
                    />
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
                        name='description'
                        value=''
                        rows={5}
                        className='w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-sky-500 focus:ring-sky-500'
                        placeholder='Write a short description for the cabin'
                    />
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
