import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineBarChart } from 'react-icons/ai';
import { IoCalendarNumber, IoSettingsOutline } from 'react-icons/io5';
import { MdOutlineAddToPhotos } from 'react-icons/md';
import { ImUsers } from 'react-icons/im';
import { BiLogInCircle } from 'react-icons/bi';
import { BsChatRightTextFill } from 'react-icons/bs';
import { GiShoppingBag, GiShoppingCart } from 'react-icons/gi';
import { GoIssueReopened } from 'react-icons/go';
import { RiDashboardFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { FeaturesAction } from '../../../../Redux/Slices/FeaturesSlice';
import { Logo } from "../../../Exports";
const SideBar = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation();
    const { SideBar } = useSelector(state => state.Features)
    const Lilinks = (props) => {
        return (
            <li className={(pathname === `${props.selected}`) ? 'bg-[#D7EDFF] rounded-lg text-[#4060ee]' : 'hover:bg-[#D7EDFF] hover:rounded-lg hover:text-[#4060ee] text-gray-600'}>
                <Link to={props.Link} className="relative flex flex-row items-center h-11 focus:outline-none border-l-4 border-transparent pr-6">
                    <span className="inline-flex justify-center items-center text-2xl ml-4">{props.icon}
                    </span>
                    <span className="ml-4 text-base tracking-wide truncate font-medium">{props.title}</span>
                </Link>
            </li>
        )
    }
    return (
        <>
            {SideBar &&
                <>
                    <div onClick={() => dispatch(FeaturesAction.ShowSideBar(false))} className="w-screen h-screen bg-gray-800 fixed bg-opacity-80 transition-opacity block lg:hidden z-10"></div>
                    <div className="bg-gray-700 bg-opacity-60 transition-opacity">
                        <div className="lg:hidden flex h-screen fixed z-20 w-80 border-r shadow-2xl bg-[#F6F8F9]">
                            <div className="w-full">
                                <div className="flex items-center py-7 ml-8"><Logo /></div>
                                <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                                    <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                                        <Lilinks Link={"/dashboard"} selected={'/dashboard'} title='Users' icon={<RiDashboardFill />} />
                                        <Lilinks Link={"/dashboard/all_users"} selected={'/dashboard/all_users'} title='Users' icon={<ImUsers />} />
                                        <Lilinks Link={"/dashboard/messages"} selected={'/dashboard/messages'} title='Messegaes' icon={<BsChatRightTextFill />} />
                                        <Lilinks Link={"/dashboard/all_products"} selected={'/dashboard/all_products'} title='Products' icon={<GiShoppingBag />} />
                                        <Lilinks Link={"/dashboard/addproduct"} selected={'/dashboard/addproduct'} title='Add Product' icon={<MdOutlineAddToPhotos />} />
                                        <Lilinks Link={"/dashboard/addfeatures"} selected={'/dashboard/addfeatures'} title='Add Features' icon={<MdOutlineAddToPhotos />} />
                                        <Lilinks Link={"/dashboard/orders"} selected={'/dashboard/orders'} title='Orders' icon={<GiShoppingCart />} />
                                        <Lilinks Link={"/dashboard/stats"} selected={'/dashboard/stats'} title='Stats' icon={<AiOutlineBarChart />} />
                                        <Lilinks Link={"/dashboard/calender"} selected={'/dashboard/calender'} title='Calender' icon={<IoCalendarNumber />} />
                                        <Lilinks Link={"/dashboard/issues"} selected={'/dashboard/issues'} title='Isseues' icon={<GoIssueReopened />} />
                                        <div className="bottom-0 absolute">
                                            <Lilinks Link={"/dashboard"} selected={'/settings'} title='Settings' icon={<IoSettingsOutline />} />
                                            <Lilinks Link={"/signin"} selected={''} title='Log Out' icon={<BiLogInCircle />} />
                                        </div>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }

            <div className="w-80 hidden lg:block bg-[#F6F8F9] h-full z-10 fixed border-r ">
                <div className="flex items-center py-7 ml-8"><Logo /></div>
                <div className="overflow-y-auto overflow-x-hidden flex-grow flex-col">
                    <ul className="flex flex-col py-4 space-y-1 px-3 content-end">
                        <Lilinks Link={"/dashboard"} selected={'/dashboard'} title='Dashboard' icon={<RiDashboardFill />} />
                        <Lilinks Link={"/dashboard/all_users"} selected={'/dashboard/all_users'} title='Users' icon={<ImUsers />} />
                        <Lilinks Link={"/dashboard/messages"} selected={'/dashboard/messages'} title='Messegaes' icon={<BsChatRightTextFill />} />
                        <Lilinks Link={"/dashboard/all_products"} selected={'/dashboard/all_products'} title='Products' icon={<GiShoppingBag />} />
                        <Lilinks Link={"/dashboard/addproduct"} selected={'/dashboard/addproduct'} title='Add Product' icon={<MdOutlineAddToPhotos />} />
                        <Lilinks Link={"/dashboard/addfeatures"} selected={'/dashboard/addfeatures'} title='Add Features' icon={<MdOutlineAddToPhotos />} />
                        <Lilinks Link={"/dashboard/orders"} selected={'/dashboard/orders'} title='Orders' icon={<GiShoppingCart />} />
                        <Lilinks Link={"/dashboard/stats"} selected={'/dashboard/stats'} title='Stats' icon={<AiOutlineBarChart />} />
                        <Lilinks Link={"/dashboard/calender"} selected={'/dashboard/calender'} title='Calender' icon={<IoCalendarNumber />} />
                        <Lilinks Link={"/dashboard/issues"} selected={'/dashboard/issues'} title='Isseues' icon={<GoIssueReopened />} />
                        <div className="bottom-0 absolute">
                            <Lilinks Link={"/dashboard"} selected={'/settings'} title='Settings' icon={<IoSettingsOutline />} />
                            <Lilinks Link={"/signin"} selected={''} title='Log Out' icon={<BiLogInCircle />} />
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default SideBar;