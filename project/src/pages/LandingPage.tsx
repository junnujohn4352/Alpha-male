import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Activity, Trophy } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ 
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="flex justify-center space-x-8 mb-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Dumbbell className="h-16 w-16 text-blue-400" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Activity className="h-16 w-16 text-green-400" />
            </motion.div>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="h-16 w-16 text-yellow-400" />
            </motion.div>
          </div>

          <h1 className="text-6xl font-bold text-white mb-8">
            THE ALPHA
          </h1>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Transform your body, track your progress, and achieve your fitness goals with our comprehensive workout and nutrition platform.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Get Started
            </button>
            
            <Link 
              to="/about"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200"
            >
              About Us
            </Link>
          </div>

          <div className="mt-24 text-center text-gray-400">
            <p>Created by P. Janardhan Reddy</p>
            <p>© 2024 LOL GROUPS. All rights reserved.</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}