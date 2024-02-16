import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getVehicleDetails = createAsyncThunk(
  'detail/getVehicleDetails',
  async (vehicleId, { dispatch, getState }) => {
    let response = await axios.get(`https://cargofleet-api.fly.dev/team2/api/vehicles/${vehicleId}`, {
      headers: {
        Authorization: 'Zb84MzAROCrhmF6t'
      }
    });
    return response.data;
  }
);

const initialState = { data: {}, error: null };

export const vehicleDetailsSlice = createSlice({
  name: 'detail',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getVehicleDetails.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.error = null;
    },
    [getVehicleDetails.rejected]: (state, action) => {
      state.data = null;
      state.error = 'Failed to load';
    }
  }
});

export default vehicleDetailsSlice.reducer;
