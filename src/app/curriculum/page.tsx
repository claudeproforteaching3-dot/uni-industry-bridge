'use client';

import React, { useState } from 'react';
import {
  programs,
} from '@/lib/mock-data';
import { Course, PLO, ProgramStructure } from '@/lib/types';
import { CourseModal } from '@/components/CourseModal';
import {
  BookOpen,
  Layers,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Filter,
  Info,
  ShieldCheck,
} from 'lucide-react';

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState<'structure' | 'plos' | 'matrix' | 'credits'>('structure');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'All'>('All');
  const [selectedProgramId, setSelectedProgramId] = useState<string>(programs[0].id);

  const program = programs.find((p) => p.id === selectedProgramId) || programs[0];

  // Filtered courses
  const filteredCourses = program.courses.filter((course) => {
    if (selectedCategoryFilter !== 'All' && course.category !== selectedCategoryFilter) return false;
    if (selectedYearFilter !== 'All' && course.year !== selectedYearFilter) return false;
    return true;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* HEADER SECTION */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-lg">
        
        {/* Program Selector */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center gap-3">
          <label className="text-sm font-semibold text-blue-200">Select Program:</label>
          <select
            value={selectedProgramId}
            onChange={(e) => setSelectedProgramId(e.target.value)}
            className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm text-white focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 [&>option]:text-slate-900"
          >
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.department} - {p.major}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30">
            {program.department} • {program.faculty}
          </span>
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-300 border border-emerald-400/30">
            Outcome-Based Education (OBE)
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          {program.name}
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {program.overview}
        </p>

        {/* Quick Stats Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 pt-6">
          <div>
            <div className="text-xs text-blue-300 font-medium">Total Credits Required</div>
            <div className="text-2xl font-extrabold text-white">{program.totalCredits} Credits</div>
            <div className="text-[10px] text-slate-400">138 Standard Semester Units</div>
          </div>
          <div>
            <div className="text-xs text-blue-300 font-medium">Program Duration</div>
            <div className="text-2xl font-extrabold text-white">{program.durationYears} Years</div>
            <div className="text-[10px] text-slate-400">8 Semesters Full-time</div>
          </div>
          <div>
            <div className="text-xs text-blue-300 font-medium">Industrial Co-op Track</div>
            <div className="text-2xl font-extrabold text-white">16 Weeks</div>
            <div className="text-[10px] text-slate-400">Mandatory Full-Time Placement</div>
          </div>
          <div>
            <div className="text-xs text-blue-300 font-medium">Accreditation Tier</div>
            <div className="text-2xl font-extrabold text-white">ABET & AUN-QA</div>
            <div className="text-[10px] text-slate-400">Washington Accord Mutual Recognition</div>
          </div>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTab === 'structure'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>Program Structure & Courses</span>
        </button>
        <button
          onClick={() => setActiveTab('plos')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTab === 'plos'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Award className="h-4 w-4" />
          <span>Program Learning Outcomes (PLO)</span>
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTab === 'matrix'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>PLO ⇄ CLO Alignment Matrix</span>
        </button>
        <button
          onClick={() => setActiveTab('credits')}
          className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs sm:text-sm font-bold transition-colors ${
            activeTab === 'credits'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="h-4 w-4" />
          <span>Credit & Workload System</span>
        </button>
      </div>

      {/* TAB 1: PROGRAM STRUCTURE & COURSES */}
      {activeTab === 'structure' && (
        <div className="space-y-6">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center gap-1">
                <Filter className="h-3.5 w-3.5" /> Filter by Year:
              </span>
              {(['All', 1, 2, 3, 4] as const).map((y) => (
                <button
                  key={y}
                  onClick={() => setSelectedYearFilter(y)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                    selectedYearFilter === y
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
                  }`}
                >
                  {y === 'All' ? 'All 4 Years' : `Year ${y}`}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Category:</span>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="All">All Categories</option>
                <option value="Core Engineering">Core Engineering</option>
                <option value="Major Elective">Major Elective</option>
                <option value="Capstone & Co-op">Capstone & Co-op</option>
              </select>
            </div>
          </div>

          {/* Course List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCourses.map((course) => (
              <div
                key={course.code}
                onClick={() => setSelectedCourse(course)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {course.code}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Year {course.year} • Sem {course.semester}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="font-semibold text-blue-600 dark:text-blue-400">
                      {course.credits} Credits ({course.creditFormat})
                    </span>
                    <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {course.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>View CLOs & PLO Mapping ({course.clos.length} CLOs)</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: PROGRAM LEARNING OUTCOMES (PLO) */}
      {activeTab === 'plos' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/40 dark:bg-blue-950/20 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Outcome-Based Education Guarantee:</span> Program Learning Outcomes represent the comprehensive knowledge, technical competencies, and professional values that every graduate achieves prior to graduation. These are continuously audited through annual industry surveys and external advisory boards.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {program.plos.map((plo: PLO) => (
              <div
                key={plo.code}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-bold text-white">
                      {plo.code}
                    </span>
                    <h3 className="mt-2 text-base font-bold text-slate-900 dark:text-white">
                      {plo.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {plo.category}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {plo.description}
                </p>

                {/* Performance Indicators */}
                <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    Measurable Performance Indicators
                  </div>
                  {plo.performanceIndicators.map((pi, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pi}</span>
                    </div>
                  ))}
                </div>

                {plo.abetCriteriaMapping && (
                  <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60 text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-700 dark:text-slate-200">ABET Alignment: </span>
                    {plo.abetCriteriaMapping}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLO ⇄ CLO ALIGNMENT MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Curriculum Competency Mapping Matrix
                </h3>
                <p className="text-xs text-slate-500">
                  Shows how specific courses advance students toward Program Learning Outcomes.
                </p>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500"></span>
                  <span>I: Introductory</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                  <span>R: Reinforcing</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
                  <span>M: Mastery</span>
                </span>
              </div>
            </div>

            {/* Matrix Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                    <th className="py-3 px-3 font-bold text-slate-900 dark:text-white">Course Code & Title</th>
                    <th className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Credits</th>
                    <th className="py-3 px-2 font-bold text-slate-700 dark:text-slate-300">Sem</th>
                    {program.plos.map((p) => (
                      <th key={p.code} className="py-3 px-2 text-center font-bold text-blue-600 dark:text-blue-400">
                        {p.code}
                      </th>
                    ))}
                    <th className="py-3 px-3 text-right font-bold text-slate-700 dark:text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {program.courses.map((course) => (
                    <tr
                      key={course.code}
                      className="hover:bg-blue-50/40 dark:hover:bg-blue-950/20 transition-colors"
                    >
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900 dark:text-white">{course.code}</div>
                        <div className="text-slate-500 text-[11px]">{course.title}</div>
                      </td>
                      <td className="py-3 px-2 font-mono">{course.credits}</td>
                      <td className="py-3 px-2">Y{course.year}S{course.semester}</td>

                      {program.plos.map((plo) => {
                        const match = course.mappedPlos.find((mp) => mp.ploCode === plo.code);
                        return (
                          <td key={plo.code} className="py-3 px-2 text-center">
                            {match ? (
                              <span
                                className={`inline-block rounded px-2 py-0.5 text-[10px] font-bold ${
                                  match.level === 'Mastery'
                                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                    : match.level === 'Reinforcing'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                                    : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                }`}
                              >
                                {match.level[0]}
                              </span>
                            ) : (
                              <span className="text-slate-300 dark:text-slate-700">-</span>
                            )}
                          </td>
                        );
                      })}

                      <td className="py-3 px-3 text-right">
                        <button
                          onClick={() => setSelectedCourse(course)}
                          className="font-semibold text-blue-600 hover:underline text-xs"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: CREDIT & WORKLOAD ALLOCATION */}
      {activeTab === 'credits' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Breakdown Chart/Cards */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  138-Credit Distribution Structure
                </h3>
                <p className="text-xs text-slate-500">
                  Compliant with Ministry of Higher Education & Washington Accord Degree Standards.
                </p>
              </div>

              {/* Progress bar visual */}
              <div className="h-4 w-full flex rounded-full overflow-hidden">
                {program.creditBreakdown.map((item, idx) => {
                  const pct = Math.round((item.credits / program.totalCredits) * 100);
                  return (
                    <div
                      key={idx}
                      className={`${item.color}`}
                      style={{ width: `${pct}%` }}
                      title={`${item.category}: ${item.credits} credits (${pct}%)`}
                    />
                  );
                })}
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {program.creditBreakdown.map((item, idx) => {
                  const pct = Math.round((item.credits / program.totalCredits) * 100);
                  return (
                    <div
                      key={idx}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`h-3 w-3 rounded-full ${item.color}`} />
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                          {item.category}
                        </h4>
                      </div>
                      <div className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white">
                        {item.credits}{' '}
                        <span className="text-xs font-normal text-slate-500">credits ({pct}%)</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Credit Format Definition Guide */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Credit Format Standard
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Courses denote workload as <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-bold">Credits (Lecture-Lab-SelfStudy)</code>.
              </p>

              <div className="space-y-3 pt-2">
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">1 Lecture Credit</div>
                  <div className="text-[11px] text-slate-500">1 hour/week lecture + 2 hours self-study</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">1 Laboratory Credit</div>
                  <div className="text-[11px] text-slate-500">2-3 hours/week hands-on lab + 1 hour prep</div>
                </div>
                <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">Co-op Internship (6 cr)</div>
                  <div className="text-[11px] text-slate-500">40 hours/week on-site full-time for 16 weeks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Course Detail Modal */}
      <CourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
}
