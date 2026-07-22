'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Tablet, Monitor } from 'lucide-react';

const FORMS = ['workshop', 'job-application', 'fitness'] as const;
const LABELS = ['Workshop', 'Job Application', 'Fitness'];

type Device = 'phone' | 'tablet' | 'desktop';

interface PhoneFrameProps {
  current: number;
  onFormChange: (idx: number) => void;
}

export function PhoneFrame({ current, onFormChange }: PhoneFrameProps) {
  const [device, setDevice] = useState<Device>('phone');

  return (
    <div className="space-y-3">
      <div className="flex justify-center gap-1 bg-muted p-1 rounded-full w-fit mx-auto">
        {[
          ['phone', Smartphone] as const,
          ['tablet', Tablet] as const,
          ['desktop', Monitor] as const,
        ].map(([key, Icon]) => (
          <button
            key={key}
            data-active={device === key}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all data-[active=true]:bg-background data-[active=true]:text-foreground data-[active=true]:shadow-sm text-muted-foreground hover:text-foreground"
            onClick={() => setDevice(key)}
          >
            <Icon className="h-3.5 w-3.5" />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 text-sm font-medium">
        <button
          onClick={() => onFormChange(current - 1)}
          disabled={current === 0}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-semibold text-foreground min-w-[120px] text-center">{LABELS[current]}</span>
        <button
          onClick={() => onFormChange(current + 1)}
          disabled={current >= FORMS.length - 1}
          className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground disabled:opacity-20 disabled:pointer-events-none transition-colors"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div
        data-device={device}
        className="w-full relative overflow-hidden transition-all duration-350 data-[device=phone]:bg-[#0a0a0a] data-[device=phone]:rounded-[55px] data-[device=phone]:max-w-[393px] data-[device=phone]:h-[min(844px,calc(100dvh-160px))] data-[device=phone]:mx-auto data-[device=phone]:shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_0_0_3px_#1a1a1a,0_30px_80px_rgba(0,0,0,0.4)] data-[device=tablet]:bg-[#0a0a0a] data-[device=tablet]:rounded-3xl data-[device=tablet]:max-w-[640px] data-[device=tablet]:min-h-[640px] data-[device=tablet]:mx-auto data-[device=tablet]:shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_15px_50px_rgba(0,0,0,0.15)] data-[device=desktop]:bg-transparent data-[device=desktop]:max-w-[448px] data-[device=desktop]:mx-auto data-[device=desktop]:shadow-none data-[device=phone]:flex data-[device=phone]:flex-col"
      >
        {device === 'phone' && (
          <>
            <div className="absolute inset-0 pointer-events-none z-[1]">
              <div className="absolute left-[-3px] top-1/2 -translate-y-1/2 flex flex-col gap-2 items-end">
                <div className="w-[3px] h-[36px] bg-[#0a0a0a] rounded-r-[2px]" />
                <div className="w-[3px] h-[36px] bg-[#0a0a0a] rounded-r-[2px]" />
                <div className="w-[3px] h-[22px] bg-[#0a0a0a] rounded-r-[2px] mt-1.5" />
              </div>
              <div className="absolute right-[-3px] top-1/2 -translate-y-1/2">
                <div className="w-[3px] h-[56px] bg-[#0a0a0a] rounded-l-[2px]" />
              </div>
            </div>
            <div className="flex justify-center items-center py-2.5 flex-shrink-0">
              <div className="w-[110px] h-[30px] bg-black rounded-[15px]" />
            </div>
          </>
        )}
        <div
          className={`flex items-center justify-between h-11 px-4 flex-shrink-0 text-xs font-bold ${device === 'phone' ? 'bg-[#0c0a09] text-[#e7e5e4]' : device === 'tablet' ? 'bg-background text-foreground' : 'hidden'}`}
        >
          <span>9:41</span>
          <span className="text-[10px] font-semibold tracking-wider opacity-50">KnowNationHQ</span>
          <div className="flex items-center gap-1">
            <svg width="16" height="12" viewBox="0 0 18 12"><rect x="0" y="8" width="3" height="4" rx="0.6" fill="currentColor"/><rect x="5" y="5" width="3" height="7" rx="0.6" fill="currentColor"/><rect x="10" y="2.5" width="3" height="9.5" rx="0.6" fill="currentColor"/><rect x="15" y="0" width="3" height="12" rx="0.6" fill="currentColor" opacity="0.35"/></svg>
            <svg width="14" height="12" viewBox="0 0 16 12"><path d="M1 4.5a14 14 0 0 1 14 0" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/><path d="M4 7.5a8 8 0 0 1 8 0" stroke="currentColor" fill="none" strokeWidth="1.5" strokeLinecap="round"/><circle cx="8" cy="10.5" r="1.2" fill="currentColor"/></svg>
            <svg width="22" height="12" viewBox="0 0 26 12"><rect x="0.5" y="0.5" width="20" height="11" rx="2" stroke="currentColor" fill="none" strokeWidth="1"/><rect x="22" y="3.5" width="3" height="5" rx="1" fill="currentColor" opacity="0.4"/><rect x="2.5" y="2.5" width="16" height="7" rx="1" fill="currentColor"/></svg>
          </div>
        </div>
        <iframe
          src={`/${FORMS[current]}`}
          className={`w-full flex-1 border-none ${device === 'phone' ? 'bg-[#0c0a09]' : 'bg-background'}`}
          title="Form preview"
        />
        {device === 'phone' && (
          <div className="flex justify-center items-center py-2.5 flex-shrink-0">
            <div className="w-[132px] h-[5px] bg-white/85 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
