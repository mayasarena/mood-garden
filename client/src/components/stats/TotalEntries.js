import React from 'react';
import { moodTextColor, moodTitles } from '../../utils/flowerData';

const TotalEntries = ({ totalCounts }) => {
    const totalCount = Object.values(totalCounts).reduce((sum, value) => sum + value, 0);

    return (
        <div className="bg-white p-container rounded-container flex flex-col justify-between">
            {/** Header with total count */}
            <div className="flex flex-row gap-4 h-[50px]">
                <h4 className="small-header text-accent-darkpink">Total Entries</h4>
                <span className="small-header text-textgrey">{totalCount}</span>
            </div>
            {/** Smiley Images with counts */}
            <div className="flex flex-row gap-10">
                {Object.entries(totalCounts).map(([moodId, count]) => (
                    <div className="flex flex-col gap-2 items-center">
                        <img alt={moodTitles[moodId]} src={`/images/smileys/${moodId}.png`} className="w-[50px] h-[50px]" />
                        <span className={`font-bold font-roboto text-medium ${moodTextColor[moodId]}`}>{count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TotalEntries;