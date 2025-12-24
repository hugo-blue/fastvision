
import React, { useState } from 'react';
import { RayServerService } from '../services/rayServer';
import { User, TaskStatus } from '../types';

interface GenerationPageProps {
  user: User;
}

const GenerationPage: React.FC<GenerationPageProps> = ({ user }) => {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('Wan-v2.1-Standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    setVideoUrl(null);

    const taskId = await RayServerService.submitVideoGeneration({ prompt, modelId: model });
    
    const interval = setInterval(() => {
      const task = RayServerService.getTaskStatus(taskId);
      if (task && task.status === TaskStatus.COMPLETED) {
        setVideoUrl(task.videoUrl);
        setIsGenerating(false);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-white mb-2">Video Forge</h1>
        <p className="text-slate-400">Transform your imagination into cinematic reality.</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Settings Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-morphism rounded-2xl p-6 border border-slate-800">
            <h3 className="text-white font-bold mb-4">Configurations</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Base Model</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-sm text-white"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                >
                  <option>Wan-v2.1-Standard</option>
                  <option>Wan-v2.1-Cinematic</option>
                  <option>Private-LoRA-Cyber</option>
                  <option>Private-LoRA-Portrait</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Resolution</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="bg-indigo-600 text-white text-xs py-2 rounded-lg font-bold border border-indigo-500">1080p</button>
                  <button className="bg-slate-800 text-slate-400 text-xs py-2 rounded-lg hover:bg-slate-700 border border-slate-700">4K</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Aspect Ratio</label>
                <div className="grid grid-cols-3 gap-2">
                  <button className="bg-indigo-600 text-white text-xs py-1.5 rounded font-bold border border-indigo-500">16:9</button>
                  <button className="bg-slate-800 text-slate-400 text-xs py-1.5 rounded border border-slate-700">9:16</button>
                  <button className="bg-slate-800 text-slate-400 text-xs py-1.5 rounded border border-slate-700">1:1</button>
                </div>
              </div>
              
              <div>
                 <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Length</label>
                 <input type="range" className="w-full accent-indigo-600" min="5" max="30" step="5" />
                 <div className="flex justify-between text-[10px] text-slate-500 mt-1 uppercase">
                   <span>5s</span>
                   <span>30s</span>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20">
             <div className="flex justify-between items-center text-xs text-indigo-300 font-bold mb-1">
               <span>Cost per Gen</span>
               <span>15 Credits</span>
             </div>
          </div>
        </div>

        {/* Main Canvas */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-morphism rounded-2xl p-6 border border-slate-800 min-h-[500px] flex flex-col">
            <div className="mb-6">
               <textarea 
                  className="w-full h-32 bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-none"
                  placeholder="Describe the scene in detail... e.g., 'A bioluminescent jellyfish floating through a neon-lit cyberpunk metropolis, cinematic lighting, 8k, stable motion.'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
               />
               <div className="flex justify-end mt-2">
                 <button 
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt}
                  className={`px-8 py-3 rounded-xl font-bold text-white transition-all flex items-center gap-2 ${isGenerating || !prompt ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'}`}
                 >
                   {isGenerating ? (
                     <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      Generating...
                     </>
                   ) : 'Forge Video'}
                 </button>
               </div>
            </div>

            <div className="flex-grow flex items-center justify-center bg-slate-900/50 rounded-xl border border-dashed border-slate-800 overflow-hidden relative">
              {videoUrl ? (
                <div className="relative w-full h-full group">
                   <img src={videoUrl} alt="Generated Video" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                     <button className="bg-white text-black p-4 rounded-full font-bold shadow-xl flex items-center gap-2">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-8-9h6V3h4v9h6l-8 9z"/></svg>
                        Download 4K
                     </button>
                   </div>
                </div>
              ) : isGenerating ? (
                <div className="text-center space-y-4">
                   <div className="w-16 h-16 border-4 border-indigo-600/20 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
                   <div className="animate-pulse">
                     <p className="text-white font-medium">Ray Cluster Active</p>
                     <p className="text-slate-500 text-xs">Allocating GPU VRAM... (Approx 15s)</p>
                   </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center text-slate-600 mx-auto mb-4">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  </div>
                  <p className="text-slate-500">Your masterpiece will appear here.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationPage;
