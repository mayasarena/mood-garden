import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { RiCoinsFill } from "react-icons/ri";
import { MdArrowDropDown } from 'react-icons/md';
import ShopList from '../components/shop/ShopList';

export const PlantShop = () => {
    const { user } = useUser();
    const [sortBy, setSortBy] = useState('mood');
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleDropdownClick = (sort) => {
        setSortBy(sort);
        setDropdownOpen(false);
    }

    const sortByArray = ['mood', 'plant type'];

    return (
        <div className="flex flex-col gap-container-spacing h-full">
            {/** Header */}
            <div className="flex flex-row justify-between">
                <div>
                    <div className="flex flex-row justify-between items-center">
                        <h1 className="text-header font-semibold">Plant Shop</h1>
                        <div className="flex flex-row gap-2">
                            <RiCoinsFill className="text-coins-yellow text-[1.25rem]" />
                            <span className="text-small text-black">{user.points}</span>
                        </div>
                    </div>
                    <p className="text-base text-textgrey italic">Enhance your garden with new plants</p>
                </div>

                {/** Sort By Dropdown */}
                <div className="relative">
                    <button 
                        onClick={toggleDropdown}
                        className="w-[300px] h-full justify-between px-16 dropdown-stats"
                    >
                        Sort by: {sortBy}
                        <MdArrowDropDown className="text-[1.2rem]" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute z-10 w-[300px] top-[57px] bg-accent-lightpink rounded-container overflow-hidden">
                            <ul className="max-h-[200px] overflow-scroll">
                                {sortByArray.map((sort) => (
                                    <li
                                        key={sort}
                                        onClick={() => handleDropdownClick(sort)}
                                        className={`capitalize text-base font-medium cursor-pointer px-4 py-4 bg-opacity-100 hover:bg-accent-pink hover:text-white
                                            ${sortBy === sort ? 'bg-accent-pink text-white' : 'bg-transparent text-accent-darkpink'}`}
                                    >
                                        {sort}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/** Plant Shop */}
            <div className="bg-white p-container rounded-container h-full overflow-auto">
                <ShopList sortBy={sortBy} />
            </div>
        </div>
    );
};

export default PlantShop;