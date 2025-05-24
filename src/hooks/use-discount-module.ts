import { useMemo } from "react";
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
    isIncludedSeasonal,
    setIsIncludedSeasonal,
  } = useStoreCart((state) => state);

  const onChangeQuantity = (cartItem: CartItem, quantity: number) => {
    const updatedItem = cart.map((item) => {
      if (item.id === cartItem.id) {
        item.quantity = quantity;
        item.price = cartItem?.productPrice * quantity;
      }
      return item;
    });
    setCart(updatedItem);
  };

  const onAddToCart = (projectItem: Product) => {
    const existItem = cart.find((item) => item.productId === projectItem.id);

    if (existItem && existItem.quantity) {
      onChangeQuantity(existItem, existItem.quantity + 1);
    } else {
      const newItem: CartItem = {
        ...projectItem,
        id: `cart-${projectItem.id}-${cart.length}`,
        productId: projectItem.id,
        productPrice: projectItem.price,
        quantity: 1,
      };

      setCart([...cart, newItem]);
    }
  };

  const onRemoveFromCart = (item: CartItem) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const totalPrice = cart
    .map((item) => item.price)
    .reduce((acc, price) => acc + price, 0);

  const summaryPrice = useMemo(() => {
    let sum = totalPrice;

    if (coupon) {
      if (coupon.type === DiscountType.FIXED) {
        sum = totalPrice - coupon.discount;
      } else {
        sum = totalPrice - (totalPrice * coupon.discount) / 100;
      }
    }

    // if (onTop) {
    //   const productByCate = cart.filter(
    //     (item) => item.category === onTop.category
    //   );
    //   if (onTop.on_top_type === OnTopType.ITEM_CATEGORY)  {

    //   }

    // }

    if (sum < 0) return 0;
    return sum;
  }, [totalPrice, coupon, onTop, cart]);

  return {
    onAddToCart,
    onRemoveFromCart,
    onChangeQuantity,
    cart,
    setCart,
    totalPrice,
    summaryPrice,
    setCoupon,
    setOnTop,
    setIsIncludedSeasonal,
  };
}
