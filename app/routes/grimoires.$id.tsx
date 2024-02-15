import { json } from '@remix-run/node';
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { createNewDiscipline, getGrimoire } from '~/models/grimoires.server';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.id) {
    throw new Error('id not provided');
  }

  const grimoire = await getGrimoire(params.id!);
  if (!grimoire) {
    throw new Error(`Could not find grimoire ${params.id}.`);
  }

  return json(grimoire!);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  if (formData.get('_action') == 'create-discipline') {
    const grimoireId = formData.get('grimoireId') as string | undefined;
    if (!grimoireId) {
      throw new Error('No grimoire id');
    }
    const discipline = await createNewDiscipline(grimoireId);

    // Doesn't do anything unless I useActionData();
    return discipline;
  }

  return null;
};

export default function Grimoire() {
  const { id, name, description, disciplines } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>{name}</h1>
      <p>{description}</p>
      <div>
        <table>
          <thead>
            <tr>
              <th>Discipline</th>
              <th>Description</th>
              <th>Spell</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            {disciplines.map((d) => (
              <tr key={d.id}>
                <td>
                  <Form method="post">
                    <input type="hidden" defaultValue={d.id} />
                    <input name="name" defaultValue={d.name} />
                    <button style={{ display: 'none' }} type="submit" name="_action" value="update-discipline-name" />
                  </Form>
                </td>
                <td>
                  <input name="description" defaultValue={d.description} />
                </td>
                <td colSpan={2}>Something</td>
              </tr>
            ))}
            <tr>
              <td colSpan={4}>
                <Form method="post">
                  <input type="hidden" name="grimoireId" defaultValue={id} />
                  <button type="submit" name="_action" value="create-discipline">
                    Create Discipline
                  </button>
                </Form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
