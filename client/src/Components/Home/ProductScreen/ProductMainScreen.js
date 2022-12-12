import React from 'react'
import { Danger } from '../../Alerts';
import { Rating } from '../../Exports'
import { Link, useParams } from 'react-router-dom'
import { useGetProductsDetailsQuery } from '../../../Redux/APIs/ProductsApi';
import { HiOutlineTruck } from 'react-icons/hi'
import { CiHeart } from 'react-icons/ci'
import { useAddToWhitelistMutation } from '../../../Redux/APIs/WhiteListApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAddToCartMutation } from '../../../Redux/APIs/CartApi';
const ProductMainScreen = () => {
    const params = useParams();
    const { id } = params;
    const product_Id = id;
    const { data: productDetails, isLoading: loading, error } = useGetProductsDetailsQuery(id) || {};
    const [addToWhitelist] = useAddToWhitelistMutation()
    const [addToCart] = useAddToCartMutation();

    const HandleToWhiteList = async () => {
        addToWhitelist(id).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    const AddToCartHandler = async () => {
        await addToCart({product_Id}).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
    }
    return (
        <div className='container max-w-[140rem] mt-5'>
            {loading ?
                <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
                : error ? <Danger error={'No Product Founded'} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'} /> : productDetails._id &&
                    <>
                        <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
                        <div className='grid grid-cols-1 md:grid-cols-5 h-[45rem]'>
                            <div className='col-span-2 flex'>
                                <div className='w-[25%]'>
                                    {productDetails &&
                                        productDetails.images?.map((img) => (
                                            <img src={img.url} key={img._id} className='border w-[80%] object-cover' alt='' />
                                        ))}
                                </div>
                                <div className='flex justify-center'>
                                    <img src={productDetails.images ? productDetails.images[0].url : 'Can not load images'} className='object-cover h-[35rem] w-full mx-auto' alt='' />
                                </div>
                            </div>
                            <div className='col-span-2 px-10'>
                                <div className='flex justify-center items-center'>
                                    <p className='text-xl font-semibold py-3 '>{productDetails.name}</p>
                                    <Link onClick={HandleToWhiteList} className='fill-black'><CiHeart style={{ fontSize: "2.5rem" }} /></Link>
                                </div>
                                <hr />
                                <div className='my-5'>
                                    <Rating rating={`${productDetails.rating}`} />
                                </div>
                                <div className='text-xl leading-10'>
                                    <li>High-precision lens provides a clearer picture and a better view for D</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                    <li>55" class screen full array LED TV</li>
                                </div>
                                {/* <p className='text-xl mt-auto'>{productDetails.des}</p> */}

                                {productDetails.stock > 0 ?
                                    <div className='py-5'>
                                        <p className='mb-4 text-lg font-extralight'>Avability : <span className='font-semibold text-green-600'>In Stock</span></p>
                                        {productDetails.stock < 5 && productDetails.stock > 0 && <p>Only {productDetails.stock} is available</p>}
                                        <hr />
                                        <div className='mt-4 py-3 bg-[#F5F5F5] flex items-center px-4 gap-3'>
                                            <div className='text-gray-500'><HiOutlineTruck /></div>
                                            <p className='text-gray-500'>Item with <span className='text-gray-700 font-serif font-semibold'>Free Dilivary</span></p>
                                        </div>
                                        <div className='flex gap-5'>
                                            <p className='text-3xl font-bold mt-auto text-blue-600 py-3'>$ {productDetails.price}</p>
                                            <p className='text-2xl items-center flex text-gray-500 line-through'>$ {productDetails.price}</p>
                                        </div>
                                        <div className='grid grid-cols-3 gap-6 items-center'>
                                            <div className='border px-5 rounded-xl col-span-1'>
                                                <div className='flex justify-between py-4'>
                                                    <p>1</p>
                                                    <div className='flex gap-4 font-bold'>
                                                        <span className='bg-[#F8F8F8] rounded-full px-2'>+</span>
                                                        <span className='bg-[#F8F8F8] rounded-full px-2'>-</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Link onClick={AddToCartHandler} className='col-span-2 text-center border-4 border-blue-500 px-8 py-4 rounded-full font-medium hover:bg-blue-500 focus:ring focus:ring-blue-600 hover:text-white'>Add to Card</Link>
                                        </div>
                                    </div>
                                    :
                                    <p>Out Of Stock</p>
                                }
                            </div>
                        </div>
                    </>
            }
        </div>
    )
}

export default ProductMainScreen
