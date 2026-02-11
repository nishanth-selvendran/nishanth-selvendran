import { useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const useAnalytics = () => {
  useEffect(() => {
    const logVisit = async () => {
      try {
        // Check if visit is already logged in session storage to avoid duplicates on refresh
        const visitedKey = 'portfolio_visit_logged';
        if (sessionStorage.getItem(visitedKey)) return;

        // Fetch location data from a free IP Geolocation API
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        // Prepare visit data
        const visitData = {
          timestamp: serverTimestamp(),
          city: data.city || 'Unknown',
          country: data.country_name || 'Unknown',
          ip: data.ip || 'Anonymous', // Consider privacy implications
          userAgent: navigator.userAgent,
          path: window.location.pathname
        };

        // Add to Firestore
        await addDoc(collection(db, 'visits'), visitData);
        
        // Mark as logged for this session
        sessionStorage.setItem(visitedKey, 'true');
        
        console.log('Visit logged:', visitData.city, visitData.country);
      } catch (error) {
        console.error('Error logging visit:', error);
      }
    };

    logVisit();
  }, []);
};

export default useAnalytics;
