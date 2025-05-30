import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "../placeholder/products";
import { DiscountType, OnTopType, useStoreCart, type CartItem } from "../store";

export function useDiscountModule() {
  const {
    cart,
    setCart,
    coupon,
    setCoupon,
    onTop,
    setOnTop,
    seasonal,
    setSeasonal,
  } = useStoreCart((state) => state);
  const [loading, setLoading] = useState(false);

  // Total price without discounts
  const totalPrice = useMemo(
    () =>
      cart.map((item) => item.sumPrice).reduce((acc, price) => acc + price, 0),
    [cart]
  );

  // Total price with discounts applied
  const totalDiscountPrice = useMemo(() => {
    if (cart.length === 0) return 0;
    const totalDiscount = cart.reduce(
      (acc, item) => acc + (item.discountPrice ?? item.sumPrice),
      0
    );

    return Math.trunc(totalDiscount);
  }, [cart]);

  // Limit on top point is 20% of total price but without discounts
  const limitOnTopPoint = useMemo(() => (totalPrice * 20) / 100, [totalPrice]);

  // onChange update cart -> trigger to totalPrice -> totalPrice triger to useEffect
  const onChangeQuantity = (cartItem: CartItem, amount: number) => {
    setLoading(true);
    const updatedItem = cart.map((item) => {
      if (item.id === cartItem.id) {
        item.amount = amount;
        item.sumPrice = cartItem?.price * amount;
        item.discountPrice = item.sumPrice;
      }
      return item;
    });
    setCart(updatedItem);
  };

  const onAddToCart = (productItem: Product) => {
    setLoading(true);
    const existItem = cart.find((item) => item.productId === productItem.id);

    if (existItem) {
      onChangeQuantity(existItem, existItem.amount + 1);
    } else {
      const newItem: CartItem = {
        ...productItem,
        id: `cart-${productItem.id}-${cart.length}`,
        productId: productItem.id,
        sumPrice: productItem.price,
        discountPrice: productItem.price,
        amount: 1,
      };

      setCart([...cart, newItem]);
    }
  };

  const onRemoveFromCart = (item: CartItem) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const allocateDiscount = useCallback(
    (discount: number, discountType: DiscountType, itemsPrice: number) => {
      const discountByType =
        discountType === DiscountType.FIXED
          ? discount
          : (totalPrice * discount) / 100;

      const radioPrice = itemsPrice / totalPrice;
      return itemsPrice - discountByType * radioPrice;
    },
    [totalPrice]
  );

  const calculateItemDiscount = useCallback(
    (item: CartItem) => {
      let discountPrice = item.sumPrice;

      if (coupon) {
        discountPrice = allocateDiscount(
          coupon.discount,
          coupon.discount_type,
          discountPrice
        );
      }

      const isOnTopApplicable =
        onTop &&
        (item.category === onTop.category ||
          onTop.on_top_type === OnTopType.POINT);

      if (isOnTopApplicable) {
        discountPrice = allocateDiscount(
          onTop.discount,
          onTop.discount_type,
          discountPrice
        );
      }

      if (seasonal && seasonal.every > 0) {
        const discountSteps = Math.floor(discountPrice / seasonal.every);
        const seasonalDiscountAmount = discountSteps * seasonal.discount;
        discountPrice = allocateDiscount(
          seasonalDiscountAmount,
          DiscountType.FIXED,
          discountPrice
        );
      }

      return Math.max(0, Math.trunc(discountPrice));
    },
    [allocateDiscount, coupon, onTop, seasonal]
  );

  // triger set new discount price everytime when add,change amount, remove item from cart
  // and when apply discounts
  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      const updatedCart = cart.map((item) => {
        return {
          ...item,
          discountPrice: calculateItemDiscount(item),
        };
      });
      setCart(updatedCart);
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coupon, onTop, seasonal, totalPrice]);

  return {
    coupon,
    onAddToCart,
    onRemoveFromCart,
    onChangeQuantity,
    cart,
    setCart,
    totalDiscountPrice,
    setCoupon,
    setOnTop,
    seasonal,
    setSeasonal,
    onTop,
    limitOnTopPoint,
    loading,
  };
}
