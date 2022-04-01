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

const adapter = createEntityAdapter<Character>();
const initialState: CharactersState = adapter.getInitialState({
  status: 'idle',
  statuses: {},
  limit: 30,
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

    if (
      !process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY ||
      !process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY
    ) {
      throw new Error('No Marvel API Key was found');
    }
    const hash = md5(
      `${now}${process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY}${process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY}`
    );
    charactersUrl.searchParams.set('hash', hash);
    charactersUrl.searchParams.set(
      'apikey',
      process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY.toString()
    );

    const response = await client.get(charactersUrl.href);

    return response.data.data.results;
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
