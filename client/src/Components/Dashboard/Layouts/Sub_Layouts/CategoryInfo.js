import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { useDeleteCategoryMutation, useUpdateCategoryMutation, useGetCategoryDetailsQuery } from '../../../../Redux/APIs/CategoryApi';
import { CgPushLeft } from 'react-icons/cg';
import { ImSpinner7 } from 'react-icons/im'
import { AddImage, ModalConfirm } from '../../../Exports';
import PreviewImege from './PreviewImege';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const CategoryInfo = (props) => {
    const id = props.id
    const { data: CategoryDetails } = useGetCategoryDetailsQuery(id) || {};
    const { SideCategoryInfo, IsModalConfirm } = useSelector(state => state.Features);
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteCategoryMutation(id);
    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
    const dispatch = useDispatch();
    const [oldimage, setOldImage] = useState();
    const [addimage, setAddImage] = useState();
    const [image, setNewImage] = useState();
    const [category, setCategory] = useState();
    const [nameOfSub, setNameOfSub] = useState();
    const [des, setDes] = useState();
    const handleimage = () => {
        setOldImage();
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
    const Handle_Delete = async () => {
        await deleteCategory(id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
        dispatch(FeaturesAction.Show_SideCategoryInfo(false));
        dispatch(FeaturesAction.Show_ModalConfirm(false));
    }
    const HandleUpdate_Submit = async (e) => {
        const data = { des, category, nameOfSub, image }
        e.preventDefault();
        if (!category && !des && !image && !nameOfSub) return {};
        await updateCategory({ id, data }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    useEffect(() => {
        setOldImage(CategoryDetails?.image && CategoryDetails?.image.url);
    }, [setOldImage, CategoryDetails]);
    return (
        SideCategoryInfo &&
        <>
            {IsModalConfirm && <ModalConfirm onAgree={Handle_Delete} Message={'Are you sure you want to delete this Category?'} />}
            <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
            <div onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo(false))} className="fixed inset-0 bg-gray-800 bg-opacity-80 transition-opacity z-20"></div>
            <div className='h-screen w-full sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] xxl:w-[30%] z-30 bg-white shadow-xl fixed right-0 top-0  '>
                <div className='overflow-y-auto'>
                    <div className='py-2 pt-3 bg-[#F6F8F9] px-16 flex items-center justify-between relative'>
                        <button className='text-gray-600 hover:bg-gray-200 focus:bg-gray-300 p-3 px-3.5 duration-200 rounded-full' onClick={() => dispatch(FeaturesAction.Show_SideCategoryInfo(false))}><CgPushLeft style={{ fontSize: '2rem' }} /></button>
                    </div><hr />
                    {CategoryDetails && <div className='mx-16'>
                        <form onSubmit={HandleUpdate_Submit} >
                            <p className='text-2xl font-semibold font-serif py-5'>Edit Category</p>
                            <label className='text-sm py-3 font-light font-serif text-gray-500'>Category Name</label>
                            <input defaultValue={CategoryDetails.category} onChange={(e) => setCategory(e.target.value)} name='category' className='inputfield w-full' type='text' placeholder='Product name' />
                            {addimage &&
                                <>
                                    <label className='text-sm font-light font-serif text-gray-500 mb-3'>Category Name</label>
                                    <AddImage onChange={loadFile} Hight={'!h-32'} IsMultiple={false} />
                                </>}
                            {oldimage ? <PreviewImege onClick={handleimage} img={oldimage} /> : image && <PreviewImege onClick={() => setNewImage()} img={image} />}
                            <div className='flex items-center my-6'>
                                <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Sub Categories</label>
                                <hr className='w-full border-t-2 bg-gray-300'></hr>
                            </div>
                            <div className='grid grid-cols-2 mt-5 gap-5'>
                                {CategoryDetails.subcategory?.map(cat => (
                                    <input defaultValue={cat.nameOfSub} onChange={(e) => setNameOfSub(e.target.value)} key={cat._id} name='category' className='inputfield w-full' type='text' placeholder='Product name' />
                                ))}
                            </div>
                            <div className='flex items-center my-6'>
                                <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Description</label>
                                <hr className='w-full border-t-2 bg-gray-300'></hr>
                            </div>
                            <textarea onChange={(e) => setDes(e.target.value)} defaultValue={CategoryDetails.des} name='des' className='inputfield w-full h-52 resize-none' cols='10' />
                            <div className='flex items-center mt-10 mb-5'>
                                <label className='text-[.92rem] w-1/4 font-light font-serif text-gray-500'>Danger Zone</label>
                                <hr className='w-full border-t-2 bg-gray-300'></hr>
                            </div>
                            <p className='mb-5 text-base font-Rubik text-gray-500 font-light'>Onece you delete this category customers will not able to access it again, also all sub categories will be lost</p>
                            <button disabled={isUpdating || isDeleting} className='bg-blue-500 rounded-md text-base font-semibold text-white px-4 w-40 py-2 mb-3 focus:bg-blue-400 absolute top-0 right-0 mt-5 mr-10'>
                                {isUpdating ? <span className='flex items-center justify-center text-2xl animate-spin'><ImSpinner7 /> </span> : 'Save Changes'}</button>
                        </form>
                        <button onClick={() => dispatch(FeaturesAction.Show_ModalConfirm(true))}
                            className='bg-red-100 rounded-md text-base font-semibold text-red-400 px-4 py-2 mb-3 focus:bg-red-200'>Delete Category</button>
                    </div>
                    }
                </div>
            </div>
        </>
    )
}

export default CategoryInfo
