'use client';
import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { getProduct, COUPONS } from './data';

const StoreContext = createContext(null);

const initialState = {
  cart: [],
  wishlist: [],
  user: null,
  orders: [],
  recentlyViewed: [],
  searchHistory: [],
  notifications: [],
  addresses: [],
  appliedCoupon: null,
  hydrated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'HYDRATE':
      return { ...state, ...action.payload, hydrated: true };

    case 'ADD_TO_CART': {
      const { productId, qty = 1, color = '', size = '' } = action.payload;
      const existing = state.cart.find(i => i.productId === productId && i.color === color && i.size === size);
      if (existing) {
        return { ...state, cart: state.cart.map(i => i === existing ? { ...i, qty: i.qty + qty } : i) };
      }
      return { ...state, cart: [...state.cart, { productId, qty, color, size, savedForLater: false, addedAt: Date.now() }] };
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(i => i.productId !== action.payload) };

    case 'UPDATE_CART_QTY':
      return { ...state, cart: state.cart.map(i => i.productId === action.payload.productId ? { ...i, qty: Math.max(1, action.payload.qty) } : i) };

    case 'SAVE_FOR_LATER':
      return { ...state, cart: state.cart.map(i => i.productId === action.payload ? { ...i, savedForLater: !i.savedForLater } : i) };

    case 'CLEAR_CART':
      return { ...state, cart: [], appliedCoupon: null };

    case 'APPLY_COUPON':
      return { ...state, appliedCoupon: action.payload };

    case 'TOGGLE_WISHLIST': {
      const id = action.payload;
      const idx = state.wishlist.indexOf(id);
      if (idx > -1) return { ...state, wishlist: state.wishlist.filter(i => i !== id) };
      return { ...state, wishlist: [...state.wishlist, id] };
    }

    case 'SET_USER':
      return { ...state, user: action.payload };

    case 'LOGOUT':
      return { ...state, user: null };

    case 'ADD_ADDRESS': {
      const addr = { ...action.payload, id: Date.now() };
      return { ...state, addresses: [...state.addresses, addr] };
    }

    case 'REMOVE_ADDRESS':
      return { ...state, addresses: state.addresses.filter(a => a.id !== action.payload) };

    case 'PLACE_ORDER': {
      const items = state.cart.filter(i => !i.savedForLater).map(item => {
        const p = getProduct(item.productId);
        return { ...item, name: p.name, price: p.price, image: p.image };
      });
      const total = items.reduce((s, i) => s + i.price * i.qty, 0);
      const order = {
        id: 'ARK' + Date.now().toString(36).toUpperCase(),
        items, total, discount: 0,
        status: 'confirmed',
        statusHistory: [{ status: 'confirmed', date: Date.now(), label: 'Order Confirmed' }],
        placedAt: Date.now(),
        estimatedDelivery: Date.now() + 3 * 86400000,
        ...action.payload,
      };
      return { ...state, orders: [order, ...state.orders], cart: state.cart.filter(i => i.savedForLater), appliedCoupon: null };
    }

    case 'ADD_RECENTLY_VIEWED': {
      const rv = [action.payload, ...state.recentlyViewed.filter(id => id !== action.payload)].slice(0, 20);
      return { ...state, recentlyViewed: rv };
    }

    case 'ADD_SEARCH_HISTORY': {
      const sh = [action.payload, ...state.searchHistory.filter(q => q !== action.payload)].slice(0, 10);
      return { ...state, searchHistory: sh };
    }

    case 'ADD_NOTIFICATION': {
      const notif = { id: Date.now(), ...action.payload, read: false, createdAt: Date.now() };
      return { ...state, notifications: [notif, ...state.notifications].slice(0, 50) };
    }

    case 'MARK_ALL_READ':
      return { ...state, notifications: state.notifications.map(n => ({ ...n, read: true })) };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = {};
      ['cart', 'wishlist', 'user', 'orders', 'recentlyViewed', 'searchHistory', 'notifications', 'addresses'].forEach(key => {
        const val = localStorage.getItem('ark_' + key);
        if (val) saved[key] = JSON.parse(val);
      });
      dispatch({ type: 'HYDRATE', payload: saved });
    } catch { dispatch({ type: 'HYDRATE', payload: {} }); }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    if (!state.hydrated) return;
    ['cart', 'wishlist', 'user', 'orders', 'recentlyViewed', 'searchHistory', 'notifications', 'addresses'].forEach(key => {
      localStorage.setItem('ark_' + key, JSON.stringify(state[key]));
    });
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

// Derived state helpers
export function getActiveCart(cart) { return cart.filter(i => !i.savedForLater); }
export function getCartTotal(cart) {
  return getActiveCart(cart).reduce((sum, item) => {
    const p = getProduct(item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
export function getCartCount(cart) { return getActiveCart(cart).reduce((s, i) => s + i.qty, 0); }
export function getCouponDiscount(coupon, total) {
  if (!coupon) return 0;
  if (coupon.type === 'percent') return Math.min(total * coupon.discount / 100, coupon.maxDiscount);
  if (coupon.type === 'flat') return coupon.discount;
  return 0;
}
