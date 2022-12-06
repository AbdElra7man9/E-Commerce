import React, { useState } from 'react'
import { ShowRating } from '../../Exports'
import moment from 'moment'
import { BsStarFill, BsStar } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCreateReviewMutation, useGetReviewsQuery } from '../../../Redux/APIs/ReviewsApi';
const Reviews = (props) => {
    const id = props.id;
    const { data: Reviews, error, isLoading } = useGetReviewsQuery(id) || {};
    const [createReview] = useCreateReviewMutation()
    const [inputs, setInputs] = useState({
        comment: '',
        rating: ''
    })
    const handleChange = ({ currentTarget: input }) => {
        setInputs({ ...inputs, [input.name]: input.value });
    };
    const AddComment = (event) => {
        event.preventDefault();
        const { comment, rating } = inputs;
        const data = { comment, rating }
        createReview({ data, id }).unwrap()
            .then((payload) => toast.success(payload.msg))
            .catch((error) => toast.error(error.data.msg));
        setInputs({ comment: '', rating: '' });
    }
    return (
        <>
            {isLoading && <p>Loading </p>}
            {error && <p>{error.data.msg} </p>}
            {Reviews &&
                <>
                    <ToastContainer position="bottom-center" closeOnClick autoClose={1200} hideProgressBar={true} limit={1} />
                    <div className='px-32 py-12'>
                        <hr />
                        <div className='grid grid-cols-2 md:grid-cols-2'>
                            <div className='text-[4rem]'>

                                <div className='flex items-center py-10 text-yellow-300 text-2xl gap-8'>
                                    <p className='text-6xl text-gray-600'>{Reviews && Reviews?.rating?.toFixed(1)}</p>
                                    <ShowRating Rating={Reviews && Reviews?.rating} />
                                </div>
                                <div className='flex items-center text-yellow-300 py-2 text-2xl gap-8'>
                                    <div className='flex items-center gap-4'>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                    </div>
                                    <p className='text-gray-700 text-lg'>1</p>
                                    <div className='py-3 bg-[#F8F8F8] w-96 rounded-full relative'>
                                        <div className='rounded-full bg-[#e7e6e6] w-1/6 absolute py-3 top-0'></div>
                                    </div>
                                </div>
                                <div className='flex items-center text-yellow-300 py-2 text-2xl gap-8'>
                                    <div className='flex items-center gap-4'>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStar />
                                    </div>
                                    <p className='text-gray-700 text-lg'>1</p>
                                    <div className='py-3 bg-[#F8F8F8] w-96 rounded-full relative'>
                                        <div className='rounded-full bg-[#e7e6e6] w-1/2 absolute py-3 top-0'></div>
                                    </div>
                                </div>
                                <div className='flex items-center text-yellow-300 py-2 text-2xl gap-8'>
                                    <div className='flex items-center gap-4'>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStar />
                                        <BsStar />
                                    </div>
                                    <p className='text-gray-700 text-lg'>1</p>
                                    <div className='py-3 bg-[#F8F8F8] w-96 rounded-full relative'>
                                        <div className='rounded-full bg-[#e7e6e6] w-0 absolute py-3 top-0'></div>
                                    </div>
                                </div>
                                <div className='flex items-center text-yellow-300 py-2 text-2xl gap-8'>
                                    <div className='flex items-center gap-4'>
                                        <BsStarFill />
                                        <BsStarFill />
                                        <BsStar />
                                        <BsStar />
                                        <BsStar />
                                    </div>
                                    <p className='text-gray-700 text-lg'>1</p>
                                    <div className='py-3 bg-[#F8F8F8] w-96 rounded-full relative'>
                                        <div className='rounded-full bg-[#e7e6e6] w-1/4 absolute py-3 top-0'></div>
                                    </div>
                                </div>
                                <div className='flex items-center text-yellow-300 py-2 text-2xl gap-8'>
                                    <div className='flex items-center gap-4'>
                                        <BsStarFill />
                                        <BsStar />
                                        <BsStar />
                                        <BsStar />
                                        <BsStar />
                                    </div>
                                    <p className='text-gray-700 text-lg'>1</p>
                                    <div className='py-3 bg-[#F8F8F8] w-96 rounded-full relative'>
                                        <div className='rounded-full bg-[#e7e6e6] w-3/4 absolute py-3 top-0'></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <form onSubmit={AddComment} className=' mt-5 py-4'>
                                    <p className='text-xl'>Rating :</p>
                                    <div className='flex items-center gap-4 text-3xl text-gray-500 py-8'>
                                        <div className="flex gap-2 rate">
                                            <input className='invisible float-right' type="radio" id="star1" name="rating" onChange={handleChange} value={1} />
                                            <label htmlFor="star1"><BsStar /></label>
                                            <input className='invisible float-right' type="radio" id="star2" name="rating" onChange={handleChange} value={2} />
                                            <label htmlFor="star2"><BsStar /></label>
                                            <input className='invisible float-right' type="radio" id="star3" name="rating" onChange={handleChange} value={3} />
                                            <label htmlFor="star3"><BsStar /></label>
                                            <input className='invisible float-right' type="radio" id="star4" name="rating" onChange={handleChange} value={4} />
                                            <label htmlFor="star4"><BsStar /></label>
                                            <input className='invisible float-right' type="radio" id="star5" name="rating" onChange={handleChange} value={5} />
                                            <label htmlFor="star5"><BsStar /></label>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <label className='pb-5 text-2xl'>Review :</label>
                                        <textarea onChange={handleChange} value={inputs.comment} name='comment' className='inputfield w-3/4 h-72 resize-none !mt-5 placeholder:text-base' type='text' placeholder='Write your review'></textarea>
                                        <button className=' text-center border-4 border-blue-500 px-8 py-2 rounded-full font-medium hover:bg-blue-500 focus:ring focus:ring-blue-600 hover:text-white'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr />

                        {Reviews &&
                            Reviews?.reviews?.map((review) => (
                                <div key={review._id} className='grid grid-cols-1 md:grid-cols-3 gap-5 py-10'>
                                    <div className='col-span-1'>
                                        <p className='text-2xl font-mono font-semibold text-gray-700'>{review.name}</p>
                                        <p className='text-gray-500 font-medium'>{moment(review.time).format(" h:mm Do MMMM  YYYY")}</p>
                                        <ShowRating Rating={review.rating} />
                                    </div>
                                    <div className='col-span-2'>
                                        <p>{review.comment}</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </>}
        </>
    )
}

export default Reviews
