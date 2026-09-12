import React from 'react';
import Link from 'next/link';
import { ShieldCheck, GraduationCap, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-300 dark:border-slate-800">
      {/* Top QA Banner */}
      <div className="border-b border-slate-800 bg-slate-950 py-3">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>
              Certified Outcome-Based Education (OBE) • Washington Accord (ABET) • AUN-QA Tier 1
            </span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Next CQI Cycle: Dec 2026</span>
            <Link href="/public-trust" className="hover:text-white flex items-center gap-1 underline underline-offset-4">
              Public Transparency Report
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">RUPP University</h3>
                <p className="text-xs text-slate-400">University-Industry Outcomes & Public Trust Platform</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Bridging academic rigor with industrial innovation. Transparent curriculum structures, explicit PLO/CLO competencies, multi-year capstone showcases, and direct industry recruitment channels.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
                <Award className="h-3.5 w-3.5" /> ABET Accredited
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-blue-400 border border-blue-500/20">
                AUN-QA Certified
              </span>
              <span className="inline-flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-amber-400 border border-amber-500/20">
                ISO 21001:2018
              </span>
            </div>
          </div>

          {/* Academic Transparency */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Academic Structure</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/curriculum" className="hover:text-white transition-colors">
                  Degree Program Structure
                </Link>
              </li>
              <li>
                <Link href="/curriculum#plo-matrix" className="hover:text-white transition-colors">
                  Program Learning Outcomes (PLO)
                </Link>
              </li>
              <li>
                <Link href="/curriculum#clo-breakdown" className="hover:text-white transition-colors">
                  Course Learning Outcomes (CLO)
                </Link>
              </li>
              <li>
                <Link href="/curriculum#credits" className="hover:text-white transition-colors">
                  Credit & Workload Distribution
                </Link>
              </li>
              <li>
                <Link href="/public-trust" className="hover:text-white transition-colors">
                  Accreditation & Public Trust
                </Link>
              </li>
            </ul>
          </div>

          {/* Student Showcase */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Student Showcase</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/projects?year=2026" className="hover:text-white transition-colors">
                  2026 Senior Projects
                </Link>
              </li>
              <li>
                <Link href="/projects?year=2025" className="hover:text-white transition-colors">
                  2025 Capstone Archive
                </Link>
              </li>
              <li>
                <Link href="/projects?year=2024" className="hover:text-white transition-colors">
                  2024 Innovation Gallery
                </Link>
              </li>
              <li>
                <Link href="/students?tab=internship" className="hover:text-white transition-colors">
                  Internship-Ready Students
                </Link>
              </li>
              <li>
                <Link href="/students?tab=research" className="hover:text-white transition-colors">
                  Research Student Fellows
                </Link>
              </li>
            </ul>
          </div>

          {/* Industry Engagement */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">Industry Engagement</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/industry/dashboard" className="hover:text-white transition-colors">
                  Corporate Dashboard
                </Link>
              </li>
              <li>
                <Link href="/industry/dashboard?action=new" className="hover:text-white transition-colors">
                  Post Job / Internship
                </Link>
              </li>
              <li>
                <Link href="/industry/feedback" className="hover:text-white transition-colors">
                  Raise Concern / Stakeholder Voice
                </Link>
              </li>
              <li>
                <Link href="/public-trust#advisory-board" className="hover:text-white transition-colors">
                  Industry Advisory Board
                </Link>
              </li>
              <li>
                <Link href="/industry/dashboard#partners" className="hover:text-white transition-colors">
                  Co-op Partner Benefits
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Department of Computer Engineering & Artificial Intelligence. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Official Public Trust & Continuous Quality Improvement (CQI) Gateway
          </p>
        </div>
      </div>
    </footer>
  );
};
