import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Microscope } from 'lucide-react';

interface StatisticsSectionProps {
  inView: boolean;
}

const StatisticsSection = forwardRef<HTMLElement, StatisticsSectionProps>(({ inView }, ref) => {
  const stats = [
    {
      icon: Award,
      value: '98.7%',
      label: 'Validation Accuracy',
      description: 'On PlantVillage dataset',
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30'
    },
    {
      icon: Microscope,
      value: '39',
      label: 'Disease Classes',
      description: 'Including healthy states',
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30'
    },
    {
      icon: Users,
      value: '2,500+',
      label: 'Research Citations',
      description: 'PlantVillage dataset usage',
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30'
    },
    {
      icon: TrendingUp,
      value: '61,486',
      label: 'Training Images',
      description: 'High-quality dataset',
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30'
    }
  ];

  return (
    <section ref={ref} className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Research-Grade AI Model
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
            Built on the renowned PlantVillage dataset with state-of-the-art CNN architecture
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 text-center hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-xl mb-4 transition-colors duration-300`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              
              <motion.div
                className={`text-3xl font-bold ${stat.color} mb-2`}
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              >
                {stat.value}
              </motion.div>
              
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 transition-colors duration-300">
                {stat.label}
              </h4>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
            Model Architecture Details
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Input Size</div>
              <div className="text-gray-600 dark:text-gray-400">224×224×3 RGB images</div>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Parameters</div>
              <div className="text-gray-600 dark:text-gray-400">52.6M trainable parameters</div>
            </div>
            <div>
              <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Training</div>
              <div className="text-gray-600 dark:text-gray-400">Adam optimizer, CrossEntropy loss</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

StatisticsSection.displayName = 'StatisticsSection';

export default StatisticsSection;