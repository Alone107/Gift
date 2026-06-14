import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import axios from "axios";
import { RootState } from "../store";

type IFetchGift = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string[];
  sizes: number[];
};

type IFetchGiftArgs = {
  order: string;
  sortBy: string;
  category: string;
  search?: string;
  currentPage: number;
};

interface GiftSliceState {
  items: IFetchGift[];
  status: "loading" | "success" | "error";
}

export const fetchGiftsStatus = createAsyncThunk<
  IFetchGift[], // тип возвращаемого значения — массив подарков
  IFetchGiftArgs, // тип параметров
  { rejectValue: string } // тип ошибки
>(
  "gifts/fetchGiftsStatus",
  async (params: IFetchGiftArgs, { rejectWithValue }) => {
    try {
      const { order, sortBy, category, search, currentPage } = params;

      const res = await axios.get<IFetchGift[]>(
        `https://6a0f28901736097c360b3840.mockapi.io/react-gits?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch gifts");
    }
  },
);

const initialState: GiftSliceState = {
  items: [],
  status: "loading", // loading | success | error
};

export const giftSlice = createSlice({
  name: "gifts",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGiftsStatus.pending, (state) => {
      state.status = "loading";
      state.items = [];
    });
    builder.addCase(
      fetchGiftsStatus.fulfilled,
      (state, action: PayloadAction<IFetchGift[]>) => {
        state.status = "success";
        state.items = action.payload;
      },
    );
    builder.addCase(fetchGiftsStatus.rejected, (state) => {
      state.status = "error";
      state.items = [];
    });
  },
});

export const selectGift = (state: RootState) => state.gift;

// Action creators are generated for each case reducer function
export const { setItems } = giftSlice.actions;

export default giftSlice.reducer;
