import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useCreateCategoryMutation, useGetCategoryQuery } from '../../../Redux/APIs/CategoryApi'
import { Success, Danger } from './../../Alerts';
import { ImSpinner7 } from 'react-icons/im'
import moment from 'moment';
import { BsTrash } from 'react-icons/bs'
import { FeaturesAction } from './../../../Redux/Slices/FeaturesSlice';
import CategoryInfo from './Sub_Layouts/CategoryInfo';
import { AddImage, TodoList, AddSpecs } from '../../Exports'
const AddCategory = () => {
    const [id, setId] = useState('');
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState({
        category: '', des: ''
    });
    const [title, setTitle] = useState();
    const [nameOfSub, setnameOfSub] = useState([]);
    console.log(nameOfSub)
    const addTag = e => {
        e.preventDefault();
        e.stopPropagation();
        const tag = title;
        setTitle('');
        if (nameOfSub.includes(tag)) return;
        setnameOfSub(nameOfSub => ([...nameOfSub, tag]));
    };
    const [image, setImage] = useState([]);
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
            }
        }
    }
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const { data: Category, isFetching, isError } = useGetCategoryQuery();
    const [createCategory, { isLoading, isSuccess, error }] = useCreateCategoryMutation();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { category, des } = inputs;
        const data = { category, nameOfSub, des, image }
        // if (!category || !image || !nameOfSub || !des) return {};
        createCategory(data).unwrap()
            .then((payload) => console.log('fulfilled', payload))
            .catch((error) => console.error('rejected', error.data.msg));
        setImage('')
        setInputs({ category: '', des: '', nameOfSub: '' });
        console.log(error.data.msg);
    }
    const PreviewImeges = (props) => {
        return (
            <>
                <img className='relative object-cover max-h-40 rounded-lg' src={props.img} alt='' />
                <button className='text-red-500 font-semibold hover:underline mt-3 ml-auto block' onClick={props.onClick}>Remove Image</button>
            </>
        )
    }
    return (
        <>
            {error && <Danger error={error.data.msg} className={'container my-5'} />}
            {isSuccess && <Success error={'Category added Succeefully'} className={'container my-5'} />}
            <>
                <CategoryInfo id={id} />
                <div className='container px-0 max-w-8xl'>
                    <form onSubmit={handleSubmit} className='px-6 rounded-xl py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-8'>
                            <div className='rounded-lg lg:border lg:px-10 col-span-1 max-h-[52rem]'>
                                <div className='mt-4'>
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Category Name</label>
                                    <input onChange={handleChange} value={inputs.category} name='category' className='inputfield w-full !placeholder:text-xs' type='text' placeholder='Product name' />
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Discription</label>
                                    <input onChange={handleChange} value={inputs.des} name='des' min='0' className='inputfield w-full !placeholder:text-xs' type='text' placeholder='Add Some Words discribing the category' />
                                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Sub Categoreies</label>

                                    <div className="mt-5">
                                        {nameOfSub?.map((tag, index) => (
                                            <div key={index} className="flex justify-between items-center">
                                                <span className="text-lg font-medium truncate">{tag}</span>
                                                <button onClick={() => setnameOfSub(nameOfSub => nameOfSub.filter(t => t !== tag))}><BsTrash /></button>
                                            </div>
                                        ))}
                                        <div className='flex gap-5 items-center'>
                                            <input className="inputfield w-full" onChange={e => setTitle(e.target.value)}
                                                type="text" value={title} name='title' placeholder="Enter Sub Categoreies" />
                                            <button onClick={addTag} className="border rounded-xl px-5 py-0 h-14 hover:bg-gray-200 focus:bg-gray-300" >+</button>
                                        </div>
                                    </div>
                                </div>
                                <p className='my-4 font-serif text-lg'>Add Image</p>
                                <AddImage onChange={loadFile} />
                                {image && <PreviewImeges img={image} onClick={() => setImage()} />}
                                <button type='submit' className='btn-success' disabled={isLoading}>
                                    {isLoading ? <span className='flex items-center justify-center text-2xl py-1 animate-spin'><ImSpinner7 /> </span> : 'Submit'}</button>                            </div>
                            <div className="overflow-x-auto relative shadow-md sm:rounded-lg mt-5 col-span-2">
                                {isFetching ? <p>Loading ........</p> : isError ? <p>Error</p> :
                                    <table className="w-full text-sm text-left text-gray-500 mt-5">
                                        <thead className="text-xs text-gray-700 uppercase border-b-2 py-3">
                                            <tr className=''>
                                                <th scope="col" className="py-3 pl-5">Image</th>
                                                <th scope="col" className="py-3">Category</th>
                                                <th scope="col" className="py-3">Active ?</th>
                                                <th scope="col" className="py-3">Date</th>
                                                {/* <th scope="col" className="py-3 px-6"></th> */}
                                            </tr>
                                        </thead>

                                        <tbody onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo())}>
                                            {Category &&
                                                Category?.map(cat => (
                                                    <tr className="bg-white border-b hover:bg-gray-50 cursor-pointer" key={cat._id} onClick={() => setId(cat._id)}>
                                                        <td className="flex items-center py-4 justify-start ml-7">
                                                            <img className="w-10 h-10 rounded-full object-cover" src={cat.image && cat?.image.url} alt="" />
                                                        </td>
                                                        <td className="font-normal text-gray-500 ">{cat.category}</td>
                                                        <td className="py-4"><span className={(`${cat.isActive}` === 'true') ? 'bg-green-200 text-green-500 rounded-full text-base px-8 py-1.5' : 'bg-red-200 text-red-500 rounded-full text-base px-8 py-1.5'}>{cat.isActive.toString()}</span></td>
                                                        <td className="py-4 px-6">{moment(cat.createdAt).format('Do MMMM YYYY')}</td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </form>
                </div>
            </>
        </>
    )
}

export default AddCategory