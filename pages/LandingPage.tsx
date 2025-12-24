
import React from 'react';
import { Link } from 'react-router-dom';
import { User } from '../types';

interface LandingPageProps {
  user: User | null;
}

const LandingPage: React.FC<LandingPageProps> = ({ user }) => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 flex flex-col items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-900/10 blur-[120px] rounded-full -z-10"></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-8 animate-fade-in">
            Introducing Wan 2 Wan Training
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            The Infrastructure for <span className="gradient-text">Private Video AI</span>
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Train custom LoRAs, generate cinematic videos, and scale with our high-performance GPU API. Designed for elite video content creators.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/dashboard" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105">
                Go to Dashboard
              </Link>
            ) : (
              <Link to="/signin" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all hover:scale-105">
                Start Creating Now
              </Link>
            )}
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl border border-slate-700 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mt-20 max-w-5xl w-full px-4">
          <div className="glass-morphism rounded-2xl p-2 border border-slate-800 shadow-2xl">
             <img src="https://picsum.photos/seed/dashboard/1600/900" alt="Dashboard Preview" className="rounded-xl object-cover opacity-80" />
          </div>
        </div>
      </section>

      {/* Product Features */}
      <section id="product" className="py-24 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Powerful Video Toolset</h2>
            <p className="text-slate-400">Everything you need to master AI-driven cinematography.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>}
              title="LoRA Model Training"
              description="Train Wan models on your private datasets. Specialized for character consistency and specific art styles."
            />
            <FeatureCard 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>}
              title="High-Res Video Generation"
              description="Generate up to 4K resolution videos with temporal stability and complex physics simulations."
            />
            <FeatureCard 
              icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>}
              title="Enterprise Video API"
              description="Integrate our video infrastructure into your own apps with ultra-low latency and Ray cluster management."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transparent Pricing</h2>
            <p className="text-slate-400">Scale as your vision grows.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingTier 
              name="Starter"
              price="0"
              features={["5 free generations", "Community models", "Standard queue"]}
            />
            <PricingTier 
              name="Pro"
              price="49"
              isPopular={true}
              features={["Unlimited generations", "Custom LoRA training", "API Access", "Priority GPU queue"]}
            />
            <PricingTier 
              name="Studio"
              price="199"
              features={["Dedicated GPU instances", "White-label API", "Custom cluster scaling", "Support"]}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: any) => (
  <div className="p-8 rounded-2xl glass-morphism border border-slate-800 hover:border-indigo-500/50 transition-all group">
    <div className="w-12 h-12 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
  </div>
);

const PricingTier = ({ name, price, features, isPopular }: any) => (
  <div className={`p-8 rounded-2xl flex flex-col ${isPopular ? 'bg-indigo-600/10 border-2 border-indigo-600 relative' : 'glass-morphism border border-slate-800'}`}>
    {isPopular && <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold">MOST POPULAR</span>}
    <h3 className="text-lg font-bold text-white mb-2">{name}</h3>
    <div className="flex items-baseline mb-6">
      <span className="text-4xl font-bold text-white">${price}</span>
      <span className="text-slate-400 ml-2">/mo</span>
    </div>
    <ul className="space-y-4 mb-8 flex-grow">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-center text-sm text-slate-300">
          <svg className="w-4 h-4 text-indigo-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          {f}
        </li>
      ))}
    </ul>
    <Link to="/signin" className={`w-full py-3 rounded-xl font-bold text-center transition-colors ${isPopular ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}>
      Choose {name}
    </Link>
  </div>
);

export default LandingPage;
