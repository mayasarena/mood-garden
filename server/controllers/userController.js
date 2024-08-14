const pool = require('../db');
const axios = require('axios');
  
// Get a single user by ID
exports.getUser = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error });
    }
};

// Create a new user by google ID (for login)
exports.getOrCreateUserByGoogleId = async (req, res) => {
    try {
        const { name, email, profile_image_url, google_id } = req.body;
        let result = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
        
        // Create user if it doesn't exist in the database
        if (result.rows.length === 0) {
            console.log('User does not exist yet: creating new user.');

            // Defining default plants
            const defaultPlants = ['classic-vhappy', 'classic-happy', 'classic-neutral', 'classic-sad', 'classic-vsad'];
            const defaultPlantsJson = JSON.stringify(defaultPlants);

            result = await pool.query(
                'INSERT INTO users (name, email, google_id, profile_image_url, purchased_plants) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, google_id, profile_image_url, defaultPlantsJson]
            );
            return res.status(201).json(result.rows[0]);
        }

        console.log('Fetching user.');
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error in getOrCreateUserByGoogleId:', error.message);
        res.status(500).json({ message: 'Error processing request', error: error.message });
    }
};
  
// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const result = await pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *',
        [name, email, req.params.id]
        );
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error });
    }
};
  
// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
};

// Update points for a user by ID
exports.updateUserPoints = async (req, res) => {
    const userId = req.params.id;
    const { points } = req.body;

    // Validate points
    if (typeof points !== 'number' || points < 0) {
        return res.status(400).json({ message: 'Invalid points value' });
    }

    try {
        // Update points in the database
        const result = await pool.query(
            'UPDATE users SET points = $1 WHERE id = $2 RETURNING *',
            [points, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating points', error });
    }
};

// Add purchased plants for a user by ID
exports.addPurchasedPlant = async (req, res) => {
    const userId = req.params.id;
    const { plantId } = req.body; // Expecting a single plant ID as a string

    // Validate plantId
    if (typeof plantId !== 'string') {
        return res.status(400).json({ message: 'Invalid plantId. It should be a string.' });
    }

    try {
        // Fetch the current list of purchased plants
        const userResult = await pool.query('SELECT purchased_plants FROM users WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        let currentPlants = userResult.rows[0].purchased_plants || [];
        if (!Array.isArray(currentPlants)) {
            currentPlants = []; // Initialize as an empty array if not already an array
        }

        // Add the new plant ID to the array if it doesn't already exist
        if (!currentPlants.includes(plantId)) {
            currentPlants.push(plantId);
        }

        // Update the purchased plants in the database
        const updateResult = await pool.query(
            'UPDATE users SET purchased_plants = $1 WHERE id = $2 RETURNING *',
            [JSON.stringify(currentPlants), userId]
        );

        res.json(updateResult.rows[0]);
    } catch (error) {
        res.status(500).json({ message: 'Error updating purchased plants', error });
    }
};