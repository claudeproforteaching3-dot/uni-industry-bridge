'use client';

import React, { useState } from 'react';
import { StudentProject } from '@/lib/types';
import {
  X,
  FolderGit2,
  Calendar,
  ExternalLink,
  Code2,
  Video,
  Users,
  Building2,
  CheckCircle2,
  Send,
} from 'lucide-react';

interface ProjectModalProps {
  project: StudentProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    company: '',
    email: '',
    note: '',
  });

  if (!project) return null;

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white">
            Academic Year {project.academicYear}
          </span>
          <span className="rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
            Semester {project.semester}
          </span>
          <span className="rounded-md bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            {project.category}
          </span>
          <span
            className={`rounded-md px-2.5 py-0.5 text-xs font-semibold ${
              project.status === 'Completed'
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-3 text-xl font-bold text-slate-900 dark:text-white leading-snug">
          {project.title}
        </h3>

        {/* Industry Partner & Advisor */}
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 dark:text-slate-400 border-b border-slate-200 pb-3 dark:border-slate-800">
          {project.industryPartner && (
            <div className="flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400">
              <Building2 className="h-4 w-4" />
              <span>Industry Partner: {project.industryPartner}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-slate-400" />
            <span>Faculty Advisor: {project.advisor}</span>
          </div>
        </div>

        {/* Abstract */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Executive Summary & Abstract
          </h4>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {project.abstract}
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mt-4 rounded-xl bg-slate-50 p-3.5 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">Industry Problem Addressed</h4>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {project.problemStatement}
          </p>
        </div>

        {/* Solution Highlights */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Key Technical Innovations
          </h4>
          <ul className="space-y-1.5">
            {project.solutionHighlights.map((hl, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>{hl}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Technologies & Tools Utilized
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-mono font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
            Project Team Members
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.teamMembers.map((m, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-slate-200 p-2.5 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">{m.role}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Links & Inquiries */}
        <div className="mt-5 flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Code2 className="h-4 w-4" />
              <span>Source Repository</span>
              <ExternalLink className="h-3 w-3 text-slate-400" />
            </a>
          )}
          {project.demoVideoUrl && (
            <a
              href={project.demoVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300"
            >
              <Video className="h-4 w-4 text-rose-600" />
              <span>Watch Video Demo</span>
              <ExternalLink className="h-3 w-3 text-rose-400" />
            </a>
          )}
        </div>

        {/* Industry Connect Box */}
        <div className="mt-5 rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/50 dark:bg-blue-950/30">
          <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200">
            Interested in this project or hiring this team?
          </h4>
          <p className="mt-0.5 text-[11px] text-blue-700 dark:text-blue-300">
            Connect directly with the student authors and faculty advisor for commercialization, licensing, or internship recruitment.
          </p>

          {inquirySent ? (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Inquiry dispatched to project advisor and team!</span>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="mt-3 flex flex-col sm:flex-row gap-2">
              <input
                required
                type="text"
                placeholder="Your Company Name"
                value={inquiryForm.company}
                onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                className="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-blue-800 dark:text-white"
              />
              <input
                required
                type="email"
                placeholder="Contact Email"
                value={inquiryForm.email}
                onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                className="rounded-lg border border-blue-300 bg-white px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-slate-800 dark:border-blue-800 dark:text-white"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
