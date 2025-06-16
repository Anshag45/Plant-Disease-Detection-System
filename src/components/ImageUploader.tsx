import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2, Camera, FileImage } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File, url: string) => void;
  selectedImage: string | null;
  onReset: () => void;
  isLoading: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageSelect,
  selectedImage,
  onReset,
  isLoading
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      // Simulate upload progress
      setUploadProgress(0);
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 50);

      setTimeout(() => {
        const url = URL.createObjectURL(file);
        onImageSelect(file, url);
        setUploadProgress(0);
      }, 600);
    }
  }, [onImageSelect]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  if (selectedImage) {
    return (
      <motion.div 
        className="relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-xl overflow-hidden bg-gray-100 shadow-lg">
          <img
            src={selectedImage}
            alt="Selected plant"
            className="w-full h-64 sm:h-80 object-cover"
          />
          
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                className="absolute inset-0 bg-black/50 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center text-white">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm">Analyzing plant health...</p>
                  <div className="w-32 bg-white/20 rounded-full h-1 mt-2">
                    <motion.div 
                      className="bg-white h-1 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 3, ease: "easeInOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.button
          onClick={onReset}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="h-4 w-4 text-gray-600" />
        </motion.button>
        
        <div className="mt-4 flex justify-center">
          <motion.button
            onClick={onReset}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FileImage className="h-4 w-4 mr-2" />
            Upload Different Image
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={`upload-area rounded-xl p-8 text-center transition-all duration-300 border-2 border-dashed ${
        isDragOver 
          ? 'border-green-400 bg-green-50 scale-105' 
          : 'border-gray-300 bg-gray-50 hover:border-green-300 hover:bg-green-50'
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      
      <div className="space-y-6">
        <motion.div 
          className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
          animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <ImageIcon className="h-10 w-10 text-green-600" />
        </motion.div>
        
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Upload Plant Image for Analysis
          </h3>
          <p className="text-gray-600 mb-6">
            Drag and drop your plant image here, or click to browse your files
          </p>
        </div>
        
        <div className="space-y-4">
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Upload className="h-5 w-5 mr-2" />
            Choose Image File
          </label>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">or</p>
            <button
              type="button"
              className="mt-2 inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Camera className="h-4 w-4 mr-2" />
              Take Photo
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-500">
            Supports JPG, PNG, WebP • Maximum file size: 10MB
          </p>
          <div className="flex justify-center space-x-4 mt-2 text-xs text-gray-400">
            <span>• High resolution recommended</span>
            <span>• Clear lighting preferred</span>
            <span>• Focus on affected areas</span>
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      <AnimatePresence>
        {uploadProgress > 0 && uploadProgress < 100 && (
          <motion.div 
            className="mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-green-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ImageUploader;