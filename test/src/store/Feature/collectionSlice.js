import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchData = createAsyncThunk('collection', async () => {
  const response = await axios.get(
    'https://api-generator.retool.com/jlEsLB/wallet_content',
  );
  return response.data;
});

export const fetchDetail = createAsyncThunk('collection-detail', async id => {
  const response = await axios.get(
    `https://api-generator.retool.com/j3Iz08/collections/${id}`,
  );
  return response.data;
});

export const fetchStat = createAsyncThunk('collection-stat', async id => {
    const response = await axios.get(
      `https://api-generator.retool.com/ELI42D/collection_stats?collection_id=${id}`,
    );
    return response.data;
  });

export const collectionSlice = createSlice({
  name: 'collection',
  initialState: {
    data: [],
    detail: null,
    stat:[],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchData.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succesed';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchDetail.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.status = 'succesed';
        state.detail = action.payload;
      })
      .addCase(fetchDetail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchStat.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchStat.fulfilled, (state, action) => {
        state.status = 'succesed';
        state.stat = action.payload;
      })
      .addCase(fetchStat.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default collectionSlice.reducer;
