'use client';

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Tag, ChevronRight } from 'lucide-react';

interface Session {
  id: string;
  title: string;
  time: string;
  day: 'day1' | 'day2' | 'day3';
  location: string;
  speaker: string;
  track: 'Plenary' | 'Workshop' | 'Networking' | 'Panel';
  description: string;
}

const SESSIONS: Session[] = [
  // Day 1
  {
    id: 's1',
    day: 'day1',
    title: 'Opening Plenary & Welcome Remarks',
    time: '09:00 - 10:30 AM',
    location: 'Main Hall A',
    speaker: 'OAK Executive Board',
    track: 'Plenary',
    description: 'Welcome address, setting event objectives, and introducing key partner themes.'
  },
  {
    id: 's2',
    day: 'day1',
    title: 'Collaborative Funding Strategies in Southern Africa',
    time: '11:00 - 12:30 PM',
    location: 'Conference Room 2',
    speaker: 'Maria Schmidt (Open Society)',
    track: 'Panel',
    description: 'An interactive discussion on cross-organizational co-funding models.'
  },
  {
    id: 's3',
    day: 'day1',
    title: 'Networking & Partner Introduction Lunch',
    time: '12:30 - 02:00 PM',
    location: 'Garden Pavilion',
    speaker: 'All Attendees',
    track: 'Networking',
    description: 'Informal lunch and facilitated speed-networking sessions.'
  },
  // Day 2
  {
    id: 's4',
    day: 'day2',
    title: 'Capacity Building & Tech Integration Workshop',
    time: '09:30 - 11:30 AM',
    location: 'Innovation Hub',
    speaker: 'Uncommon Team',
    track: 'Workshop',
    description: 'Hands-on digital tools training for participating partner NGOs.'
  },
  {
    id: 's5',
    day: 'day2',
    title: 'Climate Resilience & Community Action Panel',
    time: '02:00 - 03:30 PM',
    location: 'Main Hall B',
    speaker: 'Fatima Z. Benali (Global Green)',
    track: 'Panel',
    description: 'Evaluating local community impact metrics across regional initiatives.'
  },
  // Day 3
  {
    id: 's6',
    day: 'day3',
    title: 'Action Planning & Closing Ceremony',
    time: '10:00 - 12:00 PM',
    location: 'Main Hall A',
    speaker: 'Coordination Team',
    track: 'Plenary',
    description: 'Synthesizing takeaways, mapping out 2027 goals, and final remarks.'
  }
];

export const Programme: React.FC = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2' | 'day3'>('day1');
  const [selectedTrack, setSelectedTrack] = useState<string>('All');

  const filteredSessions = SESSIONS.filter((s) => {
    const matchesDay = s.day === activeDay;
    const matchesTrack = selectedTrack === 'All' || s.track === selectedTrack;
    return matchesDay && matchesTrack;
  });

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002B49] to-[#004A7C] text-white p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          <Calendar size={16} />
          <span>Event Agenda · Harare 2026</span>
        </div>
        <h1 className="text-2xl font-extrabold">Programme Schedule</h1>
        <p className="text-xs text-slate-200 opacity-90">
          Browse sessions, workshops, and networking events for the 3-day convening.
        </p>
      </div>

      {/* Day Selector Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-200/60 p-1.5 rounded-xl">
        <button
          onClick={() => setActiveDay('day1')}
          className={`py-3 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5 ${
            activeDay === 'day1' ? 'bg-white text-[#002B49] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>DAY 1</span>
          <span className="text-[10px] font-normal opacity-80">Mon, 9 Nov</span>
        </button>

        <button
          onClick={() => setActiveDay('day2')}
          className={`py-3 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5 ${
            activeDay === 'day2' ? 'bg-white text-[#002B49] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>DAY 2</span>
          <span className="text-[10px] font-normal opacity-80">Tue, 10 Nov</span>
        </button>

        <button
          onClick={() => setActiveDay('day3')}
          className={`py-3 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center gap-0.5 ${
            activeDay === 'day3' ? 'bg-white text-[#002B49] shadow-sm' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>DAY 3</span>
          <span className="text-[10px] font-normal opacity-80">Wed, 11 Nov</span>
        </button>
      </div>

      {/* Track Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {['All', 'Plenary', 'Workshop', 'Panel', 'Networking'].map((track) => (
          <button
            key={track}
            onClick={() => setSelectedTrack(track)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedTrack === track
                ? 'bg-[#002B49] text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            {track}
          </button>
        ))}
      </div>

      {/* Sessions List */}
      <div className="flex flex-col gap-4">
        {filteredSessions.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
            No sessions scheduled under this track for this day.
          </div>
        ) : (
          filteredSessions.map((session) => (
            <div
              key={session.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3 hover:border-[#004A7C] transition-all"
            >
              <div className="flex justify-between items-start gap-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-[#002B49]">
                  {session.track}
                </span>
                <div className="flex items-center gap-1 text-xs text-slate-500 font-mono">
                  <Clock size={14} />
                  <span>{session.time}</span>
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#002B49]">{session.title}</h3>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{session.description}</p>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-slate-400" />
                    <strong>{session.location}</strong>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User size={14} className="text-slate-400" />
                    <span>{session.speaker}</span>
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};