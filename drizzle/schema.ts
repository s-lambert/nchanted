import { relations } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const spells = sqliteTable('spells', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  difficultyLevel: integer('difficulty_level').notNull(),
});

export const effects = sqliteTable('effects', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const disciplines = sqliteTable('disciplines', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  grimoireId: text('grimoire_id').notNull(),
});

export const disciplineSpellEffects = sqliteTable('discipline_spell_effects', {
  id: text('id').primaryKey(),
  spellId: text('spell_id').notNull(),
  effectId: text('effect_id').notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
});

export const grimoires = sqliteTable('grimoires', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  // Something for the person doing it.
});

export const grimoireDisciplines = relations(grimoires, ({ many }) => ({
  disciplines: many(disciplines),
}));

export const disciplinesRelations = relations(disciplines, ({ one }) => ({
  grimoires: one(grimoires, { fields: [disciplines.grimoireId], references: [grimoires.id] }),
}));

export const wards = sqliteTable('wards', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
});

export const disciplineSpellEffectRelations = relations(disciplineSpellEffects, ({ many, one }) => ({
  spell: one(spells, { fields: [disciplineSpellEffects.spellId], references: [spells.id] }),
  effect: one(effects, { fields: [disciplineSpellEffects.effectId], references: [effects.id] }),
  wards: many(wards),
}));

export const quests = sqliteTable('quests', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
});

export const wardRelations = relations(wards, ({ many }) => ({
  quests: many(quests),
}));
