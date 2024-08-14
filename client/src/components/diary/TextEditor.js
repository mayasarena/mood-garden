import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ note, setNote }) => {
    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{'header': 1}, {'header': 2}],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'color': ['#000', '#A7A7A7', '#FFA1BD', '#FEB055', '#DFCE37', '#A0D7FF', '#D4A0F4'] }, 
            { 'background': ['#F5F5F5', '#ffc8d8', '#ffdbb3', '#fff6a5', '#dfd', '#c1e5ff', '#eac9ff'] }],  
        ],
    };

    return (
        <ReactQuill
            value={note}
            onChange={setNote}
            placeholder="Write a note about your day..."
            modules={modules}
            theme="snow"
            className="w-full h-[320px] custom-quill"
        />
  );
};

export default TextEditor;
