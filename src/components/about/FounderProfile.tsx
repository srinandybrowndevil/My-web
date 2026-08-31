/**
 * Founder Profile Component for About Page
 * Displays founder information and bio
 */

import React from 'react';
import { motion } from 'framer-motion';
import { User, MapPin, Phone, Mail, Globe, ShieldCheck } from 'lucide-react';
import { Image } from '../Image';

export interface FounderInfo {
  name: string;
  role: string;
  bio: string;
  image: string;
  location: string;
  phone: string;
  email: string;
  website: string;
  experience: string;
  expertise: string[];
}

interface FounderProfileProps {
  founder: FounderInfo;
}

export const FounderProfile: React.FC<FounderProfileProps> = ({ founder }) => {
  return (
    <div className="space-y-6">
      {/* Founder Header */}
      <div className="flex flex-col md:flex-row gap-6 items-start">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-orange-500/30 shadow-xl shadow-orange-500/20 flex-shrink-0">
          <Image
            src={founder.image}
            alt={founder.name}
            width={160}
            height={160}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {founder.name}
            </h2>
            <p className="text-sm text-orange-500 font-semibold">
              {founder.role}
            </p>
          </div>
          
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {founder.bio}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {founder.expertise.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <MapPin className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Location</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{founder.location}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <Phone className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Phone</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{founder.phone}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <Mail className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Email</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{founder.email}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
          <Globe className="w-5 h-5 text-orange-500" />
          <div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase">Website</div>
            <div className="text-sm font-semibold text-slate-900 dark:text-white">{founder.website}</div>
          </div>
        </div>
      </div>

      {/* Experience Badge */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/30">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-orange-500" />
          <div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">
              {founder.experience}
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              Industry Experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
