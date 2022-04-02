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
} from '../typesSlice';
import { baseCharacterMarvelApi } from './characters.slice';
import { client } from '~/client';
import { createApiUrl } from '~/createApiUrl';

const adapter = createEntityAdapter<ComicEventSeriesStory>();
const initialState: ComicEventSeriesStoryState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
});

export const fetchComicsByCharacterId = createAsyncThunk(
  'comics/fetchComicsByCharacterId',
  async (id: number) => {
    const collectionUrl = createApiUrl(
      `${baseCharacterMarvelApi}/${id}/comics`
    );

    const response = await client.get(collectionUrl.href);
    return response.data.data.results;
  }
);

export const comicsSlice = createSlice({
  name: 'comics',
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
          action.payload.comics.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.comics.entities);
      })
      .addCase(fetchComicsByCharacterId.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComicsByCharacterId.fulfilled, (state, action) => {
        adapter.upsertMany(state, action);
        state.status = 'idle';
      });
  },
});

export const comicReducer = comicsSlice.reducer;
export const {
  selectAll: selectAllComics,
  selectById: selectComicById,
  selectIds: selectComicIds,
} = adapter.getSelectors((state: RootState) => state.comics);

export const selectComicStatus = createSelector(
  [(state: RootState) => state.comics.status],
  (status) => status
);

export const selectComicsByIds = createSelector(
  [selectAllComics, (state, ids) => ids],
  (state, ids) => {
    return state.filter((comic) => {
      return ids.includes(comic.id);
    });
  }
);

export const selectComicsByCharacterName = createSelector(
  [selectAllComics, (state, name) => name],
  (state, name) => {
    return state.filter((comic) => {
      let hasCharacter = false;
      comic.characters.items.forEach((character) => {
        if (character.name === name) {
          hasCharacter = true;
        }
      });
      return hasCharacter;
    });
  }
);
