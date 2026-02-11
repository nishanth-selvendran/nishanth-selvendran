import React, { useState, useEffect } from 'react';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, query, orderBy, getDocs, Timestamp } from 'firebase/firestore';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, CartesianGrid, PieChart, Pie, Cell, Legend
} from 'recharts';
import { Lock, LogOut, MapPin, Users, Calendar, Globe, Monitor, Smartphone } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// Simple UA Parser Helpers
const parseBrowser = (ua) => {
  if (!ua) return 'Unknown';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
  if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
  if (ua.includes('Trident')) return 'Internet Explorer';
  if (ua.includes('Edge')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
};

const parseOS = (ua) => {
  if (!ua) return 'Unknown';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Macintosh')) return 'macOS';
  if (ua.includes('Linux')) return 'Linux';
  return 'Other';
};

const parseDeviceType = (ua) => {
  if (!ua) return 'Desktop';
  if (ua.includes('Mobi') || ua.includes('Android') || ua.includes('iPhone')) return 'Mobile';
  return 'Desktop';
};

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visits, setVisits] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchData();
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Visits
      const qVisits = query(collection(db, 'visits'), orderBy('timestamp', 'desc'));
      const visitsSnapshot = await getDocs(qVisits);
      const visitsData = visitsSnapshot.docs.map(doc => {
        const d = doc.data();
        return {
          id: doc.id,
          ...d,
          timestamp: d.timestamp ? d.timestamp.toDate() : new Date(),
          browser: parseBrowser(d.userAgent),
          os: parseOS(d.userAgent),
          deviceType: parseDeviceType(d.userAgent)
        };
      });
      setVisits(visitsData);

      // Fetch Leads
      const qLeads = query(collection(db, 'leads'), orderBy('timestamp', 'desc'));
      const leadsSnapshot = await getDocs(qLeads);
      const leadsData = leadsSnapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data(),
         timestamp: doc.data().timestamp ? doc.data().timestamp.toDate() : new Date()
      }));
      setLeads(leadsData);

    } catch (err) {
      console.error("Error fetching data:", err);
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
  
  // Calculate Average Duration
  const totalDuration = visits.reduce((acc, curr) => acc + (curr.duration || 0), 0);
  const avgDuration = totalVisits ? Math.round(totalDuration / totalVisits) : 0;
  
  // Format seconds to mm:ss
  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s}s`;
  };

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

  // Group by Country
  const countryStats = visits.reduce((acc, curr) => {
    const country = curr.country || 'Unknown';
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});
  const countryData = Object.entries(countryStats)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Top 5

  // Group by Browser
  const browserStats = visits.reduce((acc, curr) => {
    const b = curr.browser || 'Unknown';
    acc[b] = (acc[b] || 0) + 1;
    return acc;
  }, {});
  const browserData = Object.entries(browserStats)
  .map(([name, value]) => ({ name, value }))
  .sort((a, b) => b.value - a.value);

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

  // Group by Referrer (Source)
  const sourceStats = visits.reduce((acc, curr) => {
    let source = curr.referrer || 'Direct';
    if (source.includes('google')) source = 'Google';
    else if (source.includes('linkedin')) source = 'LinkedIn';
    else if (source.includes('instagram')) source = 'Instagram';
    else if (source === 'Direct/None' || source === '') source = 'Direct';
    else {
      try {
        source = new URL(source).hostname.replace('www.', '');
      } catch (e) {
        source = 'Other';
      }
    }

    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});
  const sourceData = Object.entries(sourceStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const chartData = Object.entries(dateStats).map(([date, count]) => ({ date, count }));

  // Group by Month
  const monthStats = visits.reduce((acc, curr) => {
    const d = curr.timestamp;
    const key = d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const monthData = Object.entries(monthStats)
    .map(([name, value]) => ({ name, value }));

  // Group by Year
  const yearStats = visits.reduce((acc, curr) => {
    const key = curr.timestamp.getFullYear().toString();
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const yearData = Object.entries(yearStats)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => a.name.localeCompare(b.name));


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
        {/* Header */}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                <p className="text-sm font-medium text-slate-500">Avg Session</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">{formatDuration(avgDuration)}</p>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <Monitor className="w-6 h-6 text-orange-600" />
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

        {/* Leads Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-slate-200 bg-green-50">
            <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
              <LogOut className="w-5 h-5" /> Recent Leads & Drafts
            </h2>
          </div>
          <div className="overflow-x-auto">
             {leads.length === 0 ? (
                <p className="p-6 text-slate-500 text-center">No leads captured yet.</p>
             ) : (
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3">Time</th>
                      <th className="px-4 py-3">Message</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {leads.slice(0, 5).map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 text-sm">
                         <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                           {lead.timestamp.toLocaleString()}
                         </td>
                         <td className="px-4 py-3 text-slate-900 font-medium">
                           {lead.message}
                         </td>
                         <td className="px-4 py-3">
                           <span className={`px-2 py-1 rounded text-xs font-bold ${lead.message.includes('[SENT]') ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                             {lead.message.includes('[SENT]') ? 'SENT' : 'DRAFT'}
                           </span>
                         </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             )}
          </div>
        </div>

        {/* Main Trend Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
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

        {/* Geographic Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
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

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Top Countries</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" allowDecimals={false} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#ec4899" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Section 2: Monthly & Yearly */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Monthly Visits</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Yearly Visits</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Section 3: Source & Device */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Traffic Source</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#82ca9d"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Browser/Device Stats</h2>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={browserData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {browserData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Detailed Visits Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-900">Recent Visits Logs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3">Time</th>
                  <th className="px-4 py-3">Loc</th>
                  <th className="px-4 py-3">GPS?</th>
                  <th className="px-4 py-3">Page</th>
                  <th className="px-4 py-3">Device/OS</th>
                  <th className="px-4 py-3">Browser</th>
                  <th className="px-4 py-3">Screen</th>
                  <th className="px-4 py-3">IP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {visits.slice(0, 15).map((visit) => (
                  <tr key={visit.id} className="hover:bg-slate-50 text-sm">
                    <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                      {visit.timestamp.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {visit.city}, {visit.country}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${visit.gpsAllowed ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {visit.gpsAllowed ? 'YES' : 'NO'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-blue-600">
                      {visit.path || '/'}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                       {visit.os} ({visit.deviceType})
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {visit.browser}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {visit.screenSize || '-'}
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-slate-500">
                      {visit.ip}
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
