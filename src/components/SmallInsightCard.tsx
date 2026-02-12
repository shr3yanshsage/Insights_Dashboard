import React from 'react';
import { DashboardRecord } from '../types';
import ChartRenderer from './ChartRenderer';

type InsightKey =
  | 'productDistribution'
  | 'ageByProduct'
  | 'apiCallsByCompany'
  | 'stateDistribution'
  | 'sizeVsApiCalls';

interface Props {
  title: string;
  insightKey: InsightKey;
  data: DashboardRecord[];
  onClick: () => void;
}

function getMiniData(insightKey: InsightKey, data: DashboardRecord[]) {
  const map = new Map<string, number>();
  data.forEach((r) => map.set(r.productType, (map.get(r.productType) ?? 0) + 1));
  return {
    labels: Array.from(map.keys()),
    values: Array.from(map.values()),
  };
}

export default function SmallInsightCard({
  title,
  insightKey,
  data,
  onClick,
}: Props) {
  const { labels, values } = getMiniData(insightKey, data);

  return (
    <div
      className="bg-gradient-to-br from-slate-900 to-slate-800 
      p-6 rounded-2xl shadow-lg 
      hover:shadow-blue-500/10 hover:scale-[1.01]
      transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <h3 className="text-lg font-semibold mb-4 text-white">
        {title}
      </h3>

      <ChartRenderer
        type="Bar"
        labels={labels}
        values={values}
        title={title}
        showTitle={false}
      />
    </div>
  );
}
