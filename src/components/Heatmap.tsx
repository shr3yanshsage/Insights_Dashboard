import React from 'react';

interface HeatmapProps {
  ages: number[];
  products: string[];
  matrix: number[][];
}

/** Convert a count to a blue shade (varying opacity) */
function getShade(count: number, max: number) {
  const opacity = max === 0 ? 0 : (count / max) * 0.8 + 0.2;
  return `rgba(59,130,246,${opacity.toFixed(2)})`;
}

export default function Heatmap({
  ages,
  products,
  matrix,
}: HeatmapProps) {
  const maxCount = Math.max(...matrix.flat());

  return (
    <div className="overflow-auto">
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="p-2 border border-gray-600 text-gray-300">
              Age ↓ / Product →
            </th>
            {products.map((p) => (
              <th key={p} className="p-2 border border-gray-600 text-gray-300">
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ages.map((age, i) => (
            <tr key={age}>
              <td className="p-2 border border-gray-600 text-gray-300">{age}</td>
              {products.map((_, j) => {
                const cnt = matrix[i][j];
                const bg = getShade(cnt, maxCount);
                const txt = cnt > maxCount / 2 ? '#fff' : '#000';
                return (
                  <td
                    key={j}
                    className="p-2 border border-gray-600 text-center"
                    style={{ backgroundColor: bg, color: txt }}
                  >
                    {cnt}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
