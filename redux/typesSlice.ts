import type { EntityState } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Statuses = 'idle' | 'loading' | 'error';

export type ResourceItem = {
  name: string;
  resourceURI: string;
};

export type Resource = {
  available: number;
  collectionURI: string;
  items: ResourceItem[];
  returned: number;
};

export type Thumbnail = {
  path: string;
  extension: string;
} | null;

export type Character = {
  [key: string]: unknown;
  id: number;
  name: string;
  description: string;
  thumbnail: Thumbnail;
  comics: Resource;
  series: Resource;
  stories: Resource;
  events: Resource;
};

export type InitialState = {
  status: Statuses;
  statuses: { [id: string]: Statuses };
};

export type CharactersState = InitialState & {
  limit: number;
  offset: number;
} & EntityState<Character>;

export type ResourceUrl = {
  type: string;
  url: string;
};

export type ComicEventSeriesStory = {
  id: number;
  title: string;
  description: string;
  thumbnail?: Thumbnail;
  characters: Resource;
  urls?: ResourceUrl[];
};

export type ComicEventSeriesStoryState = InitialState &
  EntityState<ComicEventSeriesStory>;

export type SelectAllByCharacterName = (
  state: RootState,
  name: string
) => ComicEventSeriesStory[];
