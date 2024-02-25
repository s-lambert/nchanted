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

interface SecretPhraseEnv {
  SECRET_PHRASE: string;
}

export async function postCodeCoverage(statementPercent: number) {
  const data = JSON.stringify({
    secretPhrase: (process.env as unknown as SecretPhraseEnv).SECRET_PHRASE,
    statementPercent,
  });
  console.log(data);
  const response = await fetch('https://yeet.shuttleapp.rs/update-coverage', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: data,
  });
  if (response.status !== 202) {
    throw new Error('Failed request');
  }
}
