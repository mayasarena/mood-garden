import React from 'react';
import { useUser } from '../contexts/UserContext';

const LoginButton = () => {
    const { googleLogin } = useUser();

    return (
        <button
            onClick={googleLogin}
            className="flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-xs py-2 px-4"
        >
            <img 
                src="https://developers.google.com/identity/images/g-logo.png" 
                alt="Google logo" 
                className="w-6 h-6 mr-3"
            />
            <span className="text-gray-700 text-base font-medium">
                Sign in with Google
            </span>
        </button>
    );
};

export default LoginButton;