import React, { useState } from 'react';
import { Calculator, TrendingUp, Clock, DollarSign, Sparkles, ArrowRight, MessageSquare, ShieldCheck } from 'lucide-react';
import { openWhatsApp } from '../utils/whatsapp';

interface RoiCalculatorProps {
  onNavigateToContact: (customMessage?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onNavigateToContact }) => {
  const [teamSize, setTeamSize] = useState<number>(5);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState<number>(12);
  const [hourlyWage, setHourlyWage] = useState<number>(500); // INR/hour
  const [automationRate, setAutomationRate] = useState<number>(65); // %

  // Calculations
  const weeklyHoursSpent = teamSize * manualHoursPerWeek;
  const annualHoursSaved = Math.round(weeklyHoursSpent * 50 * (automationRate / 100));
  const annualCostSaved = Math.round(annualHoursSaved * hourlyWage);
  const monthlyCostSaved = Math.round(annualCostSaved / 12);

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleWhatsApp = () => {
    openWhatsApp({
      customMessage: `Hi MUCO Labs! I calculated an AI Automation ROI on your site: Team of ${teamSize}, saving ~${annualHoursSaved} hrs/year and ~${formatINR(annualCostSaved)}/year. I would like to discuss implementing custom bots/automation.`
    });
  };

  const handleContact = () => {
    onNavigateToContact(
      `AI Automation ROI Calculation:\n- Team Size: ${teamSize}\n- Current Manual Hours/Week per Person: ${manualHoursPerWeek} hrs\n- Projected Annual Savings: ${formatINR(annualCostSaved)} (${annualHoursSaved} hours saved)\n\nPlease contact us with an automation architecture roadmap.`
    );
  };

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute -right-20 -top-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Operational ROI Estimator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            AI & Automation Cost-Savings Calculator
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Calculate how much repetitive labor cost and operational time your business recovers with custom AI agents.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/50 border border-emerald-500/30 px-3.5 py-2 rounded-xl shrink-0">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Average 6.8x First-Year ROI</span>
        </div>
      </div>

      {/* Sliders & Visual Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        {/* Sliders Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Team Size Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Team Members Involved in Repetitive Tasks</span>
              <span className="text-cyan-400 font-bold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {teamSize} {teamSize === 1 ? 'person' : 'people'}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>1 person</span>
              <span>25 people</span>
              <span>50+ enterprise</span>
            </div>
          </div>

          {/* Manual Hours / Week */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Manual Hours Spent on Repetitive Tasks (per person/wk)</span>
              <span className="text-cyan-400 font-bold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {manualHoursPerWeek} hrs/week
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="35"
              value={manualHoursPerWeek}
              onChange={(e) => setManualHoursPerWeek(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>2 hrs (Light)</span>
              <span>15 hrs (Moderate)</span>
              <span>35 hrs (Heavy Ops)</span>
            </div>
          </div>

          {/* Average Hourly Wage */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Average Employee Cost per Hour</span>
              <span className="text-cyan-400 font-bold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                ₹{hourlyWage}/hr
              </span>
            </div>
            <input
              type="range"
              min="200"
              max="2500"
              step="50"
              value={hourlyWage}
              onChange={(e) => setHourlyWage(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>₹200/hr</span>
              <span>₹1,000/hr</span>
              <span>₹2,500+/hr</span>
            </div>
          </div>

          {/* Automation Target % */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm font-semibold">
              <span className="text-slate-300">Target AI Automation Rate</span>
              <span className="text-emerald-400 font-bold bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {automationRate}% Automated
              </span>
            </div>
            <input
              type="range"
              min="30"
              max="90"
              step="5"
              value={automationRate}
              onChange={(e) => setAutomationRate(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <div className="flex justify-between text-[11px] text-slate-500 font-medium">
              <span>30% (Assisted)</span>
              <span>65% (Recommended)</span>
              <span>90% (Autonomous)</span>
            </div>
          </div>
        </div>

        {/* Results Card Column */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Projected Annual Savings
              </span>
              <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-blue-400 mt-1">
                {formatINR(annualCostSaved)}
              </div>
              <span className="text-xs text-slate-400 font-medium mt-0.5 block">
                ≈ {formatINR(monthlyCostSaved)} saved per month
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Time Saved</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-white">
                  {annualHoursSaved.toLocaleString('en-IN')} hrs
                </div>
                <span className="text-[10px] text-slate-500">per calendar year</span>
              </div>

              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Efficiency Gain</span>
                </div>
                <div className="text-lg sm:text-xl font-black text-emerald-400">
                  +{automationRate}%
                </div>
                <span className="text-[10px] text-slate-500">capacity freed up</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/50 p-2.5 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Based on audited client results across customer support, invoicing, and CRM lead ingestion.</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={handleContact}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black py-3 px-5 rounded-xl transition-all shadow-lg active:scale-95 text-sm cursor-pointer"
            >
              <span>Build Custom AI Automation</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full flex items-center justify-center gap-2 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-400 font-bold py-2.5 px-4 rounded-xl transition-all text-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp ROI Blueprint</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
