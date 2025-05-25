import { create } from "zustand";
import type { Product, ProductCategory } from "../placeholder/products";
import type { DefaultOptionType } from "antd/es/select";

export interface CartItem extends Product {
  productId: string;
  amount: number;
  // productPrice: number;
  sumPrice: number;
  discountPrice?: number;
}

export enum OnTopType {
  ITEM_CATEGORY,
  POINT,
}

export enum DiscountType {
  FIXED,
  PERCENTAGE,
}

export interface Coupon extends DefaultOptionType {
  discount: number;
  discount_type: DiscountType;
}

export interface OnTop extends DefaultOptionType {
  on_top_type: OnTopType;
  discount_type: DiscountType;
  discount: number;
  category?: ProductCategory;
}

export interface Seasonal {
  every: number;
  discount: number;
  discount_type: DiscountType;
}

interface StoreState {
  cart: CartItem[];
  coupon: Coupon | null;
  onTop: OnTop | null;
  seasonal: Seasonal | null;
}

interface StoreActions {
  setCart: (cart: CartItem[]) => void;
  setCoupon: (coupon: Coupon | null) => void;
  setOnTop: (onTop: OnTop | null) => void;
  setSeasonal: (seasonal: Seasonal | null) => void;
}

export const useStoreCart = create<StoreState & StoreActions>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  coupon: null,
  setCoupon: (coupon) => set({ coupon }),
  onTop: null,
  setOnTop: (onTop) => set({ onTop }),
  seasonal: null,
  setSeasonal: (seasonal) => set({ seasonal }),
}));
