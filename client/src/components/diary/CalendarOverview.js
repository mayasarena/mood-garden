import React, { useState, useEffect } from 'react';

const moodColors = {
    'vhappy': 'bg-accent-pink',
    'happy': 'bg-accent-orange',
    'neutral': 'bg-accent-yellow',
    'sad': 'bg-accent-blue',
    'vsad': 'bg-accent-purple',
}

// Helper function to get mood background color
const getMoodColor = (flowerId) => {
    if (!flowerId) return null;
    const [, moodId] = flowerId.split('-');
    return moodColors[moodId];
}

// Helper function to get days in a month
const getDaysInMonth = (month, year) => {
    const days = [];
    const firstDay = new Date(year, month, 1).getDay(); // Get the first day of the month
    const lastDate = new Date(year, month + 1, 0).getDate(); // Get the last date of the month

    // Fill the days of the previous month
    for (let i = 0; i < firstDay; i++) {
        days.push({dayNum: null, color: null});
    }

    // Fill the days of the current month
    for (let i = 1; i <= lastDate; i++) {
        days.push({dayNum: i, color: null});
    }

    return days;
};

const getDaysWithColors = (currentMonth, entries) => {
    let days = getDaysInMonth(currentMonth.getMonth(), currentMonth.getYear());

    const dayColorMap = new Map();
    entries.forEach(entry => {
        const date = new Date(entry.date);
        const dayNum = date.getDate();
        // Map day number to color
        dayColorMap.set(dayNum, getMoodColor(entry.flower_id));
    });

    // Assign colors to days
    days = days.map(day => ({
        ...day,
        color: day.dayNum ? dayColorMap.get(day.dayNum) || null : null
    }));

    return days;
}

const CalendarOverview = ({ currentMonth, entries }) => {
    const [days, setDays] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const weekTextStyle = 'font-roboto text-xs uppercase tracking-wider text-textgrey';

    useEffect(() => {
        // Function to initialize days with colors
        const initializeCalendar = () => {
            const daysWithColors = getDaysWithColors(currentMonth, entries);
            setDays(daysWithColors);
            setIsLoaded(true);
        };

        // Call the initialization function
        initializeCalendar();
    }, [currentMonth, entries]);

    return (
        <div className="pb-6">
            {/** Header */}
            <h2 className="text-header font-semibold">Calendar Overview</h2>

            {/** Calendar Grid */}
            {isLoaded ? (
                <div className="grid grid-cols-7 gap-3 text-center mt-8">
                    {/** Days of the week */}
                    <div className={weekTextStyle}>Sun</div>
                    <div className={weekTextStyle}>Mon</div>
                    <div className={weekTextStyle}>Tue</div>
                    <div className={weekTextStyle}>Wed</div>
                    <div className={weekTextStyle}>Thu</div>
                    <div className={weekTextStyle}>Fri</div>
                    <div className={weekTextStyle}>Sat</div>

                    {/** Calendar days */}
                    {days.map((day, index) => (
                        <div
                            key={index}
                            className={`${day.dayNum === (new Date()).getDate() && currentMonth.getMonth() === (new Date()).getMonth() && currentMonth.getFullYear() === (new Date()).getFullYear() ? 'font-extrabold' : 'font-normal'} 
                            h-[40px] w-[40px] flex items-center justify-center text-base ${day.color ? `${day.color} bg-opacity-60 rounded-full` : 'bg-transparent'}`}
                        >
                            {day.dayNum || ''}
                        </div>
                    ))}
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default CalendarOverview;