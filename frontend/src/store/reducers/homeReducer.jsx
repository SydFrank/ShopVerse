/**
 * This reducer handles all product-related state management for the homepage
 * and shop pages, including category navigation, product filtering, and pagination.
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

/**
 * Async thunk to fetch product categories from the backend
 *
 * @async
 * @function get_category
 * @returns {Promise<Object>} Promise resolving to category data
 * @throws {Object} API error response
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
// End of get_category async thunk

/**
 * Async thunk to fetch various product collections for homepage display
 *
 * @async
 * @function get_products
 * @returns {Promise<Object>} Promise resolving to products data including:
 *   - products: General product array
 *   - latest_product: Recently added products
 *   - topRated_product: Highest rated products
 *   - discount_product: Products with discounts
 * @throws {Object} API error response
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
// End of get_products async thunk

/**
 * Async thunk to fetch price range boundaries and latest products
 * Used for price filter slider initialization and homepage carousel
 *
 * @async
 * @function price_range_product
 * @returns {Promise<Object>} Promise resolving to:
 *   - priceRange: {low: number, high: number} - Min/max price boundaries
 *   - latest_product: Array of latest products
 * @throws {Object} API error response
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
// End of price_range_product async thunk

/**
 * Async thunk to query products with advanced filtering and pagination
 *
 * @async
 * @function query_products
 * @param {Object} query - Filter parameters object
 * @param {string} query.category - Product category filter
 * @param {number} query.rating - Minimum rating filter
 * @param {number} query.low - Minimum price filter
 * @param {number} query.high - Maximum price filter
 * @param {string} query.sortPrice - Price sorting order ('asc'|'desc')
 * @param {number} query.pageNumber - Current page number for pagination
 * @param {string} [query.searchValue] - Optional search term
 * @returns {Promise<Object>} Promise resolving to:
 *   - products: Filtered product array
 *   - totalProduct: Total count of matching products
 *   - parPage: Products per page limit
 * @throws {Object} API error response
 */
export const query_products = createAsyncThunk(
  "product/query_products",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
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
// End of query_products async thunk

/**
 * Async thunk to fetch detailed product information along with related products
 * Used for product detail pages to display comprehensive product information
 *
 * @async
 * @function product_details
 * @param {string} slug - Product URL slug identifier for fetching specific product
 * @returns {Promise<Object>} Promise resolving to:
 *   - product: Detailed product information object
 *   - relatedProducts: Array of products in the same category
 *   - moreProducts: Array of products from the same seller
 * @throws {Object} API error response
 */
export const product_details = createAsyncThunk(
  "product/product_details",
  async (slug, { fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/home/product-details/${slug}`);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);
// End of product_details async thunk

/**
 * Async thunk to submit customer product review and rating
 * Used for customers to share their product experience and feedback
 *
 * @async
 * @function customer_review
 * @param {Object} info - Review information including rating, feedback, and customer details
 * @returns {Promise<Object>} Promise resolving to review submission response
 * @throws {Object} API error response
 */
export const customer_review = createAsyncThunk(
  "review/customer_review",
  async (info, { fulfillWithValue }) => {
    try {
      const { data } = await api.post("/home/customer/submit-review", info);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response);
    }
  }
);
// End of customer_review async thunk

/**
 * Home Redux Slice Configuration
 *
 * @typedef {Object} HomeState
 * @property {Array} categorys - Product categories for navigation menu
 * @property {Array} products - Current filtered/searched products array
 * @property {number} totalProduct - Total count of products matching current filters
 * @property {number} parPage - Number of products displayed per page
 * @property {Array} latest_product - Recently added products for homepage carousel
 * @property {Array} topRated_product - Top-rated products for homepage showcase
 * @property {Array} discount_product - Discounted products for homepage promotions
 * @property {Object} priceRange - Price filter boundaries
 * @property {number} priceRange.low - Minimum available product price
 * @property {number} priceRange.high - Maximum available product price
 * @property {Object} product - Detailed information for currently viewed product
 * @property {Array} relatedProducts - Products related to current product (same category)
 * @property {Array} moreProducts - Additional products from the same seller
 */
export const homeReducer = createSlice({
  name: "home",

  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    parPage: 3,
    latest_product: [],
    topRated_product: [],
    discount_product: [],
    priceRange: {
      low: 0,
      high: 100,
    },
    product: {},
    relatedProducts: [],
    moreProducts: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      // Get Product Categories
      .addCase(get_category.fulfilled, (state, { payload }) => {
        state.categorys = payload.categorys;
      })
      // Get Homepage Products Collections
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.latest_product = payload.latest_product;
        state.topRated_product = payload.topRated_product;
        state.discount_product = payload.discount_product;
      })
      // Get Price Range and Latest Products
      .addCase(price_range_product.fulfilled, (state, { payload }) => {
        state.priceRange = payload.priceRange;
        state.latest_product = payload.latest_product;
      })
      // Query Products with Filters and Pagination
      .addCase(query_products.fulfilled, (state, { payload }) => {
        state.products = payload.products;
        state.totalProduct = payload.totalProduct;
        state.parPage = payload.parPage;
      })
      // Get Product Details, Related Products, and More from Same Seller
      .addCase(product_details.fulfilled, (state, { payload }) => {
        state.product = payload.product;
        state.relatedProducts = payload.relatedProducts;
        state.moreProducts = payload.moreProducts;
      });
  },
});

export default homeReducer.reducer;
