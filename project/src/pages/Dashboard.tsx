import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Dumbbell, Droplets, Pizza, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { 
    profile, 
    waterIntake, 
    updateWaterIntake, 
    caloriesBurned, 
    caloriesConsumed, 
    activeWorkout 
  } = useUser();

  // Calculate BMI if height and weight are available
  const calculateBMI = () => {
    if (profile.height && profile.weight) {
      // BMI = weight(kg) / (height(m))²
      const heightInMeters = profile.height / 100;
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1);
    }
    return "N/A";
  };

  const bmi = calculateBMI();

  // Determine BMI category
  const getBMICategory = () => {
    const bmiValue = parseFloat(bmi);
    if (isNaN(bmiValue)) return "Unknown";
    
    if (bmiValue < 18.5) return "Underweight";
    if (bmiValue < 25) return "Healthy Weight";
    if (bmiValue < 30) return "Overweight";
    return "Obese";
  };

  const bmiCategory = getBMICategory();
  const bmiColor = 
    bmiCategory === "Healthy Weight" ? "text-green-500" :
    bmiCategory === "Underweight" ? "text-yellow-500" :
    bmiCategory === "Overweight" ? "text-orange-500" :
    "text-red-500";

  // Handle water intake update
  const handleWaterIntakeUpdate = (amount: number) => {
    updateWaterIntake(amount);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1571902943202-507ec2618e8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        {profile.name ? `Welcome, ${profile.name}` : 'Dashboard'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Today's Workout</h2>
            <Dumbbell className="h-6 w-6 text-blue-500" />
          </div>
          {activeWorkout ? (
            <>
              <p className="text-gray-600 dark:text-gray-300">{activeWorkout.title}</p>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => navigate('/active-workout')}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Continue Workout
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300">Upper Body Focus</p>
              <div className="flex justify-between mt-4">
                <Link to="/workout-plans" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                  Start Workout
                </Link>
                <Link to="/workout-plans" className="flex items-center text-blue-500 hover:text-blue-700">
                  All Plans <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Activity</h2>
            <Activity className="h-6 w-6 text-green-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{caloriesBurned} calories burned this week</p>
          <Link to="/progress" className="flex items-center text-green-500 hover:text-green-700 mt-4">
            View Progress <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Water Intake</h2>
            <Droplets className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{waterIntake}/8 glasses today</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
            <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(waterIntake / 8) * 100}%` }}></div>
          </div>
          <div className="flex justify-between mt-4">
            <button 
              onClick={() => handleWaterIntakeUpdate(Math.max(0, waterIntake - 1))}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
              disabled={waterIntake <= 0}
            >
              -
            </button>
            <button 
              onClick={() => handleWaterIntakeUpdate(Math.min(8, waterIntake + 1))}
              className="px-3 py-1 bg-blue-500 text-white rounded"
              disabled={waterIntake >= 8}
            >
              +
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Nutrition</h2>
            <Pizza className="h-6 w-6 text-orange-500" />
          </div>
          <p className="text-gray-600 dark:text-gray-300">{caloriesConsumed}/2200 calories consumed</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2 mb-4 dark:bg-gray-700">
            <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${(caloriesConsumed / 2200) * 100}%` }}></div>
          </div>
          <Link to="/nutrition" className="flex items-center text-orange-500 hover:text-orange-700">
            View Meal Plan <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Your Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Weight</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.weight ? `${profile.weight} kg` : 'Not set'}
            </p>
            <Link to="/profile" className="text-sm text-blue-500 hover:text-blue-700">Update</Link>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Height</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {profile.height ? `${profile.height} cm` : 'Not set'}
            </p>
            <Link to="/profile" className="text-sm text-blue-500 hover:text-blue-700">Update</Link>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">BMI</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{bmi}</p>
            <span className={`text-sm ${bmiColor}`}>{bmiCategory}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}