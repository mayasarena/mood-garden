import React, { useState, useEffect } from 'react';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { moodTitles, moodTextColor } from '../../utils/flowerData';

const TopMood = ({ totalCounts }) => {
    //Find the maximum count
    const maxCount = Math.max(...Object.values(totalCounts));

    // Get the list of moods with the maximum count (in case there are more than one)
    const topMoods = Object.entries(totalCounts)
        .filter(([mood, count]) => count === maxCount)
        .map(([mood]) => mood);

    // Currently displayed mood index
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to go to the next mood
    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % topMoods.length);
    };

    // Function to go to the previous mood
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + topMoods.length) % topMoods.length);
    };

    // Re-initialize currentIndex when data changes
    useEffect(() => {
        setCurrentIndex(0);
    }, [totalCounts])

    const currentMood = topMoods[currentIndex];

    return (
        <div className="flex-1 bg-white py-container px-4 rounded-container">
            <div className="h-full flex items-center justify-center">
                {/** Previous button */}
                <button onClick={handlePrev} className={`text-[1.5rem] ${topMoods.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink'}`}>
                    <IoChevronBack />
                </button>
                {/** Top mood display */}
                <div className="flex flex-col items-center justify-between w-full">
                    <div className="flex flex-col items-center gap-0 h-[50px]">
                        <h4 className="text-accent-darkpink small-header">{topMoods.length > 1 ? 'Top Moods' : 'Top Mood'}</h4>
                        <span className={`small-header ${moodTextColor[currentMood]}`}>{moodTitles[currentMood]}</span>
                    </div>
                    <img alt={moodTitles[currentMood]} src={`/images/smileys/${currentMood}.png`} className="w-[50px] h-[50px] mb-2" />
                    <span className={`font-bold font-roboto text-medium ${moodTextColor[currentMood]}`}>{maxCount}</span>
                </div>
                {/** Next button */}
                <button onClick={handleNext} className={`text-[1.5rem] ${topMoods.length < 2 ? 'pointer-events-none text-transparent' : 'text-accent-darkpink '}`}>
                    <IoChevronForward />
                </button>
            </div>
        </div>
    );
};

export default TopMood;