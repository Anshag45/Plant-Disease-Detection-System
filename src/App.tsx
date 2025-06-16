import React, { useState, useRef, useCallback } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle, Info, Loader2 } from 'lucide-react';
import ImageUploader from './components/ImageUploader';
import PredictionResult from './components/PredictionResult';
import ModelInfo from './components/ModelInfo';
import { diseaseInfo } from './data/diseaseInfo';
import { predictDisease } from './utils/modelUtils';

interface PredictionResult {
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = useCallback(async (imageFile: File, imageUrl: string) => {
    setSelectedImage(imageUrl);
    setPrediction(null);
    setError(null);
    setIsLoading(true);

    try {
      // Simulate model prediction (in real implementation, this would use TensorFlow.js)
      const result = await predictDisease(imageFile);
      setPrediction(result);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setSelectedImage(null);
    setPrediction(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                <Leaf className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Plant Disease Detection</h1>
                <p className="text-sm text-gray-600">AI-powered plant health analysis</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>39 Disease Categories</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Camera className="h-5 w-5 mr-2 text-green-600" />
                  Upload Plant Image
                </h2>
                <p className="text-gray-600 mt-1">
                  Upload a clear image of the plant leaf to detect diseases
                </p>
              </div>
              
              <div className="p-6">
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onReset={handleReset}
                  isLoading={isLoading}
                />
              </div>
            </div>

            {/* Results Section */}
            {(isLoading || prediction || error) && (
              <div className="bg-white rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 text-green-600 animate-spin" />
                        Analyzing Image...
                      </>
                    ) : error ? (
                      <>
                        <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                        Analysis Error
                      </>
                    ) : (
                      <>
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                        Analysis Results
                      </>
                    )}
                  </h2>
                </div>
                
                <div className="p-6">
                  {isLoading && (
                    <div className="flex items-center justify-center py-12">
                      <div className="text-center">
                        <Loader2 className="h-12 w-12 text-green-600 animate-spin mx-auto mb-4" />
                        <p className="text-gray-600">Processing your image...</p>
                        <p className="text-sm text-gray-500 mt-1">This may take a few seconds</p>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                        <p className="text-red-800">{error}</p>
                      </div>
                    </div>
                  )}
                  
                  {prediction && (
                    <PredictionResult prediction={prediction} />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ModelInfo />
            
            {/* Tips Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-green-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center mb-4">
                <Info className="h-5 w-5 mr-2 text-blue-600" />
                Tips for Best Results
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Use clear, well-lit images of plant leaves
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Ensure the leaf fills most of the frame
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Avoid blurry or heavily shadowed images
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Include visible symptoms if present
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;