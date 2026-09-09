'use client';

import { useState } from 'react';

export interface Attendee {
  firstName: string;
  lastName: string;
  organization: string;
  subPartner: string;
  role: string;
  email: string;
  phone: string;
  dietary: string;
  accessibility: string;
  travel: string;
  consent: boolean;
  qrCodeId: string;
  registrationDate: string;
}

interface RegisterProps {
  onRegistrationSuccess: (data: Attendee) => void;
}

function createQrCodeId() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  const token = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  return `OAK-2026-${Date.now().toString(36).slice(-4).toUpperCase()}-${token}`;
}

export function Register({ onRegistrationSuccess }: RegisterProps) {
  const [formData, setFormData] = useState({
    firstName: 'Maria', lastName: 'Schmidt', organization: '', subPartner: '',
    role: 'Partner', email: '', phone: '', dietary: '', accessibility: '',
    travel: '', consent: false
  });

  const update = (field: string, value: string | boolean) =>
    setFormData((current) => ({ ...current, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consent) {
      alert('Please agree to the privacy policy to continue.');
      return;
    }
    onRegistrationSuccess({
      ...formData,
      qrCodeId: createQrCodeId(),
      registrationDate: new Date().toISOString()
    });
  };

  const inputClass = 'p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm text-slate-800 outline-none focus:border-[#004A7C]';

  return (
    <div className="max-w-[680px] mx-auto flex flex-col gap-5">
      <div className="bg-gradient-to-br from-[#002B49] to-[#004A7C] text-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-2xl font-bold">Partner Convening 2026</h1>
        <p className="text-sm opacity-80 mt-1.5">Harare · 9–11 Nov 2026</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          ['110+', 'Attendees'], ['24', 'Sessions'], ['38', 'Partners']
        ].map(([value, label]) => (
          <div key={label} className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col items-center">
            <span className="text-xl font-bold text-[#002B49]">{value}</span>
            <span className="text-xs text-slate-500 mt-0.5">{label}</span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 flex flex-col gap-5">
        <h2 className="text-lg font-bold text-[#002B49]">Registration Form</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(['firstName', 'lastName'] as const).map((field) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 tracking-wider">{field === 'firstName' ? 'FIRST NAME' : 'LAST NAME'} *</label>
              <input type="text" required className={inputClass} value={formData[field]}
                onChange={(e) => update(field, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 tracking-wider">ORGANISATION *</label>
          <input type="text" placeholder="Your organisation name" required className={inputClass}
            value={formData.organization} onChange={(e) => update('organization', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 tracking-wider">SUB-PARTNER / PROGRAMME AREA</label>
          <input type="text" placeholder="Optional" className={inputClass}
            value={formData.subPartner} onChange={(e) => update('subPartner', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 tracking-wider">ROLE / CAPACITY *</label>
          <select className={inputClass} value={formData.role} onChange={(e) => update('role', e.target.value)}>
            <option>Partner</option><option>OAK Staff</option><option>Coordination Team</option><option>Presenter</option><option>Observer</option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 tracking-wider">EMAIL ADDRESS *</label>
          <input type="email" placeholder="you@organisation.org" required className={inputClass}
            value={formData.email} onChange={(e) => update('email', e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-bold text-slate-500 tracking-wider">PHONE NUMBER</label>
          <input type="tel" placeholder="+263 xx xxx xxxx" className={inputClass}
            value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
        </div>

        <div className="bg-slate-100 p-5 rounded-xl flex flex-col gap-4">
          <span className="text-[10px] font-extrabold text-slate-500 tracking-widest">REQUIREMENTS</span>
          {[
            ['dietary', 'DIETARY REQUIREMENTS', 'e.g. Vegetarian, Halal, Gluten-free'],
            ['accessibility', 'ACCESSIBILITY REQUIREMENTS', 'e.g. Wheelchair access, hearing loop'],
            ['travel', 'TRAVEL & ACCOMMODATION', 'e.g. Flight from London, hotel needed']
          ].map(([field, label, placeholder]) => (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-500 tracking-wider">{label}</label>
              <input type="text" placeholder={placeholder} className="p-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 outline-none"
                value={formData[field as keyof typeof formData] as string} onChange={(e) => update(field, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="flex items-start gap-2.5 text-xs text-slate-600">
          <input type="checkbox" id="consent" className="mt-0.5" checked={formData.consent}
            onChange={(e) => update('consent', e.target.checked)} />
          <label htmlFor="consent">
            I agree to OAK Foundation&apos;s <a href="#" className="text-[#004A7C] underline">privacy policy</a> and consent to my registration data being used for event coordination.
          </label>
        </div>

        <button type="submit" className="bg-[#002B49] hover:bg-[#004A7C] text-white font-semibold py-3.5 rounded-lg text-sm transition-colors">
          Register
        </button>
      </form>
      <p className="text-center text-xs text-slate-400">Your data is secured and handled by OAK Foundation in accordance with GDPR.</p>
    </div>
  );
}
