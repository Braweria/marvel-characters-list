import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import { characterReducer } from './slices/characters.slice';
import { comicReducer } from './slices/comics.slice';
import { eventReducer } from './slices/events.slice';
import { seriesReducer } from './slices/series.slice';
import { storyReducer } from './slices/stories.slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeStore = () =>
  configureStore({
    reducer: {
      characters: characterReducer,
      comics: comicReducer,
      events: eventReducer,
      stories: storyReducer,
      series: seriesReducer,
    },
  });

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
