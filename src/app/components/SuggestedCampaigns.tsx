import { suggestedCampaigns } from '../mockData';

export default function SuggestedCampaigns() {
  return (
    <div className="rounded-lg p-6 animate-slide-up" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
      <h3 className="text-xl font-bold text-white mb-4">🤖 AI Suggested Next Campaigns</h3>
      <div className="space-y-3">
        {suggestedCampaigns.map(suggestion => (
          <div 
            key={suggestion.id}
            className="p-4 rounded-lg border transition-all duration-200 hover:scale-[1.01] cursor-pointer"
            style={{ 
              backgroundColor: 'var(--elyos-dark-lighter)',
              borderColor: suggestion.urgency === 'high' ? 'var(--elyos-orange)' : 'var(--elyos-gray)'
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{suggestion.icon}</span>
                  <h4 className="font-bold text-white">{suggestion.title}</h4>
                  {suggestion.urgency === 'high' && (
                    <span className="px-2 py-1 rounded text-xs font-semibold" style={{ 
                      backgroundColor: 'rgba(255, 77, 0, 0.1)',
                      color: 'var(--elyos-orange)'
                    }}>
                      HIGH PRIORITY
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-sm mb-2">{suggestion.description}</p>
                <p className="text-xs text-gray-500">{suggestion.reason}</p>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm text-gray-400">Est. Revenue</p>
                <p className="text-lg font-bold" style={{ color: 'var(--elyos-orange)' }}>
                  £{suggestion.estimatedRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500">{suggestion.targetCount} customers</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}