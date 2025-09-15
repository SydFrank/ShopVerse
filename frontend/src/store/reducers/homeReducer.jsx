/**
 * Home Reducer - Homepage data state management
 *
 * Core Features:
 * - Product categories for navigation
 * - Multiple product types (latest, top-rated, discount)
 * - Price range filtering for shop page
 * - Error handling for API requests
 *
 * State: categorys, products, latest_product, topRated_product, discount_product, priceRange
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/**
 * Get Categories - Fetch product categories for navigation
 * API: GET /home/get-categorys
 */
export const get_category = createAsyncThunk(
  "product/get_category",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-categorys");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

/**
 * Get Products - Fetch multiple product types for homepage
 * Returns: products, latest_product, topRated_product, discount_product
 * API: GET /home/get-products
 */
export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/get-products");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

/**
 * Price Range Product - Get price boundaries and latest products
 * Returns: priceRange (min/max), latest_product array
 * API: GET /home/price-range-latest-product
 */
export const price_range_product = createAsyncThunk(
  "product/price_range_product",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/home/price-range-latest-product");
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

/**
 * Query Products - Filter and search products with pagination
 * Params: category, rating, price range, sort, pageNumber, searchValue
 * API: GET /home/query-products
 */
export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      // Build query string with filters
      const { data } = await api.get(
        `/home/query-products?category=${query.category}&&rating=${
          query.rating
        }&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${
          query.sortPrice
        }&&pageNumber=${query.pageNumber}&&searchValue=${
          query.searchValue ? query.searchValue : ""
        }`
      );

      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
      return rejectWithValue(error);
    }
  }
);

/**
 * Home Redux Slice - Manages homepage and shop data state
 */
export const homeReducer = createSlice({
  name: "home",

  // Initial state structure
  initialState: {
    categorys: [], // Product categories for navigation
    products: [], // Filtered products for shop page
    totalProduct: 0, // Total count for pagination
    parPage: 3, // Products per page
    latest_product: [], // Homepage latest products carousel
    topRated_product: [], // Homepage top-rated products carousel
    discount_product: [], // Homepage discount products carousel
    priceRange: {
      low: 0, // Min price for filter slider
      high: 100, // Max price for filter slider
    },
  },

  reducers: {},

  // Handle async thunk responses
  extraReducers: (builder) => {
    builder
      // Categories for navigation
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.categorys = payload.categorys;
      })

      // All product types for homepage
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.latest_product = payload.latest_product;
        state.topRated_product = payload.topRated_product;
        state.discount_product = payload.discount_product;
      })

      // Price range and latest products
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.priceRange = payload.priceRange;
        state.latest_product = payload.latest_product;
      })

      // Filtered products for shop page
      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
        state.parPage = payload.parPage;
      });
  },
});

export default homeReducer.reducer;
