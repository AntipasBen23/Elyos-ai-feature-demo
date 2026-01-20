'use client';

import { useState } from 'react';
import { mockCampaign } from './mockData';
import { Campaign, CampaignMetrics } from './types';
import CampaignOverview from './components/CampaignOverview';
import CampaignStats from './components/CampaignStats';
import LaunchButton from './components/LaunchButton';
import SuggestedCampaigns from './components/SuggestedCampaigns';

export default function CampaignDashboard() {
  const [campaign] = useState<Campaign>(mockCampaign);
  const [isLaunching, setIsLaunching] = useState(false);
  const [metrics, setMetrics] = useState<CampaignMetrics>({
    totalSent: 0,
    delivered: 0,
    opened: 0,
    responded: 0,
    booked: 0,
    failed: 0,
    revenue: 0,
    conversionRate: 0
  });

  const handleLaunchCampaign = async () => {
    setIsLaunching(true);
    
    // Simulate sending messages with realistic timing
    const total = campaign.targetCustomers;
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    // Phase 1: Sending (50ms per message = 25 seconds for 500)
    for (let i = 1; i <= total; i++) {
      await delay(50);
      setMetrics(prev => ({ ...prev, totalSent: i }));
    }
    
    await delay(500);
    
    // Phase 2: Delivery (fast)
    const delivered = Math.floor(total * 0.96);
    for (let i = 1; i <= delivered; i++) {
      await delay(20);
      setMetrics(prev => ({ ...prev, delivered: i }));
    }
    const failed = total - delivered;
    setMetrics(prev => ({ ...prev, failed }));
    
    await delay(500);
    
    // Phase 3: Opens (medium speed)
    const opened = Math.floor(delivered * 0.71);
    for (let i = 1; i <= opened; i++) {
      await delay(30);
      setMetrics(prev => ({ ...prev, opened: i }));
    }
    
    await delay(500);
    
    // Phase 4: Responses
    const responded = Math.floor(opened * 0.36);
    for (let i = 1; i <= responded; i++) {
      await delay(40);
      setMetrics(prev => ({ ...prev, responded: i }));
    }
    
    await delay(500);
    
    // Phase 5: Bookings
    const booked = Math.floor(responded * 0.61);
    for (let i = 1; i <= booked; i++) {
      await delay(50);
      const revenue = i * 49;
      const conversionRate = parseFloat(((i / total) * 100).toFixed(2));
      setMetrics(prev => ({ 
        ...prev, 
        booked: i,
        revenue,
        conversionRate
      }));
    }
    
    setIsLaunching(false);
  };

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--elyos-dark)' }}>
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg" style={{ backgroundColor: 'var(--elyos-orange)' }}>
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Elyos AI</h1>
        </div>
        <p className="text-gray-400">Campaign Intelligence Agent</p>
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Campaign Overview */}
        <CampaignOverview campaign={campaign} />

        {/* Campaign Stats */}
        <CampaignStats 
          metrics={metrics} 
          isLaunching={isLaunching} 
          targetCustomers={campaign.targetCustomers} 
        />

        {/* Launch Button */}
        <LaunchButton 
          onLaunch={handleLaunchCampaign}
          isLaunching={isLaunching}
          campaignStarted={metrics.totalSent > 0}
          campaignStatus={campaign.status}
        />

        {/* Suggested Campaigns - Show after completion */}
        {metrics.booked > 0 && <SuggestedCampaigns />}
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t text-center" style={{ borderColor: 'var(--elyos-dark-card)' }}>
        <p className="text-gray-500 text-sm">
          Built by <span className="font-semibold" style={{ color: 'var(--elyos-orange)' }}>Antipas Ukawoko</span> 
          {' '}for Elyos AI • Demo Prototype • January 2026
        </p>
      </div>
    </div>
  );
}