import React, { useState } from "react";
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
  CheckCircle2,
  Zap,
  X,
} from "lucide-react";

export default function Portfolio() {
  const [showImageModal, setShowImageModal] = useState(false);
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900 px-6 py-10 overflow-x-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.05, 0.12, 0.05], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute top-1/2 right-0 w-80 h-80 bg-pink-200 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.15 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="relative cursor-pointer"
            onClick={() => setShowImageModal(true)}
          >
            <img
              src={profile}
              alt="Nishanth Selvendran"
              className="w-36 h-36 rounded-full object-cover ring-4 ring-blue-500 shadow-2xl relative"
            />
          </motion.div>

          <motion.h1
            className="text-5xl font-bold mt-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            animate={{ backgroundPosition: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Nishanth Selvendran
          </motion.h1>

          <p className="mt-3 text-xl text-slate-700 font-medium">
            Video Editor • Content Creator • Student Freelancer
          </p>
          <p className="text-sm text-slate-600 mt-2 flex items-center justify-center gap-1">
            <Zap className="w-4 h-4 text-amber-500" /> Trichy, Tamil Nadu, India
          </p>
        </motion.div>

        {/* Social Cards with Enhanced Interactivity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {[
            {
              icon: Linkedin,
              title: "LinkedIn",
              desc: "Journey, achievements & collaborations",
              url: "https://www.linkedin.com/in/nishanth-selvendran",
              color: "from-blue-500 to-cyan-500",
              iconColor: "text-blue-600",
            },
            {
              icon: Instagram,
              title: "Personal Instagram",
              desc: "Personal brand, reels & creator journey",
              url: "https://www.instagram.com/voice_of_nishanth",
              color: "from-pink-500 to-orange-500",
              iconColor: "text-pink-600",
            },
            {
              icon: Instagram,
              title: "Mapla Branding",
              desc: "Freelancing services for brands & creators",
              url: "https://www.instagram.com/mapla.branding/",
              color: "from-purple-500 to-pink-500",
              iconColor: "text-purple-600",
            },
          ].map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              variants={itemVariants}
              className="group relative rounded-2xl bg-white p-6 shadow-lg hover:shadow-2xl border border-slate-200 overflow-hidden transition cursor-pointer"
              whileHover={{
                y: -8,
                boxShadow: "0 30px 60px rgba(59, 130, 246, 0.15)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-5 transition duration-300`}
              />

              <div className="relative space-y-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`p-3 rounded-lg bg-gradient-to-br ${social.color} text-white`}
                      whileHover={{ rotate: 20, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {social.icon && <social.icon className="w-6 h-6" />}
                    </motion.div>
                    <span className="font-bold text-slate-900 text-lg">
                      {social.title}
                    </span>
                  </div>
                  <motion.div
                    className="text-slate-400 group-hover:text-slate-600 transition"
                    whileHover={{ rotate: 45, x: 5 }}
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </motion.div>
                </div>
                <p className="text-sm text-slate-600 group-hover:text-slate-700 transition">
                  {social.desc}
                </p>

                <motion.div
                  className="h-1 bg-gradient-to-r w-0 group-hover:w-full transition-all duration-300"
                  style={{
                    backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))`,
                  }}
                  animate={{ width: ["0%", "100%", "0%"] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: idx * 0.3,
                  }}
                />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* About & Services */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div
            variants={itemVariants}
            className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-blue-300 transition cursor-pointer"
            whileHover={{ boxShadow: "0 20px 40px rgba(59, 130, 246, 0.1)" }}
          >
            <h2 className="font-bold text-2xl text-slate-900 mb-4 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl"
              >
                👋
              </motion.span>
              About Me
            </h2>
            <p className="text-slate-700 text-sm leading-relaxed">
              I'm a{" "}
              <span className="text-blue-600 font-semibold">
                student freelancer
              </span>{" "}
              helping creators and brands with end-to-end social media growth —
              from shooting to editing to digital marketing. Founder of{" "}
              <span className="text-purple-600 font-semibold">
                Mapla Branding
              </span>{" "}
              (Nov 2025).
            </p>
            <motion.div
              className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="group bg-white rounded-2xl p-8 shadow-lg border border-slate-200 hover:border-purple-300 transition cursor-pointer"
            whileHover={{ boxShadow: "0 20px 40px rgba(168, 85, 247, 0.1)" }}
          >
            <h2 className="font-bold text-2xl text-slate-900 mb-5 flex items-center gap-2">
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-2xl"
              >
                💼
              </motion.span>
              Freelancing Services
            </h2>
            <ul className="text-sm text-slate-700 space-y-4">
              {[
                { icon: Video, text: "Reels & Long-form Video Editing" },
                { icon: Camera, text: "Video Shooting (On-location)" },
                { icon: Megaphone, text: "Digital Marketing & Growth" },
                { icon: Instagram, text: "Social Media Management" },
                { icon: Zap, text: "Branding & Promotions" },
              ].map((service, idx) => (
                <motion.li
                  key={idx}
                  className="flex gap-3 items-center group/item cursor-pointer"
                  whileHover={{ x: 6 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <div className="p-2 rounded-lg bg-purple-100 group-hover/item:bg-purple-200 transition">
                    <service.icon size={18} className="text-purple-600" />
                  </div>
                  <span className="group-hover/item:text-slate-900 transition">
                    {service.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              className="mt-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
          </motion.div>
        </motion.div>

        {/* Skills with Expandable Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-16"
        >
          <h2 className="font-bold text-2xl mb-8 text-slate-900 flex items-center gap-2">
            <Zap className="text-amber-500" /> Skills & Expertise
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            {[
              {
                icon: "🎬",
                title: "Editing",
                items: [
                  "Reels & Long-form",
                  "Color Grading",
                  "Transitions & Effects",
                ],
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: "🎥",
                title: "Shooting",
                items: [
                  "Camera Handling",
                  "Framing & Composition",
                  "Lighting Basics",
                ],
                color: "from-purple-500 to-pink-500",
              },
              {
                icon: "📈",
                title: "Marketing",
                items: [
                  "Instagram Growth",
                  "Content Strategy",
                  "Analytics Basics",
                ],
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: "🛠",
                title: "Tools",
                items: ["Premiere Pro", "After Effects", "Photoshop"],
                color: "from-orange-500 to-red-500",
              },
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative rounded-xl p-6 border-2 border-slate-300 hover:border-slate-400 transition-all duration-300 text-left overflow-hidden group cursor-pointer"
                whileHover={{ y: -4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-5 transition duration-300`}
                />

                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{skill.icon}</span>
                    <h3 className="font-bold text-lg text-slate-900">
                      {skill.title}
                    </h3>
                  </div>

                  <ul className="text-sm text-slate-700 space-y-3">
                    {skill.items.map((item, i) => (
                      <motion.li
                        key={i}
                        className="flex items-center gap-2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mb-16"
        >
          <h2 className="font-bold text-2xl mb-8 text-slate-900 flex items-center gap-2">
            🏆 Key Achievements
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              "Worked with 30+ clients",
              "Completed 180+ projects",
              "Edited 100+ Instagram reels",
              "Built Mapla Branding while studying",
              "Touched 5-digit freelance revenue",
              "Growing client satisfaction rate",
            ].map((achievement, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group border border-slate-300 hover:border-green-400 rounded-xl p-5 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-start gap-3">
                  <motion.span
                    className="mt-1 text-green-600"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ✔
                  </motion.span>
                  <span className="text-slate-700 group-hover:text-slate-900 transition font-medium">
                    {achievement}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Portfolio CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.a
            href="https://drive.google.com/drive/folders/1hn04DtrXnlhOjd-s2thDVThHuo3zVTZy"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:shadow-2xl transition font-semibold text-lg cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              View Full Portfolio
            </motion.span>
            <motion.span
              animate={{ rotate: [0, 45, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowUpRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-2xl mx-auto"
        >
          <h2 className="font-bold text-2xl mb-6 text-slate-900">
            Let's Connect
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              {
                icon: Mail,
                text: "nishanthselvendran@gmail.com",
                link: "mailto:nishanthselvendran@gmail.com",
              },
              {
                icon: Phone,
                text: "+91 87788 97742",
                link: "tel:+918778897742",
              },
            ].map((contact, idx) => (
              <motion.a
                key={idx}
                href={contact.link}
                variants={itemVariants}
                className="flex items-center gap-3 text-slate-700 hover:text-slate-900 transition group cursor-pointer"
                whileHover={{ x: 8 }}
              >
                <div className="p-3 rounded-lg bg-blue-100 group-hover:bg-blue-200 transition">
                  <contact.icon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="font-medium">{contact.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Modal */}
        {showImageModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowImageModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="relative bg-white rounded-2xl p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full transition cursor-pointer z-10"
              >
                <X className="w-6 h-6 text-slate-900" />
              </button>
              <img
                src={profile}
                alt="Nishanth Selvendran - Full Size"
                className="w-full h-auto rounded-lg object-cover"
              />
              <p className="text-center text-slate-600 mt-4 font-medium">
                Nishanth Selvendran
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
