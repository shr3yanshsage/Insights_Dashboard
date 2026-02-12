import React from 'react';

type InsightKey =
  | 'productDistribution'
  | 'ageByProduct'
  | 'apiCallsByCompany'
  | 'stateDistribution'
  | 'sizeVsApiCalls';

interface SidebarProps {
  insights: Record<InsightKey, string>;
  selected: InsightKey | null;
  onSelect: (key: InsightKey | null) => void;
}

export default function Sidebar({
  insights,
  selected,
  onSelect,
}: SidebarProps) {
  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 border-r border-gray-700 text-white flex flex-col shadow-xl">
      <nav className="flex-1 py-6">
        <ul className="space-y-2">

          <li
            className={`mx-3 px-5 py-3 rounded-lg cursor-pointer 
            transition-all duration-200 
            hover:bg-blue-500/20 hover:translate-x-1
            ${selected === null ? 
              'bg-blue-500/30 border-l-4 border-blue-400 shadow-md' : ''}`}
            onClick={() => onSelect(null)}
          >
            Overview
          </li>

          {Object.entries(insights).map(([key, label]) => (
            <li
              key={key}
              className={`mx-3 px-5 py-3 rounded-lg cursor-pointer 
              transition-all duration-200 
              hover:bg-blue-500/20 hover:translate-x-1
              ${selected === key ? 
                'bg-blue-500/30 border-l-4 border-blue-400 shadow-md' : ''}`}
              onClick={() => onSelect(key as InsightKey)}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>

      <footer className="text-xs text-center py-4 border-t border-gray-700 text-gray-400">
        FinTech Insights © 2026
      </footer>
    </aside>
  );
}
