'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, Menu, X, Home, FileText, Heart, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ProjectCard } from '@/components/project-card';
import { PhoneFrame } from '@/components/phone-frame';
import { ThemeToggle } from '@/components/theme-toggle';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const projects = [
  {
    section: 'Forms',
    badge: 'Form',
    title: 'Workshop Registration',
    desc: '3-step registration form for workshops and events. Collect attendee info and send directly to your WhatsApp for payment confirmation.',
    tags: [
      { label: '3-step', variant: 'outline' as const },
      { label: 'WhatsApp', variant: 'outline' as const },
      { label: 'Free', variant: 'default' as const },
    ],
    search: 'workshop registration 3-step whatsapp free',
    viewerIdx: 0,
  },
  {
    section: 'Forms',
    badge: 'Form',
    title: 'Fitness Form',
    desc: 'Enquiry and registration form for fitness coaches and gyms. Collect client goals, commitment level, and contact details to your WhatsApp.',
    tags: [
      { label: 'WhatsApp', variant: 'outline' as const },
      { label: '3-step', variant: 'outline' as const },
      { label: 'Free', variant: 'default' as const },
    ],
    search: 'fitness form enquiry registration client goals whatsapp free',
    viewerIdx: 2,
  },
  {
    section: 'Forms',
    badge: 'Form',
    title: 'Job Application Form',
    desc: '4-step job application form for Nigerian SMEs and employers. Collect personal info, experience, CV upload, and deliver applications directly to your WhatsApp.',
    tags: [
      { label: '4-step', variant: 'outline' as const },
      { label: 'WhatsApp', variant: 'outline' as const },
      { label: 'CV Upload', variant: 'outline' as const },
      { label: 'Free', variant: 'default' as const },
    ],
    search: 'job application form recruitment employer candidates cv upload nigeria 4-step whatsapp free',
    viewerIdx: 1,
  },
  {
    section: 'Coming Soon',
    badge: 'Coming Soon',
    badgeClass: 'text-muted-foreground border-muted',
    title: 'Booking System',
    desc: 'Appointment and service booking form with calendar selection, time slots, and automated reminders.',
    tags: [
      { label: 'Calendar', variant: 'outline' as const },
      { label: 'Reminders', variant: 'outline' as const },
      { label: 'Paid', variant: 'secondary' as const },
    ],
    search: 'booking system appointment calendar reminders paid',
  },
  {
    section: 'Coming Soon',
    badge: 'Coming Soon',
    badgeClass: 'text-muted-foreground border-muted',
    title: 'Payment Page',
    desc: 'Standalone checkout page with payment gateway integration for digital products and services.',
    tags: [
      { label: 'Checkout', variant: 'outline' as const },
      { label: 'Paystack', variant: 'outline' as const },
      { label: 'Paid', variant: 'secondary' as const },
    ],
    search: 'payment page checkout paystack gateway paid',
  },
  {
    section: 'Coming Soon',
    badge: 'Coming Soon',
    badgeClass: 'text-muted-foreground border-muted',
    title: 'Survey Builder',
    desc: 'Multi-page survey tool with conditional logic, progress tracking, and exportable results.',
    tags: [
      { label: 'Logic', variant: 'outline' as const },
      { label: 'Export', variant: 'outline' as const },
      { label: 'Paid', variant: 'secondary' as const },
    ],
    search: 'survey builder multi-page conditional logic export paid',
  },
];

export default function HomePage() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalFile, setModalFile] = useState('');
  const [viewerIdx, setViewerIdx] = useState(0);
  const [downloaded, setDownloaded] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggleTheme = useCallback(() => {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('kn_theme', next ? 'dark' : 'light');
    setIsDark(next);
  }, []);

  const openViewer = useCallback((idx: number) => {
    setViewerIdx(idx);
    if (viewerRef.current) {
      viewerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const filtered = query.trim()
    ? projects.filter((p) => p.search.includes(query.toLowerCase().trim()))
    : projects;

  const sections = filtered.reduce<{ name: string; items: typeof projects }[]>((acc, p) => {
    const existing = acc.find((s) => s.name === p.section);
    if (existing) existing.items.push(p);
    else acc.push({ name: p.section, items: [p] });
    return acc;
  }, []);

  const groupedForms = projects.filter((p) => p.section === 'Forms');

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 py-2.5 bg-background border-b">
        <a href="/">
          <img src="/knownation004.png" alt="Know Nation" className="h-10 w-auto dark:hidden" />
          <img src="/logo-light.png" alt="Know Nation" className="h-10 w-auto hidden dark:block" />
        </a>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex justify-end" onClick={() => setMenuOpen(false)}>
          <div className="w-[280px] max-w-[75vw] h-full bg-background border-l p-6 flex flex-col animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <button className="p-2 rounded-lg hover:bg-muted transition-colors" onClick={() => setMenuOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <a href="/" onClick={() => setMenuOpen(false)}>
              <img src="/knownation004.png" alt="Know Nation" className="w-40 mx-auto mb-6 dark:hidden" />
              <img src="/logo-light.png" alt="Know Nation" className="w-40 mx-auto mb-6 hidden dark:block" />
            </a>
            <div className="space-y-1">
              <a href="/" className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <Home className="h-5 w-5 text-muted-foreground" />
                Projects
              </a>
              <a href="/workshop" className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Workshop
              </a>
              <a href="/fitness" className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <Heart className="h-5 w-5 text-muted-foreground" />
                Fitness
              </a>
              <a href="/job-application" className="flex items-center gap-3 px-3 py-3.5 rounded-xl text-sm font-semibold hover:bg-muted transition-colors">
                <FileText className="h-5 w-5 text-muted-foreground" />
                Job Application
              </a>
            </div>
            <div className="flex-1" />
            <div className="flex items-center justify-between px-3 py-2.5 mb-3 rounded-xl bg-muted/50">
              <span className="text-xs font-semibold tracking-wide">Dark Mode</span>
              <button
                onClick={toggleTheme}
                className={`relative inline-flex h-6 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${isDark ? 'bg-primary' : 'bg-input'}`}
                role="switch"
                aria-checked={isDark}
              >
                <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform duration-200 ease-in-out ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
              </button>
            </div>
            <div className="text-[11px] text-muted-foreground text-center py-3">
              &copy; Know Nation Ltd
            </div>
          </div>
        </div>
      )}

      <div className="w-full max-w-[520px] mx-auto px-5 pt-20 pb-12 space-y-8">
        <div>
          <h1 className="text-[28px] font-extrabold">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1.5">Digital products for your business</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 rounded-xl"
          />
        </div>

        {sections.length === 0 && query && (
          <div className="text-center py-10 text-muted-foreground text-sm">
            No projects match your search
          </div>
        )}

        {sections.map((section) => (
          <section key={section.name}>
            <div className="flex items-center gap-2.5 mb-3.5">
              <h2 className="text-[13px] font-bold text-muted-foreground tracking-widest uppercase">{section.name}</h2>
              <div className="flex-1 h-px bg-border" />
            </div>
            <div className="space-y-3">
              {section.items.map((project) => (
                <ProjectCard
                  key={project.title}
                  badge={project.badge}
                  title={project.title}
                  description={project.desc}
                  tags={project.tags}
                  comingSoon={project.section === 'Coming Soon'}
                  onLiveDemo={'viewerIdx' in project ? () => openViewer(project.viewerIdx!) : undefined}
                  onFreeDownload={'viewerIdx' in project ? () => { setModalFile(`${project.title.toLowerCase().replace(/\s+/g, '-')}-system.zip`); setModalOpen(true); } : undefined}
                />
              ))}
            </div>
          </section>
        ))}

        <section ref={viewerRef}>
          <div className="flex items-center gap-2.5 mb-3.5">
            <h2 className="text-[13px] font-bold text-muted-foreground tracking-widest uppercase">Live Preview</h2>
            <div className="flex-1 h-px bg-border" />
          </div>
          <PhoneFrame current={viewerIdx} onFormChange={setViewerIdx} />
        </section>

        <div id="footer" className="opacity-10 select-none pointer-events-none text-center pt-8">
          <span className="text-[9px] tracking-widest uppercase text-muted-foreground">
            Know Nation Ltd &mdash; Powering Your Digital Future
          </span>
        </div>
      </div>

      <Dialog open={modalOpen} onOpenChange={(open) => { setModalOpen(open); if (!open) setDownloaded(false); }}>
        <DialogContent className="max-w-[360px] rounded-2xl text-center">
          {downloaded ? (
            <div className="py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center animate-bounce-in">
                <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <DialogTitle className="text-lg mb-1">Download Started!</DialogTitle>
              <DialogDescription className="text-sm text-muted-foreground">
                Thank you for your support!
              </DialogDescription>
              <div className="confetti-container" aria-hidden>
                {Array.from({ length: 20 }).map((_, i) => (
                  <span key={i} className="confetti-piece" style={{
                    '--x': `${Math.random() * 100}%`,
                    '--y': `${-Math.random() * 60 - 20}%`,
                    '--r': `${Math.random() * 720 - 360}deg`,
                    '--d': `${Math.random() * 1.5}s`,
                    '--c': ['#22c55e','#06b6d4','#f59e0b','#ec4899','#8b5cf6'][i % 5],
                  } as React.CSSProperties} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <div className="w-13 h-13 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <DialogTitle className="text-lg">Before you download</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground">
                  Show some love &mdash; star &amp; follow us on socials to support the project.
                </DialogDescription>
              </DialogHeader>

              <div className="flex gap-2.5 justify-center my-4">
                <a href="https://github.com/KnowNationHQ/form001" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 transition-colors dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8"/></svg>
                  Star
                </a>
                <a href="https://x.com/KnowNationHQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 transition-colors dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Follow
                </a>
                <a href="https://tiktok.com/@KnowNationHQ" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-neutral-900 text-white hover:bg-neutral-700 transition-colors dark:bg-neutral-700 dark:hover:bg-neutral-600">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  TikTok
                </a>
              </div>

              <div className="h-px bg-border my-4" />

              <button
                onClick={(e) => {
                  e.preventDefault();
                  setDownloaded(true);
                  const a = document.createElement('a');
                  a.href = modalFile;
                  a.download = modalFile.split('/').pop() || modalFile;
                  document.body.appendChild(a);
                  a.click();
                  a.remove();
                }}
                className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-cyan-500 text-white text-sm font-bold text-center cursor-pointer hover:brightness-105 hover:scale-[1.02] transition-all"
              >
                Continue Download
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
