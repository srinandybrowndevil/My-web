import React from 'react';
import { PricingMaintenanceView } from '../components/PricingMaintenanceView';

interface MaintenanceProps {
  onNavigateToContactWithItem: (itemTitle: string) => void;
}

export const Maintenance: React.FC<MaintenanceProps> = ({ onNavigateToContactWithItem }) => {
  return (
    <PricingMaintenanceView
      initialSection="maintenance"
      onNavigateToContactWithItem={onNavigateToContactWithItem}
    />
  );
};
