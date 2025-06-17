import React from 'react';
import { Brain, Database, Target, Zap, Layers, BarChart3 } from 'lucide-react';
import { modelSpecs } from '../utils/modelUtils';

const ModelInfo: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4 transition-colors duration-300">
        <Brain className="h-5 w-5 mr-2 text-purple-600" />
        CNN Model Architecture
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3 transition-colors duration-300">
            <Database className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Dataset</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{modelSpecs.dataset}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">{modelSpecs.datasetSize}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3 transition-colors duration-300">
            <Target className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Output Classes</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{modelSpecs.outputClasses} disease categories</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Including healthy states</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg mr-3 transition-colors duration-300">
            <Layers className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Architecture</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{modelSpecs.architecture}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">4 Conv blocks + 2 FC layers</p>
          </div>
        </div>

        <div className="flex items-start">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg mr-3 transition-colors duration-300">
            <Zap className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white transition-colors duration-300">Parameters</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{modelSpecs.totalParams}</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">All trainable parameters</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-green-600 dark:text-green-400">{modelSpecs.validationAccuracy}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Validation</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{modelSpecs.testAccuracy}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Test</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-600 dark:text-purple-400">{modelSpecs.trainAccuracy}</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Training</div>
          </div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg transition-colors duration-300">
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-1">
          <BarChart3 className="h-3 w-3 mr-1" />
          <span>Model Performance</span>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-500">
          Trained on {modelSpecs.datasetSize} with 85/15 train/test split
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;