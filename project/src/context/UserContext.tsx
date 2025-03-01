import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserProfile {
  name: string;
  weight: number;
  height: number;
  age: number;
  goal: string;
  activityLevel: string;
  gender: string;
}

interface WorkoutSession {
  id: string;
  title: string;
  exercises: string[];
  completed: boolean;
  date: string;
}

interface ProgressData {
  date: string;
  weight: number;
  calories: number;
  water: number;
}

interface UserContextType {
  profile: UserProfile;
  updateProfile: (profile: UserProfile) => void;
  waterIntake: number;
  updateWaterIntake: (amount: number) => void;
  caloriesConsumed: number;
  updateCaloriesConsumed: (amount: number) => void;
  caloriesBurned: number;
  updateCaloriesBurned: (amount: number) => void;
  activeWorkout: WorkoutSession | null;
  startWorkout: (workout: WorkoutSession) => void;
  completeWorkout: () => void;
  workoutHistory: WorkoutSession[];
  progressData: ProgressData[];
  addProgressEntry: (entry: ProgressData) => void;
}

const defaultProfile: UserProfile = {
  name: '',
  weight: 0,
  height: 0,
  age: 0,
  goal: 'build-muscle',
  activityLevel: 'moderate',
  gender: 'male'
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : defaultProfile;
  });

  const [waterIntake, setWaterIntake] = useState<number>(() => {
    const savedWaterIntake = localStorage.getItem('waterIntake');
    return savedWaterIntake ? parseInt(savedWaterIntake) : 0;
  });

  const [caloriesConsumed, setCaloriesConsumed] = useState<number>(() => {
    const savedCaloriesConsumed = localStorage.getItem('caloriesConsumed');
    return savedCaloriesConsumed ? parseInt(savedCaloriesConsumed) : 0;
  });

  const [caloriesBurned, setCaloriesBurned] = useState<number>(() => {
    const savedCaloriesBurned = localStorage.getItem('caloriesBurned');
    return savedCaloriesBurned ? parseInt(savedCaloriesBurned) : 0;
  });

  const [activeWorkout, setActiveWorkout] = useState<WorkoutSession | null>(null);
  
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutSession[]>(() => {
    const savedWorkoutHistory = localStorage.getItem('workoutHistory');
    return savedWorkoutHistory ? JSON.parse(savedWorkoutHistory) : [];
  });

  const [progressData, setProgressData] = useState<ProgressData[]>(() => {
    const savedProgressData = localStorage.getItem('progressData');
    return savedProgressData ? JSON.parse(savedProgressData) : [];
  });

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('waterIntake', waterIntake.toString());
  }, [waterIntake]);

  useEffect(() => {
    localStorage.setItem('caloriesConsumed', caloriesConsumed.toString());
  }, [caloriesConsumed]);

  useEffect(() => {
    localStorage.setItem('caloriesBurned', caloriesBurned.toString());
  }, [caloriesBurned]);

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
  }, [workoutHistory]);

  useEffect(() => {
    localStorage.setItem('progressData', JSON.stringify(progressData));
  }, [progressData]);

  const updateProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
  };

  const updateWaterIntake = (amount: number) => {
    setWaterIntake(amount);
  };

  const updateCaloriesConsumed = (amount: number) => {
    setCaloriesConsumed(amount);
  };

  const updateCaloriesBurned = (amount: number) => {
    setCaloriesBurned(amount);
  };

  const startWorkout = (workout: WorkoutSession) => {
    setActiveWorkout(workout);
  };

  const completeWorkout = () => {
    if (activeWorkout) {
      const completedWorkout = {
        ...activeWorkout,
        completed: true,
        date: new Date().toISOString()
      };
      setWorkoutHistory(prev => [...prev, completedWorkout]);
      setActiveWorkout(null);
      
      // Update calories burned
      updateCaloriesBurned(caloriesBurned + Math.floor(Math.random() * 200) + 200);
    }
  };

  const addProgressEntry = (entry: ProgressData) => {
    setProgressData(prev => [...prev, entry]);
  };

  return (
    <UserContext.Provider value={{
      profile,
      updateProfile,
      waterIntake,
      updateWaterIntake,
      caloriesConsumed,
      updateCaloriesConsumed,
      caloriesBurned,
      updateCaloriesBurned,
      activeWorkout,
      startWorkout,
      completeWorkout,
      workoutHistory,
      progressData,
      addProgressEntry
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}