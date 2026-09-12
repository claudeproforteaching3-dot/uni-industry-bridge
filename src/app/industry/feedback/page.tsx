'use client';

import React, { useState } from 'react';
import { initialConcernTickets } from '@/lib/mock-data';
import { IndustryConcernTicket, TicketStatus } from '@/lib/types';
import { ConcernModal } from '@/components/ConcernModal';
import {
  MessageSquareWarning,
  PlusCircle,
  ShieldCheck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Filter,
  Search,
  ArrowRight,
} from 'lucide-react';

import { useAuth } from '@/lib/auth-context';

export default function IndustryFeedbackPage() {
  const { role } = useAuth();
  const [tickets, setTickets] = useState<IndustryConcernTicket[]>(initialConcernTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTicket = (newTicket: IndustryConcernTicket) => {
    setTickets((prev) => [newTicket, ...prev]);
  };

  const filteredTickets = tickets.filter((t) => {
    // Only super_admin can see the submitted concerns list
    if (role !== 'super_admin') return false;

    if (selectedStatus !== 'All' && t.status !== selectedStatus) return false;
    if (selectedCategory !== 'All' && t.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchCompany = t.companyName.toLowerCase().includes(q);
      const matchSubject = t.subject.toLowerCase().includes(q);
      const matchDesc = t.description.toLowerCase().includes(q);
      const matchTicket = t.ticketNumber.toLowerCase().includes(q);
      return matchCompany || matchSubject || matchDesc || matchTicket;
    }
    return true;
  });

  const getStatusBadge = (status: TicketStatus) => {
    switch (status) {
      case 'Submitted':
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
      case 'Under Review':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300';
      case 'Committee Review':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300';
      case 'Action Plan Drafted':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300';
      case 'Resolved':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* HEADER BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 p-8 sm:p-10 text-white shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-2xl space-y-3">
            <span className="rounded-full bg-rose-500/20 px-3 py-1 text-xs font-semibold text-rose-300 border border-rose-400/30 flex items-center gap-1.5 w-fit">
              <MessageSquareWarning className="h-4 w-4" />
              Continuous Quality Improvement (CQI) Pipeline
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Industry Feedback & Concern Governance
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Your direct voice into our curriculum and student preparation. Report industry skill gaps, recommend emerging technologies, or request internship framework adaptations. All submissions are transparently tracked through Academic Senate review.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-2xl bg-rose-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-xl shadow-rose-600/30 hover:bg-rose-500 transition-all shrink-0"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Raise New Concern / Feedback</span>
          </button>
        </div>

        {/* CQI Workflow Step Strip */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/10 pt-6 text-xs">
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-xs">
            <div className="text-rose-300 font-bold">1. Submit Concern</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Formal ticket generation</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-xs">
            <div className="text-amber-300 font-bold">2. Committee Review</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Assigned to Dept Curriculum Board</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-xs">
            <div className="text-purple-300 font-bold">3. Action Plan Drafted</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Syllabus revision or lab upgrade</div>
          </div>
          <div className="rounded-xl bg-white/5 p-3 backdrop-blur-xs">
            <div className="text-emerald-300 font-bold">4. Resolved & Verified</div>
            <div className="text-slate-400 text-[11px] mt-0.5">Implemented in next academic year</div>
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
            placeholder="Search by ticket ID, company, keyword..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 shrink-0">Status:</span>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-44 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            <option value="All">All Statuses</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Committee Review">Committee Review</option>
            <option value="Action Plan Drafted">Action Plan Drafted</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* TICKETS LIST */}
      {filteredTickets.length > 0 ? (
        <div id="tracker" className="space-y-4">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              {/* Ticket Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {ticket.ticketNumber}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${getStatusBadge(
                      ticket.status
                    )}`}
                  >
                    {ticket.status}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      ticket.priority === 'High'
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                        : ticket.priority === 'Medium'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {ticket.priority} Priority
                </span>
                <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {ticket.category}
                </span>
              </div>

              <div className="text-xs text-slate-400">
                Submitted: {ticket.createdAt}
              </div>
            </div>

            {/* Subject */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {ticket.subject}
              </h3>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                <Building2 className="h-3.5 w-3.5 text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  {ticket.companyName}
                </span>
                <span>•</span>
                <span>{ticket.submitterName} ({ticket.submitterRole})</span>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-slate-900 dark:text-white block mb-1">
                Observed Issue / Gap:
              </span>
              {ticket.description}
            </div>

            {/* Suggested Action */}
            {ticket.suggestedAction && (
              <div className="text-xs text-slate-600 dark:text-slate-300">
                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  Industry Recommendation:{' '}
                </span>
                {ticket.suggestedAction}
              </div>
            )}

            {/* Committee Response */}
            {ticket.committeeResponse && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5 dark:border-emerald-900/60 dark:bg-emerald-950/30 text-xs space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900 dark:text-emerald-200">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Committee Action & Resolution ({ticket.assignedCommittee})</span>
                </div>
                <p className="text-emerald-800 dark:text-emerald-300 leading-relaxed pl-5">
                  {ticket.committeeResponse}
                </p>
              </div>
            )}
          </div>
        ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
            {role === 'super_admin' ? 'No tickets found' : 'Confidential CQI Pipeline'}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
            {role === 'super_admin' 
              ? 'Try adjusting your filters or search query.' 
              : 'Submit a curriculum concern or feedback to notify the university administration. For privacy, submitted tickets are only visible to the Super Admin team.'}
          </p>
        </div>
      )}

      {/* CONCERN SUBMISSION MODAL */}
      <ConcernModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />
    </div>
  );
}
