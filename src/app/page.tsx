'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  FolderGit2,
  Users,
  Briefcase,
  MessageSquareWarning,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Award,
  ChevronRight,
  Star,
  Building2,
  ExternalLink,
} from 'lucide-react';
import {
  computerEngineeringProgram,
  publicTrustMetrics,
  studentProjects,
  studentProfiles,
  initialAnnouncements,
} from '@/lib/mock-data';
import { ProjectModal } from '@/components/ProjectModal';
import { StudentProject } from '@/lib/types';

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);

  const featuredProjects = studentProjects.filter((p) => p.featured);
  const featuredStudents = studentProfiles.slice(0, 3);
  const activeAnnouncements = initialAnnouncements.slice(0, 3);

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-900 via-indigo-950 to-slate-950 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Background glow elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-blue-500/20 to-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-3.5 py-1 text-xs font-semibold text-blue-200 backdrop-blur-md">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>ABET & AUN-QA Outcome-Based Education Framework</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Bridging Higher Education, <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-blue-300 via-indigo-200 to-sky-300 bg-clip-text text-transparent">
                Public Trust & Industry Impact
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              Explore verifiable Program Learning Outcomes (PLO/CLO), credits breakdown, accredited quality benchmarks, multi-year student innovation showcases, and corporate recruitment channels.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/curriculum"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/30 hover:bg-blue-500 transition-all"
              >
                <BookOpen className="h-4 w-4" />
                <span>Explore Program Structure & PLO</span>
              </Link>
              <Link
                href="/projects"
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-xs sm:text-sm font-bold text-slate-200 hover:bg-slate-700 hover:text-white transition-all backdrop-blur-xs"
              >
                <FolderGit2 className="h-4 w-4 text-blue-400" />
                <span>View Student Projects by Year</span>
              </Link>
              <Link
                href="/industry/dashboard"
                className="flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-950/50 px-5 py-3 text-xs sm:text-sm font-bold text-indigo-200 hover:bg-indigo-900/60 transition-all"
              >
                <Briefcase className="h-4 w-4 text-indigo-400" />
                <span>Industry Dashboard</span>
              </Link>
            </div>
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {publicTrustMetrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-blue-300 font-semibold mb-2">
                  <span>{m.badge}</span>
                  <span className="text-emerald-400">{m.change}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">{m.value}</div>
                <div className="text-xs font-semibold text-slate-200 mt-1">{m.title}</div>
                <p className="text-[11px] text-slate-400 mt-1.5 leading-snug line-clamp-2">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CORE CAPABILITIES OVERVIEW GRID */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <h2 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            System Pillars
          </h2>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Designed for University-Industry Collaboration
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive transparency into learning outcomes, graduate competencies, and corporate engagement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Curriculum & Outcomes */}
          <Link
            href="/curriculum"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 group-hover:scale-105 transition-transform">
              <BookOpen className="h-6 w-6" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Program Structure & PLO / CLO
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Examine the 138-credit curriculum, semester sequencing, and detailed competency mapping from Course Learning Outcomes (CLO) to Program Learning Outcomes (PLO).
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <span>Inspect Outcome Matrix</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Public Trust & QA */}
          <Link
            href="/public-trust"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 group-hover:scale-105 transition-transform">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Public Trust & Accreditation
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Review international accreditation certifications (ABET, AUN-QA), 97.4% graduate employability statistics, starting compensation, and the corporate advisory board.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>View Quality Benchmarks</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Multi-Year Projects */}
          <Link
            href="/projects"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 group-hover:scale-105 transition-transform">
              <FolderGit2 className="h-6 w-6" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Student Projects Archive
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Explore senior design capstones categorized by year (2024, 2025, 2026), complete with GitHub repositories, demonstration videos, and direct sponsor inquiry tools.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-600 dark:text-purple-400">
              <span>Browse 2024-2026 Portfolios</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>



          {/* Card 5: Industry Dashboard */}
          <Link
            href="/industry/dashboard"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 group-hover:scale-105 transition-transform">
              <Briefcase className="h-6 w-6" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Industry Posting Dashboard
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Post full-time graduate jobs, 16-week Co-op openings, or sponsor real-world capstone challenges directly to engineering faculty and students.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Post Recruitment Openings</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: Raise Concern / Feedback */}
          <Link
            href="/industry/feedback"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 group-hover:scale-105 transition-transform">
              <MessageSquareWarning className="h-6 w-6" />
            </div>
            <h4 className="mt-4 text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
              Raise Concern & Industry Feedback
            </h4>
            <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Voice curriculum skill gaps, recommend modern frameworks, and track ticket status through our Continuous Quality Improvement (CQI) governance process.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400">
              <span>Submit Industry Concern</span>
              <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED STUDENT PROJECTS HIGHLIGHT */}
      <section className="bg-slate-100/70 py-16 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Student Capstone Portfolio
              </span>
              <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                Featured Industry-Aligned Projects
              </h3>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <span>Explore All Projects by Year</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-md transition-all dark:border-slate-800 dark:bg-slate-800/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="rounded-md bg-blue-600 px-2 py-0.5 text-[10px] font-bold text-white">
                      Year {project.academicYear}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                      {project.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                    {project.title}
                  </h4>

                  {project.industryPartner && (
                    <div className="mt-2 flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400">
                      <Building2 className="h-3 w-3" />
                      <span>{project.industryPartner}</span>
                    </div>
                  )}

                  <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {project.abstract}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60">
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.techStack.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>View System Specs</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST INDUSTRY RECRUITMENT POSTINGS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Corporate Gateway
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Active Industry Announcements & Openings
            </h3>
          </div>
          <Link
            href="/industry/dashboard"
            className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
          >
            <span>Visit Industry Dashboard</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeAnnouncements.map((ann) => (
            <div
              key={ann.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 font-bold text-xs text-white">
                      {ann.companyLogoText}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                        {ann.companyName}
                      </div>
                      <div className="text-[10px] text-slate-400">{ann.industrySector}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {ann.type}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {ann.title}
                </h4>

                <div className="mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {ann.stipendOrSalary}
                </div>

                <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {ann.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 text-[11px]">Deadline: {ann.deadline}</span>
                <Link
                  href="/industry/dashboard"
                  className="font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <span>Apply / Details</span>
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTINUOUS QUALITY IMPROVEMENT (CQI) BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-4">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300 border border-blue-400/30">
              Industry Voice & Governance
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Have Feedback or Observed a Skill Gap?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              We operate an open Continuous Quality Improvement (CQI) feedback system. Corporate partners can raise formal concerns, suggest syllabus enhancements, or propose new collaborative research tracks.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/industry/feedback"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-slate-100 shadow-md transition-colors"
              >
                <MessageSquareWarning className="h-4 w-4 text-rose-600" />
                <span>Raise Concern / Submit Feedback</span>
              </Link>
              <Link
                href="/public-trust#advisory-board"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
              >
                <span>View Advisory Board</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Project details */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
