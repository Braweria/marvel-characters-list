import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import md5 from 'md5';
import { HYDRATE } from 'next-redux-wrapper';

import type { RootState } from '../store';
import type { CharactersState, Character } from '../typesSlice';
import { client } from '~/client';
import { createApiUrl } from '~/createApiUrl';
import { fetchComicsByCollectionUrl } from './comics.slice';

const adapter = createEntityAdapter<Character>();
const initialState: CharactersState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
  limit: 30,
  offset: 0,
});

const baseCharacterMarvelApi =
  'https://gateway.marvel.com:443/v1/public/characters';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_props, { getState }) => {
    const { characters } = getState() as RootState;

    const charactersUrl = createApiUrl(baseCharacterMarvelApi);

    charactersUrl.searchParams.set('limit', characters.limit.toString());
    charactersUrl.searchParams.set('offset', characters.offset.toString());

    const response = await client.get(charactersUrl.href);

    return response.data.data.results;
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: number, { dispatch }) => {
    const charactersUrl = createApiUrl(`${baseCharacterMarvelApi}/${id}`);

    const response = await client.get(charactersUrl.href);
    const [result] = response.data.data.results;

    await dispatch(fetchComicsByCollectionUrl(result.comics.collectionURI));

    return result;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateOffset: (state) => {
      state.offset += 30;
    },
  },
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
          action.payload.characters.ids.map((id: number) => [id, 'idle'])
        );

        state.statuses = { ...state.statuses, ...statuses };
        adapter.upsertMany(state, action.payload.characters.entities);
      })
      .addCase(fetchCharacters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        adapter.upsertMany(state, action);
        state.status = 'idle';
      })
      .addCase(fetchCharacterById.pending, (state, action) => {
        state.statuses[action.meta.arg] = 'loading';
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        adapter.upsertOne(state, action);
        state.statuses[action.payload.id] = 'idle';
      });
  },
});

export const characterReducer = charactersSlice.reducer;
export const { updateOffset } = charactersSlice.actions;
export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
  selectIds: selectCharacterIds,
} = adapter.getSelectors((state: RootState) => state.characters);

export const selectCharacterStatus = createSelector(
  [(state: RootState) => state.characters.status],
  (status) => status
);
