import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { RiCoinsFill } from "react-icons/ri";
import { GiFlowerPot, GiNotebook } from "react-icons/gi";
import { IoStatsChart } from "react-icons/io5";
import { FaBagShopping } from "react-icons/fa6";
import { TbLogout } from "react-icons/tb";
import { motion } from "framer-motion";

const Sidebar = () => {
    const { logout, isLoggedIn, user } = useUser();

    const navLinks = [
        {
            name: 'Garden',
            url: '/',
            icon: GiFlowerPot
        },
        {
            name: 'Diary',
            url: '/diary',
            icon: GiNotebook
        },
        {
            name: 'Stats',
            url: '/stats',
            icon: IoStatsChart
        },
        {
            name: 'Plant Shop',
            url: '/shop',
            icon: FaBagShopping
        },
    ]

    return (
        <nav aria-label="Sidebar" className="relative text-textgrey w-[380px] min-w-[380px] h-screen pt-[100px] flex flex-col">
            {isLoggedIn ? (
                <>
                    <img alt='Logo' src='/images/small-logo.png' className="absolute top-4 left-4 w-[40px]" />
                    {/** Profile Information */}
                    <div className="flex flex-col items-center justify-center">
                        {/** Profile Img */}
                        <div className="w-[80px] h-[80px] overflow-hidden rounded-full">
                            <img 
                                src={user.profile_image_url} 
                                alt="Profile Image" 
                                className="image-cover w-full h-full" 
                                onError={(e) => e.target.src = '/images/placeholder-prof-img.png'}
                            />
                        </div>
                        <div className="flex flex-col mt-3 justify-center items-center">
                            <span className="text-header text-black">{user.name}</span>
                            <span className="text-small text-textgrey">{user.email}</span>
                            <span className="flex flex-row gap-2 mt-2">
                                <RiCoinsFill className="text-coins-yellow text-[1.25rem]" />
                                <span className="text-small text-black">{user.points}</span>
                            </span>
                        </div>
                    </div>

                    {/** Navigation Links */}
                    <ul className="flex-1 flex flex-col gap-10 mt-14 items-start justify-start mx-16">
                        {navLinks.map(navLink => (
                            <li key={navLink.name} className="relative w-full">
                                <NavLink 
                                    to={navLink.url} 
                                    className="flex justify-center"
                                >
                                    {({ isActive }) => (
                                        <>
                                            <div className="group relative z-10 flex flex-row gap-6 items-center w-full font-medium mx-10 py-3">
                                                <navLink.icon className={isActive ? "text-[1.2rem] text-accent-pink" : "text-[1.2rem] text-textgrey group-hover:text-accent-pink transition ease-in-out duration-300" } />
                                                <span className={isActive ? "text-base text-accent-darkpink" : "text-base text-textgrey group-hover:text-accent-darkpink transition ease-in-out duration-300"}>{navLink.name}</span>
                                            </div>
                                            {isActive && (
                                                <motion.div 
                                                    className="bg-accent-lightpink absolute inset-0 z-0 rounded-nav-links"
                                                    layoutId="bg"
                                                />
                                            )}
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}

                        {/** Logout button */}
                        <div className="relative flex-1 flex items-end justify-center w-full mb-6">
                            <button onClick={logout} className="group flex flex-row gap-6 items-center w-full font-medium bg-transparent hover:bg-accent-lightpink rounded-nav-links transition ease-in-out duration-300">
                                <TbLogout className="text-[1.2rem] text-textgrey ml-10 group-hover:text-accent-pink transition ease-in-out duration-300" />
                                <span className="text-base mr-10 py-3 group-hover:text-accent-darkpink transition ease-in-out duration-300">Logout</span>
                            </button>
                        </div>
                    </ul>
                </>
            ) : (
                <p>Error: no user.</p>
            )}
        </nav>
    )
};

export default Sidebar;
