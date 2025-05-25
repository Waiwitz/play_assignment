import { DiscountType, OnTopType, type Coupon, type OnTop } from "../store";

export const couponMock: Coupon[] = [
  {
    label: "FIXED50",
    value: "FIXED50",
    discount: 50,
    discount_type: DiscountType.FIXED,
  },
  {
    label: "FIXED100",
    value: "FIXED100",
    discount: 100,
    discount_type: DiscountType.FIXED,
  },
  {
    label: "FIXED200",
    value: "FIXED200",
    discount: 200,
    discount_type: DiscountType.FIXED,
  },
  {
    label: "PERCENTAGE10",
    value: "PERCENTAGE10",
    discount: 10,
    discount_type: DiscountType.PERCENTAGE,
  },
  {
    label: "PERCENTAGE15",
    value: "PERCENTAGE15",
    discount: 15,
    discount_type: DiscountType.PERCENTAGE,
  },
  {
    label: "PERCENTAGE20",
    value: "PERCENTAGE20",
    discount: 20,
    discount_type: DiscountType.PERCENTAGE,
  },
];

// export const couponOptions: DefaultOptionType[] = couponMock.map((coupon) => ({
//   label: coupon.code,
//   value: coupon.id,
//   discount: coupon.discount,
//   type: coupon.type,
// }));

export const onTopMock: OnTop[] = [
  {
    label: "Discount 15% by clothing category",
    value: 1,
    on_top_type: OnTopType.ITEM_CATEGORY,
    discount_type: DiscountType.PERCENTAGE,
    category: "Clothing",
    discount: 15,
  },
  {
    label: "Discount 15% accessories category",
    value: 2,
    on_top_type: OnTopType.ITEM_CATEGORY,
    discount_type: DiscountType.PERCENTAGE,
    category: "Accessories",
    discount: 15,
  },
  {
    label: "Discount 10% electronics category",
    value: 3,
    on_top_type: OnTopType.ITEM_CATEGORY,
    discount_type: DiscountType.PERCENTAGE,
    category: "Electronics",
    discount: 10,
  },
  {
    label: "Discount by point",
    value: 4,
    on_top_type: OnTopType.POINT,
    discount_type: DiscountType.FIXED,
    // category: "Electronics",
    discount: 0,
  },
];
