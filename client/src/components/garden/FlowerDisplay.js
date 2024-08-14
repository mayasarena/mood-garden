import React, { useState, useEffect } from 'react';
import { getFlowerObjectFromId, getMoodTextColorFromFlowerId } from '../../utils/flowerData';

const FlowerDisplay = ({ flowerId }) => {
    // Get Mood and Flower Labels from the Flower ID
    const getLabels = (flowerId) => {
        const label = getFlowerObjectFromId(flowerId).label;
        const moods = ['Very Happy', 'Happy', 'Neutral', 'Sad', 'Very Sad'];
        let mood = moods.find((mood) => label.startsWith(mood));
        let flowerType = label.replace(mood, "").trim(); 
        return [mood, flowerType];
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-[250px] h-[250px] overflow-hidden">
                <img alt={getFlowerObjectFromId(flowerId).label} src={getFlowerObjectFromId(flowerId).image} className="object-cover w-full h-full" />
            </div>
            <span className={`${getMoodTextColorFromFlowerId(flowerId)} text-medium font-semibold`}>{getLabels(flowerId)[0]}</span>
            <span className="text-textgrey text-base italic">{getLabels(flowerId)[1]}</span>
        </div>
    )
};

export default FlowerDisplay;