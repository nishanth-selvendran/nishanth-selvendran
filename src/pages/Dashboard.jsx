import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid 
} from 'recharts';
import { Lock, LogOut, MapPin, Users, Calendar } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchVisits();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchVisits = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'visits'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore timestamp to JS Date if exists
        timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
      }));
      setVisits(data);
    } catch (err) {
      console.error("Error fetching visits:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  // Analytics Processing
  const totalVisits = visits.length;
  
  // Today's visits
  const today = new Date();
  const todayVisits = visits.filter(v => {
    const vDate = v.timestamp;
    return vDate.getDate() === today.getDate() &&
           vDate.getMonth() === today.getMonth() &&
           vDate.getFullYear() === today.getFullYear();
  }).length;

  // Group by City
  const cityStats = visits.reduce((acc, curr) => {
    const city = curr.city || 'Unknown';
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {});
  const cityData = Object.entries(cityStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5

  // Group by Date (Last 7 days)
  const dateStats = {};
  for(let i=6; i>=0; i--) {
     const d = new Date();
     d.setDate(d.getDate() - i);
     const dateStr = d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
     dateStats[dateStr] = 0; // Initialize
  }

  visits.forEach(v => {
    const dateStr = v.timestamp.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    if (dateStats.hasOwnProperty(dateStr)) {
      dateStats[dateStr]++;
    }
  });

  const chartData = Object.entries(dateStats).map(([date, count]) => ({ date, count }));

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-100">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-100 rounded-full">
              <Lock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Admin Login</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Portfolio Analytics</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Total Visits</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{totalVisits}</p>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Today's Visits</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{todayVisits}</p>
              </div>
              <div className="p-2 bg-green-50 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-slate-500">Top Location</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {cityData[0] ? cityData[0].name : '-'}
                </p>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <MapPin className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Visits (Last 7 Days)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Top Cities</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Visits Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Recent Visits</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">City</th>
                  <th className="px-6 py-3">Country</th>
                  <th className="px-6 py-3">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visits.slice(0, 10).map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {visit.timestamp.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {visit.city}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {visit.country}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 truncate max-w-xs" title={visit.userAgent}>
                      {visit.userAgent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
