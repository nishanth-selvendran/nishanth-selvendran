import React, { useState } from "react";
import { motion } from "framer-motion";
import profile from "../assets/profile.png";
import useAnalytics from "../hooks/useAnalytics";
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
import ServiceModal from "../components/ServiceModal";

export default function Home() {
  useAnalytics();
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

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateContact = (form) => {
    const errs = {};
    if (!form.name || !form.name.trim()) errs.name = "Please enter your name";
    if (!form.email || !/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.message || form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters";
    return errs;
  };

  const isValidField = (field, value) => {
    if (field === "message") return value && value.trim().length >= 10;
    if (field === "email") return /^\S+@\S+\.\S+$/.test(value);
    if (field === "name") return value && value.trim().length > 0;
    return true;
  };

  const handleFieldChange = (field, value) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field] && isValidField(field, value)) {
      const next = { ...errors };
      delete next[field];
      setErrors(next);
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = { ...contactForm };
    const validation = validateContact(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) {
      const first = Object.keys(validation)[0];
      const el = document.querySelector(`[name="${first}"]`);
      if (el) el.focus();
      return;
    }

    setSubmitting(true);
    const name = form.name || "Anonymous";
    const email = form.email || "";
    const message = form.message || "";
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`,
    );
    // open mail client with prefilled content in a new tab/window
    const mailto = `mailto:nishanthselvendran@gmail.com?subject=${encodeURIComponent(
      "Portfolio Contact from " + name,
    )}&body=${body}`;
    window.open(mailto, "_blank", "noopener,noreferrer");
    setSubmitting(false);
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

      <ServiceModal />

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

        {/* Award Nomination Hero Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl border-2 border-blue-400 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full -ml-16 -mb-16" />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h1 className="font-bold text-4xl mb-3 flex items-center gap-3">
              <span className="text-4xl">⭐</span>
              Best Student Freelancer Award Nomination
            </h1>
            <p className="text-lg text-blue-100 mb-4 font-medium">
              Nomination Submission for Chennai Freelancers Club 2026
            </p>
            <p className="text-base text-blue-50 leading-relaxed">
              Exceptional achievement in freelancing while maintaining academic
              excellence — generating{" "}
              <span className="font-bold text-white">₹131K+ revenue</span> from{" "}
              <span className="font-bold text-white">100+ projects</span> across{" "}
              <span className="font-bold text-white">
                20+ satisfied clients
              </span>{" "}
              in 18 consecutive months of active freelancing.
            </p>
          </motion.div>
        </motion.div>

        {/* Key Statistics - Award Nomination Focus */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg border border-blue-200 mb-16"
        >
          <h2 className="font-bold text-3xl mb-10 text-slate-900 flex items-center gap-2">
            🏆 Award-Winning Achievements
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {[
              { number: "100+", label: "Projects Delivered", icon: "📹" },
              {
                number: "₹131K+",
                label: "Total Revenue Generated",
                icon: "💰",
              },
              { number: "20+", label: "Satisfied Clients", icon: "🤝" },
              {
                number: "16",
                label: "Months of Active Freelancing",
                icon: "📅",
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center border border-slate-100"
                whileHover={{ y: -5 }}
              >
                <p className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.number}
                </p>
                <p className="text-slate-700 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>

          <div className="bg-white rounded-xl p-6 border border-slate-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              📊 Monthly Growth Timeline
            </h3>
            <div className="space-y-3">
              {[
                {
                  month: "Sep 2024",
                  revenue: "₹1.8K",
                  videos: "—",
                  status: "Started Freelancing",
                },
                {
                  month: "Oct 2024",
                  revenue: "₹2.8K",
                  videos: "—",
                  status: "Building Client Base",
                },
                {
                  month: "Feb 2025",
                  revenue: "₹10.6K",
                  videos: "—",
                  status: "Rapid Growth Begins",
                },
                {
                  month: "May 2025",
                  revenue: "₹14.4K",
                  videos: "—",
                  status: "Peak Growth Phase",
                },
                {
                  month: "Jun 2025",
                  revenue: "₹19.7K",
                  videos: "—",
                  status: "🔥 Highest Revenue Month",
                },
                {
                  month: "Sep 2025",
                  revenue: "₹12.3K",
                  videos: "—",
                  status: "Consistent Excellence",
                },
                {
                  month: "Dec 2025",
                  revenue: "₹7K+",
                  videos: "—",
                  status: "Strong Finish",
                },
                {
                  month: "Jan 2026",
                  revenue: "–",
                  videos: "–",
                  status: "Continuing Growth Momentum",
                },
                {
                  month: "Feb 2026",
                  revenue: "–",
                  videos: "–",
                  status: "Current Period",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-slate-200 hover:border-blue-400 transition"
                  whileHover={{ x: 5 }}
                >
                  <div>
                    <p className="font-semibold text-slate-900">{item.month}</p>
                    <p className="text-sm text-slate-600">{item.status}</p>
                    {/* <p className="text-xs text-slate-500 mt-1">
                      Videos:{" "}
                      <span className="font-semibold text-slate-700">
                        {item.videos}
                      </span>
                    </p> */}
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {item.revenue}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
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
                student freelancer achieving ₹131K+ revenue
              </span>{" "}
              by helping creators and brands with end-to-end social media growth
              — from shooting to editing to digital marketing.{" "}
              <span className="text-green-600 font-semibold">
                100+ projects completed
              </span>{" "}
              for{" "}
              <span className="text-green-600 font-semibold">
                20+ satisfied clients
              </span>{" "}
              in 18 months, while maintaining excellent studies. Founder of{" "}
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

        {/* Education & Timeline Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 shadow-lg border border-emerald-200 mb-16"
        >
          <h2 className="font-bold text-2xl mb-8 text-slate-900 flex items-center gap-2">
            🎓 Education & Professional Timeline
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
                period: "2024 - 2027",
                title: "BBA (Bachelor of Business Administration)",
                institution: "St. Joseph's College (Autonomous), Trichy",
                status: "Currently Enrolled",
                icon: "🎓",
                highlight: "Balancing academics with freelance excellence",
              },
              {
                period: "September 2024 - Present",
                title: "Freelance Video Editor & Content Creator",
                institution: "Self-Employed | Mapla Branding Founder",
                revenue: "₹131K+ generated",
                clients: "20+ clients served",
                projects: "100+ projects completed",
                status: "18 consecutive months active",
                icon: "💼",
                highlight: "Building professional portfolio while studying",
              },
              {
                period: "Jul 2024 - Jun 2025",
                title: "Freelance Video Editor & Graphic Designer",
                institution: "Nxt Level Agency (Freelance Partnership)",
                status: "1 year partnership",
                icon: "🚀",
                highlight: "Freelance partnership (Jul 2024 – Jun 2025)",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative border-l-4 border-emerald-400 pl-6 pb-6 last:pb-0"
              >
                <div className="absolute -left-3 top-2 w-5 h-5 bg-emerald-500 rounded-full border-4 border-white shadow-md" />

                <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-xs font-bold text-emerald-600 uppercase mb-1">
                        {item.period}
                      </p>
                      <h3 className="font-bold text-lg text-slate-900 mb-1">
                        {item.icon} {item.title}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {item.institution}
                      </p>
                    </div>
                  </div>

                  {item.revenue && (
                    <div className="mt-3 space-y-1 text-sm">
                      <p className="text-green-600 font-semibold">
                        💰 {item.revenue}
                      </p>
                      <p className="text-blue-600 font-medium">
                        👥 {item.clients}
                      </p>
                      <p className="text-purple-600 font-medium">
                        📊 {item.projects}
                      </p>
                    </div>
                  )}

                  <div className="mt-3 inline-block px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full text-xs font-semibold text-emerald-700">
                    {item.status}
                  </div>

                  {item.highlight && (
                    <p className="text-xs text-slate-600 italic mt-3 pt-3 border-t border-slate-200">
                      ✨ {item.highlight}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 p-4 bg-white rounded-lg border-2 border-emerald-200">
            <p className="text-sm text-slate-700">
              <span className="font-bold text-emerald-600">
                📌 Key Achievement:
              </span>{" "}
              Maintaining excellent academic standing while building a{" "}
              <span className="font-semibold">₹131K+ freelance business</span> —
              demonstrating exceptional time management, dedication, and
              entrepreneurial spirit.
            </p>
          </div>
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
            🏆 Verified Achievements & Statistics
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                num: "100+",
                desc: "Projects Successfully Completed",
                cat: "Projects",
              },
              {
                num: "₹131K+",
                desc: "Total Revenue Generated",
                cat: "Revenue",
              },
              {
                num: "20+",
                desc: "Regular & One-time Clients Served",
                cat: "Clients",
              },
              {
                num: "50+",
                desc: "Projects in Peak Growth Period (Mar-Aug 2025)",
                cat: "Performance",
              },
              {
                num: "6x",
                desc: "Revenue Growth from Sep 2024 to Jun 2025",
                cat: "Growth",
              },
              {
                num: "16",
                desc: "Consecutive Months of Active Freelancing",
                cat: "Consistency",
              },
              {
                num: "₹19.7K",
                desc: "Peak Monthly Revenue (June 2025)",
                cat: "Excellence",
              },
              {
                num: "98%",
                desc: "Client Retention & Repeat Project Rate",
                cat: "Satisfaction",
              },
            ].map((achievement, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="group border-2 border-slate-300 hover:border-blue-400 rounded-xl p-6 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {achievement.num}
                    </p>
                    <p className="text-slate-700 group-hover:text-slate-900 transition font-medium mt-1">
                      {achievement.desc}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {achievement.cat}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              ✨ Industry Expertise
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Adobe Premiere Pro & After Effects Expertise",
                "Short-form & Long-form Video Content",
                "Motion Graphics & Animation",
                "Photo Animation & 3D Video Editing",
                "Social Media Optimization & Strategy",
                "Branding & Corporate Video Content",
                "Real Estate & E-commerce Video Production",
                "Influencer Content Creation & Management",
              ].map((skill, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Major Clients Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 shadow-lg border border-amber-200 mb-16"
        >
          <h2 className="font-bold text-2xl mb-8 text-slate-900 flex items-center gap-2">
            🤝 Diverse Industry Experience
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                category: "Fashion & Apparel",
                clients: ["Revathy naidu", "She Boutique", "Silk Designers"],
                projects: "50+ Video Edits",
                revenue: "Leading Category",
              },
              {
                category: "Real Estate",
                clients: ["Sri Lakshman", "Mani Properties", "KDC"],
                projects: "20+ Property Videos",
                revenue: "Consistent Growth",
              },
              {
                category: "Design & Education",
                clients: ["Nxt Level - Vishal", "INSD", "Kalvi Institute"],
                projects: "30+ Educational Content",
                revenue: "Highest Retention",
              },
              {
                category: "Corporate & Agencies",
                clients: ["Bluesoft Agency", "Intzent", "Kaarlo"],
                projects: "Complex Productions",
                revenue: "Long-term Contracts",
              },
              {
                category: "Influencers & Creators",
                clients: ["Personal Creators", "Brands", "Content Channels"],
                projects: "Viral Content",
                revenue: "High Volume",
              },
              {
                category: "Specialized Services",
                clients: ["3D Animation", "Motion Graphics", "Photo Animation"],
                projects: "Advanced Editing",
                revenue: "Premium Pricing",
              },
            ].map((client, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-md border border-slate-200 hover:border-amber-400 hover:shadow-lg transition cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <h3 className="font-bold text-lg text-slate-900 mb-3 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  {client.category}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-amber-600 uppercase mb-1">
                      Clients
                    </p>
                    <p className="text-sm text-slate-700">
                      {client.clients.join(", ")}
                    </p>
                  </div>
                  <div className="border-t border-slate-200 pt-3">
                    <p className="text-xs font-semibold text-blue-600 uppercase mb-1">
                      Projects
                    </p>
                    <p className="text-sm text-slate-700 font-medium">
                      {client.projects}
                    </p>
                  </div>
                  <p className="text-xs text-green-600 font-semibold italic">
                    {client.revenue}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-pink-50 to-red-50 rounded-2xl p-8 shadow-lg border border-pink-200 mb-16"
        >
          <h2 className="font-bold text-2xl mb-8 text-slate-900 flex items-center gap-2">
            💬 Client Testimonials & Feedback
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                name: "Vishal",
                role: "Nxt Level Agency - Founder",
                company: "Design & Education Solutions",
                quote:
                  "Nishanth's professionalism and consistency is unmatched. He's a dedicated freelancer who maintains exceptional quality and delivers outstanding results. Best decision for our projects.",
                rating: 5,
                highlight: "One-year partnership (Jul 2024 – Jun 2025)",
              },
              {
                name: "Revathy Naidu",
                role: "Fashion Brand Owner",
                company: "Fashion & Apparel",
                quote:
                  "Outstanding video editing skills. Nishanth transformed our content strategy with engaging reels. He's reliable, quick, and delivers beyond expectations every single time.",
                rating: 5,
                highlight: "50+ Projects | Top Client Category",
              },
              {
                name: "Sri Lakshman",
                role: "Real Estate Developer",
                company: "Real Estate Solutions",
                quote:
                  "Professional, dedicated, and results-driven. Nishanth created compelling property videos that boosted our sales. A true asset to any creative project.",
                rating: 5,
                highlight: "20+ Property Videos | Long-term Partner",
              },
              {
                name: "Dinesh Kumar",
                role: "Enterprise Client Manager",
                company: "Corporate Solutions",
                quote:
                  "Exceptional work quality and turnaround time. Nishanth is a young talent with mature professional approach. Highly recommended for any video production needs.",
                rating: 5,
                highlight: "Complex Productions | Multi-project Client",
              },
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl p-6 shadow-md border border-pink-200 hover:border-pink-400 hover:shadow-lg transition cursor-pointer"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-xs text-slate-600">{testimonial.role}</p>
                    <p className="text-xs text-pink-600 font-semibold">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                <p className="text-sm text-slate-700 italic mb-4 leading-relaxed">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-2 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-lg"
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <div className="inline-block px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
                  {testimonial.highlight}
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

        {/* Award Nomination CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-yellow-100 via-orange-100 to-red-100 rounded-2xl p-8 shadow-xl border-2 border-yellow-400 mb-16 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-200/20 rounded-full -mr-24 -mt-24" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-orange-200/20 rounded-full -ml-20 -mb-20" />

          <motion.div
            className="relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="font-bold text-3xl mb-4 text-slate-900 flex items-center gap-3">
              <span className="text-4xl animate-bounce">🏆</span>
              Award Nomination Highlights
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-xs font-bold text-yellow-600 uppercase mb-2">
                  ✨ Why This Nomination?
                </p>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>
                    ✅{" "}
                    <span className="font-semibold">
                      Exceptional Financial Success
                    </span>{" "}
                    — ₹131K+ revenue as a student
                  </li>
                  <li>
                    ✅ <span className="font-semibold">Proven Consistency</span>{" "}
                    — 18 consecutive months of excellence
                  </li>
                  <li>
                    ✅{" "}
                    <span className="font-semibold">Client Satisfaction</span> —
                    98% retention & repeat projects
                  </li>
                  <li>
                    ✅ <span className="font-semibold">6x Revenue Growth</span>{" "}
                    — from ₹1.8K to ₹19.7K monthly
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-md">
                <p className="text-xs font-bold text-orange-600 uppercase mb-2">
                  🎓 Unique Proposition
                </p>
                <ul className="text-sm text-slate-700 space-y-2">
                  <li>
                    🎯{" "}
                    <span className="font-semibold">
                      Student + Successful Entrepreneur
                    </span>
                  </li>
                  <li>
                    🌍{" "}
                    <span className="font-semibold">
                      Multi-industry Experience
                    </span>{" "}
                    (6 major sectors)
                  </li>
                  <li>
                    💼 <span className="font-semibold">Diverse Skill Set</span>{" "}
                    — Editing, shooting, marketing
                  </li>
                  <li>
                    🚀 <span className="font-semibold">100+ Projects</span> with
                    20+ satisfied clients
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 mb-6 border-l-4 border-yellow-500">
              <p className="text-sm text-slate-700">
                <span className="font-bold text-slate-900">
                  📋 Award Details:
                </span>{" "}
                Best Student Freelancer Award Nomination for Chennai Freelancers
                Club 2026. This portfolio demonstrates exceptional
                entrepreneurial achievement while maintaining academic
                excellence — the hallmark of a worthy candidate.
              </p>
            </div>

            <div className="flex w-full justify-center gap-4">
              <motion.a
                href="https://www.linkedin.com/in/nishanth-selvendran"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-900 text-slate-900 rounded-full font-semibold shadow-md hover:shadow-lg transition cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>💼</span> View LinkedIn Profile
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 max-w-4xl mx-auto"
        >
          <h2 className="font-bold text-2xl mb-6 text-slate-900 text-center">
            Let's Connect
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <motion.div
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-slate-100 shadow-sm"
            >
              <p className="font-semibold text-slate-900 mb-3">Contact Info</p>
              <div className="flex flex-col gap-3">
                <a
                  href="mailto:nishanthselvendran@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-blue-50 transition"
                >
                  <div className="p-2 rounded-md bg-blue-100">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <p className="text-xs text-slate-600">
                      nishanthselvendran@gmail.com
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+918778897742"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-blue-50 transition"
                >
                  <div className="p-2 rounded-md bg-blue-100">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Phone</p>
                    <p className="text-xs text-slate-600">+91 87788 97742</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/918778897742?text=Hi"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg bg-white hover:bg-green-50 transition"
                >
                  <div className="p-2 rounded-md bg-green-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 text-green-600"
                      fill="currentColor"
                    >
                      <path d="M20.52 3.48A11.93 11.93 0 0012 .5C6.21.5 1.5 5.22 1.5 11c0 1.94.51 3.84 1.48 5.5L.5 23l6.82-2.03A11.5 11.5 0 0012 22c5.79 0 10.5-4.71 10.5-11 0-1.96-.52-3.82-1.98-5.52zM12 20.5c-1.05 0-2.08-.2-3.03-.6l-.22-.09-4.05 1.2 1.1-3.92-.14-.26A9.5 9.5 0 012.5 11 9.5 9.5 0 0112 2.5c5.25 0 9 4.03 9 8.5S17.25 19.5 12 19.5z" />
                      <path d="M17.1 14.1c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15s-.78.97-.96 1.17c-.18.2-.36.22-.66.07-.3-.15-1.27-.47-2.42-1.49-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.68-1.64-.93-2.26-.24-.6-.49-.52-.68-.53-.18-.01-.4-.01-.61-.01-.2 0-.52.07-.79.37-.27.3-1.05 1.02-1.05 2.48 0 1.45 1.08 2.85 1.23 3.05.15.2 2.12 3.4 5.14 4.77 3.02 1.37 3.02.91 3.57.86.55-.05 1.77-.72 2.02-1.41.25-.68.25-1.27.17-1.4-.08-.13-.28-.2-.58-.35z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      WhatsApp
                    </p>
                    <p className="text-xs text-slate-600">
                      Message me on WhatsApp
                    </p>
                  </div>
                </a>

                <div className="mt-4">
                  <p className="text-xs text-slate-600">Follow</p>
                  <div className="flex items-center gap-3 mt-2">
                    <a
                      href="https://www.linkedin.com/in/nishanth-selvendran"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-md bg-white shadow-sm hover:shadow-md"
                    >
                      <Linkedin className="w-5 h-5 text-blue-700" />
                    </a>
                    <a
                      href="https://www.instagram.com/voice_of_nishanth"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-md bg-white shadow-sm hover:shadow-md"
                    >
                      <Instagram className="w-5 h-5 text-pink-500" />
                    </a>
                    <a
                      href="https://www.instagram.com/mapla.branding/"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 rounded-md bg-white shadow-sm hover:shadow-md"
                    >
                      <Instagram className="w-5 h-5 text-purple-600" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleContactSubmit}
              variants={itemVariants}
              className="p-6 bg-gradient-to-br from-white to-slate-50 rounded-xl border border-slate-100 shadow-sm"
            >
              <p className="font-semibold text-slate-900 mb-3">Quick Message</p>
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={contactForm.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    aria-invalid={errors.name ? "true" : "false"}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200 w-full ${
                      errors.name
                        ? "border-red-300 ring-2 ring-red-100"
                        : "border-slate-200"
                    }`}
                  />
                  {errors.name && (
                    <p id="err-name" className="text-xs text-red-600 mt-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={contactForm.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200 w-full ${
                      errors.email
                        ? "border-red-300 ring-2 ring-red-100"
                        : "border-slate-200"
                    }`}
                  />
                  {errors.email && (
                    <p id="err-email" className="text-xs text-red-600 mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    name="message"
                    rows="4"
                    placeholder="How can I help you?"
                    value={contactForm.message}
                    onChange={(e) =>
                      handleFieldChange("message", e.target.value)
                    }
                    aria-invalid={errors.message ? "true" : "false"}
                    aria-describedby={
                      errors.message ? "err-message" : undefined
                    }
                    className={`px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-200 w-full ${
                      errors.message
                        ? "border-red-300 ring-2 ring-red-100"
                        : "border-slate-200"
                    }`}
                  />
                  {errors.message && (
                    <p id="err-message" className="text-xs text-red-600 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md font-semibold shadow hover:bg-blue-700 transition"
                  >
                    Send Message
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-3">
                  Prefer not to use form? Call directly or message me on
                  WhatsApp.
                </p>
              </div>
            </motion.form>
          </div>
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
