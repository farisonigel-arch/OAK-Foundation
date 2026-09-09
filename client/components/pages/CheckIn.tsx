'use client';

import React, { useState } from 'react';
import { QrCode, CheckCircle2, AlertTriangle, RefreshCw, PhoneCall } from 'lucide-react';

const MOCK_PARTNERS = [
  { id: 'OAK-2026-7042-XKPH', name: 'Maria Schmidt', org: 'Open Society Foundations', role: 'Partner', badgeColor: '#3B82F6' },
  { id: 'OAK-2026-1102-JMQA', name: 'James Odhiambo', org: 'OAK Foundation', role: 'OAK Staff', badgeColor: '#10B981' },
  { id: 'OAK-2026-3318-ADGE', name: 'Awa Diallo', org: 'Uncommon', role: 'Coordination Team', badgeColor: '#F59E0B' },
  { id: 'OAK-2026-5502-FXBN', name: 'Fatima Z. Benali', org: 'Global Green', role: 'Partner', badgeColor: '#3B82F6' }
];

export const CheckIn: React.FC = () => {
  const [scanState, setScanState] = useState<'scanning' | 'success' | 'error'>('scanning');
  const [activeAttendee, setActiveAttendee] = useState<any>(null);
  const [manualCode, setManualCode] = useState('');

  const handleSimulateScan = (attendee: typeof MOCK_PARTNERS[0]) => {
    setActiveAttendee(attendee);
    setScanState('success');
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const scannedValue = manualCode.trim().split('::')[0];
    const match = MOCK_PARTNERS.find((p) => p.id.toLowerCase() === scannedValue.toLowerCase());
    if (match) {
      setActiveAttendee(match);
      setScanState('success');
    } else {
      setScanState('error');
    }
  };

  const resetScanner = () => {
    setScanState('scanning');
    setActiveAttendee(null);
    setManualCode('');
  };

  return (
    <div className="max-w-[640px] mx-auto flex flex-col gap-5">
      {/* SCANNING STATE */}
      {scanState === 'scanning' && (
        <>
          <div>
            <h1 className="text-2xl font-extrabold text-[#002B49]">Event Check-In</h1>
            <p className="text-sm text-slate-500 mt-1">Scan an attendee QR code to check them in</p>
          </div>

          {/* Camera Box */}
          <div className="bg-[#0B192C] rounded-2xl h-[380px] flex flex-col justify-between items-center p-8 pb-4 relative">
            <div className="w-[200px] h-[200px] relative flex items-center justify-center mt-10">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/60 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/60 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/60 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/60 rounded-br-lg" />
              <span className="text-slate-400 text-xs text-center">Position QR code within the frame</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 text-xs">
              <QrCode size={16} />
              <span>Hold camera steady · Auto-scans in 1–2 seconds</span>
            </div>
          </div>

          {/* Simulate List */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">SIMULATE QR SCAN</span>
            <div className="flex flex-col gap-2">
              {MOCK_PARTNERS.map((partner) => (
                <button
                  key={partner.id}
                  onClick={() => handleSimulateScan(partner)}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-slate-100 hover:border-[#004A7C] transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#002B49] text-white font-bold text-xs flex items-center justify-center">
                    {partner.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="flex-1 ml-3 flex flex-col">
                    <strong className="text-xs text-slate-800">{partner.name}</strong>
                    <span className="text-[10px] text-slate-400 font-mono">{partner.id}</span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                    ● {partner.role}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Form */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">MANUAL CODE ENTRY</span>
            <form onSubmit={handleManualSubmit} className="flex gap-2.5">
              <input
                type="text"
                placeholder="OAK-2026-XXXX-XXXX"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="flex-1 p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm outline-none"
              />
              <button type="submit" className="bg-[#002B49] text-white px-6 rounded-lg font-semibold text-sm">
                Check
              </button>
            </form>
          </div>
        </>
      )}

      {/* SUCCESS STATE */}
      {scanState === 'success' && activeAttendee && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#10B981] text-white p-5 rounded-2xl flex items-center gap-4">
            <CheckCircle2 size={28} />
            <div>
              <h2 className="text-lg font-bold">Checked In Successfully</h2>
              <span className="text-xs opacity-90">09:34 · 9 March 2026</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#002B49] text-white font-bold text-base flex items-center justify-center">
                {activeAttendee.name.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-base font-bold text-[#002B49]">{activeAttendee.name}</h3>
                <p className="text-xs text-slate-500 mb-1">{activeAttendee.org}</p>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">● {activeAttendee.role}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">NEXT SESSION</span>
                <strong className="text-sm">Opening Plenary</strong>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg flex flex-col gap-1">
                <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">VENUE</span>
                <strong className="text-sm">Main Hall A</strong>
              </div>
            </div>
          </div>

          <button onClick={resetScanner} className="bg-[#002B49] text-white p-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5">
            <QrCode size={18} />
            <span>Scan Next Attendee</span>
          </button>
        </div>
      )}

      {/* ERROR STATE */}
      {scanState === 'error' && (
        <div className="flex flex-col gap-4">
          <div className="bg-[#EF4444] text-white p-5 rounded-2xl flex items-center gap-4">
            <AlertTriangle size={28} />
            <div>
              <h2 className="text-lg font-bold">QR Not Recognised</h2>
              <span className="text-xs opacity-90">Code is Invalid or unregistered</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col gap-3">
            <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">Possible reasons</span>
            <ul className="text-xs text-slate-500 flex flex-col gap-2">
              <li>● QR code belongs to a different event</li>
              <li>● Registration was not completed</li>
              <li>● Code has been altered or corrupted</li>
              <li>● Attendee registered under a different email</li>
            </ul>
          </div>

          <button onClick={resetScanner} className="bg-[#002B49] text-white p-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5">
            <RefreshCw size={18} />
            <span>Try Again</span>
          </button>

          <button onClick={() => alert('Connecting...')} className="bg-white border border-slate-200 text-[#002B49] p-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5">
            <PhoneCall size={18} />
            <span>Contact Coordination Team</span>
          </button>
        </div>
      )}
    </div>
  );
};