import React from 'react'
import { Link } from 'react-router-dom'
import { SlHandbag } from 'react-icons/sl'
import { CgDetailsMore } from 'react-icons/cg'
import { CiHeart } from 'react-icons/ci'
import { SecNavbar, Logo } from '../../Exports';
const Header = () => {

  const Search = () => {
    return (
      <form className='w-[52%] hidden xl:flex justify-center '>
        <div className="relative w-full">
          <input type="search" className="py-4 px-4 w-full text-sm rounded-lg text-gray-900 bg-gray-50 border outline-none border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Search for product " required="" />
          <Link className="absolute top-0 inset-y-0 right-[9rem] px-4 text-md font-medium flex items-center text-center text-gray-500 border-l my-3">All Category</Link>
          <button className="absolute top-0 right-0 py-4 px-10 text-sm font-semibold tracking-wide text-white border rounded-r-lg border-blue-700 hover:border-blue-800 bg-blue-700 hover:bg-blue-800">Search</button>
        </div>
      </form>
    )
  }
  const Rightnav = () => {
    return (
      <div className='flex gap-3 justify-end ml-auto xl:ml-0'>
        <Link to='/whitelist' className='items-center text-black hidden md:flex gap-2'>
          <CiHeart style={{ 'fontSize': '2.5rem', 'hight': '2.5rem' }} />
          <p className='text-xl'>5</p>
        </Link>
        <Link to='/cart' className="flex gap-3 relative items-center px-3 text-sm font-medium text-center text-black rounded-lg focus:outline-none">
          <div className='text-3xl'>
            <SlHandbag style={{ 'fontSize': '2.5rem', 'hight': '2.5rem' }} />
          </div>
          <span className="sr-only">Notifications</span>
          <div className="flex absolute left-[3.2rem] justify-center items-center w-6 h-6 text-[10px] font-bold  bg-[#E9EFF2] text-gray-600 rounded-full">20</div>
          <div className='ml-8 text-start'>
            <p className='font-extralight'>Your Cart</p>
            <div className='flex gap-3'>
              <p className='font-bold'>$ 1545.99 </p>
            </div>
          </div>
        </Link>
      </div>
    )
  }
  var prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.top = "0";
    } else {
      document.getElementById("navbar").style.top = "-3.2rem";
    }
    prevScrollpos = currentScrollPos;
  }
  return (
    <>
      <div className='pb-[10rem]'>
        <div className='mb-4 bg-white fixed z-20 w-screen top-0 block transition-all' id='navbar'>
          <SecNavbar />
          <div className='border-b shadow'>
            <div className='container max-w-[140rem] my-3 px-2 flex items-center justify-between md:px-5'>
              <div className='flex'>
                <Logo />
                <CgDetailsMore style={{ 'fontSize': '2rem','marginLeft':'3.7rem' }} />
              </div>
              <Search />
              <Rightnav />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default Header