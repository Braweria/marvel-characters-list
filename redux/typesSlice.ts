import type { EntityState } from '@reduxjs/toolkit';

export type Statuses = 'idle' | 'loading' | 'error';

export type Character = {
  [key: string]: unknown;
  id: number;
  name: string;
  description: string;
};

export type CharactersState = {
  status: Statuses;
  statuses: { [id: string]: Statuses };
  limit: number;
  offset: number;
} & EntityState<Character>;
