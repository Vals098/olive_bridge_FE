import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

function Cart() {
    const cartItems = useSelector(
        (state: RootState) => state.cart.items
    );

    return (
        <div>
            <h1>Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.product.productId}>
                        <h2>{item.product.name}</h2>
                        <p>{item.product.description}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Cart;