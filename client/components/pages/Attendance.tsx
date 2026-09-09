'use client';

import React, { useState } from 'react';
import { BarChart3, Users, CheckCircle2, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';

export const Attendance: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'checked-in' | 'pending'>('all');

  // Summary Metrics
  const totalRegistered = 110;
  const checkedInCount = 74;
  const pendingCount = totalRegistered - checkedInCount;
  const percentage = Math.round((checkedInCount / totalRegistered) * 100);

  // Recent Check-in Activity Feed
  const recentActivity = [
    { name: 'Maria Schmidt', org: 'Open Society Foundations', time: '09:34 AM', status: 'Checked In' },
    { name: 'James Odhiambo', org: 'OAK Foundation', time: '09:28 AM', status: 'Checked In' },
    { name: 'Awa Diallo', org: 'Uncommon', time: '09:15 AM', status: 'Checked In' },
    { name: 'Fatima Z. Benali', org: 'Global Green', time: '08:50 AM', status: 'Checked In' },
  ];

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002B49] to-[#004A7C] text-white p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          <BarChart3 size={16} />
          <span>Real-time Monitoring</span>
        </div>
        <h1 className="text-2xl font-extrabold">Attendance Analytics</h1>
        <p className="text-xs text-slate-200 opacity-90">
          Live statistics and partner check-in status for Convening 2026.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-extrabold tracking-widest uppercase">Total Registered</span>
            <Users size={18} className="text-[#002B49]" />
          </div>
          <span className="text-2xl font-extrabold text-[#002B49]">{totalRegistered}</span>
          <span className="text-[11px] text-slate-400">Confirmed partners</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-extrabold tracking-widest uppercase">Checked In</span>
            <CheckCircle2 size={18} className="text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600">{checkedInCount}</span>
            <span className="text-xs font-semibold text-emerald-600">({percentage}%)</span>
          </div>
          <span className="text-[11px] text-slate-400">Arrived at venue</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-1">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-[10px] font-extrabold tracking-widest uppercase">Pending</span>
            <Clock size={18} className="text-amber-500" />
          </div>
          <span className="text-2xl font-extrabold text-amber-500">{pendingCount}</span>
          <span className="text-[11px] text-slate-400">Awaiting check-in</span>
        </div>
      </div>

      {/* Attendance Progress Visualizer */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-extrabold text-[#002B49] tracking-wider uppercase">Capacity Fill Rate</span>
          <span className="font-bold text-slate-600">{checkedInCount} of {totalRegistered} Attendees</span>
        </div>
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Recent Activity Log */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-extrabold text-slate-500 tracking-widest uppercase">Recent Live Check-Ins</span>
          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live Sync
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {recentActivity.map((act, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs"
            >
              <div className="flex flex-col">
                <strong className="text-slate-800 text-sm">{act.name}</strong>
                <span className="text-slate-500">{act.org}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400">{act.time}</span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-700 font-bold text-[10px]">
                  {act.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};