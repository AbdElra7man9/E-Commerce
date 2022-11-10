import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom';
import { Comments, Header, Rating } from '../Components/Exports'
import { Helmet } from 'react-helmet-async';
import { Danger } from '../Components/Alerts';
import { Fetch_Product_Details } from '../Redux/Actions/ProductsAction'
import { Add_to_cart } from './../Redux/Actions/CartAction';
const ProductScreen = () => {
  const { loading, error, productDetails } = useSelector((state) => state.products);
  // const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(Fetch_Product_Details(id))
  }, [dispatch, id]);

  const AddtoCart = async () => {
    const product_Id = id
    dispatch(Add_to_cart(product_Id));
  }

  return (
    <>
      <Header />
      <div className='container max-w-5xl mt-5'>
        {loading ?
          <p className='mx-auto mt-20 text-3xl font-serif font-semibold'>Loading ....</p>
          : error ? <Danger error={'No Product Founded'} className={'mx-auto mt-20 text-7xl font-serif font-semibold bg-red-200 py-3 px-5'} /> : productDetails._id &&
            <>
              <div className='h-96 grid grid-cols-1 md:grid-cols-3'>
                <Helmet>
                  <title>{productDetails.name}</title>
                </Helmet>
                <div className='col-span-2 '>
                  <img src={productDetails.images ? productDetails.images[0].url : 'Can not load images'} className=' object-cover w-full mx-auto md:w-1/2' alt='' />
                </div>
                <div className=''>
                  <p className='text-xl font-semibold'>{productDetails.name}</p>
                  {productDetails.stock > 0 ?
                    <>
                      <p className='text-xl mt-auto'>{productDetails.price}$</p>
                      <p className='text-xl mt-auto'></p>
                      <Rating rating={`${productDetails.rating}`} />
                      <div className=' mb-3 flex gap-4 mt-5'>
                        <Link onClick={AddtoCart} className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Card</Link>
                        <Link className='border border-orange-300 px-4 py-2 rounded-2xl font-medium hover:bg-orange-300 focus:ring focus:ring-orange-200 hover:text-white'>Favorite</Link>
                      </div>
                      <p>In Stock</p>
                    </>
                    :
                    <p>Out Of Stock</p>
                  }
                  {productDetails.stock < 5 && productDetails.stock > 0 && <p>Only {productDetails.stock} is available</p>}
                </div>
              </div>
              <Comments />
            </>
        }
      </div>
    </>
  )
}

export default ProductScreen
