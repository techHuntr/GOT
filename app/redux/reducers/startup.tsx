import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { getCharectors } from "../../services/charectorService";
import { RootState } from "../store";
import { IStartUpState } from "../../modals/StartUpState";
import { API_STATUS, PAGE_SIZE } from "../../Constants";
import { getPages } from "../../utils/helpers";

const INITIAL_STATE: IStartUpState = {
  status: API_STATUS.IDLE,
  charectors: [],
  error: undefined,
  pages: undefined,
};

export const fetchAllCharectors = createAsyncThunk(
  "charector/getAllCharectors",
  // if you type your function argument here
  async (args, { rejectWithValue }) => {
    try {
      const response = await getCharectors();
      return response;
    } catch (err: any) {
      const error: AxiosError<any> = err; // cast the error for access
      if (!error) {
        throw err;
      }
      // We got validation errors, let's return those so we can reference in our component and set form errors
      return rejectWithValue(error);
    }
  }
);

const startupSlice = createSlice({
  name: "startup",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllCharectors.pending, (state, action) => {
      state.status = API_STATUS.IDLE;
    });
    builder.addCase(fetchAllCharectors.fulfilled, (state, { payload }) => {
      state.status = API_STATUS.SUCCESS;
      state.charectors = payload;
      state.pages = getPages(payload, PAGE_SIZE);
    });
    builder.addCase(fetchAllCharectors.rejected, (state, action) => {
      if (!action.error) {
      } else if (action.error) {
        state.status = API_STATUS.FAILURE;
        state.error = action.payload;
      }
    });
  },
});
export const selectCharectorApiStatus = (state: RootState) =>
  state.startUp.status;
export const selectAllCharetctors = (state: RootState) =>
  state.startUp.charectors;
export const selectAllPages = (state: RootState) => state.startUp.pages;

export const {} = startupSlice.actions;
export default startupSlice.reducer;
