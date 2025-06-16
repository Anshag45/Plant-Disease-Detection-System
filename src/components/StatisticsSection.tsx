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
      label: 'Detection Accuracy',
      description: 'Validated on 61,486 images',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Microscope,
      value: '39',
      label: 'Disease Categories',
      description: 'Comprehensive coverage',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      value: '12,500+',
      label: 'Farmers Helped',
      description: 'Across multiple regions',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: TrendingUp,
      value: '50,000+',
      label: 'Crops Protected',
      description: 'Disease prevention success',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
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
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Agricultural Professionals
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system has been validated through extensive testing and real-world deployment
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.bgColor} rounded-xl mb-4`}>
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
              
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </h4>
              
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

StatisticsSection.displayName = 'StatisticsSection';

export default StatisticsSection;