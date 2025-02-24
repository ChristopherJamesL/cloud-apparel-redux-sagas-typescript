import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find cart item if it already exists in cart
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    //if found, increment quantity
    if (existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === productToAdd.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
    }
    // if not found, return new array with new added cart item
    return [...cartItems, { ...productToAdd, quantity: 1 }];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find cart item
    const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

    //if quantity is 1, remove it from list
    if (existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
    }

    // decrement the item quantity by 1
    return cartItems.map(cartItem => {
        return cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    });
}

const clearCartItems = (cartItems, cartItemToClear) => {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearCartItems: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price;
        }, 0)
        setCartTotal(newCartTotal);
    }, [cartItems]);
    
    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); 
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove)); 
    }

    const clearItemsFromCart = (cartItemToClear) => {
        setCartItems(clearCartItems(cartItems, cartItemToClear)); 
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart,
        clearItemsFromCart,
        cartItems, 
        cartCount ,
        cartTotal
    };

    return (
        <CartContext.Provider value={value} >{children}</CartContext.Provider>
    )
}