'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Award,
  TrendingUp,
  ThumbsUp,
  Users,
  CheckCircle2,
  ExternalLink,
  Building2,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import {
  publicTrustMetrics,
  accreditationCerts,
  advisoryBoardMembers,
} from '@/lib/mock-data';

export default function PublicTrustPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* HERO BANNER */}
      <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 p-8 sm:p-10 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4" />
            Verified Quality Assurance Framework
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Public Trust, Accreditation & Graduate Outcomes
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Higher education built on transparent quality metrics, global Washington Accord accreditation standards, verifiable graduate employability statistics, and active corporate advisory board oversight.
        </p>
      </div>

      {/* CORE STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {publicTrustMetrics.map((metric, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  {metric.badge}
                </span>
                <span className="text-emerald-600 font-bold dark:text-emerald-400">
                  {metric.change}
                </span>
              </div>
              <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                {metric.value}
              </div>
              <h3 className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-2">
                {metric.title}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 leading-snug">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      {/* ACCREDITATION BODIES & STANDARDS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BadgeCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Official Accreditations & International Recognition
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {accreditationCerts.map((cert, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                    {cert.body}
                  </span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {cert.fullName}
                </h3>
                <div className="text-xs font-medium text-slate-500 mt-1">
                  Level: {cert.level}
                </div>

                <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Valid through: {cert.validUntil}</span>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Verify</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GRADUATE EMPLOYABILITY BREAKDOWN */}
      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-2xl mb-6">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Graduate Destination & Employment Sector Distribution
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Data surveyed from the Class of 2024 and Class of 2025 across 280+ engineering alumni.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 font-semibold">Tech & Distributed Systems</div>
            <div className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">48%</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Cloud architects, backend engineers, DevOps specialists.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 font-semibold">FinTech & Commercial Banking</div>
            <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">26%</div>
            <p className="text-[11px] text-slate-400 mt-1">
              AI trading risk engines, security architects, full-stack banking.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 font-semibold">Robotics & Industrial IoT</div>
            <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">14%</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Autonomous mobile robots, factory automation, sensor meshes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
            <div className="text-xs text-slate-500 font-semibold">Postgraduate R&D & Startups</div>
            <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">12%</div>
            <p className="text-[11px] text-slate-400 mt-1">
              Doctoral fellowships, venture-backed spinouts, research institutes.
            </p>
          </div>
        </div>
      </div>

      {/* INDUSTRY ADVISORY BOARD */}
      <div id="advisory-board" className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Industry Advisory Board & Curriculum Oversight
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Executive technology leaders from global enterprises who audit our Program Learning Outcomes and approve syllabus revisions annually.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {advisoryBoardMembers.map((member, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center flex flex-col items-center"
            >
              <img
                src={member.avatarUrl}
                alt={member.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-blue-500/20 shadow-sm"
              />
              <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                {member.name}
              </h3>
              <div className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                {member.title}
              </div>
              <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-0.5">
                {member.company}
              </div>

              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 text-left w-full space-y-1">
                <div><span className="font-semibold text-slate-700 dark:text-slate-300">Sector:</span> {member.industrySector}</div>
                <div><span className="font-semibold text-slate-700 dark:text-slate-300">Focus:</span> {member.focusArea}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA TO RAISE CONCERN OR JOIN BOARD */}
      <div className="rounded-3xl bg-blue-50 border border-blue-200 p-6 sm:p-8 dark:bg-blue-950/30 dark:border-blue-900/50 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-base font-bold text-blue-900 dark:text-blue-100">
            Join Our Next Industry Curriculum Roundtable
          </h3>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 max-w-xl">
            We invite technology directors and hiring managers to review student capstones and provide input on future elective courses.
          </p>
        </div>
        <Link
          href="/industry/feedback"
          className="rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-700 shrink-0 shadow-md"
        >
          Submit Feedback / Join Advisory
        </Link>
      </div>
    </div>
  );
}
