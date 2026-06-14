import { ICartSlice } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: ICartSlice[]) => {
  return items.reduce((sum, item) => sum + item.price * item.count, 0) || 0;
};
