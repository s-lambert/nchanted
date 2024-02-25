import { ActionFunctionArgs } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { postCodeCoverage } from '~/models/code-coverage.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const statementPercent = formData.get('statementPercent') as string | undefined;

  if (!statementPercent) {
    throw new Error('Failed to update, no statement percent.');
  }

  await postCodeCoverage(parseFloat(statementPercent));
  return null;
};

export default function SecretDashboard() {
  return (
    <main>
      <Form method="post">
        <input type="number" name="statementPercent" />
        <button type="submit">Test Code Coverage</button>
      </Form>
    </main>
  );
}
