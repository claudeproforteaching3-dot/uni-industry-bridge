'use client';

import React, { useState } from 'react';
import { IndustryAnnouncement } from '@/lib/types';
import { X, Briefcase, PlusCircle, CheckCircle2, Clock } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

interface NewAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (announcement: IndustryAnnouncement) => void;
}

export const NewAnnouncementModal: React.FC<NewAnnouncementModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const { role } = useAuth();
  const [formData, setFormData] = useState({
    companyName: '',
    industrySector: '',
    title: '',
    type: 'Full-Time Staff' as IndustryAnnouncement['type'],
    location: '',
    workMode: 'Hybrid' as IndustryAnnouncement['workMode'],
    stipendOrSalary: '',
    deadline: '',
    description: '',
    requirements: '',
    contactEmail: '',
    website: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPost: IndustryAnnouncement = {
      id: `ann-${Date.now()}`,
      companyName: formData.companyName,
      companyLogoText: formData.companyName.slice(0, 2).toUpperCase(),
      industrySector: formData.industrySector || 'Technology & Engineering',
      title: formData.title,
      type: formData.type,
      location: formData.location || 'Bangkok, Thailand',
      workMode: formData.workMode,
      stipendOrSalary: formData.stipendOrSalary || 'Competitive / Market Rate',
      deadline: formData.deadline || '2026-11-30',
      description: formData.description,
      requirements: formData.requirements
        .split('\n')
        .map((r) => r.trim())
        .filter(Boolean),
      contactEmail: formData.contactEmail,
      website: formData.website || 'https://example.com',
      postedDate: new Date().toISOString().split('T')[0],
      active: true,
      applicationCount: 0,
    };

    onSubmit(newPost);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      companyName: '',
      industrySector: '',
      title: '',
      type: 'Full-Time Staff',
      location: '',
      workMode: 'Hybrid',
      stipendOrSalary: '',
      deadline: '',
      description: '',
      requirements: '',
      contactEmail: '',
      website: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${role === 'industry' ? 'bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400' : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400'}`}>
              {role === 'industry' ? <Clock className="h-10 w-10" /> : <CheckCircle2 className="h-10 w-10" />}
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              {role === 'industry' ? 'Submitted for Approval' : 'Announcement Published'}
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
              {role === 'industry' 
                ? 'Your recruitment announcement has been submitted to the university administrator. It will appear on the student dashboard once approved.'
                : 'Your recruitment announcement is now live on the student dashboard.'}
            </p>
            <button
              onClick={handleResetAndClose}
              className="mt-6 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400">
                <Briefcase className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Post Industry Announcement
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Recruit fresh graduates, summer interns, or sponsor capstone projects
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Agoda, Linx Technologies"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Industry Sector *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.industrySector}
                    onChange={(e) => setFormData({ ...formData, industrySector: e.target.value })}
                    placeholder="e.g. FinTech, Cloud Computing, Robotics"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Position / Announcement Title *
                </label>
                <input
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Junior AI Solutions Engineer (2026 Graduates)"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Posting Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as IndustryAnnouncement['type'],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Full-Time Staff">Full-Time Staff (Graduates)</option>
                    <option value="Internship / Co-op">Internship / Co-op (16-wk)</option>
                    <option value="Sponsored Capstone">Sponsored Capstone</option>
                    <option value="Research Grant">Research Grant</option>
                    <option value="Tech Talk / Workshop">Tech Talk / Workshop</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Work Mode *
                  </label>
                  <select
                    value={formData.workMode}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        workMode: e.target.value as IndustryAnnouncement['workMode'],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Application Deadline *
                  </label>
                  <input
                    required
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Compensation / Salary / Stipend
                  </label>
                  <input
                    type="text"
                    value={formData.stipendOrSalary}
                    onChange={(e) => setFormData({ ...formData, stipendOrSalary: e.target.value })}
                    placeholder="e.g. ฿65,000 / mo or ฿18,000 / mo intern"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Office Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Silom, Bangkok or Rayong Industrial Park"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Job or Sponsorship Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Outline responsibilities, team mission, and impact..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Candidate Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  placeholder="Proficiency in Python, C++&#10;Familiarity with Docker & Kubernetes&#10;Good English communication"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact / Application Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="recruitment@company.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Corporate Careers Website URL
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    placeholder="https://company.com/careers"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="rounded-lg px-4 py-2 font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700 shadow-md"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span>Publish Announcement</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
