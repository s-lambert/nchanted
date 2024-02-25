import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { getCodeCoverage } from '~/models/code-coverage.server';
import { card, cardHeader } from './dashboard_index.css';

export const loader = async () => {
  return json({
    codeCoverage: await getCodeCoverage(),
  });
};

export default function Dashboard() {
  const { codeCoverage } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Dashboard Page</h1>
      <div className={card}>
        <h2 className={cardHeader}>Code Coverage</h2>
        <div style={{ height: '100%', width: '100%' }}>
          <ResponsiveContainer>
            <AreaChart margin={{ top: 5, left: 0, right: 5, bottom: 0 }} data={codeCoverage}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis width={28} stroke="white" />
              <XAxis
                dataKey="time"
                tickFormatter={(x) => new Date(x).toLocaleDateString('en-AU', { month: 'numeric', day: 'numeric' })}
                height={50}
                angle={-45}
                textAnchor="end"
                stroke="white"
              />
              <Area dot dataKey="statementPercent" stroke="white" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
