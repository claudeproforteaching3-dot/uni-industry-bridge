'use client';

import React, { useState } from 'react';
import { IndustryConcernTicket } from '@/lib/types';
import { X, MessageSquareWarning, Send, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface ConcernModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (ticket: IndustryConcernTicket) => void;
}

export const ConcernModal: React.FC<ConcernModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    submitterName: '',
    submitterRole: '',
    submitterEmail: '',
    category: 'Curriculum Skill Gap' as IndustryConcernTicket['category'],
    priority: 'Medium' as IndustryConcernTicket['priority'],
    subject: '',
    description: '',
    suggestedAction: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketNumber, setTicketNumber] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNum = `TCK-2026-${Math.floor(100 + Math.random() * 900)}`;
    setTicketNumber(newNum);

    const newTicket: IndustryConcernTicket = {
      id: `tck-${Date.now()}`,
      ticketNumber: newNum,
      companyName: formData.companyName,
      submitterName: formData.submitterName,
      submitterRole: formData.submitterRole,
      submitterEmail: formData.submitterEmail,
      category: formData.category,
      priority: formData.priority,
      subject: formData.subject,
      description: formData.description,
      suggestedAction: formData.suggestedAction,
      status: 'Submitted',
      createdAt: new Date().toISOString().split('T')[0],
      assignedCommittee: 'Academic Senate & Curriculum Quality Committee',
      committeeResponse: 'Ticket received and queued for the next monthly curriculum CQI review cycle.',
    };

    onSubmit(newTicket);
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({
      companyName: '',
      submitterName: '',
      submitterRole: '',
      submitterEmail: '',
      category: 'Curriculum Skill Gap',
      priority: 'Medium',
      subject: '',
      description: '',
      suggestedAction: '',
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
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Concern Ticket Registered
            </h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Thank you for providing industry feedback. Your ticket tracking ID is:
            </p>
            <div className="mt-3 inline-block rounded-lg bg-slate-100 px-4 py-2 font-mono text-base font-bold text-blue-700 dark:bg-slate-800 dark:text-blue-300">
              {ticketNumber}
            </div>
            <p className="mt-4 text-xs text-slate-500 max-w-md mx-auto">
              Our Academic Senate & Curriculum Quality Assurance Committee will review this item in the upcoming CQI session. You will receive an update at {formData.submitterEmail}.
            </p>
            <div className="mt-6">
              <button
                onClick={handleResetAndClose}
                className="rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-md"
              >
                Back to Feedback Tracker
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400">
                <MessageSquareWarning className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Raise Industry Concern / Feedback
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Continuous Quality Improvement (CQI) Direct Stakeholder Pipeline
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Company / Organization *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="e.g. Agoda, SCG, Western Digital"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Submitter Full Name & Role *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.submitterName}
                    onChange={(e) => setFormData({ ...formData, submitterName: e.target.value })}
                    placeholder="e.g. Somchai Prasert (Tech Lead)"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Corporate Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.submitterEmail}
                    onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Feedback Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value as IndustryConcernTicket['category'],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="Curriculum Skill Gap">Curriculum Skill Gap</option>
                    <option value="Internship Preparedness">Internship Preparedness</option>
                    <option value="Joint R&D Collaboration">Joint R&D Collaboration</option>
                    <option value="Lab Equipment & Tech Stack">Lab Equipment & Tech Stack</option>
                    <option value="General Industry Suggestion">General Industry Suggestion</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Urgency / Priority *
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as IndustryConcernTicket['priority'],
                      })
                    }
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="High">High (Immediate curriculum/internship bottleneck)</option>
                    <option value="Medium">Medium (Strategic alignment for next academic year)</option>
                    <option value="Low">Low (General suggestion or elective topic idea)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Subject / Concern Summary *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Modernizing CI/CD pipelines in SWE course"
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Detailed Description of Concern or Observation *
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the skills gap observed during interviews, internships, or joint research..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Suggested Industry Action / Recommendation
                </label>
                <textarea
                  rows={2}
                  value={formData.suggestedAction}
                  onChange={(e) => setFormData({ ...formData, suggestedAction: e.target.value })}
                  placeholder="e.g. Recommend adding 2 weeks of hands-on Terraform/Kubernetes labs or guest lectures..."
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
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
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit to Curriculum Board</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
