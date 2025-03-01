import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function ActiveWorkout() {
  const navigate = useNavigate();
  const { activeWorkout, completeWorkout } = useUser();
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(60); // 60 seconds per exercise
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isRestPeriod, setIsRestPeriod] = useState(false);
  const [restTimer, setRestTimer] = useState(30); // 30 seconds rest between exercises

  useEffect(() => {
    // Redirect if no active workout
    if (!activeWorkout) {
      navigate('/workout-plans');
    }
  }, [activeWorkout, navigate]);

  useEffect(() => {
    let interval;
    
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (isRestPeriod) {
          if (restTimer > 0) {
            setRestTimer(prev => prev - 1);
          } else {
            // Rest period over, move to next exercise
            setIsRestPeriod(false);
            setRestTimer(30);
            setTimer(60);
          }
        } else {
          if (timer > 0) {
            setTimer(prev => prev - 1);
          } else {
            // Exercise completed
            if (currentExerciseIndex < activeWorkout?.exercises.length - 1) {
              // Start rest period before next exercise
              setIsRestPeriod(true);
              setCurrentExerciseIndex(prev => prev + 1);
            } else {
              // Workout completed
              setIsTimerRunning(false);
              alert('Workout completed! Great job!');
              completeWorkout();
              navigate('/dashboard');
            }
          }
        }
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isTimerRunning, timer, restTimer, isRestPeriod, currentExerciseIndex, activeWorkout, completeWorkout, navigate]);

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    if (isRestPeriod) {
      setRestTimer(30);
    } else {
      setTimer(60);
    }
  };

  const skipToNextExercise = () => {
    if (currentExerciseIndex < activeWorkout?.exercises.length - 1) {
      setCurrentExerciseIndex(prev => prev + 1);
      setIsRestPeriod(false);
      setTimer(60);
      setRestTimer(30);
    } else {
      // Last exercise
      completeWorkout();
      navigate('/dashboard');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!activeWorkout) {
    return <div>Loading...</div>;
  }

  // Get exercise images based on keywords in the exercise name
  const getExerciseImage = (exerciseName) => {
    const exerciseLower = exerciseName.toLowerCase();
    
    if (exerciseLower.includes('bench press')) {
      return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('squat')) {
      return 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('deadlift')) {
      return 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('pull')) {
      return 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('push')) {
      return 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('shoulder') || exerciseLower.includes('press')) {
      return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('row')) {
      return 'https://images.unsplash.com/photo-1598971639058-fab3c3109a00?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('curl')) {
      return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('extension')) {
      return 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('plank')) {
      return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('jump')) {
      return 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else if (exerciseLower.includes('lunge')) {
      return 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    } else {
      return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
        </button>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{activeWorkout.title}</h1>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${getExerciseImage(activeWorkout.exercises[currentExerciseIndex])})` }}></div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              {isRestPeriod ? 'Rest Period' : `Exercise ${currentExerciseIndex + 1} of ${activeWorkout.exercises.length}`}
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {formatTime(isRestPeriod ? restTimer : timer)}
            </span>
          </div>
          
          {!isRestPeriod && (
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {activeWorkout.exercises[currentExerciseIndex]}
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(1 - timer / 60) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          {isRestPeriod && (
            <div className="mb-6">
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Take a break! Next up: {activeWorkout.exercises[currentExerciseIndex]}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div 
                  className="bg-green-500 h-2.5 rounded-full" 
                  style={{ width: `${(1 - restTimer / 30) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className={`p-3 rounded-full ${
                isTimerRunning 
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-300' 
                  : 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-900 dark:text-green-300'
              }`}
            >
              {isTimerRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            
            <button
              onClick={resetTimer}
              className="p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
            >
              <RotateCcw className="h-6 w-6" />
            </button>
            
            <button
              onClick={skipToNextExercise}
              className="p-3 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
            >
              <CheckCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Workout Plan</h2>
        <ul className="space-y-2">
          {activeWorkout.exercises.map((exercise, index) => (
            <li 
              key={index} 
              className={`p-3 rounded-md ${
                index === currentExerciseIndex 
                  ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500' 
                  : index < currentExerciseIndex 
                    ? 'line-through text-gray-400 dark:text-gray-500' 
                    : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {exercise}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}