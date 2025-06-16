import React from 'react';
import { Brain, Database, Target, Zap } from 'lucide-react';

const ModelInfo: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
        <Brain className="h-5 w-5 mr-2 text-purple-600" />
        Model Information
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Database className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Dataset</h4>
            <p className="text-sm text-gray-600">PlantVillage Dataset with 61,486 images</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-green-100 rounded-lg mr-3">
            <Target className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Categories</h4>
            <p className="text-sm text-gray-600">39 different plant diseases and healthy states</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="p-2 bg-purple-100 rounded-lg mr-3">
            <Zap className="h-4 w-4 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Architecture</h4>
            <p className="text-sm text-gray-600">Custom CNN with 4 convolutional blocks</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-green-600">98.7%</div>
            <div className="text-xs text-gray-600">Validation Accuracy</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-blue-600">52M</div>
            <div className="text-xs text-gray-600">Parameters</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelInfo;