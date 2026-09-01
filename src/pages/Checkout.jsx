import { useCart } from "../context/CartContext.jsx";

export default function Checkout() {
    const { getCartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart();
    const cartItems = getCartItems();
    const total = getCartTotal();
    if (!cartItems) {
        return <div>Loading...</div>
    }
    
    function placeOrder() {
        alert("Succesfull order ty");
        clearCart();
    }
    
    return (
        <div className={"page"}>
            <div className={"container"}>
                <h1 className={"page-title"}>Checkout</h1>
                <div className={"checkout-container"}>
                    <div className={"checkout-items"}>
                        <h2 className={"checkout-section-title"}>Order Summary</h2>
                        {cartItems.map((it) => (
                            <div className={"checkout-item"} key={it.id}>
                                <img src={it.product.image} alt={it.product.name} className={"checkout-item-image"}/>
                                <div className={"checkout-item-details"}>
                                    <h3 className={"checkout-item-name"}>{it.product.name}</h3>
                                     <p className={"checkout-item-price"}>
                                         ${it.product.price} each.
                                     </p>
                                </div>
                                <div className={"checkout-item-controls"}>
                                    <div className={"quantity-controls"}>
                                        <button className={"quantity-btn"} onClick={() => updateQuantity(it.id, it.quantity - 1)}>-</button>
                                        <span className={"quantity-value"}>{it.quantity}</span>
                                        <button className={"quantity-btn"} onClick={() => updateQuantity(it.id, it.quantity + 1)}>+</button>
                                    </div>
                                    <p className={"checkout-item-total"}>
                                        Total: ${(it.product.price * it.quantity).toFixed(2)}
                                    </p>
                                    <button className={"btn btn-secondary btn-small"} onClick={() => removeFromCart(it.id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className={"checkout-summary"}>
                        <h2 className={"checkout-section-title"}>Total</h2>
                        <div className={"checkout-total"}>
                            <p className={"checkout-total-label"}>Sub-Total</p>
                            <p className={"checkout-total-value"}>${total?.toFixed(2)}</p>
                        </div>
                        <div className={"checkout-total"}>
                            <p className={"checkout-total-label"}>Total:</p>
                            <p className={"checkout-total-value checkout-total-final"}>${total?.toFixed(2)}</p>
                        </div>
                        <button className={"btn btn-primary btn-large btn-block"} onClick={placeOrder}>Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}