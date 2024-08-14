import React, { useState, useEffect } from 'react';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { getTopFlowers } from '../../utils/statsCalculations';
import { getFlowerObjectFromId, getMoodTextColorFromFlowerId } from '../../utils/flowerData';

const TopFlower = ({ flowerCounts }) => {
    const [topFlowers, setTopFlowers] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch and set top flower types when flowerCounts changes
        const topFlowers = getTopFlowers(flowerCounts);
        setTopFlowers(topFlowers || []);
        setCurrentIndex(0); // Reset index when data changes
    }, [flowerCounts]);

    // Function to go to the next item
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topFlowers.length);
    };

    // Function to go to the previous item
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topFlowers.length) % topFlowers.length);
    };

    console.log('tf',topFlowers);

    const currentFlower = topFlowers[currentIndex];

    return (
        <div className="flex-1 bg-white py-container px-4 rounded-container">
            {topFlowers.length > 0 ? (
                <div className="h-full flex items-center justify-center">
                    {/** Previous button */}
                    <div className="w-[30px] flex items-center justify-start">
                        <button onClick={handlePrev} className={`text-[1.5rem] ${topFlowers.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink'}`}>
                            <IoChevronBack />
                        </button>
                    </div>
                    {/** Top flower type display */}
                    <div className="flex flex-col items-center justify-between w-full">
                        <div className="flex flex-col items-center gap-0 h-[50px]">
                            <h4 className="text-accent-darkpink small-header text-center">{topFlowers.length > 1 ? 'Top Flowers' : 'Top Flower'}</h4>
                            <div className={`group w-[130px] overflow-hidden flex ${getFlowerObjectFromId(currentFlower.flowerId).label.length > 14 ? 'fade-out-horizontal justify-start' : 'justify-center'}`}>
                                <span 
                                    className={`small-header ${getMoodTextColorFromFlowerId(currentFlower.flowerId)}
                                                whitespace-nowrap ${getFlowerObjectFromId(currentFlower.flowerId).label.length > 14 && 'scroll-text'}`}
                                >
                                    {getFlowerObjectFromId(currentFlower.flowerId).label}
                                </span>
                            </div>
                        </div>
                        <div className="w-[50px] h-[50px] mb-2 shadow-pink border-[3px] border-accent-pink rounded-full overflow-hidden">
                            <img alt={`${getFlowerObjectFromId(currentFlower.flowerId).label}`} src={getFlowerObjectFromId(currentFlower.flowerId).image} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold font-roboto text-medium text-textgrey">{topFlowers[currentIndex].count}</span>
                    </div>
                    {/** Next button */}
                    <button onClick={handleNext} className={`text-[1.5rem] ${topFlowers.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink'}`}>
                        <IoChevronForward />
                    </button>
                </div>
            ) : (
                <span className="text-base italic">Error fetching the data.</span>
            )}
        </div>
    );
};

export default TopFlower;
