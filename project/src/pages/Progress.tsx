import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Droplets, Pizza, Scale, Calendar, Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';

// Sample data for new users
const sampleData = [
  { date: '1/1', weight: 75, calories: 2200, water: 6 },
  { date: '1/2', weight: 74.8, calories: 2100, water: 7 },
  { date: '1/3', weight: 74.5, calories: 2300, water: 8 },
  { date: '1/4', weight: 74.3, calories: 2150, water: 6 },
  { date: '1/5', weight: 74.1, calories: 2250, water: 8 },
  { date: '1/6', weight: 73.9, calories: 2180, water: 7 },
  { date: '1/7', weight: 73.7, calories: 2220, water: 8 },
  { date: '1/8', weight: 73.5, calories: 2300, water: 7 },
  { date: '1/9', weight: 73.3, calories: 2250, water: 8 },
  { date: '1/10', weight: 73.1, calories: 2150, water: 6 },
  { date: '1/11', weight: 72.9, calories: 2200, water: 7 },
  { date: '1/12', weight: 72.7, calories: 2180, water: 8 },
  { date: '1/13', weight: 72.5, calories: 2250, water: 7 },
  { date: '1/14', weight: 72.3, calories: 2300, water: 8 },
];

export default function Progress() {
  const { progressData, addProgressEntry, waterIntake, caloriesConsumed, profile } = useUser();
  const [timeRange, setTimeRange] = useState('week');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEntry, setNewEntry] = useState({
    weight: profile.weight || 0,
    calories: caloriesConsumed || 0,
    water: waterIntake || 0
  });
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Process data for charts
  const processedData = progressData.map(entry => ({
    ...entry,
    date: formatDate(entry.date)
  }));

  // Filter data based on time range
  const getFilteredData = () => {
    if (progressData.length === 0) {
      // Return sample data if no user data exists
      return timeRange === 'week' 
        ? sampleData.slice(-7) 
        : timeRange === 'month' 
          ? sampleData 
          : sampleData.slice(-3);
    }
    
    return timeRange === 'week' 
      ? processedData.slice(-7) 
      : timeRange === 'month' 
        ? processedData 
        : processedData.slice(-3);
  };

  const filteredData = getFilteredData();

  // Sample workout data
  const workoutData = [
    { name: 'Week 1', pushups: 20, pullups: 5, squats: 30 },
    { name: 'Week 2', pushups: 25, pullups: 8, squats: 35 },
    { name: 'Week 3', pushups: 30, pullups: 10, squats: 40 },
    { name: 'Week 4', pushups: 35, pullups: 12, squats: 45 },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEntry(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleAddEntry = () => {
    const today = new Date().toISOString();
    addProgressEntry({
      date: today,
      weight: newEntry.weight,
      calories: newEntry.calories,
      water: newEntry.water
    });
    setShowAddForm(false);
    // Reset form
    setNewEntry({
      weight: profile.weight || 0,
      calories: caloriesConsumed || 0,
      water: waterIntake || 0
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Progress Tracking</h1>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('3days')}
            className={`px-4 py-2 rounded-md ${
              timeRange === '3days' 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            3 Days
          </button>
          <button
            onClick={() => setTimeRange('week')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'week' 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`px-4 py-2 rounded-md ${
              timeRange === 'month' 
                ? "bg-blue-600 text-white" 
                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
            }`}
          >
            Month
          </button>
        </div>
      </div>

      {/* Add Progress Entry Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          {showAddForm ? 'Cancel' : 'Add Progress Entry'}
        </button>
      </div>

      {/* Add Progress Entry Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add Today's Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={newEntry.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Calories Consumed
              </label>
              <input
                type="number"
                name="calories"
                value={newEntry.calories}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Water Intake (glasses)
              </label>
              <input
                type="number"
                name="water"
                value={newEntry.water}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              onClick={handleAddEntry}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Save Progress
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Scale className="h-6 w-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Weight Progress</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="weight" 
                  stroke="#3b82f6" 
                  name="Weight (kg)" 
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          {progressData.length === 0 && (
            <div className="text-center mt-4 text-gray-500 dark:text-gray-400">
              <p>This is sample data. Add your own progress to see your actual data.</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Pizza className="h-6 w-6 text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Calorie Intake</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[2000, 2400]} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="calories" 
                    stroke="#f97316" 
                    name="Calories" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: 'white' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            {progressData.length === 0 && (
              <div className="text-center mt-4 text-gray-500 dark:text-gray-400">
                <p>This is sample data. Add your own progress to see your actual data.</p>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Droplets className="h-6 w-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Water Intake</h2>
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="water" 
                    name="Glasses of Water" 
                    fill="#0ea5e9" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {progressData.length === 0 && (
              <div className="text-center mt-4 text-gray-500 dark:text-gray-400">
                <p>This is sample data. Add your own progress to see your actual data.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <Calendar className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Workout Performance</h2>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={workoutData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pushups" name="Push-ups" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pullups" name="Pull-ups" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="squats" name="Squats" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4 text-gray-500 dark:text-gray-400">
            <p>This is sample workout data. Complete workouts to see your actual performance.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}