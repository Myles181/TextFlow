import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp } from 'lucide-react';
import clsx from 'clsx';

interface CountryUsageData {
  countryCode: string;
  countryName: string;
  callCount: number;
  messageCount: number;
  totalCost: number;
  coordinates: [number, number];
}

interface GeographicMapProps {
  usageData: CountryUsageData[];
  mapType: 'calls' | 'messages' | 'cost';
}

// Simplified world map coordinates for major countries
const countryCoordinates: { [key: string]: [number, number] } = {
  'US': [39.8283, -98.5795],
  'CA': [56.1304, -106.3468],
  'MX': [23.6345, -102.5528],
  'BR': [-14.2350, -51.9253],
  'AR': [-38.4161, -63.6167],
  'GB': [55.3781, -3.4360],
  'DE': [51.1657, 10.4515],
  'FR': [46.2276, 2.2137],
  'IT': [41.8719, 12.5674],
  'ES': [40.4637, -3.7492],
  'RU': [61.5240, 105.3188],
  'CN': [35.8617, 104.1954],
  'JP': [36.2048, 138.2529],
  'IN': [20.5937, 78.9629],
  'AU': [-25.2744, 133.7751],
  'ZA': [-30.5595, 22.9375],
  'NG': [9.0820, 8.6753],
  'EG': [26.8206, 30.8025],
  'KE': [-0.0236, 37.9062],
  'MA': [31.7917, -7.0926]
};

export const GeographicMap: React.FC<GeographicMapProps> = ({
  usageData,
  mapType
}) => {
  const [hoveredCountry, setHoveredCountry] = useState<CountryUsageData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const getMapValue = (country: CountryUsageData) => {
    switch (mapType) {
      case 'calls':
        return country.callCount;
      case 'messages':
        return country.messageCount;
      case 'cost':
        return country.totalCost;
      default:
        return country.callCount;
    }
  };

  const getMaxValue = () => {
    return Math.max(...usageData.map(getMapValue));
  };

  const getIntensity = (value: number) => {
    const maxValue = getMaxValue();
    return maxValue > 0 ? value / maxValue : 0;
  };

  const getColor = (intensity: number) => {
    // Ocean color scale
    const baseColor = [14, 165, 233]; // ocean-500
    const alpha = 0.3 + (intensity * 0.7);
    return `rgba(${baseColor[0]}, ${baseColor[1]}, ${baseColor[2]}, ${alpha})`;
  };

  const formatValue = (value: number) => {
    if (mapType === 'cost') {
      return `$${value.toFixed(2)}`;
    } else {
      return value.toString();
    }
  };

  const getMapLabel = () => {
    switch (mapType) {
      case 'calls':
        return 'Call Volume';
      case 'messages':
        return 'Message Volume';
      case 'cost':
        return 'Cost Distribution';
      default:
        return 'Usage';
    }
  };

  const renderWorldMap = () => {
    return (
      <div className="relative bg-gray-50 rounded-lg p-4">
        {/* Map Container */}
        <div className="relative w-full h-64 bg-gradient-to-br from-blue-50 to-ocean-50 rounded-lg overflow-hidden">
          {/* Background grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" className="w-full h-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#0ea5e9" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Country markers */}
          {usageData.map((country) => {
            const value = getMapValue(country);
            const intensity = getIntensity(value);
            const color = getColor(intensity);
            const size = Math.max(8, Math.min(20, 8 + (intensity * 12)));
            
            if (!countryCoordinates[country.countryCode]) return null;
            
            const [lat, lng] = countryCoordinates[country.countryCode];
            const x = ((lng + 180) / 360) * 100;
            const y = ((90 - lat) / 180) * 100;
            
            return (
              <div
                key={country.countryCode}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-125 hover:z-10"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  zIndex: selectedCountry === country.countryCode ? 10 : 1
                }}
                onMouseEnter={() => setHoveredCountry(country)}
                onMouseLeave={() => setHoveredCountry(null)}
                onClick={() => setSelectedCountry(
                  selectedCountry === country.countryCode ? null : country.countryCode
                )}
              >
                <div
                  className="rounded-full border-2 border-white shadow-lg"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: color
                  }}
                />
                
                {/* Pulse animation for selected country */}
                {selectedCountry === country.countryCode && (
                  <div
                    className="absolute inset-0 rounded-full border-2 border-ocean-500 animate-ping"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`
                    }}
                  />
                )}
              </div>
            );
          })}

          {/* Hover tooltip */}
          {hoveredCountry && (
            <div
              className="absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm shadow-lg z-20"
              style={{
                left: `${((countryCoordinates[hoveredCountry.countryCode]?.[1] || 0) + 180) / 360 * 100}%`,
                top: `${((90 - (countryCoordinates[hoveredCountry.countryCode]?.[0] || 0)) / 180) * 100}%`,
                transform: 'translate(-50%, -100%) translateY(-10px)'
              }}
            >
              <div className="font-medium">{hoveredCountry.countryName}</div>
              <div className="text-gray-300 text-xs">
                {mapType === 'calls' && `${hoveredCountry.callCount} calls`}
                {mapType === 'messages' && `${hoveredCountry.messageCount} messages`}
                {mapType === 'cost' && `$${hoveredCountry.totalCost.toFixed(2)}`}
              </div>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Globe className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{getMapLabel()}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-500">Low</span>
            <div className="flex space-x-1">
              {[0, 0.25, 0.5, 0.75, 1].map((intensity) => (
                <div
                  key={intensity}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getColor(intensity) }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">High</span>
          </div>
        </div>
      </div>
    );
  };

  const renderTopCountries = () => {
    const sortedCountries = [...usageData]
      .sort((a, b) => getMapValue(b) - getMapValue(a))
      .slice(0, 5);

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Top Countries</h4>
        <div className="space-y-2">
          {sortedCountries.map((country, index) => {
            const value = getMapValue(country);
            const maxValue = getMaxValue();
            const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
            
            return (
              <div key={country.countryCode} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-ocean-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">{index + 1}</span>
                    </div>
                    <span className="text-sm text-gray-700">{country.countryName}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {formatValue(value)}
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-ocean-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStats = () => {
    const totalCountries = usageData.length;
    const totalValue = usageData.reduce((sum, country) => sum + getMapValue(country), 0);
    const averageValue = totalValue / totalCountries;

    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-1">🌍</div>
          <div className="text-lg font-bold text-gray-900">{totalCountries}</div>
          <div className="text-xs text-gray-500">Countries</div>
        </div>
        
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <div className="text-2xl mb-1">📊</div>
          <div className="text-lg font-bold text-gray-900">
            {formatValue(averageValue)}
          </div>
          <div className="text-xs text-gray-500">Average per country</div>
        </div>
      </div>
    );
  };

  const renderInsights = () => {
    const topCountry = usageData.reduce((max, country) => 
      getMapValue(country) > getMapValue(max) ? country : max
    );
    const topValue = getMapValue(topCountry);
    const totalValue = usageData.reduce((sum, country) => sum + getMapValue(country), 0);
    const topPercentage = totalValue > 0 ? (topValue / totalValue) * 100 : 0;

    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-900">Geographic Insights</h4>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              {topCountry.countryName} accounts for {topPercentage.toFixed(1)}% of your {mapType}
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              You communicate with {usageData.length} different countries
            </p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-1.5 h-1.5 bg-ocean-500 rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-xs text-gray-600">
              {mapType === 'cost' ? 'Consider international calling plans for cost optimization' : 
               'Most activity is concentrated in your primary markets'}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Map Type Selector */}
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {(['calls', 'messages', 'cost'] as const).map((type) => (
          <button
            key={type}
            onClick={() => {/* Handle map type change */}}
            className={clsx(
              'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              mapType === type
                ? 'bg-white text-ocean-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            )}
          >
            <span>{type === 'calls' ? '📞' : type === 'messages' ? '💬' : '💰'}</span>
            <span className="capitalize">{type}</span>
          </button>
        ))}
      </div>

      {/* World Map */}
      {renderWorldMap()}

      {/* Stats and Top Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          {renderStats()}
        </div>
        
        <div>
          {renderTopCountries()}
        </div>
      </div>

      {/* Insights */}
      <div className="border-t border-gray-200 pt-4">
        {renderInsights()}
      </div>
    </div>
  );
}; 