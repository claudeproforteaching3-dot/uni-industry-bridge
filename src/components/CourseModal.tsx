'use client';

import React from 'react';
import { Course } from '@/lib/types';
import { X, BookOpen, Clock, Target, Layers, CheckCircle2 } from 'lucide-react';

interface CourseModalProps {
  course: Course | null;
  onClose: () => void;
}

export const CourseModal: React.FC<CourseModalProps> = ({ course, onClose }) => {
  if (!course) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-blue-600 px-2 py-0.5 text-xs font-bold text-white">
                {course.code}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Year {course.year} • Semester {course.semester}
              </span>
            </div>
            <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
              {course.title}
            </h3>
          </div>
        </div>

        {/* Credit & Hours Breakdown */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-medium text-slate-500">Total Credits</div>
            <div className="text-base font-bold text-blue-600 dark:text-blue-400">{course.credits} Credits</div>
            <div className="text-[10px] text-slate-400">{course.creditFormat}</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-medium text-slate-500">Lecture Hours</div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200">{course.lectureHours} hrs/wk</div>
            <div className="text-[10px] text-slate-400">Theory & concepts</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-medium text-slate-500">Lab / Practice</div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200">{course.labHours} hrs/wk</div>
            <div className="text-[10px] text-slate-400">Hands-on systems</div>
          </div>
          <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="text-[11px] font-medium text-slate-500">Self-Study</div>
            <div className="text-base font-bold text-slate-800 dark:text-slate-200">{course.selfStudyHours} hrs/wk</div>
            <div className="text-[10px] text-slate-400">Assignments & R&D</div>
          </div>
        </div>

        {/* Prerequisites & Category */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold text-slate-900 dark:text-slate-200">Category:</span>
          <span className="rounded-md bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{course.category}</span>
          <span className="text-slate-300">•</span>
          <span className="font-semibold text-slate-900 dark:text-slate-200">Prerequisites:</span>
          {course.prerequisites.length > 0 ? (
            course.prerequisites.map((p) => (
              <span key={p} className="rounded-md bg-amber-100 px-2 py-0.5 font-medium text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                {p}
              </span>
            ))
          ) : (
            <span className="text-slate-400">None (Entry Level)</span>
          )}
        </div>

        {/* Course Description */}
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Syllabus Overview
          </h4>
          <p className="mt-1 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Course Learning Outcomes (CLOs) */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Course Learning Outcomes (CLOs)
            </h4>
          </div>
          <div className="mt-2 space-y-2">
            {course.clos.map((clo) => (
              <div
                key={clo.id}
                className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 p-3 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
              >
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white text-xs mr-2">
                      [{clo.code}]
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300">
                      {clo.description}
                    </span>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-semibold text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                    Bloom: {clo.bloomLevel}
                  </span>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                    Maps to {clo.mappedPloCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mapped Program Learning Outcomes (PLOs) */}
        <div className="mt-6">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Target Program Learning Outcomes (PLOs) & Mastery Level
            </h4>
          </div>
          <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
            {course.mappedPlos.map((mp) => (
              <div
                key={mp.ploCode}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-2.5 dark:border-slate-800 dark:bg-slate-800"
              >
                <span className="font-bold text-xs text-blue-600 dark:text-blue-400">{mp.ploCode}</span>
                <span
                  className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                    mp.level === 'Mastery'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : mp.level === 'Reinforcing'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {mp.level}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-slate-200 pt-4 dark:border-slate-800">
          <button
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};
