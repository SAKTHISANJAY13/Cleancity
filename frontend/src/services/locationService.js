// Location service using browser geolocation
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        reject(error);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  });
};

// Get user's city from coordinates (using reverse geocoding)
export const getCityFromCoordinates = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
    );
    const data = await response.json();
    return data.address?.city || data.address?.town || 'Unknown Location';
  } catch (error) {
    console.error('Error getting city:', error);
    return 'Unknown Location';
  }
};

export default {
  getCurrentLocation,
  getCityFromCoordinates
};
