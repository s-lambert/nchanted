import { buildDbClient } from '~/lib/client';

const startDate = 1708601611095;
const targetDate = 1717113600000;

export async function getCodeCoverage() {
  const db = buildDbClient();
  const codeCoverage = await db.query.codeCoverage.findMany({
    where: (codeCoverage, { lte, gte }) => gte(codeCoverage.time, startDate) && lte(codeCoverage.time, targetDate),
  });
  return codeCoverage;
}
