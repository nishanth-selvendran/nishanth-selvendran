import React, { useState, useEffect, useRef } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function ServiceModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [draftId, setDraftId] = useState(null);
  const startTime = useRef(Date.now());

  // Smart Re-engagement Logic
  useEffect(() => {
    const checkAndShow = () => {
      const lastClosed = sessionStorage.getItem('serviceModalClosedAt');
      const now = Date.now();
      const fifteenMinutes = 15 * 60 * 1000;

      // Logic: Show if never closed OR if 15 mins passed since last close
      if (!lastClosed || (now - parseInt(lastClosed) > fifteenMinutes)) {
         setIsOpen(true);
      }
    };

    // Initial check after 7 seconds
    const timer = setTimeout(checkAndShow, 7000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    saveDraft(message);
    setIsOpen(false);
    sessionStorage.setItem('serviceModalClosedAt', Date.now().toString());
  };

  // Draft Capture Logic
  const saveDraft = async (text) => {
    if (!text.trim()) return;
    
    try {
      const visitId = sessionStorage.getItem('currentVisitId');
      const leadData = {
        message: text,
        timestamp: serverTimestamp(),
        visitId: visitId || 'unknown',
        status: 'draft',
        source: 'ServiceModal'
      };

      // If we already have a draft ID, update (or just add new for simplicity/history)
      // For this MVP, we'll just add new docs to avoid complex update logic without ID persistence difficulties
      // But to be cleaner, let's just fire-and-forget "Draft"
      await addDoc(collection(db, 'leads'), leadData);
    } catch (error) {
      console.error("Error saving draft:", error);
    }
  };

  const handleBlur = () => {
    saveDraft(message);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    
    // Log as "Sent" before redirecting
    saveDraft(message + " [SENT]");

    // Replace with your actual WhatsApp number
    const phoneNumber = "918778897742"; 
    const text = encodeURIComponent(`Hi Nishanth, I saw your portfolio and I'm interested in your services: ${message}`);
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative border border-slate-100"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white relative">
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition"
              >
                <X size={24} />
              </button>
              <div className="flex items-center gap-3 mb-2">
                <MessageCircle className="w-8 h-8" />
                <h3 className="text-xl font-bold">Let's work together!</h3>
              </div>
              <p className="text-green-50 text-sm opacity-90">
                Looking for video editing or branding services? Let me know below!
              </p>
            </div>

            {/* Body */}
            <div className="p-6">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onBlur={handleBlur}
                placeholder="I need help with..."
                className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none bg-slate-50 text-slate-700 placeholder:text-slate-400 mb-4"
              />
              
              <button
                onClick={handleSend}
                disabled={!message.trim()}
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-green-500/30"
              >
                <Send size={18} />
                Send via WhatsApp
              </button>
              
              <p className="text-xs text-center text-slate-400 mt-4">
                You'll be redirected to WhatsApp to send this message.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
