import { diseaseInfo } from '../data/diseaseInfo';

// Simulate model prediction - in a real implementation, this would use TensorFlow.js
export const predictDisease = async (imageFile: File): Promise<{
  disease: string;
  confidence: number;
  description: string;
  treatment: string;
}> => {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  // Get available diseases
  const diseases = Object.keys(diseaseInfo);
  
  // Simulate prediction based on filename or random selection
  const fileName = imageFile.name.toLowerCase();
  let predictedDisease: string;
  
  // Try to match filename to disease for demo purposes
  if (fileName.includes('healthy')) {
    const healthyDiseases = diseases.filter(d => d.includes('Healthy'));
    predictedDisease = healthyDiseases[Math.floor(Math.random() * healthyDiseases.length)];
  } else if (fileName.includes('apple')) {
    const appleDiseases = diseases.filter(d => d.startsWith('Apple'));
    predictedDisease = appleDiseases[Math.floor(Math.random() * appleDiseases.length)];
  } else if (fileName.includes('tomato')) {
    const tomatoDiseases = diseases.filter(d => d.startsWith('Tomato'));
    predictedDisease = tomatoDiseases[Math.floor(Math.random() * tomatoDiseases.length)];
  } else if (fileName.includes('corn')) {
    const cornDiseases = diseases.filter(d => d.startsWith('Corn'));
    predictedDisease = cornDiseases[Math.floor(Math.random() * cornDiseases.length)];
  } else if (fileName.includes('grape')) {
    const grapeDiseases = diseases.filter(d => d.startsWith('Grape'));
    predictedDisease = grapeDiseases[Math.floor(Math.random() * grapeDiseases.length)];
  } else {
    // Random selection for other cases
    predictedDisease = diseases[Math.floor(Math.random() * diseases.length)];
  }

  // Generate realistic confidence score
  const confidence = 0.65 + Math.random() * 0.3; // Between 65% and 95%

  const info = diseaseInfo[predictedDisease as keyof typeof diseaseInfo];

  return {
    disease: predictedDisease,
    confidence,
    description: info.description,
    treatment: info.treatment
  };
};

// List of supported plant categories
export const supportedPlants = [
  'Apple', 'Blueberry', 'Cherry', 'Corn', 'Grape', 'Orange', 'Peach',
  'Pepper bell', 'Potato', 'Raspberry', 'Soybean', 'Squash', 'Strawberry', 'Tomato'
];

// List of detectable diseases
export const detectableDiseases = [
  'Black Rot', 'Cedar Rust', 'Scab', 'Powdery Mildew', 'Cercospora Leaf Spot',
  'Common Rust', 'Northern Leaf Blight', 'Esca', 'Black Measles', 'Leaf Blight',
  'Haunglongbing', 'Bacterial Spot', 'Early Blight', 'Late Blight', 'Leaf Scorch',
  'Leaf Mold', 'Mosaic Virus', 'Septoria Leaf Spot', 'Spider Mites', 'Target Spot',
  'Yellow Leaf Curl Virus'
];