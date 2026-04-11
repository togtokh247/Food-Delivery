"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type Food = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type CartItem = Food & {
  quantity: number;
};

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Food, quantity?: number) => void;
  removeFromCart: (id: Food["id"]) => void;
  updateQuantity: (id: Food["id"], quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cartItems");
    let nextCart: CartItem[] = [];

    if (savedCart) {
      try {
        nextCart = JSON.parse(savedCart) as CartItem[];
      } catch {
        localStorage.removeItem("cartItems");
      }
    }

    queueMicrotask(() => {
      setCartItems(nextCart);
      setHasLoadedCart(true);
    });
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) return;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems, hasLoadedCart]);

  const addToCart = (item: Food, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: Food["id"]) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: Food["id"], quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
