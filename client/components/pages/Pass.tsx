'use client';

import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, CheckCircle, RefreshCw } from 'lucide-react';
import type { Attendee } from './Register';

interface PassProps {
  attendee: Attendee;
  onReset: () => void;
}

function createRefreshNonce() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function Pass({ attendee, onReset }: PassProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [qrValue, setQrValue] = useState(attendee.qrCodeId);

  // A new nonce is generated whenever the pass component mounts.
  // This makes the QR itself different after a refresh, reopen, or navigation back to the pass.
  useEffect(() => {
    setQrValue(`${attendee.qrCodeId}::${createRefreshNonce()}`);
  }, [attendee.qrCodeId]);

  const downloadQr = () => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${attendee.qrCodeId}-pass.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-[600px] mx-auto flex flex-col gap-5">
      <div className="bg-gradient-to-br from-[#002B49] to-[#004A7C] text-white p-6 rounded-2xl flex items-center gap-4">
        <div className="bg-white/15 rounded-full p-2.5 flex items-center justify-center"><CheckCircle size={24} /></div>
        <div>
          <span className="text-[10px] font-extrabold tracking-widest opacity-80 block">REGISTRATION COMPLETE</span>
          <h2 className="text-xl font-bold my-0.5">You&apos;re Registered, {attendee.firstName.toLowerCase()}!</h2>
          <span className="text-xs opacity-70">OAK Foundation</span>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col items-center gap-4">
        <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">YOUR ENTRY PASS</span>
        <div ref={qrRef} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <QRCodeSVG value={qrValue} size={180} fgColor="#002B49" level="H" />
        </div>
        <span className="font-mono font-bold text-[#002B49] text-sm tracking-wider">{attendee.qrCodeId}</span>
        <p className="text-xs text-slate-500 text-center">This QR is refreshed with a new session signature whenever the pass is reopened or refreshed.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col gap-3">
        <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">REGISTRATION DETAILS</span>
        {[
          ['Name', `${attendee.firstName} ${attendee.lastName}`],
          ['Organisation', attendee.organization || 'OAK Foundation'],
          ['Role', attendee.role],
          ['Email', attendee.email],
          ['Event Dates', '9–11 November 2026'],
          ['Location', 'Harare, Zimbabwe']
        ].map(([label, value], i) => (
          <div key={label} className={`flex justify-between gap-4 py-2.5 text-sm ${i < 5 ? 'border-b border-slate-100' : ''}`}>
            <span className="text-slate-500">{label}</span>
            <strong className="text-[#002B49] text-right break-all">{value}</strong>
          </div>
        ))}
      </div>

      <button onClick={downloadQr} className="bg-[#002B49] hover:bg-[#004A7C] text-white py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-2.5 transition-colors">
        <Download size={18} /><span>Download QR Code</span>
      </button>
      <button onClick={onReset} className="bg-transparent text-slate-500 text-xs flex items-center justify-center gap-1.5 hover:text-slate-700">
        <RefreshCw size={14} /><span>Register another attendee</span>
      </button>
    </div>
  );
}
