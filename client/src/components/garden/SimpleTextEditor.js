import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

const SimpleTextEditor = ({ note, setNote }) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            ['clean']
        ],
    };

    return (
        <ReactQuill
            value={note}
            onChange={setNote}
            placeholder="Write a note about your day..."
            modules={modules}
            theme="bubble"
            className="w-full h-[100px]"
        />
  );
};

export default SimpleTextEditor;