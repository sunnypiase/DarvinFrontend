import React, { useState, useEffect } from 'react';
import { fetchModels, fetchSubscriptions, toggleSubscription } from '../apiService';

const Models = () => {
  const [models, setModels] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 3;  // Static user ID for this example

  useEffect(() => {
    const loadData = async () => {
      try {
        const modelsData = await fetchModels();
        const allSubscriptions = await fetchSubscriptions();
        // Filter subscriptions for the current user
        const userSubscriptions = allSubscriptions.filter(sub => sub.userId === userId);
        setModels(modelsData);
        setSubscriptions(userSubscriptions);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSubscriptionToggle = async (modelId) => {
    const subscription = subscriptions.find(sub => sub.modelId === modelId);
    const isSubscribed = !!subscription;
    try {
      const result = await toggleSubscription(modelId, subscription?.subscriptionId);
      if (isSubscribed) {
        // Remove the subscription from local state
        setSubscriptions(subscriptions.filter(sub => sub.modelId !== modelId));
      } else {
        // Add the new subscription to local state
        // Assume the result contains the newly created subscription data
        setSubscriptions([...subscriptions, result]);
      }
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };
  

  if (loading) {
    return <p className="loading">Loading models...</p>;
  }

  return (
    <ul className="Models">
      {models.map(model => {
        const isSubscribed = subscriptions.some(sub => sub.modelId === model.modelId);
        return (
          <li key={model.modelId} className="ModelItem">
            <span className="ModelName">{model.fileName}</span>
            <button
              onClick={() => handleSubscriptionToggle(model.modelId)}
              className="button"
            >
              {isSubscribed ? 'Unsubscribe' : 'Subscribe'}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Models;
