import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { Header, ProductMainScreen, HomeCategory, Reviews, Footer } from '../../Exports'
import { Helmet } from 'react-helmet-async';
import { useGetProductsDetailsQuery } from '../../../Redux/APIs/ProductsApi'
const ProductScreen = () => {
  const params = useParams();
  const { id } = params;
  const { data: productDetails } = useGetProductsDetailsQuery(id);

  const SpicHeader = () => {
    return (
      <div className='w-full py-12 bg-[#F5F5F5]'>
        <div className='text-2xl font-semibold flex gap-16 text-gray-600 items-center px-32 uppercase'>
          <Link>related</Link>
          <Link>DESCRIPTION</Link>
          <Link>specification</Link>
          <Link>Reviews ( {productDetails?.numofreviews} )</Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>{productDetails?.name}</title>
      </Helmet>
      <Header />
      <div className='flex container max-w-[144rem] gap-5'>
        <HomeCategory />
        <div>
          <ProductMainScreen />
          <SpicHeader />
          <Reviews id={id} />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProductScreen
