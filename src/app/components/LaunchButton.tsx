interface LaunchButtonProps {
  onLaunch: () => void;
  isLaunching: boolean;
  campaignStarted: boolean;
  campaignStatus: string;
}

export default function LaunchButton({ 
  onLaunch, 
  isLaunching, 
  campaignStarted, 
  campaignStatus 
}: LaunchButtonProps) {
  return (
    <>
      {/* Launch Button */}
      {campaignStatus === 'ready' && !isLaunching && !campaignStarted && (
        <button
          onClick={onLaunch}
          className="w-full py-4 rounded-lg font-bold text-white text-lg transition-all duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: 'var(--elyos-orange)' }}
        >
          🚀 Launch Campaign
        </button>
      )}

      {/* Loading State */}
      {isLaunching && (
        <div className="rounded-lg p-6 text-center animate-pulse-slow" style={{ backgroundColor: 'var(--elyos-dark-card)' }}>
          <div className="inline-block w-6 h-6 border-4 rounded-full animate-spin mb-2" style={{ 
            borderColor: 'var(--elyos-orange)',
            borderTopColor: 'transparent'
          }} />
          <p className="text-white font-semibold">Campaign Running...</p>
          <p className="text-gray-400 text-sm">AI agents are reaching out to customers</p>
        </div>
      )}
    </>
  );
}