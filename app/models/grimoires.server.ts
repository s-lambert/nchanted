import { v4 as uuidv4 } from 'uuid';
import { disciplines, grimoires } from 'drizzle/schema';
import { buildDbClient } from '~/lib/client';

type InsertGrimoire = typeof grimoires.$inferInsert;

export async function getGrimoires() {
  const db = buildDbClient();
  const grimoires = await db.query.grimoires.findMany();

  return grimoires;
}

export async function getGrimoire(id: string) {
  const db = buildDbClient();
  return db.query.grimoires.findFirst({
    where: (grimoires, { eq }) => eq(grimoires.id, id),
    with: {
      disciplines: true,
    },
  });
}

export async function createGrimoire({ name, description }: Omit<InsertGrimoire, 'id'>) {
  const db = buildDbClient();
  const result = await db
    .insert(grimoires)
    .values({
      id: uuidv4(),
      name,
      description,
    })
    .returning()
    .get();

  if (result) {
    return {
      status: 'created',
    };
  }
  return {
    status: 'errored',
  };
}

export async function createNewDiscipline(grimoireId: string) {
  const db = buildDbClient();
  const discipline = await db
    .insert(disciplines)
    .values({
      id: uuidv4(),
      name: '',
      description: '',
      grimoireId,
    })
    .returning()
    .get();

  if (discipline) {
    return {
      status: 'created',
      discipline,
    };
  } else {
    return {
      status: 'errored',
    };
  }
}
