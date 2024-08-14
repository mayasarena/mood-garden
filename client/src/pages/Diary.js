import React, { useState, useEffect } from 'react';
import MoodEntriesList from '../components/diary/MoodEntriesList';
import { useMoodEntries } from '../contexts/MoodEntriesContext';
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import CalendarOverview from '../components/diary/CalendarOverview';
import WritingPrompt from '../components/diary/WritingPrompt';

const Diary = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date()); // Current displayed month
    const { getMoodEntriesByMonth } = useMoodEntries(); // Access the context
    const [entries, setEntries] = useState([]);

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

    // Update entries when currentMonth changes
    useEffect(() => {
        const moodEntries = getMoodEntriesByMonth(currentMonth);

        // Sort entries from most recent to least recent
        const sortedEntries = moodEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

        setEntries(sortedEntries);
    }, [currentMonth, getMoodEntriesByMonth]);

    // Function to handle updating a note, updates the displayed note
    const handleNoteUpdate = (entryId, newNote) => {
        // Update the local state
        setEntries(prevEntries => 
            prevEntries.map(entry => 
                entry.id === entryId ? { ...entry, note: newNote } : entry
            )
        );
    };

    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();

    return (
        <div className="flex flex-col w-full h-full gap-container-spacing">
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
            {/** Diary and Sidebar */}
            <div className="flex flex-row h-full gap-container-spacing overflow-hidden">
                <div className="overflow-scroll w-full">
                    <MoodEntriesList entries={entries} handleNoteUpdate={handleNoteUpdate} />
                </div>
                <div className="min-w-[400px] max-w-[400px] h-full bg-white rounded-container p-container">
                    <CalendarOverview currentMonth={currentMonth} entries={entries} />
                    <WritingPrompt />
                </div>
            </div>
        </div>
    );
};

export default Diary;
