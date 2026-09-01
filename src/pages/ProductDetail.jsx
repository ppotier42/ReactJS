import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {getProductById} from "../data/products.js";
import {useCart} from "../context/CartContext.jsx";

export default function ProductDetail() {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();
    const { addToCart, cartItems } = useCart();

    useEffect(() => {
        const foundProduct = getProductById(id);
        if (!foundProduct) {
            navigate("/");
            return ;
        }
        setProduct(foundProduct);
    }, [id]);
    
    if (!product)
    {
        return <div>Loading...</div>;
    }

    const productInCart = cartItems.find((it) => it.id === product.id);

    const productQuantityLabel = productInCart ? ` (${productInCart.quantity})` : "";
    
    return (
        <div className={"page"}>
            <div className={"container"}>
                <div className={"product-detail"}>
                    <div className={"product-detail-image"}>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className={"product-card-content"}>
                        <h1 className={"product-detail-name"}>{product.name}</h1>
                        <p className={"product-detail-price"}>{product.price}</p>
                        <p className={"product-detail-description"}>{product.description}</p>
                        <button className={"btn btn-primary"} onClick={() => addToCart(product.id)}>
                            Add to Cart {productQuantityLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}