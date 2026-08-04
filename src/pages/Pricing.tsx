import React from 'react';
import { PricingMaintenanceView } from '../components/PricingMaintenanceView';

interface PricingProps {
  onNavigateToContactWithItem: (itemTitle: string) => void;
  onNavigateToMaintenance?: () => void;
}

export const Pricing: React.FC<PricingProps> = ({
  onNavigateToContactWithItem
}) => {
  return (
    <PricingMaintenanceView
      initialSection="pricing"
      onNavigateToContactWithItem={onNavigateToContactWithItem}
    />
  );
};
