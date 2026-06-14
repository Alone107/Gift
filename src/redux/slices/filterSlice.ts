import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type ISort = {
  name: string;
  sortProperty: string;
};

interface IFilterSlice {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: ISort;
}

const initialState: IFilterSlice = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<ISort>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },

    setFilters(state, action: PayloadAction<Partial<IFilterSlice>>) {
      const { sort, currentPage, categoryId, searchValue } = action.payload;

      if (sort !== undefined) {
        state.sort = sort;
      }
      if (currentPage !== undefined) {
        state.currentPage = Number(currentPage);
      }
      if (categoryId !== undefined) {
        state.categoryId = Number(categoryId);
      }
      if (searchValue !== undefined) {
        state.searchValue = searchValue;
      }
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectFilterSort = (state: RootState) => state.filter.sort;

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSort,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
