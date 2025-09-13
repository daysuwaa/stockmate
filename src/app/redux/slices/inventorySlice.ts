/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../../services/axios";

// 1) Inventory type
export type Inventory = {
  id: string;
  name: string;
  category: string;
  quantity: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  updated: string; // ISO string
  price: number;
};

type Stats = {
  totalItems: number;
  lowStock: number;
  outOfStock: number;
  totalRevenue: number;
  todayRevenue: number;   
  weeklyRevenue: number; 
  totalValue: number;   
  totalInventoryValue: number;
};

// 2) State type
type InventoryState = {
  items: Inventory[];
  loading: boolean;
  error: string | null;
  stats: Stats | null;
};

// 3) Initial state
const initialState: InventoryState = {
  items: [],
  loading: false,
  error: null,
  stats: null,
};

// Helper function to calculate stats from items
const calculateStatsFromItems = (items: Inventory[]) => {
  const totalItems = items.length;
  const lowStock = items.filter(item => item.status === "Low Stock").length;
  const outOfStock = items.filter(item => item.status === "Out of Stock").length;
  
  // Calculate total inventory value
  const totalInventoryValue = items.reduce((total, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return total + (price * quantity);
  }, 0);

  return {
    totalItems,
    lowStock,
    outOfStock,
    totalInventoryValue,
  };
};

// 4) Thunks (async API calls)

// GET all
export const fetchInventory = createAsyncThunk<
  Inventory[],
  void,
  { rejectValue: string }
>("inventory/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get("/inventory");
    return data as Inventory[];
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to fetch inventory");
  }
});

// ADD
export const addInventoryItem = createAsyncThunk<
  Inventory,
  { name: string; category: string; quantity: number; status: string; price: number },
  { rejectValue: string }
>("inventory/addInventoryItem", async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post("/inventory", body);
    return data as Inventory;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to add item");
  }
});

// UPDATE
export const updateInventoryItem = createAsyncThunk<
  Inventory,
  Inventory,
  { rejectValue: string }
>("inventory/update", async (item, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`/inventory/${item.id}`, item);
    return data as Inventory;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to update item");
  }
});

// DELETE
export const deleteInventoryItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("inventory/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`/inventory/${id}`);
    return id;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data?.message || "Failed to delete item");
  }
});

export const fetchInventoryStats = createAsyncThunk(
  "inventory/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/inventory/stats");
      return res.data; // { totalRevenue, todayRevenue, weeklyRevenue, totalValue }
    } catch {
      return rejectWithValue("Failed to fetch stats");
    }
  }
);

// 5) Slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventory.fulfilled, (state, action: PayloadAction<Inventory[]>) => {
        state.loading = false;
        state.items = action.payload;
        
        // Calculate stats from the fetched items
        const calculatedStats = calculateStatsFromItems(action.payload);
        
        // Merge with existing stats (from backend) if any
        state.stats = {
          ...state.stats,
          ...calculatedStats,
        } as Stats;
      })
      .addCase(fetchInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching inventory";
      })
      
      // ADD
      .addCase(addInventoryItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
        
        // Recalculate stats after adding item
        if (state.stats) {
          const calculatedStats = calculateStatsFromItems(state.items);
          state.stats = {
            ...state.stats,
            ...calculatedStats,
          };
        }
      })
      
      // UPDATE
      .addCase(updateInventoryItem.fulfilled, (state, action: PayloadAction<Inventory>) => {
        const idx = state.items.findIndex((i) => i.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
          
          // Recalculate stats after updating item
          if (state.stats) {
            const calculatedStats = calculateStatsFromItems(state.items);
            state.stats = {
              ...state.stats,
              ...calculatedStats,
            };
          }
        }
      })
      
      // DELETE
      .addCase(deleteInventoryItem.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter((i) => i.id !== action.payload);
        
        // Recalculate stats after deleting item
        if (state.stats) {
          const calculatedStats = calculateStatsFromItems(state.items);
          state.stats = {
            ...state.stats,
            ...calculatedStats,
          };
        }
      })
      
      .addCase(fetchInventoryStats.fulfilled, (state, action) => {
        // Get calculated stats from current items
        const calculatedStats = calculateStatsFromItems(state.items);
        
        // Merge backend stats with calculated stats
        state.stats = {
          ...action.payload, // Backend stats (revenue data, etc.)
          ...calculatedStats, // Calculated stats (inventory value, counts)
        };
      });
  },
});

export default inventorySlice.reducer;