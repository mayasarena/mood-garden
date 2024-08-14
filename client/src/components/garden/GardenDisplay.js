import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrthographicCamera } from '@react-three/drei';
import { DirtBlock } from '../models/DirtBlock';
import { getFlowerObjectFromId } from '../../utils/flowerData';
import { calculateDateFromIndices, calculateIndicesFromDate } from '../../utils/calculateDate';
import { MdToday } from "react-icons/md";

const GardenDisplay = ({ setCurrentMonth, currentMonth, editMode, selectedBlock, setSelectedBlock, flowerMap }) => {
    const gridCols = 7;
    const gridRows = 5;
    const cubeSize = 2;
    const gapSize = 0.05;
    const [hoveredDate, setHoveredDate] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);

    // Functions to handle hovering over flower block
    const handlePointerOver = (e, i, j) => {
        e.stopPropagation();
        setHoveredDate(calculateDateFromIndices(i, j, currentMonth));
    };

    const handlePointerOut = (e) => {
        e.stopPropagation();
        setHoveredDate(null);
    };

    // Function to handle clicking on flower block
    const handleClick = (e, i, j) => {
        // Only change selected if not in edit mode
        if (!editMode) {
            e.stopPropagation();
            setSelectedBlock({i: i, j: j});
            setSelectedDate(calculateDateFromIndices(i, j, currentMonth));
        }
    }

    // Function that sets the selected block and date back to today
    const setSelectedToToday = () => {
        const todaysIndices = calculateIndicesFromDate(new Date(), new Date()); 
        setSelectedBlock({ i: todaysIndices.i, j: todaysIndices.j });
        setCurrentMonth(new Date());
    }

    // Update the displayed date when month changes
    useEffect(() => {
        setSelectedDate(calculateDateFromIndices(selectedBlock.i, selectedBlock.j, currentMonth));
    }, [currentMonth]);

    return (
        <section id="garden-display" className="flex flex-col h-full overflow-hidden bg-white p-container rounded-container">
            {/** Header */}
            <div className="flex flex-row justify-between items-start">
                <h1 className="text-header font-semibold">Garden</h1>
                <div className="flex flex-row gap-4 h-[45px]">
                    {/** Hovered or selected date display */}
                    <div className="flex items-center justify-center rounded-small-button w-[120px] font-semibold text-base text-accent-darkpink bg-accent-lightpink hover:cursor-default">
                        {hoveredDate ? (
                            hoveredDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                        ) : selectedDate ? (
                            selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                        ) : (
                            (new Date()).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
                        )}
                    </div>

                    {/** Jump to today button */}
                    <button 
                        onClick={setSelectedToToday} 
                        className="group relative flex items-center justify-center w-[45px] small-button"
                    >
                        <MdToday className="text-[1.27rem]" />

                        {/** Jump to today tooltip */}
                        <div className="absolute bottom-[-35px] tooltip-content pointer-events-none">
                            <div className="w-[100px] py-[2px] text-xs text-center bg-textgrey text-white rounded-button-tooltip">
                                Jump to today
                                <div 
                                    className="
                                    absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent 
                                    border-r-[5px] border-r-transparent border-b-[5px] border-b-textgrey" 
                                />
                            </div>
                        </div>
                    </button>
                </div>
            </div>

            {/** Garden display using React Three Fiber */}
            <div className="h-screen-minus-300px">
                <Canvas>
                    <OrthographicCamera
                        makeDefault
                        position={[0.9, 5.5, 100]}
                        zoom={38}
                    />
                    <ambientLight intensity={Math.PI * 0.4} />
                    <directionalLight
                        position={[3, 1.0, 4.5]}
                        intensity={Math.PI * 2}
                    />
                    <group rotation={[Math.atan(1 / Math.sqrt(2)), -4, 0]}>
                        {Array.from({ length: gridRows }).map((_, i) =>
                            Array.from({ length: gridCols }).map((_, j) => {
                                const isSelected = (selectedBlock.i === i && selectedBlock.j === j);
                                const flowerId = flowerMap[`${i}-${j}`];
                                const flowerObject = getFlowerObjectFromId(flowerId);
                                const FlowerComponent = (flowerObject ? flowerObject.component : null);

                                return (
                                    <group 
                                        key={`${i}-${j}`}
                                    >
                                        <DirtBlock
                                            position={[
                                                i * (cubeSize + gapSize + 0.85),
                                                0 + (isSelected ? 0.3 : 0),
                                                j * (cubeSize + gapSize),
                                            ]}
                                            scale={[1.4, 0.5, 1]}
                                            onPointerOver={(e) => handlePointerOver(e, i, j)}
                                            onPointerOut={handlePointerOut}
                                            onClick={(e) => handleClick(e, i, j)}
                                        />
                                        {FlowerComponent && (
                                            <FlowerComponent
                                                rotation={[0, 9.2, 0]}
                                                position={[
                                                    i * (cubeSize + gapSize + 0.9) - 0.8,
                                                    (cubeSize/2) + (isSelected ? 0.3 : 0),
                                                    j * (cubeSize + gapSize) - 0.5,
                                                ]}
                                                scale={[0.4, 0.4, 0.4]}
                                            />
                                        )}
                                    </group>
                                );
                            })
                        )}
                    </group>
                </Canvas>
            </div>
        </section>
    )
};

export default GardenDisplay;