import React, { useState } from 'react';
import { MdEditNote, MdCalendarMonth } from "react-icons/md";
import Modal from '../Modal';
import TextEditor from './TextEditor';
import { useMoodEntries } from '../../contexts/MoodEntriesContext';

const EditNote = ({ entryId, handleNoteUpdate, note, date, flowerLabel, flowerImage, flowerLabelColor }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newNote, setNewNote] = useState(note);
    const { updateMoodEntryNote } = useMoodEntries(); // Accessing mood entry functions

    const updateNote = () => {
        if (!entryId) {
            console.error('Error saving note.');
            return;
        }

        updateMoodEntryNote(entryId, newNote);
        setIsModalOpen(false);
    };

    // Function to handle cancelling the note update
    const handleCancel = () => {
        setIsModalOpen(false);
        setNewNote(note);
    }

    return (
        <>
            {/** Edit note button */}
            <button onClick={() => setIsModalOpen(true)} className="group relative flex justify-center items-center small-button w-[35px] h-[35px]">
                <MdEditNote className="text-[1.27rem]" />

                {/** Edit note tooltip */}
                <div className="absolute bottom-[-35px] tooltip-content pointer-events-none">
                    <div className="w-[80px] py-[2px] text-xs text-center bg-textgrey text-white rounded-button-tooltip">
                        Edit note
                        <div 
                            className="
                            absolute -top-[5px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-l-transparent 
                            border-r-[5px] border-r-transparent border-b-[5px] border-b-textgrey" 
                        />
                    </div>
                </div>
            </button>

            {/** Edit note modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-[1000px]"
            >
                <div className="h-full flex flex-col justify-between">
                    {/** Header */}
                    <div className="flex flex-row justify-between items-center">
                        <h2 className="text-header font-semibold mb-4">Edit Note</h2>

                        <div className="flex flex-row gap-4 items-center">
                            {/** Note date */}
                            <div className="flex flex-row gap-4 items-center">
                                <MdCalendarMonth className="text-[1.27rem] text-accent-pink" />
                                <span className="text-textgrey text-base font-medium">
                                    {`${(new Date(date)).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}${(new Date(date)).toDateString() === new Date().toDateString() ? ' (Today)' : ''}`}
                                </span>
                            </div>

                            {/** Note flower label */}
                            <span className={`small-header ${flowerLabelColor}`}>{flowerLabel}</span>
                            <div className="w-[50px] h-[50px] overflow-hidden shadow-pink border-[3px] border-accent-darkpink rounded-full"><img src={flowerImage} className="w-full h-full object-cover" /></div>
                        </div>
                    </div>

                    <div className="h-[363px]">
                        <TextEditor
                            note={newNote}
                            setNote={setNewNote}
                        />
                    </div>

                    <div className="flex flex-row gap-3 justify-end">
                        <button onClick={updateNote} className="primary-button w-[170px]">Save Note</button>
                        <button onClick={handleCancel} className="secondary-button w-[170px]">Cancel</button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditNote;