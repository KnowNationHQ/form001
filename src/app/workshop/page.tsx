'use client'

import { useState, useCallback, useRef } from 'react'
import { ChevronLeft, Ticket, Star, Diamond, Minus, Plus, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const PASSES = [
  { tier: 'General Admission', price: 5000, desc: 'Full workshop access. Standard seating.', icon: Ticket },
  { tier: 'VIP', price: 15000, desc: 'Priority seating + meet & greet + swag bag.', icon: Star },
  { tier: 'Premium', price: 30000, desc: 'All-access pass + VIP lounge + 1-on-1 session.', icon: Diamond },
]

const WA_NUMBER = '2349027258258'

type TicketState = { tier: string; price: number; qty: number }

export default function WorkshopPage() {
  const [step, setStep] = useState(1)
  const [tickets, setTickets] = useState<TicketState[]>(
    PASSES.map((p) => ({ tier: p.tier, price: p.price, qty: 0 }))
  )
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<Record<string, boolean>>({})
  const [submitted, setSubmitted] = useState(false)
  const confettiRef = useRef<HTMLDivElement>(null)

  const total = tickets.reduce((s, t) => s + t.price * t.qty, 0)
  const totalQty = tickets.reduce((s, t) => s + t.qty, 0)

  const updateQty = useCallback((idx: number, delta: number) => {
    setTickets((prev) =>
      prev.map((t, i) => (i === idx ? { ...t, qty: Math.max(0, t.qty + delta) } : t))
    )
  }, [])

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

  const goNext = useCallback(() => {
    if (step === 1) {
      if (total === 0) return
      setStep(2)
    } else if (step === 2) {
      const errs: Record<string, boolean> = {}
      if (!name.trim()) errs.name = true
      if (!email.trim() || !validateEmail(email.trim())) errs.email = true
      if (!phone.trim()) errs.phone = true
      setErrors(errs)
      if (Object.keys(errs).length > 0) return
      setStep(3)
    }
  }, [step, total, name, email, phone])

  const goBack = useCallback(() => setStep((s) => Math.max(1, s - 1)), [])

  const selectedTickets = tickets.filter((t) => t.qty > 0)

  const buildWhatsAppMessage = () => {
    let msg = '*New Registration — Workshop*\n'
    msg += '═══════════════════════\n\n'
    msg += `*${name}*\n`
    msg += `${email}\n`
    msg += `${phone}\n\n`
    msg += '━ *Order* ━━━━━━━━━━━\n'
    selectedTickets.forEach(
      (t) => (msg += `• ${t.tier}  ×${t.qty}  ₦${(t.price * t.qty).toLocaleString()}\n`)
    )
    msg += '\n━━━━━━━━━━━━━━━━━━\n'
    msg += `*Total: ₦${total.toLocaleString()}*`
    return encodeURIComponent(msg)
  }

  const handleSubmit = () => {
    setSubmitted(true)
    if (confettiRef.current) {
      confettiRef.current.innerHTML = ''
      for (let i = 0; i < 40; i++) {
        const el = document.createElement('div')
        el.className = 'confetti-piece'
        el.style.left = Math.random() * 100 + '%'
        el.style.background =
          ['#06B6D4', '#0891B2', '#22D3EE', '#67E8F9', '#FCD34D', '#A78BFA'][i % 6]
        el.style.animationDelay = Math.random() * 0.6 + 's'
        el.style.animationDuration = 1.5 + Math.random() * 1.5 + 's'
        confettiRef.current.appendChild(el)
      }
    }
  }

  const resetForm = () => {
    setTickets(PASSES.map((p) => ({ tier: p.tier, price: p.price, qty: 0 })))
    setName('')
    setEmail('')
    setPhone('')
    setErrors({})
    setSubmitted(false)
    setStep(1)
  }

  const stepDots = (current: number) => (
    <div className="flex justify-center gap-2 mb-7">
      {[1, 2, 3].map((n) => (
        <div
          key={n}
          className={`h-2 rounded-full transition-all duration-300 ${
            n === current
              ? 'w-6 bg-cyan-500'
              : n < current
                ? 'w-2 bg-cyan-500'
                : 'w-2 bg-zinc-700'
          }`}
        />
      ))}
    </div>
  )

  const fadeClass = (s: number) =>
    step === s ? 'block animate-fade-slide' : 'hidden'

  return (
    <div className="min-h-dvh bg-[#0c0a09] text-[#e7e5e4] flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-[448px]">
        <div className="text-center mb-5 pt-2">
          <p className="text-cyan-400 text-[13px] font-semibold tracking-[3px] uppercase">
            Prime Event
          </p>
          <h1 className="text-2xl font-extrabold mt-1">Workshop Registration</h1>
        </div>

        {stepDots(step)}

        {/* Live Preview */}
        {totalQty > 0 && !submitted && (
          <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 mb-5 animate-fade-up">
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Tickets</span>
              <span className="text-sm font-bold text-zinc-100">{totalQty}</span>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            <div className="flex items-center gap-1.5 flex-1">
              <span className="text-xs text-zinc-500 font-medium">Total</span>
              <span className="text-sm font-bold text-cyan-400">
                ₦{total.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Step 1: Pass Selection */}
        <div className={fadeClass(1)}>
          <p className="text-lg font-bold">Select your pass</p>
          <p className="text-sm text-zinc-500 mt-0.5 mb-5">
            Choose your tier and how many tickets.
          </p>

          <div className="space-y-3">
            {PASSES.map((pass, idx) => {
              const Icon = pass.icon
              const qty = tickets[idx].qty
              return (
                <div
                  key={pass.tier}
                  className={`rounded-2xl border p-5 transition-all duration-200 ${
                    qty > 0
                      ? 'border-cyan-500/50 bg-cyan-500/5'
                      : 'border-zinc-800 bg-zinc-900/50 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Icon className="h-6 w-6 text-cyan-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-base font-semibold">{pass.tier}</p>
                        <p className="text-xs text-zinc-500 mt-0.5">{pass.desc}</p>
                      </div>
                    </div>
                    <p className="text-2xl font-extrabold text-cyan-400 shrink-0 ml-3">
                      ₦{pass.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3.5 mt-4">
                    <button
                      onClick={() => updateQty(idx, -1)}
                      disabled={qty === 0}
                      className="w-11 h-11 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-lg font-semibold text-zinc-100 hover:border-cyan-500 hover:text-cyan-400 transition-all active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="text-xl font-bold min-w-[28px] text-center text-zinc-100">
                      {qty}
                    </span>
                    <button
                      onClick={() => updateQty(idx, 1)}
                      className="w-11 h-11 rounded-full border border-zinc-700 bg-zinc-900 flex items-center justify-center text-lg font-semibold text-zinc-100 hover:border-cyan-500 hover:text-cyan-400 transition-all active:scale-95"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-between items-center bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 mt-5">
            <span className="text-sm text-zinc-500 font-medium">Total</span>
            <span className="text-2xl font-extrabold text-cyan-400">
              ₦{total.toLocaleString()}
            </span>
          </div>

          <Button
            onClick={goNext}
            disabled={total === 0}
            className="w-full mt-4 h-12 rounded-xl text-base font-bold cursor-pointer"
          >
            Continue
          </Button>
        </div>

        {/* Step 2: Attendee Details */}
        <div className={fadeClass(2)}>
          <button
            onClick={goBack}
            className="flex items-center gap-1.5 text-sm text-zinc-500 font-medium pb-2 hover:text-zinc-300 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>

          <p className="text-lg font-bold mt-1">Your details</p>
          <p className="text-sm text-zinc-500 mt-0.5 mb-5">
            We&apos;ll send your tickets and event info here.
          </p>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: false })) }}
                placeholder="Full name"
                className={`h-12 rounded-xl bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 ${
                  errors.name ? 'border-red-500' : ''
                }`}
              />
              {errors.name && (
                <p className="text-xs text-red-400">Please enter your name</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: false })) }}
                placeholder="Email address"
                className={`h-12 rounded-xl bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 ${
                  errors.email ? 'border-red-500' : ''
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-400">Please enter a valid email</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: false })) }}
                placeholder="Phone number"
                className={`h-12 rounded-xl bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-600 ${
                  errors.phone ? 'border-red-500' : ''
                }`}
              />
              {errors.phone && (
                <p className="text-xs text-red-400">Please enter your phone number</p>
              )}
            </div>
          </div>

          <Button onClick={goNext} className="w-full mt-6 h-12 rounded-xl text-base font-bold cursor-pointer">
            Review Order
          </Button>
        </div>

        {/* Step 3: Review & Submit */}
        <div className={fadeClass(3)}>
          {!submitted ? (
            <>
              <button
                onClick={goBack}
                className="flex items-center gap-1.5 text-sm text-zinc-500 font-medium pb-2 hover:text-zinc-300 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </button>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>

                <p className="text-lg font-extrabold mb-1">Review your order</p>
                <p className="text-sm text-zinc-500 mb-4">
                  Review your details and send them to the organizer to complete payment.
                </p>

                <div className="h-px bg-zinc-800 my-4" />

                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.8px] mb-2.5">
                  Order Summary
                </p>
                <div className="space-y-2">
                  {selectedTickets.map((t) => (
                    <div key={t.tier} className="flex justify-between items-center">
                      <span className="text-sm">
                        {t.tier}{' '}
                        <span className="text-zinc-500">x{t.qty}</span>
                      </span>
                      <span className="text-sm font-semibold">
                        ₦{(t.price * t.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-zinc-800 my-4" />

                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.8px]">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-cyan-400">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <div className="h-px bg-zinc-800 my-4" />

                <div className="text-sm text-zinc-500">
                  <span className="text-zinc-100">{email}</span>
                  <span className="mx-2">&middot;</span>
                  <span className="text-zinc-100">{phone}</span>
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full mt-5 h-12 rounded-xl text-base font-bold cursor-pointer"
                >
                  Confirm &amp; Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <div ref={confettiRef} className="confetti-container" />

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-7 text-center mt-2">
                <div className="w-14 h-14 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                </div>

                <p className="text-xl font-extrabold mb-1">Order confirmed</p>
                <p className="text-sm text-zinc-500 mb-4">
                  Thanks, <strong className="text-zinc-100">{name}</strong>. Review your details
                  and send them to the organizer to complete payment.
                </p>

                <div className="h-px bg-zinc-800 my-4" />

                <p className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.8px] mb-2.5 text-left">
                  Order Summary
                </p>
                <div className="space-y-2 text-left">
                  {selectedTickets.map((t) => (
                    <div key={t.tier} className="flex justify-between items-center">
                      <span className="text-sm">
                        {t.tier}{' '}
                        <span className="text-zinc-500">x{t.qty}</span>
                      </span>
                      <span className="text-sm font-semibold">
                        ₦{(t.price * t.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-zinc-800 my-4" />

                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-[0.8px]">
                    Total
                  </span>
                  <span className="text-xl font-extrabold text-cyan-400">
                    ₦{total.toLocaleString()}
                  </span>
                </div>

                <div className="h-px bg-zinc-800 my-4" />

                <div className="text-sm text-zinc-500">
                  <span className="text-zinc-100">{email}</span>
                  <span className="mx-2">&middot;</span>
                  <span className="text-zinc-100">{phone}</span>
                </div>

                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full mt-5 h-13 rounded-xl bg-[#25D366] text-white text-base font-bold hover:bg-[#20bd5a] transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(37,211,102,0.3)] active:scale-[0.97]"
                >
                  <Send className="h-5 w-5" />
                  Pay on WhatsApp
                </a>
                <p className="text-[11px] text-zinc-600 text-center mt-2">
                  Tap to send your details and complete payment via WhatsApp
                </p>
              </div>

              <Button
                variant="outline"
                onClick={resetForm}
                className="w-full mt-3.5 h-12 rounded-xl text-sm font-semibold border-zinc-700 text-zinc-500 hover:border-cyan-500 hover:text-cyan-400 cursor-pointer"
              >
                Register another
              </Button>
            </>
          )}
        </div>

        <div className="opacity-10 select-none pointer-events-none text-center pt-10 pb-4">
          <span className="text-[9px] tracking-widest uppercase text-zinc-500">
            Project by Know Nation Limited
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-slide {
          from {
            opacity: 0;
            transform: translateY(18px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-slide {
          animation: fade-slide 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 0.35s ease-out both;
        }
        .confetti-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 100;
          overflow: hidden;
        }
        .confetti-piece {
          position: absolute;
          top: -10px;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          animation: confetti-fall ease-out forwards;
        }
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg) scale(0.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
