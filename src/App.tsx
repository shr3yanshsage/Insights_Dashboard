import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import InsightPanel from './components/InsightPanel';
import SmallInsightCard from './components/SmallInsightCard';
import data from './data/mock-data.json';
import { DashboardRecord } from './types';

type InsightKey =
  | 'productDistribution'
  | 'ageByProduct'
  | 'apiCallsByCompany'
  | 'stateDistribution'
  | 'sizeVsApiCalls';

const insights: Record<InsightKey, string> = {
  productDistribution: 'Product Type Distribution',
  ageByProduct: 'Average Age per Product',
  apiCallsByCompany: 'API Calls per Company',
  stateDistribution: 'Customers per State',
  sizeVsApiCalls: 'Company Size vs API Calls',
};

export default function App() {
  const [selectedInsight, setSelectedInsight] = useState<InsightKey | null>(null);
  const handleSelect = (key: InsightKey | null) => setSelectedInsight(key);

  return (
    <div className="flex h-screen bg-black text-white">
      <Sidebar
        insights={insights}
        selected={selectedInsight}
        onSelect={handleSelect}
      />

      <main className="flex-1 overflow-y-auto p-8">
        <h1 className="text-4xl font-extrabold mb-12 text-center 
        bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 
        bg-clip-text text-transparent tracking-wide drop-shadow-md">
          DASHBOARD
        </h1>

        {selectedInsight ? (
          <InsightPanel
            insightKey={selectedInsight}
            data={data as DashboardRecord[]}
          />
        ) : (
          <div className="max-w-7xl mx-auto space-y-12">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {Object.entries(insights)
                .slice(0, 4)
                .map(([key, title]) => (
                  <SmallInsightCard
                    key={key}
                    title={title}
                    insightKey={key as InsightKey}
                    data={data as DashboardRecord[]}
                    onClick={() => handleSelect(key as InsightKey)}
                  />
                ))}
            </div>

            <div>
              {Object.entries(insights)
                .slice(4)
                .map(([key, title]) => (
                  <SmallInsightCard
                    key={key}
                    title={title}
                    insightKey={key as InsightKey}
                    data={data as DashboardRecord[]}
                    onClick={() => handleSelect(key as InsightKey)}
                  />
                ))}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
