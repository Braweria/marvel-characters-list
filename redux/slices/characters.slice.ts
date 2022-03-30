import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import md5 from 'md5';
import { HYDRATE } from 'next-redux-wrapper';
import { env } from 'process';

import type { RootState } from '../store';
import { client } from '~/client';

const adapter = createEntityAdapter();
const initialState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
  limit: 3,
  offset: 0,
});

const baseMarvelApi = 'https://gateway.marvel.com:443/v1/public/characters';

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_props, { getState }) => {
    const { characters } = getState() as RootState;

    const charactersUrl = new URL(baseMarvelApi);
    charactersUrl.searchParams.set('limit', characters.limit.toString());
    charactersUrl.searchParams.set('offset', characters.offset.toString());

    const now = Date.now().toString();
    charactersUrl.searchParams.set('ts', now);

    if (!env.MARVEL_PUBLIC_KEY || !env.MARVEL_PRIVATE_KEY) {
      throw new Error('No Marvel API Key was found');
    }
    const hash = md5(`${now}${env.MARVEL_PRIVATE_KEY}${env.MARVEL_PUBLIC_KEY}`);
    charactersUrl.searchParams.set('hash', hash);
    charactersUrl.searchParams.set('apikey', env.MARVEL_PUBLIC_KEY.toString());

    const response = await client.get(charactersUrl.href);

    return response.data.data.results;
  }
);

export const charactersSlice = createSlice({
  name: 'characters',
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
      });
  },
});

export const characterReducer = charactersSlice.reducer;
export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
  selectIds: selectCharacterIds,
} = adapter.getSelectors((state: RootState) => state.characters);
