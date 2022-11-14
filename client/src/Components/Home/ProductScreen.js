import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom';
import { Header, ProductMainScreen, Comments } from '../Exports'
import { Helmet } from 'react-helmet-async';

import { Fetch_Product_Details } from '../../Redux/Actions/ProductsAction'
const ProductScreen = () => {
  const { productDetails } = useSelector((state) => state.products);
  // const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    dispatch(Fetch_Product_Details(id))
  }, [dispatch, id]);

  const SpicHeader = () => {
    return (
      <div className='w-full py-12 bg-[#F5F5F5]'>
        <div className='text-2xl font-semibold flex gap-16 text-gray-600 items-center px-32 uppercase'>
          <Link>related</Link>
          <Link>DESCRIPTION</Link>
          <Link>specification</Link>
          <Link>Reviews ( 5 )</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{productDetails.name}</title>
      </Helmet>
      <Header />
      <ProductMainScreen />
      <SpicHeader />
      <Comments />
    </>
  )
}

export default ProductScreen
