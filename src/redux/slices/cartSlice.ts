import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { createSelector } from "reselect";
import { RootState } from "../store";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";
import { calcTotalCount } from "../../utils/calcTotalCount";

export type ICartSlice = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string; // выбранный тип как строка
  size: number; // выбранный размер
  sizes?: number[]; // выбранный размер
  count: number; // количество
};

interface cartSliceInterface {
  totalPrice: number;
  totalCount: number;
  items: ICartSlice[];
}

const cartData = getCartFromLS();

const initialState: cartSliceInterface = {
  totalPrice: cartData?.totalPrice ?? 0,
  totalCount: cartData?.totalCount ?? 0,
  items: cartData?.items ?? [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<ICartSlice>) {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].count += 1;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
      state.totalCount = calcTotalCount(state.items);
    },

    removeItem(state, action: PayloadAction<ICartSlice>) {
      // Ищем элемент по всем трём параметрам
      const itemToRemoveIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (itemToRemoveIndex !== -1) {
        const itemToRemove = state.items[itemToRemoveIndex];
        state.totalPrice -= itemToRemove.price * itemToRemove.count;
        state.totalCount -= itemToRemove.count;
        // Удаляем только конкретный вариант товара
        state.items.splice(itemToRemoveIndex, 1);
      }
    },

    minusItem(state, action: PayloadAction<ICartSlice>) {
      // Ищем элемент по всем трём параметрам
      const findItemIndex = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.type === action.payload.type &&
          item.size === action.payload.size,
      );

      if (findItemIndex !== -1) {
        const findItem = state.items[findItemIndex];

        if (findItem.count > 1) {
          findItem.count--;
          state.totalCount--;
          state.totalPrice -= findItem.price;
        } else {
          // Если остался 1 товар, удаляем только этот вариант
          state.items.splice(findItemIndex, 1);
          state.totalCount--;
          state.totalPrice -= findItem.price;
        }
      }
    },

    clearItem(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const selectCart = (state: RootState) => state.cart;
const selectCartItems = (state: RootState) => state.cart.items || [];
export const selectCartItemsByID = (id: string) =>
  createSelector([selectCartItems], (items) =>
    items.filter((item) => item.id === id),
  );

export const { addItem, removeItem, clearItem, minusItem } = cartSlice.actions;
export default cartSlice.reducer;
