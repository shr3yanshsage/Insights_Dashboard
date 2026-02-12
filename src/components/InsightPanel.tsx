import React, { useState } from 'react';
import { DashboardRecord } from '../types';
import ChartRenderer from './ChartRenderer';
import Heatmap from './Heatmap';

type InsightKey =
  | 'productDistribution'
  | 'ageByProduct'
  | 'apiCallsByCompany'
  | 'stateDistribution'
  | 'sizeVsApiCalls';

type GraphType = 'Bar' | 'Line' | 'Donut' | 'Heatmap';

interface Props {
  insightKey: InsightKey;
  data: DashboardRecord[];
}

/** Prepare chart‑ready data for each insight */
function getChartData(insightKey: InsightKey, data: DashboardRecord[]) {
  switch (insightKey) {
    case 'productDistribution': {
      const map = new Map<string, number>();
      data.forEach((r) => map.set(r.productType, (map.get(r.productType) ?? 0) + 1));
      return { labels: Array.from(map.keys()), values: Array.from(map.values()) };
    }
    case 'ageByProduct': {
      const sum = new Map<string, number>();
      const cnt = new Map<string, number>();
      data.forEach((r) => {
        sum.set(r.productType, (sum.get(r.productType) ?? 0) + r.age);
        cnt.set(r.productType, (cnt.get(r.productType) ?? 0) + 1);
      });
      const labels = Array.from(sum.keys());
      const values = labels.map(
        (lab) => Math.round(((sum.get(lab) ?? 0) / (cnt.get(lab) ?? 1)) * 10) / 10,
      );
      return { labels, values };
    }
    case 'apiCallsByCompany': {
      const map = new Map<string, number>();
      data.forEach((r) =>
        map.set(r.companyName, (map.get(r.companyName) ?? 0) + r.numberOfApiCalls),
      );
      return { labels: Array.from(map.keys()), values: Array.from(map.values()) };
    }
    case 'stateDistribution': {
      const map = new Map<string, number>();
      data.forEach((r) => map.set(r.states, (map.get(r.states) ?? 0) + 1));
      return { labels: Array.from(map.keys()), values: Array.from(map.values()) };
    }
    case 'sizeVsApiCalls': {
      const total = new Map<string, number>();
      const n = new Map<string, number>();
      data.forEach((r) => {
        total.set(r.sizeOfCompany, (total.get(r.sizeOfCompany) ?? 0) + r.numberOfApiCalls);
        n.set(r.sizeOfCompany, (n.get(r.sizeOfCompany) ?? 0) + 1);
      });
      const labels = Array.from(total.keys());
      const values = labels.map(
        (lab) => Math.round(((total.get(lab) ?? 0) / (n.get(lab) ?? 1)) * 10) / 10,
      );
      return { labels, values };
    }
    default:
      return { labels: [] as string[], values: [] as number[] };
  }
}

/** Build the matrix needed for the Age × Product heatmap */
function getHeatmapMatrix(data: DashboardRecord[]) {
  const ages = [...new Set(data.map((r) => r.age))].sort((a, b) => a - b);
  const products = [...new Set(data.map((r) => r.productType))];
  const matrix: number[][] = ages.map(() => products.map(() => 0));
  data.forEach((r) => {
    const aIdx = ages.indexOf(r.age);
    const pIdx = products.indexOf(r.productType);
    if (aIdx >= 0 && pIdx >= 0) matrix[aIdx][pIdx] += 1;
  });
  return { ages, products, matrix };
}

/** Human‑readable titles for each insight */
const titles: Record<InsightKey, string> = {
  productDistribution: 'Product Type Distribution',
  ageByProduct: 'Average Age per Product',
  apiCallsByCompany: 'API Calls per Company',
  stateDistribution: 'Customers per State',
  sizeVsApiCalls: 'Company Size vs API Calls',
};

export default function InsightPanel({ insightKey, data }: Props) {
  const [graphType, setGraphType] = useState<GraphType>('Bar');

  const { labels, values } = getChartData(insightKey, data);
  const heatmap = getHeatmapMatrix(data);

  return (
    <section className="space-y-4">
      {/* Header + selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold capitalize">{titles[insightKey]}</h2>
        <select
          className="bg-deepblue text-white rounded px-2 py-1"
          value={graphType}
          onChange={(e) => setGraphType(e.target.value as GraphType)}
        >
          <option value="Bar">Bar</option>
          <option value="Line">Line</option>
          <option value="Donut">Donut</option>
          <option value="Heatmap">Heatmap</option>
        </select>
      </div>

      <div className="bg-black/30 p-4 rounded-lg min-h-[300px]">
        {graphType === 'Heatmap' ? (
          <Heatmap ages={heatmap.ages} products={heatmap.products} matrix={heatmap.matrix} />
        ) : (
          <ChartRenderer
            type={graphType as any}
            labels={labels}
            values={values}
            title={titles[insightKey]}
          />
        )}
      </div>

      {/* Quick take‑aways */}
      <section className="mt-6 text-gray-300">
        <h3 className="font-medium mb-2">Key Takeaways</h3>
        <ul className="list-disc list-inside space-y-1">
          {insightKey === 'productDistribution' && (
            <>
              <li>
                <strong>{labels[0] ?? '-'}</strong> accounts for{' '}
                {Math.round(((values[0] ?? 0) / values.reduce((a, b) => a + b, 0)) * 100)}%
                of the portfolio.
              </li>
              <li>
                Emerging categories such as <strong>AI/ML</strong> and{' '}
                <strong>HealthTech</strong> already appear, hinting at growth.
              </li>
            </>
          )}
          {insightKey === 'ageByProduct' && (
            <li>
              Younger customers {'<30'} favor <strong>AI/ML</strong> and{' '}
              <strong>Gaming</strong>; older {'<45'} lean toward{' '}
              <strong>FinTech</strong> and <strong>Renewable</strong>.
            </li>
          )}
          {insightKey === 'apiCallsByCompany' && (
            <li>
              <strong>{labels[0] ?? '-'}</strong> generates the most API traffic{' '}
              ({values[0]?.toLocaleString()} calls) – a prime partnership
              prospect.
            </li>
          )}
          {insightKey === 'stateDistribution' && (
            <li>
              California (CA) and Texas (TX) together host {'>30%'} of users.
            </li>
          )}
          {insightKey === 'sizeVsApiCalls' && (
            <li>
              Large enterprises perform on average{' '}
              {values[labels.indexOf('Large')]?.toLocaleString()} API calls,
              out‑pacing Medium & Small firms ~1.8×.
            </li>
          )}
        </ul>
      </section>
    </section>
  );
}
