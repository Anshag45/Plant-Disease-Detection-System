import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';

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

  const handleFileSelect = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      onImageSelect(file, url);
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
      <div className="relative">
        <div className="relative rounded-xl overflow-hidden bg-gray-100">
          <img
            src={selectedImage}
            alt="Selected plant"
            className="w-full h-64 sm:h-80 object-cover"
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                <p className="text-sm">Analyzing...</p>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={onReset}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
        >
          <X className="h-4 w-4 text-gray-600" />
        </button>
        
        <div className="mt-4 flex justify-center">
          <button
            onClick={onReset}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            Upload Different Image
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-area rounded-xl p-8 text-center transition-all duration-300 ${
        isDragOver ? 'dragover' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="file-upload"
      />
      
      <div className="space-y-4">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <ImageIcon className="h-8 w-8 text-green-600" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Upload Plant Image
          </h3>
          <p className="text-gray-600 mb-4">
            Drag and drop your image here, or click to browse
          </p>
        </div>
        
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <Upload className="h-5 w-5 mr-2" />
          Choose Image
        </label>
        
        <p className="text-xs text-gray-500 mt-2">
          Supports JPG, PNG, WebP up to 10MB
        </p>
      </div>
    </div>
  );
};

export default ImageUploader;