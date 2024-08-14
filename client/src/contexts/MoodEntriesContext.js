import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';

const MoodEntriesContext = createContext();

export const MoodEntriesProvider = ({ children }) => {
    const [moodEntries, setMoodEntries] = useState(new Map());
    const { user } = useUser();
    const [loading, setLoading] = useState(true);

    // Fetch entries from the server
    useEffect(() => {
        if (user) {
            fetchMoodEntries(user.id);
        }
    }, [user]);

    const fetchMoodEntries = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/mood-entries/${userId}`);
            setLoading(false);
            const entries = response.data;
            const entriesMap = new Map(entries.map(entry => [new Date(entry.date).toDateString(), entry]));
            setMoodEntries(entriesMap);
        } catch (error) {
            console.error('Error fetching mood entries: ', error);
            setLoading(false);
        }
    };

    const addMoodEntry = async (newEntry) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/mood-entries`, newEntry);
            const entry = response.data;
            setMoodEntries(prevMap => new Map(prevMap).set(new Date(entry.date).toDateString(), entry));
        } catch (error) {
            console.error('Error adding mood entry: ', error);
        }
    }

    const updateMoodEntry = async (id, updatedEntry) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/mood-entries/${id}`, updatedEntry);
            const entry = response.data;
            setMoodEntries(prevMap => {
                const newMap = new Map(prevMap);
                newMap.set(new Date(entry.date).toDateString(), entry);
                return newMap;
            });
        } catch (error) {
            console.error('Error updating mood entry:', error);
        }
    };

    const updateMoodEntryNote = async (entryId, newNote) => {
        try {
            // Update the note on the server
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/mood-entries/${entryId}/note`, {
                note: newNote
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            // Get the updated entry
            const updatedEntry = response.data;
        
            // Update the moodEntries state
            setMoodEntries(prevMap => {
                const newMap = new Map(prevMap);
                newMap.set(new Date(updatedEntry.date).toDateString(), updatedEntry);
                return newMap;
            });
        } catch (error) {
            console.error('Error updating note:', error);
            throw error;
        }
    };

    const getMoodEntryByDate = (date) => {
        return moodEntries.get(new Date(date).toDateString());
    };

    const getMoodEntriesByWeek = (date) => {
        const startDate = new Date(date);
        const endDate = new Date(date);
    
        // Set start date to Sunday of the current week
        startDate.setDate(startDate.getDate() - startDate.getDay()); // Sunday
        startDate.setHours(0, 0, 0, 0);
    
        // Set end date to Saturday of the current week
        endDate.setDate(endDate.getDate() + (6 - endDate.getDay())); // Saturday
        endDate.setHours(23, 59, 59, 999);
    
        // Convert the Map to an array of entries
        return Array.from(moodEntries.values()).filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate >= startDate && entryDate <= endDate;
        });
    };

    const getMoodEntriesByMonth = (date) => {
        const month = date.getMonth();
        const year = date.getFullYear();
    
        // Convert the Map to an array of entries
        return Array.from(moodEntries.values()).filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getMonth() === month && entryDate.getFullYear() === year;
        });
    };

    const getMoodEntriesByYear = (date) => {
        const year = date.getFullYear();
    
        return Array.from(moodEntries.values()).filter(entry => {
            const entryDate = new Date(entry.date);
            return entryDate.getFullYear() === year;
        });
    };

    const getRecentMoodEntries = (count = 10) => {
        const entriesArray = Array.from(moodEntries.values());
        // Sort the entries by date in descending order
        const sortedEntries = entriesArray.sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedEntries.slice(0, count);
    };

    return (
        <MoodEntriesContext.Provider value={{ loading, moodEntries, addMoodEntry, updateMoodEntry, updateMoodEntryNote, getMoodEntryByDate, getMoodEntriesByWeek, getMoodEntriesByMonth, getMoodEntriesByYear, getRecentMoodEntries }}>
            {children}
        </MoodEntriesContext.Provider>
    );
};

export const useMoodEntries = () => {
    const context = useContext(MoodEntriesContext);
    if (!context) {
        throw new Error('useMoodEntries must be used within a MoodEntriesProvider');
    }
    return context;
};