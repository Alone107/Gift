import { ICartSlice } from "../redux/slices/cartSlice";

export const calcTotalCount = (items: ICartSlice[]) => {
  return items.reduce((sum, item) => sum + item.count, 0) || 0;
};
