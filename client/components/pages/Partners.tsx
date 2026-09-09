'use client';

import React, { useState } from 'react';
import { Search, Building2, MapPin, ExternalLink, Mail, Tag } from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  category: 'Funder' | 'Implementation' | 'Technical' | 'Strategic';
  country: string;
  contactEmail: string;
  focusArea: string;
  description: string;
}

const PARTNERS_DATA: Partner[] = [
  {
    id: 'p1',
    name: 'Open Society Foundations',
    category: 'Funder',
    country: 'International / Regional',
    contactEmail: 'contact@opensociety.org',
    focusArea: 'Civil Society & Governance',
    description: 'Supporting rights, justice, and independent civic action across Southern Africa.'
  },
  {
    id: 'p2',
    name: 'Uncommon',
    category: 'Technical',
    country: 'Zimbabwe',
    contactEmail: 'info@uncommon.org',
    focusArea: 'Tech Education & Digital Innovation',
    description: 'Empowering young leaders through technology education, workforce training, and digital hubs.'
  },
  {
    id: 'p3',
    name: 'Global Green Initiative',
    category: 'Implementation',
    country: 'Kenya & Zimbabwe',
    contactEmail: 'projects@globalgreen.org',
    focusArea: 'Climate Action & Sustainable Agriculture',
    description: 'Partnering with local communities to deploy sustainable farming techniques and renewable power.'
  },
  {
    id: 'p4',
    name: 'OAK Foundation',
    category: 'Strategic',
    country: 'Global',
    contactEmail: 'convening@oakfnd.org',
    focusArea: 'Child Rights, Housing, & Environment',
    description: 'Hosting and coordinating multi-sector partner grants to address deep-rooted social issues.'
  }
];

export const Partners: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredPartners = PARTNERS_DATA.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      partner.focusArea.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-[800px] mx-auto flex flex-col gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#002B49] to-[#004A7C] text-white p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-300 uppercase">
          <Building2 size={16} />
          <span>Partner Directory</span>
        </div>
        <h1 className="text-2xl font-extrabold">Participating Organisations</h1>
        <p className="text-xs text-[#E2E8F0] opacity-90">
          Connect with attending organizations, project leads, and partner institutions.
        </p>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search partners by name or focus area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm outline-none focus:border-[#004A7C]"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-3 rounded-xl border border-slate-200 bg-white text-sm outline-none text-slate-700 font-medium"
        >
          <option value="All">All Categories</option>
          <option value="Funder">Funder</option>
          <option value="Implementation">Implementation</option>
          <option value="Technical">Technical</option>
          <option value="Strategic">Strategic</option>
        </select>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPartners.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400 text-sm">
            No participating partners found matching your search.
          </div>
        ) : (
          filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 hover:border-[#004A7C] transition-all"
            >
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-base font-bold text-[#002B49]">{partner.name}</h3>
                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                    {partner.category}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Tag size={14} className="text-[#004A7C]" />
                  <span className="font-semibold">{partner.focusArea}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mt-1">{partner.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{partner.country}</span>
                </span>

                <a
                  href={`mailto:${partner.contactEmail}`}
                  className="flex items-center gap-1 text-[#004A7C] font-semibold hover:underline"
                >
                  <Mail size={14} />
                  <span>Contact</span>
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};