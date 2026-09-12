'use client';

import React, { useState } from 'react';
import { initialAnnouncements } from '@/lib/mock-data';
import { IndustryAnnouncement } from '@/lib/types';
import { NewAnnouncementModal } from '@/components/NewAnnouncementModal';
import {
  Briefcase,
  PlusCircle,
  Search,
  Filter,
  Building2,
  Calendar,
  MapPin,
  ExternalLink,
  Users,
  CheckCircle2,
  DollarSign,
  Mail,
  Award,
} from 'lucide-react';

import { useAuth } from '@/lib/auth-context';

export default function IndustryDashboardPage() {
  const { role } = useAuth();
  const [announcements, setAnnouncements] = useState<IndustryAnnouncement[]>(initialAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [appliedAnnId, setAppliedAnnId] = useState<string | null>(null);

  const handleAddAnnouncement = (newPost: IndustryAnnouncement) => {
    // If industry posts, it goes to pending (active: false). Admins skip approval.
    const isActive = role === 'super_admin' || role === 'department';
    setAnnouncements((prev) => [{ ...newPost, active: isActive }, ...prev]);
  };

  const handleApprove = (id: string) => {
    setAnnouncements((prev) =>
      prev.map((ann) => (ann.id === id ? { ...ann, active: true } : ann))
    );
  };

  const filtered = announcements.filter((a) => {
    // Students only see approved (active) announcements
    if (role === 'student' && !a.active) return false;
    
    if (selectedType !== 'All' && a.type !== selectedType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCompany = a.companyName.toLowerCase().includes(q);
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchDesc = a.description.toLowerCase().includes(q);
      const matchSector = a.industrySector.toLowerCase().includes(q);
      return matchCompany || matchTitle || matchDesc || matchSector;
    }
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-950 to-slate-900 p-8 sm:p-10 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-200 border border-indigo-400/30 flex items-center gap-1.5 w-fit">
              <Briefcase className="h-4 w-4" />
              {role === 'student' ? 'Career & Job Opportunities' : 'Corporate Partnership & Talent Acquisition Hub'}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {role === 'student' ? 'Student Job Board & Internships' : 'Industry Announcement & Recruitment Dashboard'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {role === 'student' 
                ? 'Discover full-time graduate opportunities, 16-week cooperative education internships, and sponsored senior design capstones posted directly by our corporate partners.'
                : 'Post full-time graduate opportunities, 16-week cooperative education internships, and sponsored senior design capstones directly to verified engineering students and faculty.'}
            </p>
          </div>

          {role !== 'student' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-blue-500/30 hover:bg-blue-500 transition-all shrink-0"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post New Announcement</span>
            </button>
          )}
        </div>

        {/* Dashboard Quick Stats */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
          <div>
            <div className="text-xs text-indigo-300 font-medium">Active Announcements</div>
            <div className="text-2xl font-extrabold text-white">{announcements.length} Live</div>
            <div className="text-[10px] text-slate-400">Campus-wide visibility</div>
          </div>
          <div>
            <div className="text-xs text-indigo-300 font-medium">Student Applications</div>
            <div className="text-2xl font-extrabold text-white">
              {announcements.reduce((acc, cur) => acc + cur.applicationCount, 0)} Inquiries
            </div>
            <div className="text-[10px] text-slate-400">Direct candidate submissions</div>
          </div>
          <div>
            <div className="text-xs text-indigo-300 font-medium">Co-op Internship Length</div>
            <div className="text-2xl font-extrabold text-white">16 Weeks</div>
            <div className="text-[10px] text-slate-400">Semester-long industrial immersion</div>
          </div>
          <div>
            <div className="text-xs text-indigo-300 font-medium">Accreditation Quality</div>
            <div className="text-2xl font-extrabold text-white">100% ABET</div>
            <div className="text-[10px] text-slate-400">Washington Accord certified talent</div>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        {/* Search */}
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role title, skills, or sector..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Type Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0">Type:</span>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-56 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Types</option>
            <option value="Full-Time Staff">Full-Time Staff</option>
            <option value="Internship / Co-op">Internship / Co-op</option>
            <option value="Sponsored Capstone">Sponsored Capstone</option>
            <option value="Research Grant">Research Grant</option>
          </select>
        </div>
      </div>

      {/* ANNOUNCEMENT CARDS */}
      <div className="space-y-4">
        {filtered.map((ann) => (
          <div
            key={ann.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4 hover:border-blue-400 transition-colors"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold text-base text-white shadow-xs">
                  {ann.companyLogoText}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {ann.title}
                    </h3>
                    {ann.active ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Active
                      </span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                        Pending Approval
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {ann.companyName}
                    </span>
                    <span>•</span>
                    <span>{ann.industrySector}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
                  {ann.type}
                </span>
                <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {ann.workMode}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {ann.description}
            </p>

            {/* Requirements */}
            {ann.requirements.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Key Qualifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {ann.requirements.map((req, i) => (
                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Meta & Action */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                  <DollarSign className="h-3.5 w-3.5" />
                  <span>{ann.stipendOrSalary}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" />
                  <span>{ann.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Deadline: {ann.deadline}</span>
                </div>
                <div className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium">
                  <Users className="h-3.5 w-3.5" />
                  <span>{ann.applicationCount} Inquiries</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${ann.contactEmail}?subject=Application for ${ann.title}`}
                  className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{ann.contactEmail}</span>
                </a>

                {role === 'student' ? (
                  appliedAnnId === ann.id ? (
                    <span className="rounded-lg bg-emerald-100 px-3 py-1.5 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Application Sent!
                    </span>
                  ) : (
                    <button
                      onClick={() => setAppliedAnnId(ann.id)}
                      className="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-2xs"
                    >
                      Quick Apply
                    </button>
                  )
                ) : null}

                {!ann.active && (role === 'super_admin' || role === 'department') && (
                  <button
                    onClick={() => handleApprove(ann.id)}
                    className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-2xs flex items-center gap-1"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Approve Post
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* NEW ANNOUNCEMENT MODAL */}
      <NewAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddAnnouncement}
      />
    </div>
  );
}
