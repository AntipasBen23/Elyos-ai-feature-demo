import { CampaignMetrics } from '../types';

interface MetricCardProps {
  label: string;
  value: number;
  total?: number;
  percentage?: string;
  isActive?: boolean;
}

function MetricCard({ label, value, total, percentage, isActive }: MetricCardProps) {
  return (
    <div className="rounded-lg p-6 relative overflow-hidden" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
      {isActive && (
        <div className="absolute top-0 right-0 w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--elyos-orange)' }} />
      )}
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <p className="text-3xl font-bold text-white mb-1">
        {value}
        {total && <span className="text-lg text-gray-500">/{total}</span>}
      </p>
      {percentage && (
        <p className="text-sm" style={{ color: 'var(--elyos-orange)' }}>{percentage}%</p>
      )}
    </div>
  );
}

interface CampaignStatsProps {
  metrics: CampaignMetrics;
  isLaunching: boolean;
  targetCustomers: number;
}

export default function CampaignStats({ metrics, isLaunching, targetCustomers }: CampaignStatsProps) {
  return (
    <>
      {/* Metrics Grid */}
      <div className="grid grid-cols-4 gap-4">
        <MetricCard 
          label="Messages Sent" 
          value={metrics.totalSent} 
          total={targetCustomers}
          isActive={isLaunching && metrics.totalSent < targetCustomers}
        />
        <MetricCard 
          label="Delivered" 
          value={metrics.delivered} 
          total={targetCustomers}
          isActive={isLaunching && metrics.delivered > 0 && metrics.delivered < Math.floor(targetCustomers * 0.96)}
        />
        <MetricCard 
          label="Opened" 
          value={metrics.opened} 
          total={targetCustomers}
          percentage={metrics.delivered > 0 ? ((metrics.opened / metrics.delivered) * 100).toFixed(1) : '0'}
          isActive={isLaunching && metrics.opened > 0}
        />
        <MetricCard 
          label="Responded" 
          value={metrics.responded} 
          total={targetCustomers}
          isActive={isLaunching && metrics.responded > 0}
        />
      </div>

      {/* Revenue & Bookings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
          <p className="text-gray-400 text-sm mb-2">Bookings</p>
          <p className="text-4xl font-bold text-white mb-1">{metrics.booked}</p>
          <p className="text-sm" style={{ color: 'var(--elyos-orange)' }}>
            {metrics.conversionRate}% conversion rate
          </p>
          {isLaunching && metrics.booked > 0 && (
            <div className="mt-4 h-2 rounded-full" style={{ backgroundColor: 'rgba(255, 77, 0, 0.1)' }}>
              <div 
                className="h-full rounded-full transition-all duration-300" 
                style={{ 
                  backgroundColor: 'var(--elyos-orange)',
                  width: `${(metrics.booked / (targetCustomers * 0.16)) * 100}%`
                }}
              />
            </div>
          )}
        </div>

        <div className="rounded-lg p-6" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
          <p className="text-gray-400 text-sm mb-2">Revenue Generated</p>
          <p className="text-4xl font-bold" style={{ color: 'var(--elyos-orange)' }}>
            £{metrics.revenue.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400">
            Target: £{(targetCustomers * 49).toLocaleString()}
          </p>
        </div>
      </div>
    </>
  );
}