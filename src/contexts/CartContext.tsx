'use client';

import { createContext, useContext, useState } from 'react';

type CartItem = {
  productId: number;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: number) => void;
};

type CartContextProviderProps = {
  children: React.ReactNode;
};

export const CartContext = createContext({} as CartContextType);

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function addToCart(productId: number) {
    setCartItems((state) => {
      const productInCart = state.some((item) => item.productId === productId);

      if (productInCart) {
        return state.map((item) => {
          if (item.productId === productId) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      } else {
        return [...state, { productId, quantity: 1 }];
      }
    });
  }

  return (
    <CartContext.Provider value={{ items: cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
