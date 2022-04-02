import type { ComicEventSeriesStory } from '../../redux/typesSlice';

export type ListAndItemRef = HTMLDivElement;
export type Item = ComicEventSeriesStory;

export type ResourceGridProps = {
  items: Item[];
  type: 'comics' | 'series' | 'stories' | 'events';
};

export type GridContentProps = { item: Item };
