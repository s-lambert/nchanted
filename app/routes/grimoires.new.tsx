import { ActionFunctionArgs, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { createGrimoire } from '~/models/grimoires.server';

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const name = formData.get('name') as string | undefined;
  const description = formData.get('description') as string | undefined;

  if (!name || !description) {
    throw new Error('Failed to create, no name or description.');
  }

  await createGrimoire({ name, description });

  return redirect('/grimoires');
};

export default function NewGrimoire() {
  return (
    <Form method="post">
      <p>
        <label>
          Name
          <input type="text" name="name" />
        </label>
      </p>
      <p>
        <label>
          Description
          <input type="text" name="description" />
        </label>
      </p>
      <button type="submit">Create Grimoire</button>
    </Form>
  );
}
