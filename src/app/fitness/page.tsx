'use client'

import { useState, type FormEvent } from 'react'
import { ChevronLeft, Dumbbell, Flame, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const WA_NUMBER = '2348012345678'

const goals = [
  { key: 'Gain Lean Muscle', Icon: Dumbbell, sub: 'Strength & hypertrophy focused' },
  { key: 'Lose Body Fat', Icon: Flame, sub: 'Metabolic conditioning & nutrition' },
  { key: 'Athletic Performance', Icon: Zap, sub: 'Speed, power & endurance' },
] as const

const freqs = [
  { key: '2-3 Days', badge: 'Foundation' },
  { key: '4-5 Days', badge: 'Dedicated' },
  { key: '6 Days', badge: 'Elite' },
] as const

function validateEmail(e: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)
}

function fireConfetti() {
  const colors = ['#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#e7e5e4', '#f5f5f4']
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div')
    el.style.cssText = `position:fixed;width:${Math.random() * 6 + 4}px;height:${Math.random() * 6 + 4}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};pointer-events:none;z-index:60;left:${Math.random() * 100}vw;background:${colors[Math.floor(Math.random() * colors.length)]};animation:confettiFall ${Math.random() * 2 + 1.5}s linear ${Math.random() * 1.2}s forwards`
    document.body.appendChild(el)
    setTimeout(() => el.remove(), 4000)
  }
}

export default function FitnessPage() {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [goal, setGoal] = useState('')
  const [freq, setFreq] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [selectedGoal, setSelectedGoal] = useState('')
  const [selectedFreq, setSelectedFreq] = useState('')

  const waLink = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Hi! I'm interested in your fitness program.\n\n*Goal:* ${goal}\n*Commitment:* ${freq}\n*Name:* ${name}\n*Email:* ${email}`)}`

  const selectGoal = (key: string) => {
    setGoal(key)
    setSelectedGoal(key)
    setTimeout(() => setStep(2), 200)
  }

  const selectFreq = (key: string) => {
    setFreq(key)
    setSelectedFreq(key)
    setTimeout(() => setStep(3), 200)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const n = name.trim()
    const em = email.trim()
    let valid = true
    setNameError(false)
    setEmailError(false)
    if (!n) { setNameError(true); valid = false }
    if (!em || !validateEmail(em)) { setEmailError(true); valid = false }
    if (!valid) return
    setSubmitted(true)
    fireConfetti()
  }

  const stepDots = (n: number) => (
    <div className="flex justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-2 rounded-full transition-all duration-300 ${
            s === n ? 'w-6 bg-lime-400' : s < n ? 'w-2 bg-lime-400' : 'w-2 bg-stone-800'
          }`}
        />
      ))}
    </div>
  )

  return (
    <div className="min-h-dvh bg-[#0c0a09] flex flex-col items-center justify-center p-4 font-sans antialiased">
      {submitted ? (
        <div className="fixed inset-0 bg-[#0c0a09] flex items-center justify-center z-50 p-6 animate-[fadeIn_0.4s_ease-out]">
          <div className="text-center max-w-sm w-full">
            <div className="w-[72px] h-[72px] rounded-full bg-lime-400/12 flex items-center justify-center mx-auto mb-6 pulse-ring">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 className="text-stone-200 text-2xl font-extrabold mb-2">
              You're In, <span className="text-lime-400">{name}</span>
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              We'll be in touch soon. A confirmation email is on its way.
            </p>
            <div className="bg-stone-900 rounded-2xl p-5 text-left border border-stone-800 mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-lime-400/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone-200 text-sm font-semibold">Goal</p>
                  <p className="text-stone-600 text-xs">{goal}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-lime-400/10 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-stone-200 text-sm font-semibold">Commitment</p>
                  <p className="text-stone-600 text-xs">{freq.replace('-', '–')} / week</p>
                </div>
              </div>
            </div>
            <p className="text-stone-600 text-xs mb-5">A confirmation email will be sent to <span className="text-stone-200">{email}</span></p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-lime-400 text-[#0c0a09] text-sm font-bold hover:bg-lime-400/90 transition-all"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Send via WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-[448px] text-center mb-8">
            <span className="text-lime-400 text-sm font-semibold tracking-widest uppercase">Prime Athlete</span>
            <h1 className="text-stone-200 text-2xl font-extrabold mt-1">Client Registration</h1>
          </div>

          {stepDots(step)}

          {step === 1 && (
            <div className="w-full max-w-[448px] animate-[fadeSlideIn_0.35s_ease-out]">
              <p className="text-stone-200 text-lg font-semibold mb-1">What's your goal?</p>
              <p className="text-stone-600 text-sm mb-5">Pick the target that fires you up.</p>
              <div className="grid grid-cols-1 gap-3">
                {goals.map(({ key, Icon, sub }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectGoal(key)}
                    className={`w-full p-5 rounded-2xl border-1.5 text-base font-semibold cursor-pointer min-h-[50px] text-center leading-tight transition-all duration-200 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] ${
                      selectedGoal === key
                        ? 'border-lime-400 bg-lime-400/5 text-stone-200'
                        : 'border-stone-800 bg-stone-900 text-stone-200 hover:border-lime-400 hover:bg-lime-400/5'
                    }`}
                  >
                    <span className="block mb-2">
                      <Icon className="w-8 h-8 text-lime-400 mx-auto" strokeWidth={1.5} />
                    </span>
                    {key}
                    <span className="block text-[13px] font-normal text-stone-500 mt-1">{sub}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="w-full max-w-[448px] animate-[fadeSlideIn_0.35s_ease-out]">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="bg-none border-none text-stone-500 text-sm font-medium cursor-pointer p-0 min-h-[48px] inline-flex items-center gap-1.5 [-webkit-tap-highlight-color:transparent] hover:text-stone-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                Back
              </button>
              <p className="text-stone-200 text-lg font-semibold mb-1 mt-2">Commitment level</p>
              <p className="text-stone-600 text-sm mb-5">How many days per week can you train?</p>
              <div className="grid grid-cols-1 gap-3">
                {freqs.map(({ key, badge }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectFreq(key)}
                    className={`w-full p-[18px] rounded-xl border-1.5 text-base font-semibold cursor-pointer min-h-[50px] text-center transition-all duration-200 active:scale-[0.97] [-webkit-tap-highlight-color:transparent] ${
                      selectedFreq === key
                        ? 'border-lime-400 bg-lime-400/5 text-stone-200'
                        : 'border-stone-800 bg-stone-900 text-stone-200 hover:border-lime-400 hover:bg-lime-400/5'
                    }`}
                  >
                    {key.replace('-', '–')}
                    <span className="inline-block bg-stone-800 text-lime-400 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">{badge}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <form onSubmit={handleSubmit} className="w-full max-w-[448px] animate-[fadeSlideIn_0.35s_ease-out]">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="bg-none border-none text-stone-500 text-sm font-medium cursor-pointer p-0 min-h-[48px] inline-flex items-center gap-1.5 [-webkit-tap-highlight-color:transparent] hover:text-stone-200 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                Back
              </button>
              <p className="text-stone-200 text-lg font-semibold mb-1 mt-2">You're almost there</p>
              <p className="text-stone-600 text-sm mb-5">Drop your details and let's get after it.</p>
              <div className="space-y-4">
                <div>
                  <Input
                    placeholder="Full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`flex h-auto w-full py-4 px-[18px] rounded-xl border text-[#f5f5f4] text-base outline-none transition-colors placeholder:text-stone-600 focus-visible:border-lime-400 focus-visible:ring-0 bg-stone-900 ${
                      nameError ? 'border-red-500' : 'border-stone-800'
                    }`}
                  />
                  {nameError && <p className="text-red-500 text-[13px] mt-1">Please enter your name</p>}
                </div>
                <div>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`flex h-auto w-full py-4 px-[18px] rounded-xl border text-[#f5f5f4] text-base outline-none transition-colors placeholder:text-stone-600 focus-visible:border-lime-400 focus-visible:ring-0 bg-stone-900 ${
                      emailError ? 'border-red-500' : 'border-stone-800'
                    }`}
                  />
                  {emailError && <p className="text-red-500 text-[13px] mt-1">Please enter a valid email</p>}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full mt-6 h-auto py-4 rounded-xl bg-lime-400 text-[#0c0a09] text-[17px] font-bold cursor-pointer min-h-[50px] transition-all hover:bg-lime-400/90 active:scale-[0.97] border-0"
              >
                Get Started
              </Button>
            </form>
          )}

          <div className="w-full max-w-[448px] mx-auto mt-8 opacity-[0.12] select-none pointer-events-none text-center">
            <p className="text-[9px] tracking-widest uppercase text-stone-200">Project by Know Nation Limited</p>
          </div>
        </>
      )}

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes confettiFall {
          0% { opacity: 1; transform: translateY(-10px) rotate(0deg); }
          100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
        @keyframes pulseRing {
          0% { box-shadow: 0 0 0 0 rgba(163, 231, 53, 0.3); }
          70% { box-shadow: 0 0 0 20px rgba(163, 231, 53, 0); }
          100% { box-shadow: 0 0 0 0 rgba(163, 231, 53, 0); }
        }
        .pulse-ring { animation: pulseRing 2s ease-out infinite; }
      `}</style>
    </div>
  )
}
