'use client';

import React, { useState, useMemo } from 'react';
import { studentProjects } from '@/lib/mock-data';
import { StudentProject } from '@/lib/types';
import { ProjectModal } from '@/components/ProjectModal';
import {
  FolderGit2,
  Search,
  Calendar,
  Filter,
  Building2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

export default function ProjectsPage() {
  const [selectedYear, setSelectedYear] = useState<number | 'All'>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null);

  const departments = ['All', ...Array.from(new Set(studentProjects.map((p) => p.department)))];

  const categories = [
    'All',
    'AI & Machine Learning',
    'IoT & Robotics',
    'Cybersecurity & Cloud',
    'FinTech & Blockchain',
    'HealthTech',
    'CleanTech & Smart Cities',
  ];

  const filteredProjects = useMemo(() => {
    return studentProjects.filter((p) => {
      // Filter by year
      if (selectedYear !== 'All' && p.academicYear !== selectedYear) return false;

      // Filter by category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;

      // Filter by department
      if (selectedDepartment !== 'All' && p.department !== selectedDepartment) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchAbstract = p.abstract.toLowerCase().includes(q);
        const matchStack = p.techStack.some((t) => t.toLowerCase().includes(q));
        const matchAdvisor = p.advisor.toLowerCase().includes(q);
        const matchPartner = p.industryPartner?.toLowerCase().includes(q);
        const matchTeam = p.teamMembers.some((m) => m.name.toLowerCase().includes(q));

        return matchTitle || matchAbstract || matchStack || matchAdvisor || matchPartner || matchTeam;
      }

      return true;
    });
  }, [selectedYear, selectedCategory, searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* PAGE HEADER */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-3">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-200 border border-blue-400/30 flex items-center gap-1.5">
            <FolderGit2 className="h-4 w-4" />
            Senior Capstone & Innovation Repository
          </span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Student Engineering Projects by Year
        </h1>

        <p className="mt-3 text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Discover cutting-edge prototypes, industrial capstones, and software engineering systems built by final-year students in collaboration with verified enterprise partners.
        </p>

        {/* Year Fast Switcher */}
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-white/10 pt-6">
          <span className="text-xs font-semibold text-blue-300 mr-2">Academic Year:</span>
          {(['All', 2026, 2025, 2024] as const).map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                selectedYear === year
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
              }`}
            >
              {year === 'All' ? 'All Years (2024 - 2026)' : `Class of ${year}`}
            </button>
          ))}
        </div>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, technology (e.g. PyTorch, ROS 2, ZK), advisor, or partner..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-1/4 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All' ? 'All Tech Domains' : cat}
              </option>
            ))}
          </select>

          {/* Department Filter */}
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="w-full sm:w-1/4 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          >
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept === 'All' ? 'All Departments' : dept}
              </option>
            ))}
          </select>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
          <span>
            Showing <strong className="text-slate-900 dark:text-white">{filteredProjects.length}</strong> projects
            {selectedYear !== 'All' ? ` for academic year ${selectedYear}` : ''}
          </span>
          {(searchQuery || selectedCategory !== 'All' || selectedYear !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedYear('All');
              }}
              className="text-blue-600 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* PROJECT CARDS GRID */}
      {filteredProjects.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <FolderGit2 className="mx-auto h-12 w-12 text-slate-400" />
          <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
            No projects matched your search criteria
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Try adjusting your search terms or clearing the selected category filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-blue-500 hover:shadow-lg transition-all dark:border-slate-800 dark:bg-slate-900 flex flex-col justify-between group"
            >
              <div>
                {/* Year & Category */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-blue-600 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                      {project.academicYear}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      Sem {project.semester}
                    </span>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      project.status === 'Completed'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                  {project.category}
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors line-clamp-2">
                  {project.title}
                </h3>

                {project.industryPartner && (
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <Building2 className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{project.industryPartner}</span>
                  </div>
                )}

                <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                  {project.abstract}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1">
                  {project.techStack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-mono text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="text-[10px] text-slate-400 self-center">
                      +{project.techStack.length - 4}
                    </span>
                  )}
                </div>

                {/* Footer Action */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 text-[11px]">Adv: {project.advisor.split(' ').slice(-1)[0]}</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline">
                    <span>Inspect Specs & Team</span>
                    <ChevronRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
