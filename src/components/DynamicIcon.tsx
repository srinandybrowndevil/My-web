import React from 'react';
import {
  Sparkles,
  Globe,
  Building2,
  ShoppingBag,
  Code2,
  Smartphone,
  Cpu,
  Layers,
  Database,
  Server,
  Rocket,
  ShieldCheck,
  Bot,
  Workflow,
  Brain,
  Megaphone,
  TrendingUp,
  Flame,
  Share2,
  Video,
  Award,
  Search,
  BarChart2,
  BarChart3,
  Target,
  Percent,
  Sliders,
  PenTool,
  Palette,
  FileText,
  DollarSign,
  Mail,
  BookOpen,
  Compass,
  Shield,
  Image,
  File,
  FileCode,
  Terminal,
  Cloud,
  ShieldAlert,
  MessageSquare,
  UserCheck,
  Briefcase,
  GraduationCap,
  Zap,
  Users,
  Layout,
  CheckCircle2,
  ArrowRight,
  LucideIcon
} from 'lucide-react';

// Explicit tree-shakeable icon registry
const ICON_MAP: Record<string, LucideIcon> = {
  Sparkles,
  Globe,
  Building2,
  ShoppingBag,
  Code2,
  Smartphone,
  Cpu,
  Layers,
  Database,
  Server,
  Rocket,
  ShieldCheck,
  Bot,
  Workflow,
  Brain,
  Megaphone,
  TrendingUp,
  Flame,
  Share2,
  Video,
  Award,
  Search,
  BarChart2,
  BarChart3,
  Target,
  Percent,
  Sliders,
  PenTool,
  Palette,
  FileText,
  DollarSign,
  Mail,
  BookOpen,
  Compass,
  Shield,
  Image,
  File,
  FileCode,
  Terminal,
  Cloud,
  ShieldAlert,
  MessageSquare,
  UserCheck,
  Briefcase,
  GraduationCap,
  Zap,
  Users,
  Layout,
  CheckCircle2,
  ArrowRight
};

interface DynamicIconProps {
  name?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', fallback }) => {
  if (!name) {
    return <Sparkles className={className} />;
  }

  const IconComponent = ICON_MAP[name];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return fallback ? <>{fallback}</> : <Sparkles className={className} />;
};
