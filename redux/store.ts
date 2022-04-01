import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import type { TypedUseSelectorHook } from 'react-redux';
import { useSelector } from 'react-redux';

import { characterReducer } from './slices/characters.slice';
import { comicReducer } from './slices/comics.slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeStore = () =>
  configureStore({
    reducer: {
      characters: characterReducer,
      comics: comicReducer,
    },
  });

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
