import React, { useState } from 'react';
import { writingPromptDict } from '../../utils/writingPromptData';
import { MdArrowDropDown } from 'react-icons/md';
import { IoMdRefresh } from "react-icons/io";

const categories = Object.keys(writingPromptDict);

const getRandomPromptWithCategory = (category) => {
    const prompts = writingPromptDict[category];

    if (!prompts || prompts.length === 0) {
        throw new Error(`No prompts found for category: ${category}`);
    }

    const randomIndex = Math.floor(Math.random() * prompts.length);
    const prompt = prompts[randomIndex]
    return [category, prompt];
};

const getRandomPrompt = () => {
    if (categories.length === 0) {
        throw new Error('No categories available');
    }

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const prompt = getRandomPromptWithCategory(randomCategory);
    return prompt;
};

const WritingPrompt = () => {
    const randomPrompt = getRandomPrompt();
    const [writingPrompt, setWritingPrompt] = useState(randomPrompt[1]);
    const [category, setCategory] = useState(randomPrompt[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('Any Category')

    // Dropdown functions
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleOptionClick = (category) => {
        setSelectedCategory(category);
        setDropdownOpen(false);
    };

    const handleRefresh = () => {
        if (selectedCategory === 'Any Category') {
            const prompt = getRandomPrompt();
            setWritingPrompt(prompt[1]);
            setCategory(prompt[0]);
        } else {
            const prompt = getRandomPromptWithCategory(selectedCategory);
            setWritingPrompt(prompt[1]);
            setCategory(prompt[0]);
        }
    }

    return (
        <>
            {/** Header */}
            <h2 className="text-header font-semibold">Writing Prompt</h2>

            {/** Buttons */}
            <div className="flex flex-row gap-3 my-6">
                {/** Prompt Selection Dropdown */}
                <div className="relative">
                    <button 
                        onClick={toggleDropdown}
                        className="w-[200px] flex flex-row items-center justify-between py-2 px-4 text-base font-medium small-button"
                    >
                        {selectedCategory}
                        <MdArrowDropDown className="text-[1.2rem]" />
                    </button>
                    {dropdownOpen && (
                        <div className="absolute z-10 w-[200px] top-[40px] bg-accent-lightpink rounded-small-button overflow-hidden">
                            <ul className="max-h-[200px] overflow-scroll">
                                <li
                                    onClick={() => handleOptionClick('Any Category')}
                                    className={`text-base font-medium cursor-pointer px-4 py-2 bg-opacity-100 hover:bg-accent-pink hover:text-white
                                                ${selectedCategory === 'Any Category' ? 'bg-accent-pink text-white' : 'bg-transparent text-accent-darkpink'}`}
                                >
                                    Any Category
                                </li>
                                {categories.map((category) => (
                                    <li
                                        key={category}
                                        onClick={() => handleOptionClick(category)}
                                        className={`text-base font-medium cursor-pointer px-4 py-2 bg-opacity-100 hover:bg-accent-pink hover:text-white
                                            ${selectedCategory === category ? 'bg-accent-pink text-white' : 'bg-transparent text-accent-darkpink'}`}
                                    >
                                        {category}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/** Refresh Button */}
                <button
                    onClick={() => handleRefresh()}
                    className="w-full flex flex-row items-center justify-center gap-3 py-2 px-6 text-base font-medium text-accent-darkpink small-button"
                >
                    <IoMdRefresh className="text-[1.2rem]" />
                    Refresh
                </button>
            </div>

            {/** Writing Prompt Display */}
            <span className="small-header text-accent-darkpink">{category}</span>
            <p className="text-base text-textgrey mt-2">{writingPrompt}</p>
        </>
    )
}

export default WritingPrompt;