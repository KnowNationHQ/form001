'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, User, Briefcase, Upload, FileText, CheckCircle } from 'lucide-react';

const PHONE = '234XXXXXXXXXX';

interface FormData {
  name: string;
  email: string;
  phone: string;
  location: string;
  role: string;
  company: string;
  years: string;
  responsibilities: string;
  cvFileName: string;
}

const INITIAL: FormData = {
  name: '',
  email: '',
  phone: '',
  location: '',
  role: '',
  company: '',
  years: '',
  responsibilities: '',
  cvFileName: '',
};

const STEPS = [
  { label: 'Personal', icon: User },
  { label: 'Experience', icon: Briefcase },
  { label: 'CV', icon: Upload },
  { label: 'Review', icon: FileText },
];

function confetti() {
  const colors = ['#4338ca', '#6366f1', '#818cf8', '#a5b4fc'];
  let c = 0;
  const fire = () => {
    if (c >= 40) return;
    const el = document.createElement('div');
    el.style.cssText =
      'position:fixed;width:8px;height:8px;border-radius:2px;z-index:9999;pointer-events:none;' +
      `left:${Math.random() * 100}vw;top:-10px;` +
      `background:${colors[Math.floor(Math.random() * colors.length)]};` +
      'animation:cfFall ' + (0.8 + Math.random()) + 's linear forwards';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
    c++;
    setTimeout(fire, 60 + Math.random() * 100);
  };
  fire();
}

export default function JobApplicationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const fileRef = useRef<HTMLInputElement>(null);

  const update = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) update('cvFileName', f.name);
  };

  const valid1 = () => {
    const e: Partial<Record<keyof FormData, boolean>> = {};
    if (!data.name.trim()) e.name = true;
    if (!data.email.trim() || !/\S+@\S+\.\S+/.test(data.email)) e.email = true;
    if (!data.phone.trim()) e.phone = true;
    if (!data.location.trim()) e.location = true;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const valid2 = () => {
    const e: Partial<Record<keyof FormData, boolean>> = {};
    if (!data.role.trim()) e.role = true;
    if (!data.company.trim()) e.company = true;
    if (!data.years) e.years = true;
    setErrors(e);
    return !Object.keys(e).length;
  };

  const go = (n: number) => {
    if (n > step && ((step === 1 && !valid1()) || (step === 2 && !valid2()))) return;
    setErrors({});
    setStep(n);
  };

  const submit = () => {
    const ref = 'KN-JOB-' + Date.now().toString(36).toUpperCase();
    const msg = [
      '🔔 *NEW JOB APPLICATION*',
      '━━━━━━━━━━━━━━━━━━━━━',
      `👤 Name: ${data.name}`,
      `📧 Email: ${data.email}`,
      `📞 Phone: ${data.phone}`,
      `📍 Location: ${data.location}`,
      '',
      `💼 Role: ${data.role}`,
      `🏢 Company: ${data.company}`,
      `⏳ Experience: ${data.years} years`,
      `📝 Responsibilities: ${data.responsibilities || 'N/A'}`,
      `📄 CV: ${data.cvFileName || 'N/A'}`,
      '━━━━━━━━━━━━━━━━━━━━━',
      `🆔 Ref: ${ref}`,
    ].join('\n');
    setSubmitted(true);
    confetti();
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  if (submitted) {
    return (
      <div className="dark flex min-h-screen items-center justify-center" style={{ background: '#0c0a09', color: '#e7e5e4' }}>
        <style>{`@keyframes cfFall{0%{transform:translateY(0) rotate(0deg);opacity:1}to{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
        <div className="text-center px-6" style={{ maxWidth: 400 }}>
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: 'rgba(22,163,74,0.1)' }}>
            <CheckCircle className="h-7 w-7 text-green-500" />
          </div>
          <h2 className="mb-1 text-xl font-extrabold">Application Submitted!</h2>
          <p className="text-sm" style={{ color: '#a8a29e' }}>
            Your application has been sent via WhatsApp. The employer will review and reach out.
          </p>
          <div className="mt-4 inline-block rounded-lg px-4 py-1.5 text-xs font-bold" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
            Ref: KN-JOB-{Date.now().toString(36).toUpperCase()}
          </div>
          <Button variant="outline" onClick={() => { setData(INITIAL); setSubmitted(false); setStep(1); }} className="mt-8 w-full">
            Submit Another
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="dark" style={{ background: '#0c0a09', color: '#e7e5e4' }}>
      <style>{`@keyframes cfFall{0%{transform:translateY(0) rotate(0deg);opacity:1}to{transform:translateY(100vh) rotate(720deg);opacity:0}}`}</style>
      <div style={{ maxWidth: 480, margin: '0 auto', padding: '32px 20px' }}>
        <div className="mb-8 flex items-center justify-center">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                  style={{
                    border: `2px solid ${step > i + 1 || (step === i + 1) ? '#4338ca' : '#3f3f46'}`,
                    background: step >= i + 1 ? '#4338ca' : 'transparent',
                    color: step >= i + 1 ? '#fff' : '#71717a',
                  }}
                >
                  {step > i + 1 ? <CheckCircle className="h-4 w-4" /> : i + 1}
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: step >= i + 1 ? '#a1a1aa' : '#52525b' }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className="mx-2 mb-5 h-0.5 transition-all duration-300" style={{ background: step > i + 1 ? '#4338ca' : '#3f3f46', width: 36 }} />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h1 className="mb-1 text-xl font-extrabold">Personal Information</h1>
            <p className="mb-6 text-sm" style={{ color: '#a8a29e' }}>Let the employer know who you are.</p>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={data.name} onChange={(e) => update('name', e.target.value)} className="mt-1" style={errors.name ? { borderColor: '#e11d48' } : undefined} placeholder="John Doe" />
                {errors.name && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Please enter your full name</p>}
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={data.email} onChange={(e) => update('email', e.target.value)} className="mt-1" style={errors.email ? { borderColor: '#e11d48' } : undefined} placeholder="john@example.com" />
                {errors.email && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Enter a valid email address</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" value={data.phone} onChange={(e) => update('phone', e.target.value)} className="mt-1" style={errors.phone ? { borderColor: '#e11d48' } : undefined} placeholder="+234 801 234 5678" />
                {errors.phone && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Please enter your phone number</p>}
              </div>
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input id="location" value={data.location} onChange={(e) => update('location', e.target.value)} className="mt-1" style={errors.location ? { borderColor: '#e11d48' } : undefined} placeholder="Lagos, Nigeria" />
                {errors.location && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Please enter your location</p>}
              </div>
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={() => go(2)}>Continue →</Button>
          </div>
        )}

        {step === 2 && (
          <div>
            <button onClick={() => go(1)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: '#a8a29e' }}>
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="mb-1 text-xl font-extrabold">Experience</h1>
            <p className="mb-6 text-sm" style={{ color: '#a8a29e' }}>Tell us about your work experience.</p>
            <div className="flex flex-col gap-4">
              <div>
                <Label htmlFor="role">Role *</Label>
                <Input id="role" value={data.role} onChange={(e) => update('role', e.target.value)} className="mt-1" style={errors.role ? { borderColor: '#e11d48' } : undefined} placeholder="Software Engineer" />
                {errors.role && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Enter the role you're applying for</p>}
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input id="company" value={data.company} onChange={(e) => update('company', e.target.value)} className="mt-1" style={errors.company ? { borderColor: '#e11d48' } : undefined} placeholder="Company name" />
                {errors.company && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Enter your current or last company</p>}
              </div>
              <div>
                <Label>Years of Experience *</Label>
                <Select value={data.years} onValueChange={(v) => update('years', v ?? '')}>
                  <SelectTrigger className="mt-1 w-full" style={errors.years ? { borderColor: '#e11d48' } : undefined}>
                    <SelectValue placeholder="Select years" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0–2 years</SelectItem>
                    <SelectItem value="3-5">3–5 years</SelectItem>
                    <SelectItem value="5-10">5–10 years</SelectItem>
                    <SelectItem value="10+">10+ years</SelectItem>
                  </SelectContent>
                </Select>
                {errors.years && <p className="mt-1 text-xs" style={{ color: '#e11d48' }}>Select your experience level</p>}
              </div>
              <div>
                <Label htmlFor="responsibilities">Responsibilities (optional)</Label>
                <textarea
                  id="responsibilities"
                  value={data.responsibilities}
                  onChange={(e) => update('responsibilities', e.target.value)}
                  className="mt-1 w-full resize-vertical rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.03)', borderColor: '#3f3f46', color: '#e7e5e4', minHeight: 80 }}
                  placeholder="Briefly describe your key responsibilities"
                  rows={3}
                />
              </div>
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={() => go(3)}>Continue →</Button>
          </div>
        )}

        {step === 3 && (
          <div>
            <button onClick={() => go(2)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: '#a8a29e' }}>
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="mb-1 text-xl font-extrabold">CV Upload</h1>
            <p className="mb-6 text-sm" style={{ color: '#a8a29e' }}>Upload your CV or resume. PDF, DOC, DOCX accepted.</p>
            <div
              onClick={() => fileRef.current?.click()}
              className="cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-all"
              style={{
                borderColor: data.cvFileName ? '#16a34a' : '#3f3f46',
                background: data.cvFileName ? 'rgba(22,163,74,0.04)' : 'transparent',
              }}
            >
              <Upload className="mx-auto mb-3 h-8 w-8" style={{ color: data.cvFileName ? '#16a34a' : '#71717a' }} />
              <p className="text-sm" style={{ color: '#a8a29e' }}>
                <span style={{ color: '#e7e5e4', fontWeight: 600 }}>Click to upload CV</span><br />or drag and drop
              </p>
              <p className="mt-1 text-xs" style={{ color: '#71717a' }}>PDF, DOC, DOCX accepted</p>
              {data.cvFileName && (
                <div className="mt-3 flex items-center justify-center gap-1.5 text-sm font-semibold" style={{ color: '#16a34a' }}>
                  <FileText className="h-4 w-4" /> {data.cvFileName}
                </div>
              )}
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
            </div>
            <Button className="mt-6 w-full" size="lg" onClick={() => go(4)}>Review →</Button>
          </div>
        )}

        {step === 4 && (
          <div>
            <button onClick={() => go(3)} className="mb-4 inline-flex items-center gap-1 text-sm font-semibold transition-colors" style={{ color: '#a8a29e' }}>
              <ChevronLeft className="h-4 w-4" /> Back
            </button>
            <h1 className="mb-1 text-xl font-extrabold">Review & Submit</h1>
            <p className="mb-6 text-sm" style={{ color: '#a8a29e' }}>Double-check your details before sending.</p>

            <div className="mb-4 rounded-xl border p-4" style={{ borderColor: '#3f3f46', background: '#18181b' }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#71717a' }}>
                  <User className="mr-1 inline h-3 w-3" /> Personal Info
                </span>
                <button onClick={() => go(1)} className="rounded-md px-2 py-1 text-xs font-semibold transition-colors" style={{ color: '#818cf8' }}>Edit</button>
              </div>
              {[['Name', data.name], ['Email', data.email], ['Phone', data.phone], ['Location', data.location]].map(([l, v]) => (
                <div key={l} className="flex border-b py-1.5 text-sm last:border-0" style={{ borderColor: '#27272a' }}>
                  <span className="w-20 flex-shrink-0 font-medium" style={{ color: '#71717a' }}>{l}</span>
                  <span style={{ color: '#e7e5e4' }}>{v || '—'}</span>
                </div>
              ))}
            </div>

            <div className="mb-4 rounded-xl border p-4" style={{ borderColor: '#3f3f46', background: '#18181b' }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#71717a' }}>
                  <Briefcase className="mr-1 inline h-3 w-3" /> Experience
                </span>
                <button onClick={() => go(2)} className="rounded-md px-2 py-1 text-xs font-semibold transition-colors" style={{ color: '#818cf8' }}>Edit</button>
              </div>
              {[['Role', data.role], ['Company', data.company], ['Years', data.years ? `${data.years} years` : '—'], ['Responsibilities', data.responsibilities || '—']].map(([l, v]) => (
                <div key={l} className="flex border-b py-1.5 text-sm last:border-0" style={{ borderColor: '#27272a' }}>
                  <span className="w-24 flex-shrink-0 font-medium" style={{ color: '#71717a' }}>{l}</span>
                  <span style={{ color: '#e7e5e4' }}>{v}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-xl border p-4" style={{ borderColor: '#3f3f46', background: '#18181b' }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#71717a' }}>
                  <Upload className="mr-1 inline h-3 w-3" /> CV Upload
                </span>
                <button onClick={() => go(3)} className="rounded-md px-2 py-1 text-xs font-semibold transition-colors" style={{ color: '#818cf8' }}>Edit</button>
              </div>
              <div className="flex py-1.5 text-sm">
                <span className="w-20 flex-shrink-0 font-medium" style={{ color: '#71717a' }}>File</span>
                <span style={{ color: data.cvFileName ? '#16a34a' : '#71717a' }}>{data.cvFileName || 'No file uploaded'}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={submit}>Submit Application</Button>
          </div>
        )}
      </div>
    </div>
  );
}
