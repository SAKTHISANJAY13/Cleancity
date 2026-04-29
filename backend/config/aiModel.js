// AI Waste Detection Service
// Using simple rule-based detection as fallback
// Can be replaced with actual ML model (TensorFlow.js, AWS Rekognition, Google Vision, etc.)

const WASTE_TYPES = {
  PLASTIC: 'plastic',
  ORGANIC: 'organic',
  METAL: 'metal',
  PAPER: 'paper',
  GLASS: 'glass',
  MIXED: 'mixed'
};

const SEVERITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
};

// Mock AI detection using image URL analysis
// In production, integrate with Google Vision API, TensorFlow.js, or similar
const detectWaste = async (imageUrl) => {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Rule-based detection based on filename or mock random
    const wasteTypes = Object.values(WASTE_TYPES);
    const severities = Object.values(SEVERITY_LEVELS);

    // In production, call actual ML model here:
    // Example: await callGoogleVisionAPI(imageUrl);
    // Example: await callTensorFlowModel(imageUrl);

    // For MVP: Return random but realistic waste type and severity
    const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
    const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

    // Occasionally return specific types (70% realistic)
    if (Math.random() > 0.3) {
      const commonTypes = ['plastic', 'organic', 'mixed'];
      return {
        wasteType: commonTypes[Math.floor(Math.random() * commonTypes.length)],
        severity: randomSeverity,
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2) // 70-100%
      };
    }

    return {
      wasteType: randomWaste,
      severity: randomSeverity,
      confidence: (Math.random() * 0.3 + 0.5).toFixed(2)
    };
  } catch (error) {
    console.error('AI Detection Error:', error);
    return {
      wasteType: 'mixed',
      severity: 'medium',
      confidence: 0.5
    };
  }
};

module.exports = {
  detectWaste,
  WASTE_TYPES,
  SEVERITY_LEVELS
};
