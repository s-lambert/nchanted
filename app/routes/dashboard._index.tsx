import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { getCodeCoverage } from '~/models/code-coverage.server';

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
      <div style={{ width: 500, height: 300 }}>
        <LineChart width={500} height={300} data={codeCoverage}>
          <XAxis
            dataKey="time"
            tickFormatter={(x) => new Date(x).toLocaleDateString('en-AU', { month: 'numeric', day: 'numeric' })}
          />
          <YAxis />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="statementPercent" stroke="#8884d8" />
        </LineChart>
      </div>
    </main>
  );
}
