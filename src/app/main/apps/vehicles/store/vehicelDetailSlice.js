import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const BASE_URL = `https://cargofleet-api.fly.dev/team2/api`;
export const getVehicleDetails = createAsyncThunk('detail/getVehicleDetails', async vehicleId => {
  let response = await axios.get(`${BASE_URL}/vehicles/${vehicleId}`, {
    headers: {
      Authorization: process.env.REACT_APP_API_TOKEN
    }
  });
  return response.data;
});
// POST /api/api/vehicles/:vehicle_id/issues
export const postIssue = createAsyncThunk('detail/postIssue', async issue => {
  let response = await axios.post(
    `${BASE_URL}/vehicles/${issue.vehicleId}/issues`,
    {
      vehicle_id: issue.vehicleId,
      description: issue.description,
      priority: issue.priority,
      due_date: issue.dueDate
    },
    {
      headers: {
        Authorization: process.env.REACT_APP_API_TOKEN
      }
    }
  );
  console.log(response.data, ' ------ data here --------');
});

const initialState = { data: {}, isFetching: false, error: null };

export const vehicleDetailsSlice = createSlice({
  name: 'detail',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [getVehicleDetails.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
      state.error = null;
    },
    [getVehicleDetails.pending]: (state, action) => {
      state.data = null;
      state.isFetching = true;
      state.error = null;
    },
    [getVehicleDetails.rejected]: (state, action) => {
      state.data = null;
      state.isFetching = false;
      state.error = 'Failed to load details of vehicle';
    }
  }
});

export default vehicleDetailsSlice.reducer;
