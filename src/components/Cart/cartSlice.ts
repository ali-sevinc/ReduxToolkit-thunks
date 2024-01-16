import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "../../store/store";
const firbase_url = import.meta.env.firebase_url;

export type ItemsStateType = {
  id: string;
  title: string;
  price: number;
  quantity: number;
};
export type CartState = {
  items: ItemsStateType[];
  isCartToggled: boolean;
  status: "idle" | "info" | "success" | "error";
};

const initialState: CartState = {
  items: [],
  isCartToggled: false,
  status: "idle",
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemsStateType>) => {
      const existedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existedItem) {
        state.items = state.items.map((item) =>
          item.id === existedItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.items.push(action.payload);
      }
    },
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const existedItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existedItem)
        if (existedItem?.quantity > 1) {
          state.items = state.items.map((item) =>
            item.id === existedItem.id
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
        } else {
          state.items = state.items.filter(
            (item) => item.id !== existedItem.id
          );
        }
    },
    replaceCart: (state, action: PayloadAction<ItemsStateType[]>) => {
      state.items = action.payload || [];
    },
    toggleCart: (state) => {
      state.isCartToggled = !state.isCartToggled;
    },
    fetchStatus: (
      state,
      action: PayloadAction<{
        status: "idle" | "info" | "success" | "error";
      }>
    ) => {
      state.status = action.payload.status;
    },
  },
});

export function sendCartData(cartData: ItemsStateType[]) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(cartSlice.actions.fetchStatus({ status: "info" }));
      const res = await fetch(firbase_url + "cart.json", {
        method: "PUT",
        body: JSON.stringify(cartData),
      });
      if (!res.ok) throw new Error("Something went wrong");
      dispatch(cartSlice.actions.fetchStatus({ status: "success" }));
    } catch (error) {
      dispatch(cartSlice.actions.fetchStatus({ status: "error" }));
    }
  };
}

export function getInitialCart() {
  return async function (dispatch: AppDispatch) {
    try {
      const res = await fetch(firbase_url + "cart.json");
      if (!res.ok) throw new Error("Something went wrong");
      const resData = await res.json();
      // console.log(resData);
      dispatch(cartSlice.actions.replaceCart(resData));
    } catch (error) {
      dispatch(cartSlice.actions.fetchStatus({ status: "error" }));
    }
  };
}

export const { addItem, removeItem, toggleCart, fetchStatus, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
