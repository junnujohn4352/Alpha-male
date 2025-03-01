import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Timer, Heart, Zap, Flame, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const workoutPlans = [
  {
    id: "strength",
    title: "Strength Training",
    description: "Build muscle and increase strength",
    icon: Dumbbell,
    color: "text-blue-500",
    workouts: [
      "Bench Press: 4 sets x 8-12 reps",
      "Squats: 4 sets x 8-12 reps",
      "Deadlifts: 4 sets x 8-12 reps",
      "Shoulder Press: 3 sets x 10-12 reps",
      "Pull-ups: 3 sets x 8-10 reps",
      "Barbell Rows: 3 sets x 10-12 reps"
    ],
    level: "Intermediate"
  },
  {
    id: "cardio",
    title: "Cardio",
    description: "Improve endurance and burn fat",
    icon: Timer,
    color: "text-green-500",
    workouts: [
      "Running: 5km at moderate pace",
      "Jump Rope: 3 sets x 2 minutes",
      "Burpees: 3 sets x 15 reps",
      "Mountain Climbers: 3 sets x 30 seconds",
      "Cycling: 20 minutes at high intensity",
      "High Knees: 3 sets x 30 seconds"
    ],
    level: "All Levels"
  },
  {
    id: "recovery",
    title: "Recovery",
    description: "Active recovery and flexibility",
    icon: Heart,
    color: "text-red-500",
    workouts: [
      "Yoga: 20 minutes",
      "Foam Rolling: 10 minutes",
      "Light Walking: 30 minutes",
      "Stretching: 15 minutes",
      "Meditation: 10 minutes",
      "Mobility Exercises: 15 minutes"
    ],
    level: "All Levels"
  },
  {
    id: "hiit",
    title: "HIIT",
    description: "High intensity interval training",
    icon: Zap,
    color: "text-yellow-500",
    workouts: [
      "Jumping Jacks: 45 seconds on, 15 seconds rest",
      "Push-ups: 45 seconds on, 15 seconds rest",
      "High Knees: 45 seconds on, 15 seconds rest",
      "Plank: 45 seconds on, 15 seconds rest",
      "Squat Jumps: 45 seconds on, 15 seconds rest",
      "Mountain Climbers: 45 seconds on, 15 seconds rest"
    ],
    level: "Intermediate"
  },
  {
    id: "fat-loss",
    title: "Fat Loss",
    description: " Targeted workouts for weight reduction",
    icon: Flame,
    color: "text-orange-500",
    workouts: [
      "Circuit Training: 3 rounds of 6 exercises",
      "Kettlebell Swings: 3 sets x 20 reps",
      "Box Jumps: 4 sets x 15 reps",
      "Battle Ropes: 4 sets x 30 seconds",
      "Rowing Machine: 500m sprints x 5",
      "Bodyweight Circuit: 4 rounds of 5 exercises"
    ],
    level: "Intermediate"
  },
  {
    id: "beginner",
    title: "Beginner Friendly",
    description: "Perfect for those new to fitness",
    icon: Leaf,
    color: "text-green-400",
    workouts: [
      "Bodyweight Squats: 3 sets x 12 reps",
      "Modified Push-ups: 3 sets x 8 reps",
      "Walking: 30 minutes at moderate pace",
      "Dumbbell Curls: 3 sets x 10 reps (light weight)",
      "Plank: 3 sets x 20 seconds",
      "Seated Row Machine: 3 sets x 12 reps"
    ],
    level: "Beginner"
  }
];

export default function WorkoutPlans() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const navigate = useNavigate();
  const { startWorkout } = useUser();

  const filteredWorkouts = selectedLevel === "All" 
    ? workoutPlans 
    : workoutPlans.filter(plan => plan.level === selectedLevel || plan.level === "All Levels");

  const handleStartWorkout = (plan: typeof workoutPlans[0]) => {
    startWorkout({
      id: plan.id,
      title: plan.title,
      exercises: plan.workouts,
      completed: false,
      date: new Date().toISOString()
    });
    navigate('/active-workout');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Workout Plans</h1>
        <div className="flex space-x-2">
          {["All", "Beginner", "Intermediate", "Advanced"].map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 rounded-md ${
                selectedLevel === level 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((plan, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div className="h-40 bg-gray-300 dark:bg-gray-700 relative overflow-hidden">
              <img
                src={`https://images.unsplash.com/photo-${index % 2 === 0 ? '1534438327276-14e5300c3a48' : '1517836357463-d25dfeac3438'}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80`}
                alt={plan.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-white">{plan.title}</h2>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 mb-2">{plan.description}</p>
              <div className="mb-4">
                <span className={`inline-block px-2 py-1 text-xs rounded ${
                  plan.level === "Beginner" ? "bg-green-100 text-green-800" :
                  plan.level === "Intermediate" ? "bg-yellow-100 text-yellow-800" :
                  plan.level === "Advanced" ? "bg-red-100 text-red-800" :
                  "bg-blue-100 text-blue-800"
                }`}>
                  {plan.level}
                </span>
              </div>
              <ul className="space-y-2">
                {plan.workouts.map((workout, idx) => (
                  <li key={idx} className="text-gray-600 dark:text-gray-300">
                    • {workout}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => handleStartWorkout(plan)}
                className="mt-6 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Start Plan
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}