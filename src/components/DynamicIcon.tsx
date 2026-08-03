import React from 'react';
import * as LucideIcons from 'lucide-react';

interface DynamicIconProps {
  name?: string;
  className?: string;
  fallback?: React.ReactNode;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, className = 'w-5 h-5', fallback }) => {
  if (!name) {
    return <LucideIcons.Sparkles className={className} />;
  }

  // Find icon in lucide
  const IconComponent = (LucideIcons as Record<string, React.ComponentType<{ className?: string }>>)[name];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  return fallback ? <>{fallback}</> : <LucideIcons.Sparkles className={className} />;
};
