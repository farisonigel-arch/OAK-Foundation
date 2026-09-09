'use client';

import { UserPlus, QrCode, Calendar, Users, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isAdmin: boolean;
}

export function Navigation({ activeTab, setActiveTab, isAdmin }: NavigationProps) {
  const items = [
    { id: 'register', label: 'Register', icon: UserPlus, isPublic: true },
    { id: 'checkin', label: 'Check In', icon: QrCode, isPublic: false },
    { id: 'programme', label: 'Programme', icon: Calendar, isPublic: true },
    { id: 'partners', label: 'Partners', icon: Users, isPublic: true },
    { id: 'attendance', label: 'Attendance', icon: BarChart3, isPublic: false },
  ];
  const visibleItems = items.filter((item) => item.isPublic || isAdmin);

  return (
    <>
      <aside className="hidden md:flex flex-col justify-between w-[260px] h-screen fixed left-0 top-0 bg-white text-[#002B49] p-6 z-50">
        <div>
          <div className="px-3 mb-8">
            <h1 className="text-base font-bold tracking-wider text-[#002B49] uppercase">OAK FOUNDATION</h1>
            <p className="text-[11px] text-slate-500 tracking-wider mt-1 uppercase">PARTNER CONVENING 2026</p>
          </div>
          <nav className="flex flex-col gap-2">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button key={item.id} onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                    isActive ? 'bg-[#002B49] text-white font-semibold' : 'text-[#002B49] hover:bg-slate-100 hover:text-[#002B49]'
                  }`}>
                  <Icon size={18} /><span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="border-t border-slate-200 pt-4 px-3 text-xs text-slate-500">
          <p className="font-semibold text-[#002B49]">Harare, Zimbabwe</p>
          <p>9–11 November 2026</p>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#002B49] border-t border-[#002B49] p-2 flex justify-around items-center z-50">
        {visibleItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button key={item.id} onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 text-[11px] px-2 py-1 transition-colors ${
                isActive ? 'bg-white text-[#002B49] font-bold rounded-lg' : 'text-slate-300'
              }`}>
              <Icon size={20} /><span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
