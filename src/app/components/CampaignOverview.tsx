import { Campaign } from '../types';

interface CampaignOverviewProps {
  campaign: Campaign;
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  return (
    <div className="rounded-lg p-6 animate-slide-up" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">{campaign.name}</h2>
          <p className="text-gray-400">{campaign.description}</p>
        </div>
        <div className="px-4 py-2 rounded-full text-sm font-semibold" style={{ 
          backgroundColor: campaign.status === 'ready' ? 'rgba(255, 77, 0, 0.1)' : 'rgba(107, 114, 128, 0.1)',
          color: campaign.status === 'ready' ? 'var(--elyos-orange)' : 'var(--elyos-gray)'
        }}>
          {campaign.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        <div>
          <p className="text-gray-400 text-sm mb-1">Target Customers</p>
          <p className="text-2xl font-bold text-white">{campaign.targetCustomers}</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Channels</p>
          <div className="flex gap-2 mt-1">
            {campaign.channels.map(channel => (
              <span key={channel} className="px-2 py-1 rounded text-xs font-semibold" style={{ 
                backgroundColor: 'rgba(255, 77, 0, 0.1)',
                color: 'var(--elyos-orange)'
              }}>
                {channel.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Estimated Revenue</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--elyos-orange)' }}>
            £{campaign.estimatedRevenue.toLocaleString()}
          </p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Scheduled For</p>
          <p className="text-white font-semibold">
            {new Date(campaign.scheduledFor).toLocaleString('en-GB', { 
              dateStyle: 'medium', 
              timeStyle: 'short' 
            })}
          </p>
        </div>
      </div>
    </div>
  );
}