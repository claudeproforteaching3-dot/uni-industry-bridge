'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth, UserRole } from '@/lib/auth-context';
import {
  GraduationCap,
  BookOpen,
  ShieldCheck,
  FolderGit2,
  Users,
  Briefcase,
  MessageSquareWarning,
  Menu,
  X,
  Sparkles,
  PlusCircle,
  UserCircle2
} from 'lucide-react';

interface NavbarProps {
  onOpenChat?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenChat }) => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { role, setRole } = useAuth();

  const allNavLinks = [
    { href: '/', label: 'Overview', icon: GraduationCap, roles: ['super_admin', 'department', 'industry', 'student'] },
    { href: '/curriculum', label: 'Curriculum', icon: BookOpen, roles: ['super_admin', 'department', 'industry', 'student'] },
    { href: '/public-trust', label: 'Public Trust', icon: ShieldCheck, roles: ['super_admin', 'department', 'industry', 'student'] },
    { href: '/projects', label: 'Student Projects', icon: FolderGit2, roles: ['super_admin', 'department', 'industry', 'student'] },
    { href: '/industry/dashboard', label: role === 'student' ? 'Job Board' : 'Industry Dashboard', icon: Briefcase, roles: ['super_admin', 'department', 'industry', 'student'] },
    { href: '/industry/feedback', label: 'Raise Concern', icon: MessageSquareWarning, roles: ['super_admin', 'department', 'industry'] },
  ];

  const navLinks = allNavLinks.filter(link => link.roles.includes(role));

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 leading-none">
              <span className="text-[17px] font-extrabold tracking-tight text-slate-900 dark:text-white">
                RUPP <span className="text-blue-600 dark:text-blue-400">University</span>
              </span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 mt-1 leading-none tracking-wide uppercase">
              EduTrust Nexus
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 ml-8 h-full">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`relative flex h-full items-center gap-1.5 text-[13px] font-semibold transition-colors ${
                  active
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500'}`} />
                <span>{link.label}</span>
                {active && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-blue-600 dark:bg-blue-400 rounded-t-full shadow-[0_-2px_8px_rgba(37,99,235,0.4)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons & Role Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Role Switcher */}
          <div className="relative flex items-center group">
            <UserCircle2 className="absolute left-3 h-3.5 w-3.5 text-slate-400 pointer-events-none group-hover:text-blue-500 transition-colors" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="appearance-none rounded-full border border-slate-200 bg-white/50 py-1.5 pl-8 pr-8 text-[11px] font-bold text-slate-600 shadow-xs focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <option value="industry">Industry View</option>
              <option value="student">Student View</option>
              <option value="department">Department View</option>
              <option value="super_admin">Super Admin View</option>
            </select>
            <div className="absolute right-3 pointer-events-none flex items-center">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-slate-400">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

          {role !== 'student' && (
            <Link
              href="/industry/dashboard?action=new"
              className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-1.5 text-[12px] font-bold text-white shadow-xs hover:bg-slate-800 hover:shadow-md transition-all dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Post Job</span>
            </Link>
          )}
          <button
            onClick={onOpenChat}
            className="flex items-center gap-1.5 rounded-full border border-indigo-200/60 bg-indigo-50/50 px-4 py-1.5 text-[12px] font-bold text-indigo-700 hover:bg-indigo-100/80 hover:shadow-sm dark:border-indigo-800/60 dark:bg-indigo-950/30 dark:text-indigo-300 transition-all"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>AI Assistant</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenChat}
            className="rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 dark:text-indigo-400"
            title="Open Chatbot"
          >
            <Sparkles className="h-5 w-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg ${
                    active
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            <Link
              href="/industry/dashboard?action=new"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Post Recruitment Announcement</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
