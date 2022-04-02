import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { RootState } from '../store';
import type {
  ComicEventSeriesStoryState,
  ComicEventSeriesStory,
  SelectAllByCharacterName,
} from '../typesSlice';
import { baseCharacterMarvelApi } from './characters.slice';
import { client } from '~/client';
import { createApiUrl } from '~/createApiUrl';

const adapter = createEntityAdapter<ComicEventSeriesStory>();
const initialState: ComicEventSeriesStoryState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
});

export const fetchSeriesByCharacterId = createAsyncThunk(
  'series/fetchSeriesByCharacterId',
  async (id: number) => {
    const collectionUrl = createApiUrl(
      `${baseCharacterMarvelApi}/${id}/series`
    );

    const response = await client.get(collectionUrl.href);
    return response?.data.data.results;
  }
);

export const seriesSlice = createSlice({
  name: 'series',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(HYDRATE, (state, action: any) => {
        /**
         * TypeError on action.payload
         * Property 'payload' does not exist on type 'Action<"__NEXT_REDUX_WRAPPER_HYDRATE__">'.
         * It's INCORRECT, payload *does* exist on type 'Action<"__NEXT_REDUX_WRAPPER_HYDRATE__">'.
         */

        console.log('HYDRATE', action.payload);

        const statuses = Object.fromEntries(
          action.payload.series.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.series.entities);
      })
      .addCase(fetchSeriesByCharacterId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSeriesByCharacterId.fulfilled, (state, action) => {
        adapter.upsertMany(state, action);
        state.status = 'idle';
      });
  },
});

export const seriesReducer = seriesSlice.reducer;
export const {
  selectAll: selectAllSeries,
  selectById: selectSeriesById,
  selectIds: selectSeriesIds,
} = adapter.getSelectors((state: RootState) => state.series);

export const selectSeriesStatus = createSelector(
  [(state: RootState) => state.series.status],
  (status) => status
);

export const selectSeriesByIds = createSelector(
  [selectAllSeries, (state, ids) => ids],
  (state, ids) => {
    return state.filter((series) => {
      return ids.includes(series.id);
    });
  }
);

export const selectSeriesByCharacterName: SelectAllByCharacterName =
  createSelector([selectAllSeries, (state, name) => name], (state, name) => {
    return state.filter((series) => {
      let hasCharacter = false;
      series.characters.items.forEach((character) => {
        if (character.name === name) {
          hasCharacter = true;
        }
      });
      return hasCharacter;
    });
  });
