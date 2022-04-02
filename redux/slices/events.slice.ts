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

export const fetchEventsByCharacterId = createAsyncThunk(
  'events/fetchEventsByCharacterId',
  async (id: number) => {
    const collectionUrl = createApiUrl(
      `${baseCharacterMarvelApi}/${id}/events`
    );

    const response = await client.get(collectionUrl.href);
    return response.data.data.results;
  }
);

export const eventsSlice = createSlice({
  name: 'events',
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

        // console.log('HYDRATE', action.payload);

        const statuses = Object.fromEntries(
          action.payload.events.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.events.entities);
      })
      .addCase(fetchEventsByCharacterId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEventsByCharacterId.fulfilled, (state, action) => {
        adapter.upsertMany(state, action);
        state.status = 'idle';
      });
  },
});

export const eventReducer = eventsSlice.reducer;
export const {
  selectAll: selectAllEvents,
  selectById: selectEventById,
  selectIds: selectEventIds,
} = adapter.getSelectors((state: RootState) => state.events);

export const selectEventStatus = createSelector(
  [(state: RootState) => state.events.status],
  (status) => status
);

export const selectEventsByIds = createSelector(
  [selectAllEvents, (state, ids) => ids],
  (state, ids) => {
    return state.filter((event) => {
      return ids.includes(event.id);
    });
  }
);

export const selectEventsByCharacterName: SelectAllByCharacterName =
  createSelector([selectAllEvents, (state, name) => name], (state, name) => {
    return state.filter((event) => {
      let hasCharacter = false;
      event.characters.items.forEach((character) => {
        if (character.name === name) {
          hasCharacter = true;
        }
      });
      return hasCharacter;
    });
  });
