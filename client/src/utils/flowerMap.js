import { useMoodEntries } from '../contexts/MoodEntriesContext';
import { calculateDateFromIndices } from './calculateDate';
import { useState, useEffect } from 'react';

const useFlowerMapForMonth = (currentMonth) => {
    const { moodEntries, getMoodEntryByDate } = useMoodEntries();
    const [flowerMap, setFlowerMap] = useState({});

    useEffect(() => {
        const newFlowerMap = {};

        // Loop through the grid for the current month
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {
                const calculatedDate = calculateDateFromIndices(i, j, currentMonth);

                // Check moodEntries for an entry that matches this date
                const entry = getMoodEntryByDate(calculatedDate);
                if (entry) {
                    newFlowerMap[`${i}-${j}`] = entry.flower_id;
                }
            }
        }

        setFlowerMap(newFlowerMap);
    }, [currentMonth, moodEntries]);

    return flowerMap;
};

export default useFlowerMapForMonth;