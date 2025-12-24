
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  user: User;
}

const data = [
  { name: 'Mon', vids: 4 },
  { name: 'Tue', vids: 3 },
  { name: 'Wed', vids: 10 },
  { name: 'Thu', vids: 7 },
  { name: 'Fri', vids: 15 },
  { name: 'Sat', vids: 12 },
  { name: 'Sun', vids: 18 },
];

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Welcome back, {user.name}</h1>
          <p className="text-slate-400 mt-1">Here is what's happening in your studio today.</p>
        </div>
        <div className="flex gap-4">
          <Link to="/train" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-sm font-medium transition-colors">
            Start Training
          </Link>
          <Link to="/generate" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-600/20 transition-colors">
            Generate Video
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Videos" value="1,248" trend="+12%" />
        <StatCard title="Credits Used" value="4,821" trend="+5%" />
        <StatCard title="Active Models" value="6" />
        <StatCard title="API Requests" value="14.2k" trend="+18%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 p-6 glass-morphism rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Video Generation Activity</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="name" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Bar dataKey="vids" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-6 glass-morphism rounded-2xl border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-6">
            <ActivityItem title="LoRA Training Complete" meta="Model: Cyberpunk-V2" time="2h ago" type="train" />
            <ActivityItem title="Video Generation" meta="Prompt: 'A futuristic city...'" time="4h ago" type="gen" />
            <ActivityItem title="Credits Recharged" meta="+5000 Credits" time="Yesterday" type="billing" />
            <ActivityItem title="API Key Generated" meta="Key: Prod-V1" time="2 days ago" type="api" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend }: any) => (
  <div className="p-6 glass-morphism rounded-2xl border border-slate-800">
    <p className="text-sm text-slate-400 mb-1">{title}</p>
    <div className="flex items-baseline justify-between">
      <h4 className="text-2xl font-bold text-white">{value}</h4>
      {trend && <span className="text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">{trend}</span>}
    </div>
  </div>
);

const ActivityItem = ({ title, meta, time, type }: any) => {
  const getIcon = () => {
    switch(type) {
      case 'train': return <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center text-orange-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></div>;
      case 'gen': return <div className="w-8 h-8 rounded bg-indigo-500/10 flex items-center justify-center text-indigo-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>;
      case 'api': return <div className="w-8 h-8 rounded bg-blue-500/10 flex items-center justify-center text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg></div>;
      default: return <div className="w-8 h-8 rounded bg-slate-500/10 flex items-center justify-center text-slate-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>;
    }
  };

  return (
    <div className="flex gap-4">
      {getIcon()}
      <div>
        <p className="text-sm font-semibold text-white leading-none mb-1">{title}</p>
        <p className="text-xs text-slate-500 mb-0.5">{meta}</p>
        <p className="text-[10px] text-slate-600 uppercase font-bold">{time}</p>
      </div>
    </div>
  );
};

export default Dashboard;
