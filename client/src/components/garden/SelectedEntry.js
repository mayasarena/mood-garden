import React, { useState, useEffect } from 'react';
import { calculateDateFromIndices } from '../../utils/calculateDate';
import { useMoodEntries } from '../../contexts/MoodEntriesContext';
import { MdCalendarMonth } from "react-icons/md";
import FlowerDisplay from './FlowerDisplay';
import NoteDisplay from './NoteDisplay';
import EditOrCreateEntry from './EditOrCreateEntry';

const SelectedEntry = ({ editMode, setEditMode, selectedBlock, currentMonth }) => {
    const [date, setDate] = useState(new Date()); // The date of the selected entry
    const [flowerId, setFlowerId] = useState(null); // Flower id of the selected entry
    const [note, setNote] = useState(''); // Note of the selected entry
    const [entryId, setEntryId] = useState(null); // Id of the selected entry
    const { getMoodEntryByDate } = useMoodEntries(); // Accessing mood entry functions
    const [isFutureDate, setIsFutureDate] = useState(false); // Flag to indicate if the selected date is in the future

    const updateDisplayedEntry = () => {
        // Set the displayed date when user selects a different block or if the month changes
        const selectedDate = calculateDateFromIndices(selectedBlock.i, selectedBlock.j, currentMonth)
        setDate(selectedDate);

        // Set isFutureDate
        const isFutureDate = selectedDate.setHours(0,0,0,0) > (new Date()).setHours(0,0,0,0);
        setIsFutureDate(isFutureDate);

        // Set the displayed flower id and note
        const entry = getMoodEntryByDate(selectedDate);

        if (entry) {
            setEntryId(entry.id);
            setFlowerId(entry.flower_id);
            setNote(entry.note || '');
        } else {
            setEntryId(null);
            setFlowerId(null);
            setNote('');
        }
    }

    // Update the displayed data on component mount and when the selected block or current month changes
    useEffect(() => {
        updateDisplayedEntry();
    }, [selectedBlock, currentMonth, getMoodEntryByDate]);

    return (
        <section id="selected-entry" className="flex-initial w-full h-full flex flex-col">
            {/** Header */}
            <h2 className="text-header font-semibold mb-4">{editMode && entryId ? "Edit Entry" : editMode && !entryId ? "Create Entry" : "Selected Entry"}</h2>

            {/** Selected date */}
            <div className="flex flex-row items-center gap-4 mb-4">
                <MdCalendarMonth className="text-[1.27rem] text-accent-pink" />
                <span className="text-textgrey text-base font-medium">
                    {`${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}${date.toDateString() === new Date().toDateString() ? ' (Today)' : ''}`}
                </span>
            </div>
            {/** Display entry info if not in edit mode */}
            {!editMode ? (
                <>
                    {/** If the selected block has an associated id, display corresponding information */}
                    {entryId && (
                        <div className="h-full flex flex-col gap-6">
                            {/** Flower info and entry note */}
                            <FlowerDisplay flowerId={flowerId} />
                            <NoteDisplay note={note} />
                        </div>
                    )}
                    {/** User cannot create an entry if a future date is selected */}
                    {isFutureDate ? (
                        <span className="flex-grow text-base italic">
                            You can't create future entries.
                        </span>
                    ) : (
                        <>
                            {/** Display a message if there is no entry id */}
                            {!entryId && (
                                <span className="flex-grow text-base italic">
                                    No entry... yet!
                                </span>
                            )}
                            <button 
                                onClick={() => setEditMode(true)}
                                className="primary-button"
                            >
                                {entryId ? ('Edit Entry') : ('Create Entry')}
                            </button>
                        </>
                    )}
                </>
            ) : (
                <EditOrCreateEntry 
                    entryId={entryId} 
                    date={date} 
                    note={note} 
                    setNote={setNote} 
                    flowerId={flowerId} 
                    setFlowerId={setFlowerId} 
                    setEditMode={setEditMode} 
                />
            )}
        </section>
    );
};

export default SelectedEntry;