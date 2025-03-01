import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import WorkoutPlans from './pages/WorkoutPlans';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import UserProfile from './pages/UserProfile';
import ActiveWorkout from './pages/ActiveWorkout';
import LoadingAnimation from './components/LoadingAnimation';

function App() {
  const [showLoading, setShowLoading] = useState(true);

  const handleLoadingComplete = () => {
    setShowLoading(false);
  };

  if (showLoading) {
    return <LoadingAnimation onComplete={handleLoadingComplete} />;
  }

  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/workout-plans" element={<WorkoutPlans />} />
                <Route path="/progress" element={<Progress />} />
                <Route path="/nutrition" element={<Nutrition />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/active-workout" element={<ActiveWorkout />} />
              </Routes>
            </AnimatePresence>
          </div>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;