import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Garden from './pages/Garden';
import Diary from './pages/Diary';
import Stats from './pages/Stats';
import PlantShop from './pages/PlantShop';
import { useUser } from './contexts/UserContext';
import LoginButton from './components/LoginButton';

function App() {
    const { isLoggedIn } = useUser();

    return (
        <Router>
            {isLoggedIn ? (
                // App
                <div className="w-screen h-screen flex">
                    <Sidebar />
                    <main className="flex-grow h-screen bg-bg p-container-spacing">
                    <Routes>
                        <Route path="/" element={<Garden />} />
                        <Route path="/diary" element={<Diary />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/shop" element={<PlantShop />} />
                    </Routes>
                    </main>
                </div>
            ) : (
                // Login Screen
                <div className="w-screen h-screen bg-bg flex flex-col gap-24 items-center justify-center">
                    <img alt="Logo" src='/images/logo.png' className=" h-[95px] mt-[-250px]" />
                    <LoginButton />
                </div>
            )}
        </Router>
  );
}

export default App;
