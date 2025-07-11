import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, Info, Loader2, ShoppingCart, ExternalLink, Microscope, TrendingUp, Users, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ImageUploader from './components/ImageUploader';
import PredictionResult from './components/PredictionResult';
import ModelInfo from './components/ModelInfo';
import TreatmentRecommendations from './components/TreatmentRecommendations';
import StatisticsSection from './components/StatisticsSection';
import DarkModeToggle from './components/DarkModeToggle';
import { useDarkMode } from './hooks/useDarkMode';
import { diseaseInfo } from './data/diseaseInfo';
import { supplementInfo } from './data/supplementInfo';
import { predictDisease, getOriginalDiseaseName } from './utils/modelUtils';

interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
  supplement?: {
    name: string;
    image: string;
    buyLink: string;
  };
}

function App() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'upload' | 'results' | 'treatment'>('upload');

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleImageSelect = useCallback(async (imageFile: File, imageUrl: string) => {
    setSelectedImage(imageUrl);
    setPrediction(null);
    setError(null);
    setIsLoading(true);
    setActiveTab('results');

    try {
      const result = await predictDisease(imageFile);
      
      // Get the original disease name for supplement matching
      const originalDiseaseName = getOriginalDiseaseName(result.disease);
      
      // Find supplement information using the original disease name
      const supplement = supplementInfo.find(s => {
        if (originalDiseaseName) {
          return s.disease_name.toLowerCase().includes(originalDiseaseName.toLowerCase()) ||
                 originalDiseaseName.toLowerCase().includes(s.disease_name.toLowerCase());
        }
        return s.disease_name.toLowerCase().includes(result.disease.toLowerCase()) ||
               result.disease.toLowerCase().includes(s.disease_name.toLowerCase());
      });

      const enhancedResult = {
        ...result,
        supplement: supplement ? {
          name: supplement.supplement_name,
          image: supplement.supplement_image,
          buyLink: supplement.buy_link
        } : undefined
      };

      setPrediction(enhancedResult);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  }, [setPrediction, setError, setIsLoading, setActiveTab]);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
    setActiveTab('upload');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Enhanced Header */}
      <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-green-100 dark:border-gray-700 sticky top-0 z-50 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Plant Disease Detection
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">CNN-powered agricultural analysis</p>
              </div>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                className="hidden sm:flex items-center space-x-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Award className="h-4 w-4 text-green-500" />
                  <span>98.7% Accuracy</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Microscope className="h-4 w-4 text-blue-500" />
                  <span>39 Classes</span>
                </div>
              </motion.div>
              
              <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
            Advanced Plant Disease
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"> Detection System</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto transition-colors duration-300">
            Upload a photo of your plant and get instant AI-powered disease detection using our 
            research-grade CNN model trained on the PlantVillage dataset.
          </p>
        </div>
      </motion.section>

      {/* Statistics Section */}
      <StatisticsSection ref={statsRef} inView={statsInView} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
              <div className="flex border-b border-gray-100 dark:border-gray-700">
                {[
                  { id: 'upload', label: 'Upload Image', icon: Camera },
                  { id: 'results', label: 'CNN Analysis', icon: Microscope },
                  { id: 'treatment', label: 'Treatment', icon: ShoppingCart }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-b-2 border-green-500'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <tab.icon className="h-4 w-4 mr-2" />
                    {tab.label}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  {activeTab === 'upload' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                        Upload Plant Image for CNN Analysis
                      </h2>
                      <ImageUploader
                        onImageSelect={handleImageSelect}
                        selectedImage={selectedImage}
                        onReset={handleReset}
                        isLoading={isLoading}
                      />
                    </div>
                  )}

                  {activeTab === 'results' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center transition-colors duration-300">
                        {isLoading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 text-green-600 animate-spin" />
                            CNN Processing...
                          </>
                        ) : error ? (
                          <>
                            <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                            Analysis Error
                          </>
                        ) : prediction ? (
                          <>
                            <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                            CNN Analysis Complete
                          </>
                        ) : (
                          <>
                            <Info className="h-5 w-5 mr-2 text-blue-600" />
                            Ready for Analysis
                          </>
                        )}
                      </h2>

                      {isLoading && (
                        <div className="flex items-center justify-center py-12">
                          <div className="text-center">
                            <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
                            <p className="text-gray-600 dark:text-gray-400">Running CNN inference...</p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Processing through 52.6M parameters</p>
                          </div>
                        </div>
                      )}

                      {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                          <div className="flex items-center">
                            <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                            <p className="text-red-800 dark:text-red-400">{error}</p>
                          </div>
                        </div>
                      )}

                      {prediction && (
                        <PredictionResult prediction={prediction} />
                      )}

                      {!selectedImage && !isLoading && !error && (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                          <Camera className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                          <p>Upload an image to see CNN analysis results</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'treatment' && (
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                        Treatment Recommendations
                      </h2>
                      {prediction ? (
                        <TreatmentRecommendations prediction={prediction} />
                      ) : (
                        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                          <ShoppingCart className="h-12 w-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
                          <p>Complete CNN analysis to see treatment recommendations</p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Enhanced Sidebar */}
          <div className="space-y-6">
            <ModelInfo />
            
            {/* Enhanced Tips Card */}
            <motion.div 
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-green-100 dark:border-gray-700 p-6 transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center mb-4 transition-colors duration-300">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Image Guidelines
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                {[
                  'Use 224×224 pixel images for best results',
                  'Ensure clear focus on affected leaf areas',
                  'Natural lighting improves CNN accuracy',
                  'Avoid heavily shadowed or blurry images',
                  'Single leaf per image works best'
                ].map((tip, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    {tip}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Model Performance Card */}
            <motion.div 
              className="bg-gradient-to-br from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 rounded-2xl shadow-xl p-6 text-white transition-colors duration-300"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Model Performance
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Validation Accuracy</span>
                  <span className="font-bold">98.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Test Accuracy</span>
                  <span className="font-bold">98.9%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-green-100">Training Images</span>
                  <span className="font-bold">61,486</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12 mt-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">Plant Disease Detection</h3>
              </div>
              <p className="text-gray-400">
                Research-grade CNN model for accurate plant disease identification using computer vision.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Model Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• CNN with 52.6M parameters</li>
                <li>• 98.7% validation accuracy</li>
                <li>• 39 disease classifications</li>
                <li>• PlantVillage dataset trained</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Technical Specs</h4>
              <ul className="space-y-2 text-gray-400">
                <li>• 224×224×3 input images</li>
                <li>• 4 convolutional blocks</li>
                <li>• BatchNorm + Dropout layers</li>
                <li>• Adam optimizer training</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Plant Disease Detection System. Advanced agricultural AI technology.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;