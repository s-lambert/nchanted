import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
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
            <LineChart margin={{ top: 0, left: 0, right: 5, bottom: 0 }} data={codeCoverage}>
              <YAxis width={28} stroke="white" />
              <XAxis
                dataKey="time"
                tickFormatter={(x) => new Date(x).toLocaleDateString('en-AU', { month: 'numeric', day: 'numeric' })}
                height={50}
                angle={-45}
                textAnchor="end"
                stroke="white"
              />
              <CartesianGrid stroke="#555" />
              <Line type="monotone" dataKey="statementPercent" stroke="white" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
