const pool = require('../db');
  
// Function to get all mood entries for a user
exports.getMoodEntries = async (req, res) => {
    const { userId } = req.params;
    try {
        const result = await pool.query('SELECT * FROM mood_entries WHERE user_id = $1', [userId]);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error in getMoodEntries:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Function to create a new mood entry
exports.createMoodEntry = async (req, res) => {
    const { user_id, flower_id, date, note } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO mood_entries (user_id, flower_id, date, note) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, flower_id, date, note]
        );
        res.status(201).json(result.rows[0]);
        console.log('Entry successfully added.');
    } catch (error) {
        console.error('Error in createMoodEntry:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Function to update a mood entry
exports.updateMoodEntry = async (req, res) => {
    const { id } = req.params;
    const { flower_id, date, note } = req.body;
    try {
        const result = await pool.query(
            'UPDATE mood_entries SET flower_id = $1, date = $2, note = $3 WHERE id = $4 RETURNING *',
            [flower_id, date, note, id]
        );
        res.status(200).json(result.rows[0]);
        console.log('Entry successfully updated.');
    } catch (error) {
        console.error('Error in updateMoodEntries:', error.message);
        res.status(500).json({ error: error.message });
    }
};

exports.updateMoodNote = async (req, res) => {
    const { id } = req.params;
    const { note } = req.body;
    try {
        const result = await pool.query(
            'UPDATE mood_entries SET note = $1 WHERE id = $2 RETURNING *',
            [note, id]
        );
        res.status(200).json(result.rows[0]);
        console.log('Note successfully updated.');
    } catch (error) {
        console.error('Error in updateMoodNote:', error.message);
        res.status(500).json({ error: error.message });
    }
};