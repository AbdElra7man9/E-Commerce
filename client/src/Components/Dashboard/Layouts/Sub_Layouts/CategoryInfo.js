import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { Fetch_Category_Details } from '../../../../Redux/Actions/CategoryAction';
import { CgPushLeft } from 'react-icons/cg';
import { AddImage, ModalConfirm } from '../../../Exports';

import PreviewImege from './PreviewImege';
import { Delete_Category } from '../../../../Redux/Actions/CategoryAction';
const CategoryInfo = (props) => {
    const { CategoryDetails } = useSelector((state) => state.Category);
    const { SideCategoryInfo, IsModalConfirm } = useSelector(state => state.Features);
    const dispatch = useDispatch();
    const [image, setImage] = useState();
    const [addimage, setAddImage] = useState();
    const [newimage, setNewImage] = useState();
    const handleimage = () => {
        setImage();
        setAddImage(<AddImage />);
    }
    const loadFile = (e) => {
        for (const file of e.target.files) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setNewImage(reader.result);
            }
        }
    }
    const Handle_Delete = () => {
        const id = CategoryDetails._id
        dispatch(Delete_Category(id));
    }
    useEffect(() => {
        dispatch(Fetch_Category_Details(props.id));
    }, [dispatch, props.id]);
    useEffect(() => {
        setImage(CategoryDetails.image && CategoryDetails.image.url)

    }, [CategoryDetails.image, setImage]);
    return (
        SideCategoryInfo &&

        <>
            {IsModalConfirm && <ModalConfirm onAgree={Handle_Delete} Message={'Are you sure you want to delete this Category?'} />}
            <div onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] xxl:w-[30%] z-30 bg-white shadow-xl fixed right-0 top-0 overflowy-y-auto '>
                <div className='py-2 pt-3 bg-[#F6F8F9] px-16 flex items-center justify-between'>
                    <button className='text-gray-600 hover:bg-gray-200 focus:bg-gray-300 p-3 px-3.5 duration-200 rounded-full' onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo(false))}><CgPushLeft style={{ fontSize: '2rem' }} /></button>
                    <button className='bg-blue-500 rounded-md text-base font-semibold text-white px-4 py-2 mb-3 focus:bg-blue-400'>Save Changes</button>
                </div><hr />
                <div className='mx-16'>
                    <p className='text-2xl font-semibold font-serif py-5'>Edit Category</p>
                    <label className='text-sm py-3 font-light font-serif text-gray-500'>Category Name</label>
                    <input defaultValue={CategoryDetails.category} name='category' className='inputfield w-full' type='text' placeholder='Product name' />
                    {addimage &&
                        <>
                            <label className='text-sm font-light font-serif text-gray-500 mb-3'>Category Name</label>
                            <AddImage onChange={loadFile} Hight={'!h-32'} IsMultiple={false} />
                        </>}
                    {image ? <PreviewImege onClick={handleimage} img={image} /> : newimage && <PreviewImege onClick={() => setNewImage()} img={newimage} />}
                    <div className='flex items-center my-6'>
                        <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Sub Categories</label>
                        <hr className='w-full border-t-2 bg-gray-300'></hr>
                    </div>
                    <div className='grid grid-cols-2 mt-5 gap-5'>
                        {CategoryDetails.subcategory?.map(cat => (
                            <input defaultValue={cat.nameOfSub} key={cat._id} name='category' className='inputfield w-full' type='text' placeholder='Product name' />
                        ))}
                    </div>
                    <div className='flex items-center my-6'>
                        <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Description</label>
                        <hr className='w-full border-t-2 bg-gray-300'></hr>
                    </div>
                    <p className='text-sm text-gary-600 font-poppins'>{CategoryDetails.des}</p>
                    <div className='flex items-center my-10'>
                        <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Danger Zone</label>
                        <hr className='w-full border-t-2 bg-gray-300'></hr>
                    </div>
                    <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>Onece you delete this category customers will not able to access it again, also all sub categories will be lost</p>
                    <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))} className='bg-red-100 rounded-md text-base font-semibold text-red-400 px-4 py-2 mb-3 focus:bg-red-200'>Delete Category</button>
                </div>
            </div>
        </>
    )
}

export default CategoryInfo
