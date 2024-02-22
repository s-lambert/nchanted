import { integer, real, sqliteTable } from 'drizzle-orm/sqlite-core';

export const codeCoverage = sqliteTable('code_coverage', {
  time: integer('time').primaryKey(),
  statementPercent: real('statement_percent').notNull(),
});
