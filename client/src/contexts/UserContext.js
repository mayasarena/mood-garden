import React, { createContext, useState, useContext } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const googleLogin = useGoogleLogin({
        scope: 'openid profile email',
        onSuccess: async (tokenResponse) => {
            const accessToken = tokenResponse.access_token;
            if (!accessToken) {
                console.error('No access token found in the token response.');
                return;
            }
            try {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        Accept: 'application/json'
                    }
                });
    
                const { id: google_id, name, email, picture: profile_image_url } = response.data;

                // Send user data to backend to get or create the user in the database
                const dbResponse = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
                    google_id,
                    name,
                    email,
                    profile_image_url
                })
                setUser(dbResponse.data);
            } catch (error) {
                console.error('Login failed: ', error.response ? error.response.data : error.message);
            }
        },
        onError: (error) => {
            console.error('Login failed: ', error);
        },
    });

    const logout = () => {
        setUser(null);
    };

    const updatePoints = async (points) => {
        if (!user) {
            console.error('No user is logged in.');
            return;
        }
        
        try {
            // Send the updated points to the backend
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}/points`, {
                points
            });
            
            // Update the local user state with the updated user data
            setUser(response.data);
        } catch (error) {
            console.error('Error updating points:', error.response ? error.response.data : error.message);
        }
    };

    const addPoints = (points) => {
        const newPoints = user.points + points;
        try {
            updatePoints(newPoints);
        } catch {
            console.error('Error adding points.');
        }
    }

    const removePoints = (points) => {
        const newPoints = user.points - points;

        if (newPoints < 0) {
            console.error('Invalid points');
            return;
        }

        try {
            updatePoints(newPoints);
        } catch {
            console.error('Error adding points.');
        }
    }

    const addPurchasedPlant = async (plantId) => {
        if (!user) {
            console.error('No user is logged in.');
            return;
        }

        try {
            // Send request to backend to add the plant to the user's unlocked plants
            const response = await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/users/${user.id}/purchased-plants`, {
                plantId
            });

            // Update the local user state with the new unlocked plants list
            setUser(response.data);
        } catch (error) {
            console.error('Error adding purchased plant:', error.response ? error.response.data : error.message);
        }
    }

    return (
        <UserContext.Provider value={{ user, googleLogin, logout, addPoints, removePoints, addPurchasedPlant }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
      throw new Error('useUser must be used within a UserProvider');
    }

    const { user, googleLogin, logout, addPoints, removePoints, addPurchasedPlant } = context;
    const isLoggedIn = !!user;
  
    return { user, googleLogin, logout, isLoggedIn, addPoints, removePoints, addPurchasedPlant };
  }