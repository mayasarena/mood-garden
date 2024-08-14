import React, { useState, useEffect } from 'react';
import SelectedEntry from '../components/garden/SelectedEntry';
import GardenDisplay from '../components/garden/GardenDisplay';
import { calculateIndicesFromDate } from '../utils/calculateDate';
import useFlowerMapForMonth from '../utils/flowerMap';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

const Garden = () => {
    const todaysIndices = calculateIndicesFromDate(new Date(), new Date()); // Initialize selected indices to today on component mount
    const [selectedBlock, setSelectedBlock] = useState({ i: todaysIndices.i, j: todaysIndices.j }); // Selected garden block
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current displayed month
    const [editMode, setEditMode] = useState(false); // Edit mode

    const flowerMap = useFlowerMapForMonth(currentMonth);

    // Function to handle changing to previous month
    const handlePreviousMonth = () => {
    setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() - 1);
        console.log(newDate);
        return newDate;
    })
    }

    // Function to handle changing to next month
    const handleNextMonth = () => {
    setCurrentMonth(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(prev.getMonth() + 1);
        return newDate;
    });
};

const monthName = currentMonth.toLocaleString('default', { month: 'long' });
const year = currentMonth.getFullYear();

return (
    <>
        <div className="flex w-full h-full gap-container-spacing">
            <div className="flex-grow flex flex-col gap-container-spacing">
                {/** Forward and back buttons */}
                <div className="flex justify-between items-center bg-white p-[10px] rounded-container">
                <button onClick={handlePreviousMonth} className="p-2 text-black text-[1.4rem]">
                    <IoChevronBack />
                </button>
                <span className="text-base text-textgrey">{monthName} {year}</span>
                <button onClick={handleNextMonth} className="p-2 text-black text-[1.4rem]">
                    <IoChevronForward />
                </button>
                </div>

                {/** Garden display */}
                <GardenDisplay editMode={editMode} selectedBlock={selectedBlock} setSelectedBlock={setSelectedBlock} flowerMap={flowerMap} currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} />
            </div>

            {/** Selected entry display */}
            <div className="w-[415px] bg-white p-container rounded-container overflow-visible">
                <SelectedEntry editMode={editMode} setEditMode={setEditMode} selectedBlock={selectedBlock} currentMonth={currentMonth} />
            </div>
        </div>
    </>
);
};

export default Garden;
