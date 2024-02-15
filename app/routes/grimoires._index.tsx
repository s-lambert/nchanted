import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { getGrimoires } from '~/models/grimoires.server';

export const loader = async () => {
  return json({
    grimoires: await getGrimoires(),
  });
};

export default function Grimoires() {
  const { grimoires } = useLoaderData<typeof loader>();

  return (
    <main>
      <h1>Grimoires</h1>
      <ul>
        {grimoires.map((grimoire) => (
          <li key={grimoire.id}>
            <Link to={grimoire.id}>{grimoire.name}</Link>
          </li>
        ))}
      </ul>
      <p>
        <Link to="new">Create a new Grimoire</Link>
      </p>
    </main>
  );
}
