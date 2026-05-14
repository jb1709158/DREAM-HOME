/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  User, 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  Info, 
  ChevronRight, 
  ChevronLeft, 
  Copy, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Calendar,
  DollarSign,
  Globe2,
  MapPin,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react';

// --- Types ---

type Step = 'personal' | 'payment' | 'confirmation';

interface FormData {
  desiredMoveInDate: string;
  applicantType: 'tenant' | 'guarantor';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  dateOfBirth: string;
  annualIncome: string;
  ssn: string;
}

// --- Components ---

export default function App() {
  const [step, setStep] = useState<Step>('personal');
  const [formData, setFormData] = useState<FormData>({
    desiredMoveInDate: '',
    applicantType: 'tenant',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    dateOfBirth: '',
    annualIncome: '',
    ssn: '',
  });

  const nextStep = () => {
    if (step === 'personal') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
  };

  const prevStep = () => {
    if (step === 'payment') setStep('personal');
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-bg transition-colors duration-500">
      {/* Navigation / Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-brand-border bg-brand-card/30 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center font-bold text-brand-bg text-2xl shadow-lg shadow-brand-accent/20">
            D
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold text-white tracking-tight leading-none">
              Dream Home <span className="text-brand-accent font-light">Rentals</span>
            </span>
            <span className="text-[10px] text-brand-text-muted uppercase tracking-[0.2em] mt-1 font-bold">
              Secure Application Portal
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-300">FastNode Connected</span>
          </div>
          <div className="px-3 py-1 bg-brand-border rounded-lg text-[10px] font-bold text-slate-300 tracking-wider">
            ID: #8821-XP
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-10">
        <div className="w-full max-w-5xl space-y-8">
          {/* Progress Stepper */}
          <div className="flex items-center justify-center space-x-6 mb-8 max-w-2xl mx-auto">
            <StepIndicator currentStep={step} stepId="personal" label="Application" icon={User} />
            <div className={`flex-1 h-[2px] transition-colors duration-500 ${step === 'personal' ? 'bg-brand-border' : 'bg-brand-accent'}`} />
            <StepIndicator currentStep={step} stepId="payment" label="Fee Deposit" icon={CreditCard} />
            <div className={`flex-1 h-[2px] transition-colors duration-500 ${step === 'confirmation' ? 'bg-brand-accent' : 'bg-brand-border'}`} />
            <StepIndicator currentStep={step} stepId="confirmation" label="Finalizing" icon={ShieldCheck} />
          </div>

          {/* Main Card */}
          <motion.div 
            layout
            className="glass-morphism relative overflow-hidden"
          >
            {/* Ambient Background Glows */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-accent/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-accent/5 blur-[80px] rounded-full" />

            <div className="relative p-6 md:p-12">
              <AnimatePresence mode="wait">
                {step === 'personal' && (
                  <PersonalDetailsStep 
                    formData={formData} 
                    setFormData={setFormData} 
                    onNext={nextStep} 
                  />
                )}
                
                {step === 'payment' && (
                  <PaymentStep 
                    onNext={nextStep} 
                    onBack={prevStep} 
                  />
                )}

                {step === 'confirmation' && (
                  <ConfirmationStep />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-20 border-t border-brand-border bg-brand-card/30 backdrop-blur-md flex items-center justify-between px-6 md:px-10">
        <div className="hidden sm:flex gap-8">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <div className="w-5 h-5 bg-emerald-500/10 text-emerald-500 rounded flex items-center justify-center border border-emerald-500/20">✓</div>
            SSL Secured
          </div>
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
            <div className="w-5 h-5 bg-cyan-500/10 text-cyan-500 rounded flex items-center justify-center border border-cyan-500/20">✓</div>
            Encrypted Transaction
          </div>
        </div>
        <div className="text-[10px] text-slate-500 font-bold tracking-[0.2em] uppercase">
          Powered by Dream Home Labs © 2024
        </div>
      </footer>
    </div>
  );
}

function StepIndicator({ currentStep, stepId, label, icon: Icon }: { 
  currentStep: Step, 
  stepId: Step, 
  label: string, 
  icon: any 
}) {
  const stepsOrder: Step[] = ['personal', 'payment', 'confirmation'];
  const currentIndex = stepsOrder.indexOf(currentStep);
  const stepIndex = stepsOrder.indexOf(stepId);
  const isActive = stepIndex <= currentIndex;

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
        isActive ? 'bg-brand-accent text-white' : 'bg-brand-border text-gray-600'
      }`}>
        <Icon className="w-4 h-4" />
      </div>
      <span className={`hidden md:block text-xs font-bold uppercase tracking-widest ${
        isActive ? 'text-white' : 'text-gray-600'
      }`}>
        {label}
      </span>
    </div>
  );
}

// --- Steps ---

function PersonalDetailsStep({ 
  formData, 
  setFormData, 
  onNext 
}: { 
  formData: FormData, 
  setFormData: React.Dispatch<React.SetStateAction<FormData>>,
  onNext: () => void 
}) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      {/* Top Banner */}
      <div className="bg-brand-accent/10 border-l-4 border-brand-accent p-4 rounded-r-lg space-y-2">
        <div className="flex items-center space-x-2 text-brand-accent font-medium">
          <Info className="w-4 h-4" />
          <span>Complete the rental application, and we will get in touch with you soon.</span>
        </div>
        <div className="flex items-center space-x-2 text-emerald-400 text-sm">
          <CheckCircle2 className="w-4 h-4" />
          <span>You are applying to rent: Each resident over 18 must submit a separate rental application.</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Desired Move-in Date */}
        <div className="md:col-span-2">
          <label className="label flex items-center space-x-2">
            <Calendar className="w-3 h-3" />
            <span>Desired Move-In Date</span>
          </label>
          <input 
            type="date" 
            className="input-field" 
            value={formData.desiredMoveInDate}
            onChange={e => setFormData({...formData, desiredMoveInDate: e.target.value})}
          />
        </div>

        {/* Applicant Type */}
        <div className="md:col-span-2 bg-brand-bg/30 p-4 rounded-xl border border-brand-border space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="radio" 
                  className="peer hidden" 
                  name="type" 
                  checked={formData.applicantType === 'tenant'}
                  onChange={() => setFormData({...formData, applicantType: 'tenant'})}
                />
                <div className="w-5 h-5 rounded-full border-2 border-brand-border peer-checked:border-brand-accent transition-all" />
                <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-brand-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">I am applying as a tenant — I will be living on the property.</span>
              </div>
            </label>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className="relative">
                <input 
                  type="radio" 
                  className="peer hidden" 
                  name="type" 
                  checked={formData.applicantType === 'guarantor'}
                  onChange={() => setFormData({...formData, applicantType: 'guarantor'})}
                />
                <div className="w-5 h-5 rounded-full border-2 border-brand-border peer-checked:border-brand-accent transition-all" />
                <div className="absolute top-1 left-1 w-3 h-3 rounded-full bg-brand-accent opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <div className="space-y-0.5">
                <span className="text-sm font-medium text-white group-hover:text-brand-accent transition-colors">I am applying as a guarantor/co-signer — I will not live on the property.</span>
              </div>
            </label>
          </div>
        </div>

        {/* Name Fields */}
        <div>
          <label className="label">First Name</label>
          <input 
            type="text" 
            placeholder="James" 
            className="input-field"
            value={formData.firstName}
            onChange={e => setFormData({...formData, firstName: e.target.value})}
          />
        </div>
        <div>
          <label className="label">Last Name</label>
          <input 
            type="text" 
            placeholder="Whitmore" 
            className="input-field"
            value={formData.lastName}
            onChange={e => setFormData({...formData, lastName: e.target.value})}
          />
        </div>

        {/* Contact info */}
        <div>
          <label className="label flex items-center space-x-2">
            <Mail className="w-3 h-3" />
            <span>Email Address</span>
          </label>
          <input 
            type="email" 
            placeholder="hello@dreamhome.com" 
            className="input-field"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="label flex items-center space-x-2">
            <Smartphone className="w-3 h-3" />
            <span>Phone / Mobile</span>
          </label>
          <input 
            type="tel" 
            placeholder="(212) 555-1234" 
            className="input-field"
            value={formData.phone}
            onChange={e => setFormData({...formData, phone: e.target.value})}
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="label flex items-center space-x-2">
            <MapPin className="w-3 h-3" />
            <span>Street Address</span>
          </label>
          <input 
            type="text" 
            placeholder="850 Park Avenue" 
            className="input-field"
            value={formData.streetAddress}
            onChange={e => setFormData({...formData, streetAddress: e.target.value})}
          />
        </div>

        <div>
          <label className="label">City</label>
          <input 
            type="text" 
            placeholder="Austin" 
            className="input-field"
            value={formData.city}
            onChange={e => setFormData({...formData, city: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">State</label>
            <input 
              type="text" 
              placeholder="Texas" 
              className="input-field"
              value={formData.state}
              onChange={e => setFormData({...formData, state: e.target.value})}
            />
          </div>
          <div>
            <label className="label">Zip Code</label>
            <input 
              type="text" 
              placeholder="78701" 
              className="input-field"
              value={formData.zipCode}
              onChange={e => setFormData({...formData, zipCode: e.target.value})}
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="label flex items-center space-x-2">
            <Globe2 className="w-3 h-3" />
            <span>Country</span>
          </label>
          <select 
            className="input-field appearance-none cursor-pointer"
            value={formData.country}
            onChange={e => setFormData({...formData, country: e.target.value})}
          >
            <option value="">Select country</option>
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
          </select>
        </div>

        {/* Additional Details */}
        <div>
          <label className="label">Date of Birth</label>
          <input 
            type="date" 
            className="input-field"
            value={formData.dateOfBirth}
            onChange={e => setFormData({...formData, dateOfBirth: e.target.value})}
          />
        </div>
        <div>
          <label className="label flex items-center space-x-2">
            <DollarSign className="w-3 h-3" />
            <span>Annual Income (USD)</span>
          </label>
          <input 
            type="text" 
            placeholder="82,000" 
            className="input-field"
            value={formData.annualIncome}
            onChange={e => setFormData({...formData, annualIncome: e.target.value})}
          />
        </div>

        <div className="md:col-span-2">
          <label className="label">Social Security Number (SSN)</label>
          <input 
            type="password" 
            placeholder="XXX-XX-XXXX" 
            className="input-field"
            value={formData.ssn}
            onChange={e => setFormData({...formData, ssn: e.target.value})}
          />
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-accent/20 transition-all duration-200 flex items-center justify-center space-x-2 group"
      >
        <span>Proceed to Payment</span>
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}

function PaymentStep({ onNext, onBack }: { onNext: () => void, onBack: () => void }) {
  const [copied, setCopied] = useState(false);
  const USDT_ADDRESS = "TK6UTELrWnfsTwQ7Kr1Rtpt8YanVSxWjyM";

  const handleCopy = () => {
    navigator.clipboard.writeText(USDT_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="flex flex-col lg:flex-row -m-6 md:-m-12"
    >
      {/* Left Panel - Selection & Info */}
      <div className="lg:w-1/2 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-brand-border">
        <h2 className="text-3xl font-display font-bold text-white mb-8 tracking-tight">Fee Deposit</h2>
        
        <div className="space-y-8">
          {/* Coin Selection */}
          <div>
            <label className="label">Select Asset</label>
            <div className="flex items-center justify-between p-4 bg-brand-bg/50 border border-brand-accent/50 ring-1 ring-brand-accent/10 rounded-2xl cursor-default transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-emerald-500/20 text-xl">₮</div>
                <div>
                  <div className="font-bold text-white text-lg">USDT</div>
                  <div className="text-xs text-brand-text-muted">Tether USD</div>
                </div>
              </div>
              <div className="text-brand-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
          </div>

          {/* Network Selection */}
          <div>
            <label className="label">Select Network</label>
            <div className="flex items-center justify-between p-4 bg-brand-bg/50 border border-brand-accent/50 ring-1 ring-brand-accent/10 rounded-2xl cursor-default transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-red-500/20 text-xs">TRX</div>
                <div>
                  <div className="font-bold text-white text-lg">Tron (TRC20)</div>
                  <div className="text-xs text-brand-text-muted">Recommended for speed</div>
                </div>
              </div>
              <div className="text-brand-accent">
                <CheckCircle2 className="w-6 h-6" />
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 italic font-medium leading-relaxed">
              * Ensure you select the correct TRC20 network on your exchange or wallet to prevent fund loss.
            </p>
          </div>

          {/* Order Summary */}
          <div className="pt-8 border-t border-brand-border space-y-4">
            <div className="flex items-center space-x-2 text-amber-400 mb-2">
              <Lock className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Secure Payment Section</span>
            </div>
            
            <div className="bg-brand-accent/5 border border-brand-accent/20 p-4 rounded-xl space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium">Application Fee</span>
                <span className="text-white font-bold">$30.00 USD</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-medium font-bold">Nature</span>
                <span className="text-brand-accent font-bold">Refundable</span>
              </div>
              <div className="text-[10px] text-slate-500 italic mt-2">
                * Refundable processing fee: $30 (authorization hold)
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-y border-brand-border/50">
              <span className="text-slate-300 font-bold uppercase tracking-wider text-xs">Total Payable</span>
              <div className="text-right">
                <div className="text-white font-black text-xl">30.00 USDT</div>
                <div className="text-[10px] text-emerald-400 font-bold uppercase">No Processing Fees</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Address & QR */}
      <div className="lg:w-1/2 p-6 md:p-12 bg-brand-accent/[0.02]">
        <div className="flex flex-col items-center justify-center h-full max-w-sm mx-auto">
          {/* QR Code Placeholder Style */}
          <div className="w-52 h-52 bg-white p-3 rounded-3xl mb-8 flex items-center justify-center shadow-2xl relative group">
            <div className="w-full h-full relative grid grid-cols-4 grid-rows-4 gap-1.5 p-1">
               <div className="bg-slate-950 rounded-[2px]"></div><div className="bg-slate-950 rounded-[2px]"></div><div className=""></div><div className="bg-slate-950 rounded-[2px]"></div>
               <div className="bg-slate-950 rounded-[2px]"></div><div className=""></div><div className="bg-slate-950 rounded-[2px]"></div><div className="bg-slate-950 rounded-[2px]"></div>
               <div className=""></div><div className="bg-slate-950 rounded-[2px]"></div><div className="bg-slate-950 rounded-[2px]"></div><div className=""></div>
               <div className="bg-slate-950 rounded-[2px]"></div><div className="bg-slate-950 rounded-[2px]"></div><div className=""></div><div className="bg-slate-950 rounded-[2px]"></div>
               
               <div className="absolute top-0 left-0 w-12 h-12 border-4 border-slate-950 rounded-[4px]"></div>
               <div className="absolute top-0 right-0 w-12 h-12 border-4 border-slate-950 rounded-[4px]"></div>
               <div className="absolute bottom-0 left-0 w-12 h-12 border-4 border-slate-950 rounded-[4px]"></div>
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-8 h-8 bg-white p-1 rounded-lg">
                   <div className="w-full h-full bg-brand-accent rounded-[2px]"></div>
                 </div>
               </div>
            </div>
          </div>

          <label className="label mb-4">Deposit Address (TRC20)</label>
          <div className="w-full bg-brand-bg border border-brand-border rounded-2xl p-4 mb-8 shadow-inner">
            <div className="text-brand-accent font-mono text-sm break-all leading-relaxed text-center font-bold px-2">
              {USDT_ADDRESS}
            </div>
          </div>

          <div className="w-full space-y-4">
            <button 
              onClick={handleCopy}
              className="w-full py-4 bg-brand-accent hover:bg-brand-accent/90 text-brand-bg font-bold rounded-2xl transition-all shadow-xl shadow-brand-accent/20 flex items-center justify-center gap-3 active:scale-95"
            >
              {copied ? <CheckCircle2 className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied ? 'Address Copied!' : 'Copy Deposit Address'}</span>
            </button>
            
            <button 
              onClick={onNext}
              className="w-full py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center border border-white/5"
            >
              Confirm Transaction
            </button>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            Waiting for blockchain confirmation...
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ConfirmationStep() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8 py-10"
    >
      <div className="relative inline-block">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto"
        >
          <CheckCircle2 className="w-12 h-12 text-emerald-500" />
        </motion.div>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-emerald-500/10 rounded-full"
        />
      </div>

      <div className="space-y-2">
        <h2 className="text-3xl font-display font-bold text-white">Payment Received</h2>
        <p className="text-brand-text-muted max-w-md mx-auto">
          Your application is being prioritized and verified. We will send you a confirmation email with the next steps shortly.
        </p>
      </div>

      <div className="bg-brand-bg/50 border border-brand-border p-6 rounded-2xl max-w-sm mx-auto space-y-4">
        <div className="flex justify-between items-center text-sm">
          <span className="text-brand-text-muted">Reference ID</span>
          <span className="text-white font-mono">DHR-8829-XJ</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-brand-text-muted">Status</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Processing</span>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-3 text-xs text-brand-text-muted uppercase tracking-widest font-bold">
        <ShieldCheck className="w-4 h-4" />
        <span>Your application is secured & encrypted</span>
      </div>
    </motion.div>
  );
}

