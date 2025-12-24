
import React, { useState } from 'react';
import { RayServerService } from '../services/rayServer';
import { User, TaskStatus } from '../types';

interface TrainingPageProps {
  user: User;
}

const TrainingPage: React.FC<TrainingPageProps> = ({ user }) => {
  const [name, setName] = useState('');
  const [datasetUrl, setDatasetUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [taskProgress, setTaskProgress] = useState<number>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const taskId = await RayServerService.submitTraining({ name, datasetUrl });
      setActiveTaskId(taskId);
      
      const interval = setInterval(() => {
        const task = RayServerService.getTaskStatus(taskId);
        if (task) {
          setTaskProgress(task.progress);
          if (task.status === TaskStatus.COMPLETED) {
            clearInterval(interval);
            setIsSubmitting(false);
          }
        }
      }, 1000);

    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Train Custom Wan LoRA</h1>
        <p className="text-slate-400">Fine-tune the model with your own aesthetic and consistency.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Model Name</label>
            <input 
              type="text" 
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g. My-VFX-Model-V1"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Dataset Source (ZIP/URL)</label>
            <input 
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://s3.amazonaws.com/dataset.zip"
              value={datasetUrl}
              onChange={(e) => setDatasetUrl(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Rank (Dim)</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white">
                <option>16</option>
                <option>32</option>
                <option selected>64</option>
                <option>128</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Alpha</label>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white">
                <option>16</option>
                <option selected>32</option>
                <option>64</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all ${isSubmitting ? 'bg-slate-700 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20'}`}
          >
            {isSubmitting ? 'Initializing GPU Cluster...' : 'Start LoRA Training'}
          </button>
          
          <p className="text-xs text-slate-500 text-center">Estimated training cost: 120 Credits</p>
        </form>

        <div className="glass-morphism border border-slate-800 rounded-2xl p-6 flex flex-col justify-center items-center text-center">
          {activeTaskId ? (
            <div className="w-full space-y-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-indigo-200 bg-indigo-600">
                      Ray Training Task
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-indigo-400">
                      {Math.round(taskProgress)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-800">
                  <div style={{ width: `${taskProgress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500 transition-all duration-500"></div>
                </div>
              </div>
              <h4 className="text-white font-bold">{taskProgress < 100 ? 'Training in Progress' : 'Model Ready!'}</h4>
              <p className="text-slate-400 text-sm">
                {taskProgress < 100 
                  ? 'Our Ray cluster is optimizing weights on H100 GPUs.' 
                  : 'Your model is now available for video generation.'}
              </p>
              {taskProgress === 100 && (
                <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Try Video Generation</button>
              )}
            </div>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-slate-500 mb-4">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h4 className="text-white font-bold mb-2">No Active Task</h4>
              <p className="text-slate-500 text-sm">Submit your configuration to start training on our GPU cluster.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrainingPage;
