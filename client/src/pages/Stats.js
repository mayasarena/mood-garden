import React, { useState, useEffect } from 'react';
import { useMoodEntries } from '../contexts/MoodEntriesContext'; 
import { formatViewRange } from '../utils/statsCalculations';
import FlowerCount from '../components/stats/FlowerCount';
import MoodLineChart from '../components/stats/MoodLineChart';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import { MdArrowDropDown } from 'react-icons/md';
import MoodDistribution from '../components/stats/MoodDistribution';
import TotalEntries from '../components/stats/TotalEntries';
import TopMood from '../components/stats/TopMood';
import TopFlowerType from '../components/stats/TopFlowerType';
import TopFlower from '../components/stats/TopFlower';

const Stats = () => {
    const { getMoodEntriesByWeek, getMoodEntriesByMonth, getMoodEntriesByYear } = useMoodEntries(); // Retrieve mood entries from context
    const [viewMode, setViewMode] = useState('weekly')
    const [viewDate, setViewDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [flowerCounts, setFlowerCounts] = useState({});
    const [totalCounts, setTotalCounts] = useState({});

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    useEffect(() => {
        let moodEntries = [];
        if (viewMode === 'weekly') {
            moodEntries = getMoodEntriesByWeek(viewDate);
        } else if (viewMode === 'monthly') {
            moodEntries = getMoodEntriesByMonth(viewDate);
        } else if (viewMode === 'yearly') {
            moodEntries = getMoodEntriesByYear(viewDate);
        } else {
            console.error('Something went wrong with the view mode.')
        }

        setData(moodEntries)
        console.log('view mode and data: ', viewMode, moodEntries);

    }, [getMoodEntriesByWeek, getMoodEntriesByMonth, getMoodEntriesByYear, viewDate, viewMode]);

    useEffect(() => {
        const counts = {};

        // Initialize counts
        const moodIdOrder = ['vhappy', 'happy', 'neutral', 'sad', 'vsad'];
        moodIdOrder.forEach(moodId => {
            counts[moodId] = {}; 
        });

        // Count flower objects
        data.forEach(entry => {
            const flowerId = entry.flower_id;
            const [, moodId] = flowerId.split('-');

            if (!counts[moodId][flowerId]) {
                counts[moodId][flowerId] = 0; // Initialize flower count if it doesn't exist in dict
            }

            counts[moodId][flowerId] += 1; // Increment the flower count
        });

        setFlowerCounts(counts);
        console.log('flower counts', flowerCounts);

        // Compute total counts for each moodId
        const totals = Object.keys(counts).reduce((result, moodId) => {
            const moodCounts = counts[moodId];
            const total = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);
            result[moodId] = total;
            return result;
        }, {});

        setTotalCounts(totals);

    }, [data]);

    const handlePrev = () => {
        setViewDate(prev => {
            const newDate = new Date(prev);
            if (viewMode === 'weekly') {
                newDate.setDate(prev.getDate() - 7);
            } else if (viewMode === 'monthly') {
                newDate.setMonth(prev.getMonth() - 1);
            } else if (viewMode === 'yearly') {
                newDate.setFullYear(prev.getFullYear() - 1);
            }
            return newDate;
        });
    };

    const handleNext = () => {
        setViewDate(prev => {
            const newDate = new Date(prev);
            if (viewMode === 'weekly') {
                newDate.setDate(prev.getDate() + 7);
            } else if (viewMode === 'monthly') {
                newDate.setMonth(prev.getMonth() + 1);
            } else if (viewMode === 'yearly') {
                newDate.setFullYear(prev.getFullYear() + 1);
            }
            return newDate;
        });
    };

    const handleDropdownClick = (mode) => {
        setViewMode(mode);
        setDropdownOpen(false);
    }

    const viewModes = ['weekly', 'monthly', 'yearly'];

    return (
        <div className="flex flex-col gap-container-spacing h-full overflow-hidden">
            <div className="flex flex-row gap-container-spacing">
                {/** Forward and back buttons */}
                <div className="flex-grow flex justify-between items-center bg-white p-[10px] rounded-container">
                    <button onClick={handlePrev} className="p-2 text-black text-[1.4rem]">
                        <IoChevronBack />
                    </button>
                    <span className="text-base text-textgrey">{formatViewRange(viewDate, viewMode)}</span>
                    <button onClick={handleNext} className="p-2 text-black text-[1.4rem]">
                        <IoChevronForward />
                    </button>
                </div>

                {/** View Selection Dropdown */}
                <div className="relative">
                    <button 
                        onClick={toggleDropdown}
                        className="w-[300px] h-full justify-between px-16 dropdown-stats"
                    >
                        {viewMode}
                        <MdArrowDropDown className="text-[1.2rem]" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute z-10 w-[300px] top-[60px] bg-accent-lightpink rounded-container overflow-hidden">
                            <ul className="max-h-[200px] overflow-scroll">
                                {viewModes.map((mode) => (
                                    <li
                                        key={mode}
                                        onClick={() => handleDropdownClick(mode)}
                                        className={`capitalize text-base font-medium cursor-pointer px-4 py-4 bg-opacity-100 hover:bg-accent-pink hover:text-white
                                            ${viewMode === mode ? 'bg-accent-pink text-white' : 'bg-transparent text-accent-darkpink'}`}
                                    >
                                        {mode}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {!data || data.length === 0 ? (
                <div className="w-full h-full flex justify-center items-center italic font-base">
                    No data to display... time to create an entry!
                </div>
            ) : (
                <div className="flex flex-col gap-container-spacing h-full overflow-scroll">
                    <div className="flex flex-row gap-container-spacing">
                        <TotalEntries totalCounts={totalCounts} />
                        <TopMood totalCounts={totalCounts} />
                        <TopFlowerType flowerCounts={flowerCounts} />
                        <TopFlower flowerCounts={flowerCounts} />
                    </div>
                    <MoodLineChart data={data} viewMode={viewMode} refDate={viewDate} />
                    <div className="flex flex-row gap-container-spacing">
                        <FlowerCount flowerCounts={flowerCounts} totalCounts={totalCounts} />
                        <MoodDistribution totalCounts={totalCounts} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Stats;
