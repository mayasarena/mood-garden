import React, { useState } from 'react';
import { IoChevronForward } from "react-icons/io5";
import Modal from '../Modal';
import { IoClose } from "react-icons/io5";

// Function to remove html tags from the note
const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
};

const NoteDisplay = ({ note }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3 h-[310px] overflow-hidden fade-out">
            {/** Title */}
            <div className="flex flex-row justify-between mt-2">
                <h3 className="font-semibold text-base">Note Preview</h3>
                {/** See More button */}
                {note && (
                <button onClick={() => setIsModalOpen(true)} className="text-accent-pink text-base font-semibold flex flex-row gap-2 items-center">
                    <span>See More</span>
                    <IoChevronForward className="text-[1rem]" />
                </button>
                )}
            </div>
            {/** Note display */}
            <p className="text-textgrey text-base">{stripHtmlTags(note) || `You didn't write a note for this entry!`}</p>

            {/** Note display modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                width="w-[850px]"
            >
                <div className="flex flex-col h-full gap-4">
                    <div className="flex flex-row justify-between items-end">
                        <span className="text-base font-semibold">Note</span>
                        <button onClick={() => setIsModalOpen(false)} className="text-[1.5rem] text-accent-darkpink">
                            <IoClose />
                        </button>
                    </div>
                    <div 
                        className="h-full text-base overflow-auto" 
                        dangerouslySetInnerHTML={{ __html: note }} 
                    />
                </div>
            </Modal>
        </div>
    );
};

export default NoteDisplay;