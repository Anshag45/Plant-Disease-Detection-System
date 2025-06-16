import React from 'react';
import { AlertTriangle, CheckCircle, Info, Leaf } from 'lucide-react';

interface PredictionResultProps {
  prediction: {
    disease: string;
    confidence: number;
    description: string;
    treatment: string;
  };
}

const PredictionResult: React.FC<PredictionResultProps> = ({ prediction }) => {
  const isHealthy = prediction.disease.toLowerCase().includes('healthy');
  const confidenceColor = prediction.confidence > 0.8 ? 'text-green-600' : 
                         prediction.confidence > 0.6 ? 'text-yellow-600' : 'text-red-600';
  
  const confidenceBgColor = prediction.confidence > 0.8 ? 'bg-green-100' : 
                           prediction.confidence > 0.6 ? 'bg-yellow-100' : 'bg-red-100';

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className={`p-6 rounded-xl border-2 ${
        isHealthy ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            {isHealthy ? (
              <CheckCircle className="h-6 w-6 text-green-600 mr-3" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-3" />
            )}
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {prediction.disease}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {isHealthy ? 'Plant appears healthy' : 'Disease detected'}
              </p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full ${confidenceBgColor}`}>
            <span className={`text-sm font-medium ${confidenceColor}`}>
              {Math.round(prediction.confidence * 100)}% confident
            </span>
          </div>
        </div>
        
        {/* Confidence Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Confidence Level</span>
            <span>{Math.round(prediction.confidence * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                prediction.confidence > 0.8 ? 'bg-green-500' :
                prediction.confidence > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${prediction.confidence * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
          <Info className="h-5 w-5 text-blue-600 mr-2" />
          Description
        </h4>
        <p className="text-gray-700 leading-relaxed">
          {prediction.description}
        </p>
      </div>

      {/* Treatment */}
      {!isHealthy && (
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-3">
            <Leaf className="h-5 w-5 text-purple-600 mr-2" />
            Recommended Treatment
          </h4>
          <p className="text-gray-700 leading-relaxed">
            {prediction.treatment}
          </p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-600 text-center">
          <strong>Disclaimer:</strong> This is an AI-based prediction and should not replace professional agricultural advice. 
          For serious plant health issues, please consult with a qualified plant pathologist or agricultural expert.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult;