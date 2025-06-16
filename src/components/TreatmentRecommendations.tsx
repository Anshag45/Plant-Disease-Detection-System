import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ExternalLink, Package, Leaf, AlertTriangle, CheckCircle } from 'lucide-react';

interface TreatmentRecommendationsProps {
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

const TreatmentRecommendations: React.FC<TreatmentRecommendationsProps> = ({ prediction }) => {
  const isHealthy = prediction.disease.toLowerCase().includes('healthy');

  return (
    <div className="space-y-6">
      {/* Treatment Steps */}
      <motion.div 
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
          <Leaf className="h-5 w-5 text-blue-600 mr-2" />
          Treatment Protocol
        </h4>
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {prediction.treatment}
          </p>
        </div>
      </motion.div>

      {/* Supplement Recommendation */}
      {prediction.supplement && !isHealthy && (
        <motion.div 
          className="bg-green-50 border border-green-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <Package className="h-5 w-5 text-green-600 mr-2" />
            Recommended Treatment Product
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              <img
                src={prediction.supplement.image}
                alt={prediction.supplement.name}
                className="w-24 h-24 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop&crop=center';
                }}
              />
            </div>
            
            <div className="flex-1">
              <h5 className="font-semibold text-gray-900 mb-2">
                {prediction.supplement.name}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                Professional-grade treatment specifically recommended for {prediction.disease.toLowerCase()}.
              </p>
              
              <a
                href={prediction.supplement.buyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Purchase Online
                <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Healthy Plant Care */}
      {isHealthy && (
        <motion.div 
          className="bg-green-50 border border-green-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            Preventive Care Recommendations
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Regular Maintenance</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Monitor plant health weekly</li>
                <li>• Maintain proper watering schedule</li>
                <li>• Ensure adequate sunlight exposure</li>
                <li>• Remove dead or damaged leaves</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h5 className="font-medium text-gray-900">Disease Prevention</h5>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Apply preventive fungicides</li>
                <li>• Maintain good air circulation</li>
                <li>• Avoid overhead watering</li>
                <li>• Practice crop rotation</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}

      {/* Emergency Actions */}
      {!isHealthy && prediction.confidence > 0.8 && (
        <motion.div 
          className="bg-orange-50 border border-orange-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h4 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
            <AlertTriangle className="h-5 w-5 text-orange-600 mr-2" />
            Immediate Actions Required
          </h4>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-orange-600">1</span>
              </div>
              <p className="text-sm text-gray-700">
                Isolate affected plants to prevent disease spread
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-orange-600">2</span>
              </div>
              <p className="text-sm text-gray-700">
                Remove and dispose of infected plant material
              </p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                <span className="text-xs font-bold text-orange-600">3</span>
              </div>
              <p className="text-sm text-gray-700">
                Apply recommended treatment immediately
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Professional Consultation */}
      <motion.div 
        className="bg-purple-50 border border-purple-200 rounded-xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-3">
          Need Expert Consultation?
        </h4>
        <p className="text-sm text-gray-600 mb-4">
          For severe infections or if symptoms persist after treatment, consider consulting with a local agricultural extension office or plant pathologist.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            Agricultural Extension
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            Plant Pathologist
          </span>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
            Crop Specialist
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default TreatmentRecommendations;