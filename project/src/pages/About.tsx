import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About THE ALPHA</h1>
      
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          THE ALPHA is a comprehensive fitness platform designed to help you achieve your fitness goals through personalized workout plans, nutrition tracking, and progress monitoring.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Key Features</h2>
        <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
          <li>Personalized workout plans for all fitness levels</li>
          <li>Detailed exercise demonstrations with proper form guidance</li>
          <li>Comprehensive progress tracking with visual analytics</li>
          <li>Nutrition planning and calorie tracking</li>
          <li>Water intake monitoring</li>
          <li>Dark mode support for comfortable viewing</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          We believe that everyone deserves access to professional-grade fitness tools and guidance. Our mission is to make fitness accessible, enjoyable, and effective for everyone, regardless of their experience level.
        </p>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Contact</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Created by P. Janardhan Reddy<br />
            LOL GROUPS © 2024<br />
            For support: support@thealpha.com
          </p>
        </div>
      </div>
    </motion.div>
  );
}