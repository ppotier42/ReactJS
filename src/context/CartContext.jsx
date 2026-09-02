import {createContext, useContext, useState} from "react";
import {getProductById} from "../data/products.js";

const CartContext = createContext(null)

export default function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]); // {id: ?, quantity: ?}
    
    function addToCart(productId) {
        const existing = cartItems.find((it) => it.id === productId);
        if (existing) {
            const currentQuantity = existing.quantity;
            const updatedCartItems = 
                cartItems.map((it) => 
                    it.id === productId ? 
                        {id: productId, quantity: currentQuantity + 1} :
                        it);
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, {id: productId, quantity: 1}]);
        }
    }
    
    function removeFromCart(productId)
    {
        setCartItems(cartItems.filter(item => item.id !== productId))
    }
    
    function updateQuantity(productId, quantity) {
        if (quantity <= 0)
        {
            removeFromCart(productId);
            return;
        }
        setCartItems(cartItems.map((it) => it.id === productId ? {...it, quantity} : it));
    }
    
    function getCartItems() {
        return cartItems.map(it => ({...it, product: getProductById(it.id)})).filter(it => it.product);
    }
    
    function getCartTotal() {
        const total = cartItems.reduce((total, item) => {
            const product = getProductById(item.id)
            return total + ( product ? product.price * item.quantity : 0)
        } , 0)
        return total;
    }
    
    function clearCart() {
        setCartItems([])    
    }
    
    return (
        <CartContext.Provider value={ { cartItems, clearCart, addToCart, getCartItems, updateQuantity, getCartTotal, removeFromCart } }>{children}</CartContext.Provider>
    )
}

export function useCart() {
    return useContext(CartContext);
}