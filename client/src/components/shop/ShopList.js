import React, { useState, useEffect } from 'react';
import { flowerData, flowerDataSortedByType, moodTitles } from '../../utils/flowerData';
import { RiCoinsFill } from "react-icons/ri";
import FlowerModal from './FlowerModal';
import { useUser } from '../../contexts/UserContext';

const ShopList = ({ sortBy }) => {
    const [selectedFlowerId, setSelectedFlowerId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [displayedData, setDisplayedData] = useState({});
    const [ready, setReady] = useState(false); // Added ready state
    const { user } = useUser();

    const openModal = (flowerId) => {
        setSelectedFlowerId(flowerId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFlowerId(null);
    };

    const getFlowerId = (flower, sortBy, label) => {
        if (sortBy === 'mood') {
            return `${flower.type}-${label}`;
        } else {
            return `${label}-${flower.type}`; 
        }
    };

    // Update the display data when sortby changes
    useEffect(() => {
        const processData = () => {
            let data;
            if (sortBy === 'mood') {
                data = flowerData;
            } else {
                data = flowerDataSortedByType;
            }

            // Process data to check which items should be rendered
            const processedData = Object.keys(data).reduce((acc, label) => {
                const filteredFlowers = data[label].filter(flower => {
                    const flowerId = getFlowerId(flower, sortBy, label);
                    return !user.purchased_plants.includes(flowerId);
                });

                if (filteredFlowers.length > 0) {
                    acc[label] = filteredFlowers;
                }
                return acc;
            }, {});

            setDisplayedData(processedData);
            setReady(true); // Set ready to true once data is processed
        };

        setReady(false); // Set ready to false before processing
        processData();
    }, [sortBy, user.purchased_plants]);

    if (!ready) {
        return (
            <div className="flex justify-center items-center h-screen">
                Loading...
            </div>
        );
    }

    return (
        <>
            {Object.keys(displayedData).map(label => (
                <div key={label}>
                    {/** Label */}
                    <h2 className="text-medium text-black font-medium mb-5 capitalize">
                        {sortBy === 'mood' ? moodTitles[label] : label}
                    </h2>

                    {/** Buttons */}
                    <div className="flex flex-row flex-wrap gap-8 mb-8">
                        {displayedData[label].map(flower => {
                            const flowerName = sortBy === 'mood' ? flower.type : moodTitles[flower.type];
                            const flowerType = sortBy === 'mood' ? flower.type : label;
                            const mood = sortBy === 'mood' ? label : flower.type;
                            const flowerId = `${flowerType}-${mood}`;

                            return (
                                <button 
                                    disabled={user.points < flower.price}
                                    key={flower.type}
                                    className="group flex flex-col justify-center items-center w-[100px] disabled:opacity-50 disabled:pointer-events-none"
                                    onClick={() => openModal(flowerId)}
                                >
                                    <div className="w-[90px] h-[90px] bg-accent-lightpink rounded-xl p-2 overflow-hidden mb-3 group-hover:bg-accent-lightpink-hover transition ease-in-out duration-300">
                                        <img src={flower.image} alt={flower.label} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <span className="small-header text-textgrey group-hover:text-accent-darkpink transition ease-in-out duration-300">{flowerName}</span>
                                        <div className="rounded-lg flex flex-row gap-1 items-center">
                                            <RiCoinsFill className="text-coins-yellow text-[1rem]" />
                                            <span className="text-small font-semibold text-textgrey group-hover:text-accent-darkpink transition ease-in-out duration-300">{flower.price}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                        {displayedData[label].length === 0 && <p className="text-base italic text-textgrey">You bought everything!</p>}
                    </div>
                </div>
            ))}
            <FlowerModal
                isOpen={isModalOpen}
                onClose={closeModal}
                flowerId={selectedFlowerId}
            />
        </>
    );
};

export default ShopList;