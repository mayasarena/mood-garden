import React, { useState } from 'react';
import FlowerOptions from './FlowerOptions';
import { useMoodEntries } from '../../contexts/MoodEntriesContext';
import { useUser } from '../../contexts/UserContext';
import SimpleTextEditor from './SimpleTextEditor';

const EditOrCreateEntry = ({ entryId, date, note, setNote, flowerId, setFlowerId, setEditMode }) => {
    const [selectedFlowerId, setSelectedFlowerId] = useState(flowerId);
    const { addMoodEntry, updateMoodEntry } = useMoodEntries(); // Accessing mood entry functions
    const { user, addPoints } = useUser();

    // Function to save an entry
    const saveEntry = () => {

        // Error if user is not logged in
        if (!user) {
            console.error('User must be logged in to create a mood entry.');
            return;
        }

        // Error if a flower is not selected - precautionary
        if (!selectedFlowerId) {
            console.error('Please select a flower to save your entry.');
            return;
        }

        // Creating the entry object
        const entry = {
            user_id: user.id,
            flower_id: selectedFlowerId,
            date: date,
            note: note
        }

        /**
         * If an entry ID exists (user clicked on an existing entry), update the entry
         * Otherwise, create a new entry
         */
        if (entryId) {
            updateMoodEntry(entryId, entry);
        } else {
            // Only add points if day is today, add extra points if a note is added too
            if (new Date(date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
                addPoints(note ? 20 : 15);
            }
            addMoodEntry(entryId, entry);
        }

        // Set the current flower ID and note, and turn off edit mode
        setFlowerId(flowerId);
        setNote(note);
        setEditMode(false);
    };
    
    return (
        <div className="relative flex flex-col h-full">
            <FlowerOptions selectedFlowerId={selectedFlowerId} setSelectedFlowerId={setSelectedFlowerId}/>
            <div className="font-semibold text-base my-3">
                Note
            </div>
            <SimpleTextEditor note={note} setNote={setNote} />
            <div className="absolute bottom-0 flex gap-3 w-full">
                <button 
                    onClick={() => saveEntry()}
                    className="primary-button flex-1"
                >
                    Save
                </button>
                <button 
                    onClick={() => setEditMode(false)}
                    className="secondary-button flex-1"
                >
                    Cancel
                </button>
            </div>
        </div>
    )
};

export default EditOrCreateEntry;