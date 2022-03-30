import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { characterReducer } from './slices/characters.slice';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const makeStore = () =>
  configureStore({
    reducer: {
      characters: characterReducer,
    },
  });

export const wrapper = createWrapper(makeStore);

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<AppStore['getState']>;
