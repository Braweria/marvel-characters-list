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

export const fetchStoriesByCharacterId = createAsyncThunk(
  'stories/fetchStoriesByCharacterId',
  async (id: number) => {
    const collectionUrl = createApiUrl(
      `${baseCharacterMarvelApi}/${id}/stories`
    );

    const response = await client.get(collectionUrl.href);
    return response.data.data.results;
  }
);

export const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(HYDRATE, (state, action) => {
        /**
         * TypeError on action.payload
         * Property 'payload' does not exist on type 'Action<"__NEXT_REDUX_WRAPPER_HYDRATE__">'.
         * It's INCORRECT, payload *does* exist on type 'Action<"__NEXT_REDUX_WRAPPER_HYDRATE__">'.
         */

        // console.log('HYDRATE', action.payload);

        const statuses = Object.fromEntries(
          action.payload.stories.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.stories.entities);
      })
      .addCase(fetchStoriesByCharacterId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStoriesByCharacterId.fulfilled, (state, action) => {
        adapter.upsertMany(state, action);
        state.status = 'idle';
      });
  },
});

export const storyReducer = storiesSlice.reducer;
export const {
  selectAll: selectAllStories,
  selectById: selectStoryById,
  selectIds: selectStoryIds,
} = adapter.getSelectors((state: RootState) => state.stories);

export const selectStoryStatus = createSelector(
  [(state: RootState) => state.stories.status],
  (status) => status
);

export const selectStoriesByIds = createSelector(
  [selectAllStories, (state, ids) => ids],
  (state, ids) => {
    return state.filter((story) => {
      return ids.includes(story.id);
    });
  }
);

export const selectStoriesByCharacterName: SelectAllByCharacterName =
  createSelector([selectAllStories, (state, name) => name], (state, name) => {
    return state.filter((story) => {
      let hasCharacter = false;
      story.characters.items.forEach((character) => {
        if (character.name === name) {
          hasCharacter = true;
        }
      });
      return hasCharacter;
    });
  });
