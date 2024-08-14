import React, { useState, useEffect } from 'react';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { getTopFlowerTypes } from '../../utils/statsCalculations';

const TopFlowerType = ({ flowerCounts }) => {
    const [topFlowerTypes, setTopFlowerTypes] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Fetch and set top flower types when flowerCounts changes
        const topFlowerTypes = getTopFlowerTypes(flowerCounts);
        setTopFlowerTypes(topFlowerTypes || []);
        setCurrentIndex(0); // Reset index when data changes
    }, [flowerCounts]);

    // Function to go to the next item
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topFlowerTypes.length);
    };

    // Function to go to the previous item
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topFlowerTypes.length) % topFlowerTypes.length);
    };

    const currentFlower = topFlowerTypes[currentIndex];

    return (
        <div className="flex-1 bg-white py-container px-4 rounded-container">
            {topFlowerTypes.length > 0 ? (
                <div className="h-full flex items-center justify-center">
                    {/** Previous button */}
                    <button onClick={handlePrev} className={`text-[1.5rem] ${topFlowerTypes.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink'}`}>
                        <IoChevronBack />
                    </button>
                    {/** Top flower type display */}
                    <div className="flex flex-col items-center justify-between w-full">
                        <div className="flex flex-col items-center gap-0 h-[50px]">
                            <h4 className="text-accent-darkpink small-header text-center">{topFlowerTypes.length > 1 ? 'Top Flower Types' : 'Top Flower Type'}</h4>
                            <span className="small-header text-textgrey">{currentFlower.flowerType}</span>
                        </div>
                        <div className="w-[50px] h-[50px] mb-2 shadow-pink border-[3px] border-accent-pink rounded-full overflow-hidden">
                            <img alt={`${currentFlower.flowerType} Flower`} src={`/images/flower-types/${currentFlower.flowerType}.png`} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold font-roboto text-medium text-textgrey">{currentFlower.count}</span>
                    </div>
                    {/** Next button */}
                    <button onClick={handleNext} className={`text-[1.5rem] ${topFlowerTypes.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink'}`}>
                        <IoChevronForward />
                    </button>
                </div>
            ) : (
                <span className="text-base italic">Error fetching the data.</span>
            )}
        </div>
    );
};

export default TopFlowerType;
