import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Apple, Coffee, Beef, Fish, Salad, Egg, Plus } from 'lucide-react';
import { useUser } from '../context/UserContext';

const workoutTypes = [
  { id: 'strength', name: 'Strength Training' },
  { id: 'cardio', name: 'Cardio' },
  { id: 'hiit', name: 'HIIT' },
  { id: 'fatLoss', name: 'Fat Loss' },
  { id: 'recovery', name: 'Recovery' }
];

const mealPlansByWorkout = {
  strength: [
    {
      title: "Breakfast",
      icon: Coffee,
      meals: [
        "Protein oatmeal with banana and honey (1 cup)",
        "Greek yogurt with berries (1 cup)",
        "4 whole eggs with 2 slices whole grain toast",
        "Protein smoothie with whey, banana, and peanut butter"
      ],
      calories: 650,
      protein: 40,
      carbs: 75,
      fats: 20
    },
    {
      title: "Lunch",
      icon: Fish,
      meals: [
        "8oz grilled chicken breast",
        "1 cup brown rice",
        "2 cups steamed vegetables",
        "Olive oil dressing (1 tbsp)"
      ],
      calories: 700,
      protein: 50,
      carbs: 80,
      fats: 20
    },
    {
      title: "Dinner",
      icon: Beef,
      meals: [
        "8oz lean beef steak",
        "1 large sweet potato",
        "Green salad with olive oil",
        "1/2 cup quinoa"
      ],
      calories: 750,
      protein: 45,
      carbs: 70,
      fats: 25
    },
    {
      title: "Snacks",
      icon: Apple,
      meals: [
        "Mixed nuts (1/4 cup)",
        "Apple with peanut butter (2 tbsp)",
        "Protein bar (20g protein)",
        "Cottage cheese (1 cup) with berries"
      ],
      calories: 500,
      protein: 30,
      carbs: 40,
      fats: 20
    }
  ],
  cardio: [
    {
      title: "Breakfast",
      icon: Coffee,
      meals: [
        "Whole grain toast with avocado (1/2)",
        "2 egg whites",
        "Fresh fruit salad (1 cup)",
        "Green tea"
      ],
      calories: 400,
      protein: 20,
      carbs: 60,
      fats: 10
    },
    {
      title: "Lunch",
      icon: Salad,
      meals: [
        "Grilled fish (6oz)",
        "Quinoa salad (1 cup)",
        "Steamed vegetables (2 cups)",
        "Lemon juice dressing"
      ],
      calories: 500,
      protein: 35,
      carbs: 60,
      fats: 15
    },
    {
      title: "Dinner",
      icon: Fish,
      meals: [
        "Grilled turkey breast (6oz)",
        "Sweet potato (medium)",
        "Roasted vegetables (2 cups)",
        "Olive oil (1 tsp)"
      ],
      calories: 450,
      protein: 40,
      carbs: 50,
      fats: 10
    },
    {
      title: "Snacks",
      icon: Apple,
      meals: [
        "Rice cakes (2) with hummus (2 tbsp)",
        "Banana",
        "Low-fat yogurt (1 cup)",
        "Carrot sticks"
      ],
      calories: 300,
      protein: 15,
      carbs: 50,
      fats: 5
    }
  ],
  hiit: [
    {
      title: "Breakfast",
      icon: Egg,
      meals: [
        "Protein pancakes (2) with berries",
        "Scrambled eggs (3) with spinach",
        "Whole grain toast (1 slice)",
        "Black coffee"
      ],
      calories: 500,
      protein: 35,
      carbs: 50,
      fats: 15
    },
    {
      title: "Lunch",
      icon: Salad,
      meals: [
        "Grilled chicken (6oz)",
        "Quinoa (3/4 cup)",
        "Mixed vegetables (2 cups)",
        "Avocado (1/4)"
      ],
      calories: 550,
      protein: 45,
      carbs: 55,
      fats: 15
    },
    {
      title: "Dinner",
      icon: Fish,
      meals: [
        "Salmon (6oz)",
        "Brown rice (1/2 cup)",
        "Broccoli (2 cups)",
        "Coconut oil (1 tsp)"
      ],
      calories: 500,
      protein: 40,
      carbs: 40,
      fats: 20
    },
    {
      title: "Snacks",
      icon: Apple,
      meals: [
        "Protein shake with almond milk",
        "Apple with almond butter (1 tbsp)",
        "Greek yogurt (1/2 cup)",
        "Handful of almonds (1oz)"
      ],
      calories: 400,
      protein: 30,
      carbs: 30,
      fats: 15
    }
  ],
  fatLoss: [
    {
      title: "Breakfast",
      icon: Egg,
      meals: [
        "Egg white omelet (4 whites) with vegetables",
        "Oatmeal (1/2 cup) with cinnamon",
        "Berries (1/2 cup)",
        "Green tea"
      ],
      calories: 350,
      protein: 25,
      carbs: 40,
      fats: 5
    },
    {
      title: "Lunch",
      icon: Salad,
      meals: [
        "Grilled chicken breast (5oz)",
        "Large green salad (3 cups)",
        "Olive oil & vinegar (1 tsp)",
        "Quinoa (1/4 cup)"
      ],
      calories: 400,
      protein: 40,
      carbs: 30,
      fats: 10
    },
    {
      title: "Dinner",
      icon: Fish,
      meals: [
        "White fish (6oz)",
        "Steamed vegetables (2 cups)",
        "Small sweet potato (1/2)",
        "Lemon juice seasoning"
      ],
      calories: 350,
      protein: 35,
      carbs: 30,
      fats: 5
    },
    {
      title: "Snacks",
      icon: Apple,
      meals: [
        "Protein shake with water",
        "Cucumber slices with hummus (1 tbsp)",
        "Celery sticks with cottage cheese (1/4 cup)",
        "Green apple"
      ],
      calories: 250,
      protein: 25,
      carbs: 25,
      fats: 5
    }
  ],
  recovery: [
    {
      title: "Breakfast",
      icon: Coffee,
      meals: [
        "Smoothie with banana, berries, spinach, and protein",
        "Whole grain toast (1 slice) with avocado (1/4)",
        "Chia seeds (1 tbsp)",
        "Herbal tea"
      ],
      calories: 450,
      protein: 25,
      carbs: 60,
      fats: 15
    },
    {
      title: "Lunch",
      icon: Salad,
      meals: [
        "Quinoa bowl (1 cup) with vegetables",
        "Chickpeas (1/2 cup)",
        "Avocado (1/4)",
        "Olive oil dressing (1 tsp)"
      ],
      calories: 500,
      protein: 20,
      carbs: 70,
      fats: 15
    },
    {
      title: "Dinner",
      icon: Fish,
      meals: [
        "Baked salmon (4oz)",
        "Sweet potato (1 medium)",
        "Steamed vegetables (2 cups)",
        "Turmeric seasoning"
      ],
      calories: 450,
      protein: 30,
      carbs: 50,
      fats: 15
    },
    {
      title: "Snacks",
      icon: Apple,
      meals: [
        "Mixed berries (1 cup)",
        "Walnuts (1oz)",
        "Greek yogurt (1/2 cup)",
        "Dark chocolate (1 square)"
      ],
      calories: 350,
      protein: 15,
      carbs: 35,
      fats: 15
    }
  ]
};

export default function Nutrition() {
  const [selectedWorkout, setSelectedWorkout] = useState('strength');
  const { caloriesConsumed, updateCaloriesConsumed } = useUser();
  const [showCalorieForm, setShowCalorieForm] = useState(false);
  const [calorieInput, setCalorieInput] = useState(caloriesConsumed.toString());
  
  const mealPlans = mealPlansByWorkout[selectedWorkout];

  const handleCalorieUpdate = () => {
    const calories = parseInt(calorieInput);
    if (!isNaN(calories) && calories >= 0) {
      updateCaloriesConsumed(calories);
      setShowCalorieForm(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-7xl mx-auto px-4 py-8"
      style={{
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Nutrition Plan</h1>
        <button
          onClick={() => setShowCalorieForm(!showCalorieForm)}
          className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Update Calories
        </button>
      </div>

      {showCalorieForm && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Update Calories Consumed</h2>
          <div className="flex items-center">
            <input
              type="number"
              value={calorieInput}
              onChange={(e) => setCalorieInput(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter calories consumed"
            />
            <button
              onClick={handleCalorieUpdate}
              className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Select Your Workout Type</h2>
        <div className="flex flex-wrap gap-2">
          {workoutTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setSelectedWorkout(type.id)}
              className={`px-4 py-2 rounded-md ${
                selectedWorkout === type.id 
                  ? "bg-blue-600 text-white" 
                  : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mealPlans.map((meal, index) => (
          <motion.div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{meal.title}</h2>
                <meal.icon className="h-6 w-6 text-blue-500" />
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Meals</h3>
                <ul className="space-y-2">
                  {meal.meals.map((item, idx) => (
                    <li key={idx} className="text-gray-600 dark:text-gray-300">• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t dark:border-gray-700 pt-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Nutrition Info</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Calories</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{meal.calories}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Protein</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{meal.protein}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Carbs</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{meal.carbs}g</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fats</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-white">{meal.fats}g</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}