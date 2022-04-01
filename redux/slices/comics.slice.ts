import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import type { RootState } from '../store';
import type { ComicState, Comic } from '../typesSlice';
import { client } from '~/client';
import { createApiUrl } from '~/createApiUrl';

const adapter = createEntityAdapter<Comic>();
const initialState: ComicState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
});

export const fetchComicsByCollectionUrl = createAsyncThunk(
  'comics/fetchComicsByCollectionUrl',
  async (url: string) => {
    const collectionUrl = createApiUrl(url);

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

        console.log('HYDRATE', action.payload);

        const statuses = Object.fromEntries(
          action.payload.comics.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.comics.entities);
      })
      .addCase(fetchComicsByCollectionUrl.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchComicsByCollectionUrl.fulfilled, (state, action) => {
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
    return state.filter((comic) => ids.includes(comic.id));
  }
);
