import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Inventory = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  updated: string;
  price: number;
};

type InventoryState = {
  items: Inventory[];
  loading: boolean;
  error: string | null;
};

const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Inventory[]>) => {
      state.items = action.payload;
    },
    addItem: (state, action: PayloadAction<Inventory>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<Inventory>) => {
      const index = state.items.findIndex(i => i.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(i => i.id !== action.payload);
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem } = inventorySlice.actions;
export default inventorySlice.reducer;