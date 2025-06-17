import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle, Info, Leaf, TrendingUp, Clock } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    disease: string;
    confidence: number;
    description: string;
    treatment: string;
    supplement?: {
      name: string;
      image: string;
      buyLink: string;
    };
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const isHealthy = prediction.disease.toLowerCase().includes('healthy');
  const confidenceColor = prediction.confidence > 0.8 ? 'text-green-600' : 
                         prediction.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const confidenceBgColor = prediction.confidence > 0.8 ? 'bg-green-100 dark:bg-green-900/30' : 
                           prediction.confidence > 0.6 ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-red-100 dark:bg-red-900/30';

  const severityLevel = prediction.confidence > 0.8 ? 'High Confidence' :
                       prediction.confidence > 0.6 ? 'Medium Confidence' : 'Low Confidence';

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <motion.div 
        className={`p-6 rounded-xl border-2 transition-colors duration-300 ${
          isHealthy ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' : 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
        }`}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {isHealthy ? (
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                {prediction.disease}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 flex items-center transition-colors duration-300">
                <Clock className="h-3 w-3 mr-1" />
                {isHealthy ? 'Plant appears healthy' : 'Disease detected - immediate attention recommended'}
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`px-3 py-1 rounded-full ${confidenceBgColor} mb-2 transition-colors duration-300`}>
              <span className={`text-sm font-medium ${confidenceColor}`}>
                {Math.round(prediction.confidence * 100)}% confident
              </span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {severityLevel}
            </div>
          </div>
        </div>
        
        {/* Enhanced Confidence Visualization */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2 transition-colors duration-300">
            <span>Confidence Level</span>
            <span>{Math.round(prediction.confidence * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 relative overflow-hidden transition-colors duration-300">
            <motion.div
              className={`h-3 rounded-full transition-all duration-1000 ${
                prediction.confidence > 0.8 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                prediction.confidence > 0.6 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' : 
                'bg-gradient-to-r from-red-400 to-red-600'
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${prediction.confidence * 100}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="text-center">
            <div className={`text-lg font-bold ${
              isHealthy ? 'text-green-600' : prediction.confidence > 0.7 ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {isHealthy ? 'Low' : prediction.confidence > 0.7 ? 'High' : 'Medium'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Risk Level</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {isHealthy ? 'None' : prediction.confidence > 0.8 ? 'Immediate' : 'Monitor'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Action Required</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">
              {isHealthy ? 'Excellent' : prediction.confidence > 0.7 ? 'Poor' : 'Fair'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Plant Health</div>
          </div>
        </div>
      </motion.div>

      {/* Detailed Description */}
      <motion.div 
        className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 transition-colors duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3 transition-colors duration-300">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          Detailed Analysis
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
          {prediction.description}
        </p>
      </motion.div>

      {/* Quick Treatment Preview */}
      {!isHealthy && (
        <motion.div 
          className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-6 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-3 transition-colors duration-300">
            <Leaf className="h-5 w-5 text-purple-600 mr-2" />
            Treatment Overview
          </h4>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3 transition-colors duration-300">
            {prediction.treatment.split('.')[0]}.
          </p>
          <div className="mt-3">
            <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">
              View complete treatment plan in the Treatment tab →
            </span>
          </div>
        </motion.div>
      )}

      {/* Supplement Preview */}
      {prediction.supplement && !isHealthy && (
        <motion.div 
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={prediction.supplement.image}
                alt={prediction.supplement.name}
                className="w-12 h-12 object-cover rounded-lg border border-gray-200 dark:border-gray-600 mr-3"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=100&h=100&fit=crop&crop=center';
                }}
              />
              <div>
                <h5 className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-300">
                  Recommended Treatment Product
                </h5>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {prediction.supplement.name}
                </p>
              </div>
            </div>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </div>
        </motion.div>
      )}

      {/* Disclaimer */}
      <motion.div 
        className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center transition-colors duration-300">
          <strong>Disclaimer:</strong> This AI-based analysis should complement, not replace, professional agricultural advice. 
          For critical plant health issues, consult with qualified agricultural experts or plant pathologists.
        </p>
      </motion.div>
    </div>
  );
};

export default PredictionResult;