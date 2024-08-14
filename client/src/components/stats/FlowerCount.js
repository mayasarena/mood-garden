import React, { useState, useEffect } from 'react';
import { getFlowerObjectFromId, moodTextColor, moodTitles, getMoodTextColorFromFlowerId } from '../../utils/flowerData';

const FlowerCount = ({ flowerCounts, totalCounts }) => {

    return (
        <div className="flex-1 bg-white p-container rounded-container flex flex-col gap-5">
            {Object.entries(flowerCounts).map(([moodId, flowers]) => {
                if (totalCounts[moodId] > 0) {
                    return (
                        <div key={moodId}>
                            {/** Mood title with total count */}
                            <div className="flex flex-row gap-4">
                                <span className={`small-header ${moodTextColor[moodId]}`}>{moodTitles[moodId]}</span>
                                <span className="small-header text-textgrey">{totalCounts[moodId]}</span>
                            </div>
                            {/** Flower lists with counts */}
                            <ul className="mt-2 flex flex-row gap-6">
                                {Object.entries(flowers).map(([flowerId, count]) => {
                                    const flowerObject = getFlowerObjectFromId(flowerId);
                                    return (
                                        <li key={flowerId} className="flex flex-col gap-2 justify-center items-center">
                                            <div className="group relative">
                                                <div className="w-[50px] h-[50px] rounded-full overflow-hidden">
                                                    <img alt={flowerObject.label} src={flowerObject.image} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="z-20 absolute flower-label-tooltip font-medium text-xs top-0 left-[5px] whitespace-nowrap bg-accent-lightpink text-accent-darkpink py-2 px-4 rounded-small-button">
                                                    {flowerObject.label}
                                                </div>
                                            </div>
                                            <span className={`${getMoodTextColorFromFlowerId(flowerId)} text-[1rem] uppercase tracking-widest font-roboto font-bold`}>{count}</span>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                } else {
                    return null;
                }
            })}
        </div>
    );
};

export default FlowerCount;
