
import React from 'react';
import { User } from '../types';

interface BillingPageProps {
  user: User;
}

const BillingPage: React.FC<BillingPageProps> = ({ user }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white mb-2">Billing & Credits</h1>
        <p className="text-slate-400">Manage your subscription, credits and payment methods.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        <div className="p-6 glass-morphism rounded-2xl border border-slate-800 col-span-1">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Available Balance</p>
          <h3 className="text-4xl font-bold text-white mb-6">{user.credits} <span className="text-lg text-slate-500">Credits</span></h3>
          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold">Top Up Credits</button>
        </div>

        <div className="p-6 glass-morphism rounded-2xl border border-indigo-500/30 col-span-1">
          <p className="text-xs text-slate-500 uppercase font-bold mb-2">Active Plan</p>
          <h3 className="text-2xl font-bold text-white mb-1">{user.subscription}</h3>
          <p className="text-xs text-indigo-400 mb-6">Renews on Oct 24, 2024</p>
          <button className="w-full py-2 bg-slate-800 text-white border border-slate-700 rounded-lg text-sm font-bold">Change Plan</button>
        </div>

        <div className="p-6 glass-morphism rounded-2xl border border-slate-800 col-span-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold mb-4">Default Payment</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-6 bg-slate-700 rounded flex items-center justify-center text-[10px] text-white font-bold italic">VISA</div>
              <p className="text-sm text-white">•••• 4242</p>
            </div>
          </div>
          <button className="w-full py-2 text-slate-400 hover:text-white text-sm font-bold transition-colors">Edit on Stripe</button>
        </div>
      </div>

      <div className="glass-morphism rounded-2xl border border-slate-800 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800">
           <h3 className="text-white font-bold">Transaction History</h3>
        </div>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-900/50 text-slate-500">
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            <TransactionRow date="Sep 24, 2024" desc="Pro Plan Subscription" amount="$49.00" status="Paid" />
            <TransactionRow date="Sep 12, 2024" desc="Credit Top-up (5000)" amount="$50.00" status="Paid" />
            <TransactionRow date="Aug 24, 2024" desc="Pro Plan Subscription" amount="$49.00" status="Paid" />
            <TransactionRow date="Aug 01, 2024" desc="API Over-usage Fee" amount="$12.50" status="Paid" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TransactionRow = ({ date, desc, amount, status }: any) => (
  <tr className="hover:bg-slate-800/30 transition-colors">
    <td className="px-6 py-4 text-slate-300">{date}</td>
    <td className="px-6 py-4 text-white font-medium">{desc}</td>
    <td className="px-6 py-4 text-slate-300">{amount}</td>
    <td className="px-6 py-4">
      <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded">
        {status}
      </span>
    </td>
  </tr>
);

export default BillingPage;
