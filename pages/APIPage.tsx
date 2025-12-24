
import React, { useState } from 'react';
import { User, ApiKey } from '../types';

interface APIPageProps {
  user: User;
}

const APIPage: React.FC<APIPageProps> = ({ user }) => {
  const [keys, setKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Production V1', key: 'fv_live_839...2j91', usageCount: 4821 },
    { id: '2', name: 'Dev Sandbox', key: 'fv_test_102...8f32', usageCount: 12 }
  ]);

  const generateKey = () => {
    const newKey: ApiKey = {
      id: Math.random().toString(),
      name: `New Key ${keys.length + 1}`,
      key: `fv_live_${Math.random().toString(36).substr(2, 8)}...`,
      usageCount: 0
    };
    setKeys([...keys, newKey]);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white">Developer API</h1>
          <p className="text-slate-400 mt-1">Integrate FastVision video infrastructure into your workflow.</p>
        </div>
        <button 
          onClick={generateKey}
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-indigo-600/20"
        >
          Create New API Key
        </button>
      </div>

      <div className="space-y-6 mb-12">
        {keys.map(k => (
          <div key={k.id} className="p-6 glass-morphism rounded-2xl border border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-6">
               <div className="w-10 h-10 bg-indigo-600/10 rounded-lg flex items-center justify-center text-indigo-400 font-mono text-xs font-bold">API</div>
               <div>
                  <h4 className="text-white font-bold">{k.name}</h4>
                  <p className="text-sm font-mono text-slate-500">{k.key}</p>
               </div>
            </div>
            <div className="text-right">
               <p className="text-xs text-slate-500 uppercase font-bold mb-1">Total Usage</p>
               <p className="text-white font-mono">{k.usageCount} requests</p>
            </div>
          </div>
        ))}
      </div>

      <div className="glass-morphism rounded-2xl border border-slate-800 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-white font-bold">Quick Integration Example</h3>
          <div className="flex gap-2">
            <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded">PYTHON</span>
            <span className="text-[10px] bg-indigo-600 text-white px-2 py-0.5 rounded">NODE.JS</span>
          </div>
        </div>
        <div className="p-6 bg-slate-950/50 font-mono text-xs leading-relaxed overflow-x-auto">
          <pre className="text-indigo-400">
{`const fastvision = require('@fastvision/sdk');

const client = new fastvision.Client({
  apiKey: 'YOUR_API_KEY'
});

// Generate a cinematic video via Ray Cluster
const generateVideo = async () => {
  const result = await client.video.generate({
    model: 'wan-v2.1',
    prompt: 'Hyper-realistic sunset over futuristic Tokyo',
    resolution: '1080p'
  });
  
  console.log('Video Generation Task ID:', result.taskId);
};`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default APIPage;
