import React from 'react';
import { flowerData, moodTextColor, moodTitles } from '../../utils/flowerData';
import { BiSolidCircle } from "react-icons/bi";
import { useUser } from '../../contexts/UserContext';

const FlowerOptions = ({ selectedFlowerId, setSelectedFlowerId }) => {
    const { user } = useUser();
    console.log('plants', user.purchased_plants);

    return (
        <div className="flex flex-col gap-4 my-1">
            {Object.keys(flowerData).map((moodId) => {
                const flowers = flowerData[moodId];
                const moodTitle = moodTitles[moodId];
                return (
                <div key={moodId} className="flex flex-col gap-2 w-full text-left items-start justify-start">
                    {/** Mood title and selection indicator */}
                    <div className="flex flex-row gap-1 items-center">
                        <div className={`${selectedFlowerId && selectedFlowerId.includes(`-${moodId}`) ? 'text-accent-darkpink' : 'text-transparent'} transition ease-in-out duration-300`}>
                            <BiSolidCircle className="text-[0.5rem]" />
                        </div>
                        <h3 className={`${moodTextColor[moodId]} small-header mb-[-1px]`}>
                            {moodTitle}
                        </h3>
                    </div>
                    {/** Flower lists */}
                    <div className="flex flex-row gap-3">
                        {flowers.map(({ type, label, image }) => {
                            const id = `${type}-${moodId}`;
                            if (user.purchased_plants.includes(id)) {
                                return (
                                    <button
                                        id={id}
                                        onClick={() => setSelectedFlowerId(id)}
                                        className={`
                                            ${selectedFlowerId && selectedFlowerId === id ? 'border-accent-darkpink shadow-pink' : 'border-transparent'}
                                            w-[60px] h-[60px] rounded-full border-[3px] hover:border-accent-darkpink hover:shadow-pink overflow-hidden transition ease-in-out duration-200
                                        `}
                                    >
                                        <img src={image} alt={label} className="w-full h-full object-cover" />
                                    </button>
                                );
                            }
                        })}
                    </div>
                </div>
                );
            })}
        </div>
    );
};

export default FlowerOptions;