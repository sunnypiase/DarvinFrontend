import axios from 'axios';

const API_BASE_URL = 'http://localhost:5063/api';

export const fetchModels = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/model`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch models:', error);
    throw error;
  }
};
export const fetchSubscriptions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/subscription`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch subscriptions:', error);
    throw error;
  }
};

export const toggleSubscription = async (modelId, subscriptionId) => {
  if (subscriptionId) {
    // If subscriptionId is present, it means the user is already subscribed, so we perform a DELETE operation.
    try {
      const response = await axios.delete(`${API_BASE_URL}/subscription/${subscriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to delete subscription:', error);
      throw error;
    }
  } else {
    // If there is no subscriptionId, it means the user is not subscribed, so we perform a POST operation.
    try {
      const response = await axios.post(`${API_BASE_URL}/subscription`, {
        isTrading : false,
        modelId:modelId,
        userId: 3, // Assuming user ID is static as per your setup
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create subscription:', error);
      throw error;
    }
  }
};