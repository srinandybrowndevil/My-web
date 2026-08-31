/**
 * Company Overview Component for About Page
 * Displays company information, mission, and values
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, Award, Target, HeartHandshake, Zap } from 'lucide-react';

export interface CompanyOverviewData {
  mission: string;
  vision: string;
  values: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
  stats: {
    label: string;
    value: string;
    icon: React.ReactNode;
  }[];
}

interface CompanyOverviewProps {
  data: CompanyOverviewData;
}

export const CompanyOverview: React.FC<CompanyOverviewProps> = ({ data }) => {
  return (
    <div className="space-y-8">
      {/* Mission and Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-500/10 to-amber-500/10 border border-orange-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-orange-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Mission</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.mission}
          </p>
        </div>
        
        <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Vision</h3>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {data.vision}
          </p>
        </div>
      </div>

      {/* Company Values */}
      <div>
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Core Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 hover:border-orange-500/30 transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                  {value.icon}
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {value.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.stats.map((stat, index) => (
          <div
            key={index}
            className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 text-center"
          >
            <div className="flex justify-center mb-2">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {stat.value}
            </div>
            <div className="text-[10px] uppercase text-slate-500 dark:text-slate-400 font-semibold">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
