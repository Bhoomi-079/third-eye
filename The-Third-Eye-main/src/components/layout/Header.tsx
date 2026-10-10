'use client';

import React, { useState } from 'react';
import { useCase } from '@/context/CaseContext';
import {
  Briefcase,
  ChevronDown,
  Plus,
  FilePlus2,
  Search,
  RotateCcw,
  Shield,
  LogIn,
  UserRoundPlus,
  X,
} from 'lucide-react';
import { useLanguage, Locale } from '@/context/LanguageContext';

export function Header() {
  const { locale, setLocale, t, caseText } = useLanguage();
  const {
    cases,
    activeCaseId,
    activeCase,
    setActiveCaseId,
    globalSearch,
    setGlobalSearch,
    setShowNewCaseModal,
    setShowNewEvidenceModal,
    resetToDemo,
  } = useCase();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);

  const handleReset = async () => {
    if (
      confirm(
        'Restore investigation database to Pimpri Chinchwad Police benchmark case (FIR No. 0389/2025 Wakad PS)? Custom additions will be reset to authentic benchmark.'
      )
    ) {
      setResetting(true);
      await resetToDemo();
      setResetting(false);
    }
  };

  return (
    <header className="h-16 bg-[#f8f5f1]/85 border-b border-[#e7e0d6] px-4 flex items-center justify-between sticky top-0 z-30 select-none text-[#1d2430] backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-md border border-[#d9d1c8] bg-white transition-all text-left shadow-sm"
          >
            <Shield className="w-4 h-4 text-[#475669] flex-shrink-0" />
            <div className="max-w-[280px]">
              <div className="text-[9px] uppercase font-mono font-bold text-[#667085] tracking-wider flex items-center gap-1.5">
                <span>{t('header.activeCase')}</span>
                {activeCase?.priority === 'high' && (
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-stone-100 text-stone-700 font-semibold border border-stone-200">
                    {t('header.priorityHigh')}
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-[#1d2430] truncate font-sans">
                {activeCase ? `${activeCase.referenceNumber}: ${caseText(activeCase.id, 'title', activeCase.title)}` : t('header.noCase')}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#697684] ml-1" />
          </button>

          {dropdownOpen && (
            <div
              className="absolute left-0 mt-1 w-84 bg-white border border-[#e7e0d6] rounded-md shadow-[0_18px_40px_rgba(20,32,48,0.10)] py-1 z-50 text-xs text-[#1d2430]"
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <div className="px-3 py-1.5 text-[9px] font-mono font-bold text-[#667085] uppercase border-b border-[#e7e0d6] flex items-center justify-between">
                <span>{t('header.caseFiles')}</span>
                <span className="text-[#455569]">{cases.length} loaded</span>
              </div>

              <div className="max-h-60 overflow-y-auto py-1">
                {cases.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      setActiveCaseId(c.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-[#f7f4ef] flex items-start justify-between gap-2 transition-colors ${
                      c.id === activeCaseId ? 'bg-[#f3efe8] border-l-2 border-[#8d9ca8]' : ''
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="font-semibold text-[#1d2430] truncate">{caseText(c.id, 'title', c.title)}</div>
                      <div className="text-[10px] text-[#667085] font-mono flex items-center gap-2 mt-0.5">
                        <span>{c.referenceNumber}</span>
                        <span>•</span>
                        <span>{new Date(c.incidentDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-2 border-t border-[#e7e0d6]">
                <button
                  onClick={() => {
                    setShowNewCaseModal(true);
                    setDropdownOpen(false);
                  }}
                  className="w-full py-1.5 px-2 bg-[#eef1f4] hover:bg-[#e8edf2] text-[#1d2430] rounded font-mono text-[11px] flex items-center justify-center gap-1.5 transition-colors border border-[#d9d1c8]"
                >
                  <Plus className="w-3 h-3" />
                  <span>{t('header.registerCase')}</span>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-[#e7e0d6] text-[10px] font-mono text-[#586370] shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#7e8f80]" />
          <span>{t('header.security')}</span>
        </div>
      </div>

      <div className="flex-1 max-w-md mx-4 hidden md:block">
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7a8593]" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            placeholder={t('header.search')}
            className="w-full pl-9 pr-14 py-2 bg-white border border-[#d9d1c8] rounded-md text-xs text-[#1d2430] placeholder-[#7a8593] focus:outline-none focus:border-[#9aa6b2] transition-colors font-sans shadow-sm"
          />
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] font-mono text-[#667085] bg-[#f4f1eb] px-1.5 py-0.5 rounded border border-[#d9d1c8]">
            Ctrl+K
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="flex shrink-0 items-center gap-1.5 text-[10px] text-[#625f56]">
          <span className="sr-only">{t('language.label')}</span>
          <select
            aria-label={t('language.label')}
            value={locale}
            onChange={(event) => setLocale(event.target.value as Locale)}
            className="rounded-md border border-[#d9d1c8] bg-white px-2 py-2 text-xs text-[#302f2a]"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">मराठी</option>
          </select>
        </label>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" aria-label={t('auth.login')} title={t('auth.login')} onClick={() => setAuthMode('login')} className="inline-flex items-center gap-1 rounded-md border border-[#d9d1c8] bg-white px-2.5 py-2 text-xs font-medium text-[#475669] hover:bg-[#f7f3eb]">
            <LogIn className="h-3.5 w-3.5" /><span className="hidden xl:inline">{t('auth.login')}</span>
          </button>
          <button type="button" aria-label={t('auth.signup')} title={t('auth.signup')} onClick={() => setAuthMode('signup')} className="inline-flex items-center gap-1 rounded-md bg-[#68745f] px-2.5 py-2 text-xs font-semibold text-white hover:bg-[#59664f]">
            <UserRoundPlus className="h-3.5 w-3.5" /><span className="hidden xl:inline">{t('auth.signup')}</span>
          </button>
        </div>
        <button
          onClick={() => setShowNewEvidenceModal(true)}
          className="px-3 py-2 bg-[#1f2937] hover:bg-[#283548] text-white rounded-md text-xs font-semibold transition-all flex items-center gap-1.5 shadow-sm"
        >
          <FilePlus2 className="w-3.5 h-3.5" />
          <span>{t('header.ingest')}</span>
        </button>

        <button
          onClick={handleReset}
          disabled={resetting}
          title="Restore Pimpri Chinchwad benchmark case"
          className="p-1.5 text-[#586370] hover:text-[#1d2430] hover:bg-white rounded-md border border-[#d9d1c8] transition-colors"
        >
          <RotateCcw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {authMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#302f2a]/35 p-4" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setAuthMode(null);
        }}>
          <section role="dialog" aria-modal="true" aria-labelledby="auth-dialog-title" className="w-full max-w-md rounded-xl border border-[#d9d1c8] bg-[#fffdf8] p-5 text-[#302f2a] shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <h2 id="auth-dialog-title" className="text-base font-semibold">{t(authMode === 'login' ? 'auth.loginTitle' : 'auth.signupTitle')}</h2>
              <button type="button" aria-label={t('auth.close')} onClick={() => setAuthMode(null)} className="rounded p-1 text-[#625f56] hover:bg-[#f0ece4]"><X className="h-4 w-4" /></button>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#625f56]">{t('auth.notice')}</p>
            <button type="button" onClick={() => setAuthMode(null)} className="mt-5 rounded-md bg-[#68745f] px-3 py-2 text-xs font-semibold text-white">{t('auth.close')}</button>
          </section>
        </div>
      )}
    </header>
  );
}
