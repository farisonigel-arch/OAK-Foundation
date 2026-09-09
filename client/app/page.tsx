'use client';

import { useEffect, useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Register } from '@/components/pages/Register';
import { Pass, type Attendee } from '@/components/pages/Pass';
import { CheckIn } from '@/components/pages/CheckIn';
import { Programme } from '@/components/pages/Programme';
import { Partners } from '@/components/pages/Partners';
import { Attendance } from '@/components/pages/Attendance';

type Tab = 'register' | 'pass' | 'checkin' | 'programme' | 'partners' | 'attendance';

const ATTENDEE_KEY = 'oak-foundation-attendee';
const TAB_KEY = 'oak-foundation-active-tab';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('checkin');
  const [isAdmin] = useState(true);
  const [registeredAttendee, setRegisteredAttendee] = useState<Attendee | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedAttendee = sessionStorage.getItem(ATTENDEE_KEY);
      const savedTab = sessionStorage.getItem(TAB_KEY) as Tab | null;
      if (savedAttendee) setRegisteredAttendee(JSON.parse(savedAttendee));
      if (savedTab) setActiveTab(savedTab);
    } catch {
      // Ignore unavailable/corrupt session storage and use defaults.
    } finally {
      setHydrated(true);
    }
  }, []);

  const navigate = (tab: string) => {
    const nextTab = tab as Tab;
    setActiveTab(nextTab);
    if (hydrated) sessionStorage.setItem(TAB_KEY, nextTab);
  };

  const handleRegistrationSuccess = (data: Attendee) => {
    setRegisteredAttendee(data);
    setActiveTab('pass');
    sessionStorage.setItem(ATTENDEE_KEY, JSON.stringify(data));
    sessionStorage.setItem(TAB_KEY, 'pass');
  };

  const handleResetRegistration = () => {
    setRegisteredAttendee(null);
    setActiveTab('register');
    sessionStorage.removeItem(ATTENDEE_KEY);
    sessionStorage.setItem(TAB_KEY, 'register');
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-slate-50" aria-hidden="true" />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navigation activeTab={activeTab} setActiveTab={navigate} isAdmin={isAdmin} />
      <main className="md:pl-[260px] pt-6 pb-20 md:pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all">
        {activeTab === 'register' && <Register onRegistrationSuccess={handleRegistrationSuccess} />}
        {activeTab === 'pass' && registeredAttendee && (
          <Pass attendee={registeredAttendee} onReset={handleResetRegistration} />
        )}
        {activeTab === 'pass' && !registeredAttendee && <Register onRegistrationSuccess={handleRegistrationSuccess} />}
        {activeTab === 'checkin' && <CheckIn />}
        {activeTab === 'programme' && <Programme />}
        {activeTab === 'partners' && <Partners />}
        {activeTab === 'attendance' && <Attendance />}
      </main>
    </div>
  );
}
