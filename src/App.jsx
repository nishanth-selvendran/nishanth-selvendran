import React from "react";
import { motion } from "framer-motion";
import profile from "./assets/profile.png";
import {
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  Video,
  Camera,
  Megaphone,
} from "lucide-react";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-gray-900 px-6 py-10 overflow-x-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center text-center"
      >
        <img
          src={profile}
          alt="Nishanth Selvendran"
          className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-lg"
        />
        <h1 className="text-3xl font-bold mt-4">Nishanth Selvendran</h1>
        <p className="mt-2 text-gray-600">
          Video Editor • Content Creator • Student Freelancer
        </p>
        <p className="text-sm text-gray-500 mt-1">Trichy, Tamil Nadu, India</p>
      </motion.div>

      {/* Social Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto"
      >
        <a
          href="https://www.linkedin.com/in/nishanth-selvendran"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl bg-white p-6 shadow hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Linkedin className="text-blue-600" />
              <span className="font-semibold">LinkedIn</span>
            </div>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition" />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Journey, achievements & collaborations
          </p>
        </a>

        <a
          href="https://www.instagram.com/voice_of_nishanth"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl bg-white p-6 shadow hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Instagram className="text-pink-600" />
              <span className="font-semibold">Personal Instagram</span>
            </div>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition" />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Personal brand, reels & creator journey
          </p>
        </a>

        <a
          href="https://www.instagram.com/mapla.branding/"
          target="_blank"
          rel="noreferrer"
          className="group rounded-2xl bg-white p-6 shadow hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Instagram className="text-pink-600" />
              <span className="font-semibold">Mapla Branding</span>
            </div>
            <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition" />
          </div>
          <p className="text-sm text-gray-600 mt-3">
            Freelancing services for brands & creators
          </p>
        </a>
      </motion.div>

      {/* About & Services */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="font-bold text-lg mb-3">👋 About Me</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            I’m a <strong>student freelancer</strong> helping creators and
            brands with end-to-end social media growth — from shooting to
            editing to digital marketing. Founder of{" "}
            <strong>Mapla Branding</strong> (Nov 2025).
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow hover:shadow-md transition">
          <h2 className="font-bold text-lg mb-3">💼 Freelancing Services</h2>
          <ul className="text-sm text-gray-600 space-y-2">
            <li className="flex gap-2">
              <Video size={16} /> Reels & Long-form Video Editing
            </li>
            <li className="flex gap-2">
              <Camera size={16} /> Video Shooting (On-location)
            </li>
            <li className="flex gap-2">
              <Megaphone size={16} /> Digital Marketing & Growth
            </li>
            <li className="flex gap-2">
              <Instagram size={16} /> Social Media Management
            </li>
            <li className="flex gap-2">
              <ArrowUpRight size={16} /> Branding & Promotions
            </li>
          </ul>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow mt-12 max-w-5xl mx-auto"
      >
        <h2 className="font-bold text-lg mb-6">🔥 Skills & Expertise</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="rounded-xl border p-4 hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-blue-600">🎬 Editing</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Reels & Long-form</li>
              <li>Color Grading</li>
              <li>Transitions & Effects</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4 hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-purple-600">🎥 Shooting</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Camera Handling</li>
              <li>Framing & Composition</li>
              <li>Lighting Basics</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4 hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-green-600">📈 Marketing</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Instagram Growth</li>
              <li>Content Strategy</li>
              <li>Analytics Basics</li>
            </ul>
          </div>

          <div className="rounded-xl border p-4 hover:shadow-md transition">
            <h3 className="font-semibold mb-3 text-orange-600">🛠 Tools</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>Premiere Pro</li>
              <li>After Effects</li>
              <li>Photoshop</li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow mt-10 max-w-5xl mx-auto"
      >
        <h2 className="font-bold text-lg mb-6">🏆 Key Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="border rounded-xl p-4">✔ Worked with 30+ clients</div>
          <div className="border rounded-xl p-4">✔ Completed 180+ projects</div>
          <div className="border rounded-xl p-4">
            ✔ Edited 100+ Instagram reels
          </div>
          <div className="border rounded-xl p-4">
            ✔ Built Mapla Branding while studying
          </div>
          <div className="border rounded-xl p-4">
            ✔ Touched 5-digit freelance revenue
          </div>
        </div>
      </motion.div>

      {/* Portfolio CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mt-12"
      >
        <a
          href="https://drive.google.com/drive/folders/1hn04DtrXnlhOjd-s2thDVThHuo3zVTZy"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition"
        >
          View Full Portfolio <ArrowUpRight />
        </a>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl p-6 shadow mt-12 max-w-3xl mx-auto"
      >
        <h2 className="font-bold text-lg mb-4">Contact</h2>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Mail /> nishanthselvendran@gmail.com
          </div>
          <div className="flex items-center gap-2">
            <Phone /> +91 87788 97742
          </div>
        </div>
      </motion.div>
    </div>
  );
}
