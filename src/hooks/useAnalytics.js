import { useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const useAnalytics = () => {
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    const logVisit = async () => {
      const visitedKey = 'portfolio_visit_logged';
      
      if (sessionStorage.getItem(visitedKey)) return;

      // Capture extended data
      let visitData = {
        city: 'Unknown',
        country: 'Unknown',
        ip: 'Anonymous',
        method: 'Unknown',
        gpsAllowed: false,
        userAgent: navigator.userAgent,
        path: window.location.pathname,
        // NEW METRICS
        referrer: document.referrer || 'Direct/None',
        language: navigator.language || 'en',
        screenSize: `${window.screen.width}x${window.screen.height}`,
      };

      // 1. IP Data
      try {
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          visitData = {
            ...visitData,
            city: data.city || 'Unknown',
            country: data.country_name || 'Unknown',
            ip: data.ip || 'Anonymous',
            method: 'IP'
          };
        }
      } catch (ipError) {
        console.warn("Analytics: IP Fetch failed.", ipError);
      }

      // 2. GPS Upgrade
      const getGPSLocation = () => {
        return new Promise((resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation not supported"));
            return;
          }
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { timeout: 10000, enableHighAccuracy: true }
          );
        });
      };

      try {
        console.log("Analytics: Requesting GPS permission...");
        const position = await getGPSLocation();
        const { latitude, longitude } = position.coords;
        
        console.log("Analytics: GPS Granted. Reverse geocoding...", latitude, longitude);
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const data = await response.json();
        
        const gpsCity = data.city || data.locality || data.principalSubdivision || visitData.city;
        const gpsCountry = data.countryName || visitData.country;

        visitData = {
          ...visitData,
          city: gpsCity,
          country: gpsCountry,
          method: 'GPS',
          gpsAllowed: true,
          lat: latitude,
          lng: longitude
        };
        console.log(`Analytics: Precise Location found: ${gpsCity}`);

      } catch (gpsError) {
        console.info("Analytics: GPS denied/failed, keeping IP location.", gpsError.message);
        visitData.gpsAllowed = false;
      }

      // 3. Log to Firestore
      try {
        await addDoc(collection(db, 'visits'), {
          timestamp: serverTimestamp(),
          ...visitData
        });
        
        sessionStorage.setItem(visitedKey, 'true');
        console.log("Analytics: Visit logged successfully via " + visitData.method);
      } catch (error) {
        console.error("Analytics: Error logging visit.", error);
      }
    };

    logVisit();
  }, []);
};

export default useAnalytics;
