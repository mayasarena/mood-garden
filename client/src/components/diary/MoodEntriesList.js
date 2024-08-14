import React from 'react';
import { getFlowerObjectFromId, getMoodTextColorFromFlowerId } from '../../utils/flowerData';
import EditNote from './EditNote';

const MoodEntriesList = ({ entries, handleNoteUpdate }) => {
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric' });

    return (
        <div className="flex flex-col gap-6">
            {entries.map(entry => {
                const note = entry.note;
                const date = entry.date;
                const flowerLabel = getFlowerObjectFromId(entry.flower_id).label;
                const flowerImage = getFlowerObjectFromId(entry.flower_id).image;
                const flowerLabelColor = getMoodTextColorFromFlowerId(entry.flower_id);

                return (
                    <div key={entry.id} className="relative bg-white rounded-container p-container flex flex-row gap-8">
                        {/** Edit note button */}
                        <div className="absolute right-0 top-0 pt-container pr-container">
                            <EditNote 
                                entryId={entry.id}
                                handleNoteUpdate={handleNoteUpdate}
                                note={note}
                                date={date} 
                                flowerLabel={flowerLabel}
                                flowerImage={flowerImage}
                                flowerLabelColor={flowerLabelColor}
                            />
                        </div>

                        {/** Flower image */}
                        <div className="min-w-[80px] max-w-[80px] h-[80px] rounded-full border-[3px] border-accent-pink shadow-pink overflow-hidden">
                            <img className="w-full h-full object-cover" src={flowerImage} />
                        </div>
                        <div>
                            {/** Entry Date and Flower Type */}
                            <h3 className="text-base text-textgrey font-semibold mb-2">{formatter.format(new Date(date))}</h3>
                            <h3 className={`${flowerLabelColor} small-header mb-4`}>{flowerLabel}</h3>

                            {/** Entry note */}
                            {note ? (<div className="text-base" dangerouslySetInnerHTML={{ __html: note }} />) : (<span className="text-base italic text-textgrey">No entry... yet!</span>)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default MoodEntriesList;
