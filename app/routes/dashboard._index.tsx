import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Area, AreaChart, ReferenceLine, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getCodeCoverage } from '~/models/code-coverage.server';
import { card, cardHeader } from './dashboard_index.css';

export const loader = async () => {
  return json({
    codeCoverage: await getCodeCoverage(),
  });
};

const goalPercent = 60;
const projectEnd = new Date('2024/07/22').getTime();

export default function Dashboard() {
  const { codeCoverage } = useLoaderData<typeof loader>();
  const start = codeCoverage[0];

  return (
    <main>
      <h1>Dashboard Page</h1>
      <div className={card}>
        <h2 className={cardHeader}>Code Coverage</h2>
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart margin={{ top: 6, left: 0, right: 5, bottom: 0 }} data={codeCoverage}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis width={28} stroke="white" type="number" />
              <XAxis
                type="number"
                domain={[start.time, projectEnd]}
                dataKey="time"
                tickFormatter={(x) => new Date(x).toLocaleDateString('en-AU', { month: 'numeric', day: 'numeric' })}
                height={50}
                angle={-45}
                textAnchor="end"
                stroke="white"
              />
              <ReferenceLine y={goalPercent} label="Target" stroke="red" strokeDasharray="3 3" />
              <ReferenceLine
                label="Projected"
                stroke="green"
                strokeDasharray="3 3"
                segment={[
                  { x: start.time, y: start.statementPercent },
                  { x: projectEnd, y: goalPercent },
                ]}
              />
              <Area dot dataKey="statementPercent" stroke="white" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
