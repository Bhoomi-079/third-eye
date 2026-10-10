'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Clock,
  Network,
  AlertTriangle,
  Search,
  Sparkles,
  FileBarChart,
  Settings,
  Crosshair,
} from 'lucide-react';

interface NavSection {
  title: string;
  items: {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }[];
}

const navSections: NavSection[] = [
  {
    title: 'nav.command',
    items: [
      { name: 'nav.dashboard', href: '/', icon: LayoutDashboard },
      { name: 'nav.cases', href: '/cases', icon: Briefcase },
    ],
  },
  {
    title: 'nav.forensic',
    items: [
      { name: 'nav.evidence', href: '/evidence', icon: FileText },
      { name: 'nav.timeline', href: '/timeline', icon: Clock },
      { name: 'nav.graph', href: '/graph', icon: Network },
      {
        name: 'nav.contradictions',
        href: '/contradictions',
        icon: AlertTriangle,
        badge: '4 CLASH',
        badgeColor: 'bg-stone-100 text-stone-700 border-stone-200',
      },
      { name: 'nav.gaps', href: '/gaps', icon: Search },
    ],
  },
  {
    title: 'nav.intelligence',
    items: [
      { name: 'nav.assistant', href: '/assistant', icon: Sparkles },
      { name: 'nav.reports', href: '/reports', icon: FileBarChart },
      { name: 'nav.settings', href: '/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-64 bg-[#f8f5f1] text-[#1d2430] flex flex-col flex-shrink-0 h-screen sticky top-0 border-r border-[#e7e0d6] select-none shadow-[0_18px_40px_rgba(31,41,55,0.04)] z-20">
      <div className="p-4 border-b border-[#e7e0d6] bg-[#f7f4ef]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-md bg-white border border-[#e7e0d6] shadow-sm flex items-center justify-center text-[#464f5b] relative flex-shrink-0">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3.2" strokeWidth="2.2" />
              <line x1="12" y1="2" x2="12" y2="4.5" />
              <line x1="12" y1="19.5" x2="12" y2="22" />
            </svg>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#8aa28f] rounded-full border-2 border-white" />
          </div>

          <div>
            <div className="text-[10px] font-mono font-bold tracking-wider text-[#67717d] uppercase leading-none">
              पिंपरी चिंचवड पोलीस
            </div>
            <h1 className="font-bold text-sm tracking-tight text-[#1d2430] uppercase mt-0.5">
              THE THIRD EYE
            </h1>
            <p className="text-[9px] text-[#667085] font-mono tracking-tight leading-none mt-0.5">
              INVESTIGATION INTELLIGENCE
            </p>
          </div>
        </div>

        <div className="mt-3 px-2 py-1.5 rounded-md bg-white border border-[#e7e0d6] shadow-sm flex items-center justify-between text-[10px] font-mono">
          <span className="text-[#586370] flex items-center gap-1">
            <Crosshair className="w-3 h-3 text-[#586370]" />
            {t('sidebar.unit')}
          </span>
          <span className="text-[#44525f] font-semibold">{t('sidebar.active')}</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs font-medium">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="px-2 pb-1 text-[9px] font-mono font-bold tracking-widest text-[#7a8593] uppercase">
              {t(section.title)}
            </div>

            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-md transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-[#1d2430] font-medium border border-[#d9d1c8] shadow-sm'
                      : 'text-[#586370] hover:bg-white hover:text-[#1d2430] border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-[#404d5d]' : 'text-[#78848f]'}`} />
                    <span className="truncate">{t(item.name)}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${
                        item.badgeColor || 'bg-stone-100 text-stone-700 border-stone-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-[#e7e0d6] bg-[#f7f4ef] text-[10px] font-mono space-y-1">
        <div className="flex items-center justify-between text-[#586370]">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#7e8f80]" />
            {t('sidebar.grid')}
          </span>
          <span className="text-[#7a8593]">SEC-BNS 309(4)</span>
        </div>
        <div className="text-[9px] text-[#7a8593] leading-tight">
          {t('sidebar.notice')}
        </div>
      </div>
    </aside>
  );
}
