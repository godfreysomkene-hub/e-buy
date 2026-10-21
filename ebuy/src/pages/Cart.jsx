import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  const deliveryFee = cartTotal >= 100 ? 0 : 10;
  const grandTotal = cartTotal + deliveryFee;

  if (cart.length === 0) {
    return (
      <main className="empty-cart">
        <div className="empty-cart-content">
          <div className="empty-cart-icon">🛒</div>

          <h1>Your Cart Is Empty</h1>

          <p>
            You haven't added anything to your cart yet.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Start Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <h1>Your Shopping Cart</h1>

      <div className="cart-layout">

        {/* Cart Items */}

        <section className="cart-items-section">

          {cart.map((item) => (
            <div
              className="cart-item"
              key={item.id}
            >
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-image"
              />

              <div className="cart-item-details">

                <h2>{item.title}</h2>

                <p className="cart-item-price">
                  ${item.price.toFixed(2)}
                </p>

                <div className="quantity-controls">

                  <button
                    onClick={() =>
                      decreaseQuantity(item.id)
                    }
                  >
                    −
                  </button>

                  <span>
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      increaseQuantity(item.id)
                    }
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-button"
                  onClick={() =>
                    removeFromCart(item.id)
                  }
                >
                  Remove
                </button>

              </div>

              <div className="cart-item-total">
                $
                {(
                  item.price * item.quantity
                ).toFixed(2)}
              </div>
            </div>
          ))}

          <Link
            to="/products"
            className="continue-shopping"
          >
            ← Continue Shopping
          </Link>

        </section>

        {/* Order Summary */}

        <aside className="cart-summary">

          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>

            <strong>
              ${cartTotal.toFixed(2)}
            </strong>
          </div>

          <div className="summary-row">
            <span>Delivery</span>

            <strong>
              {deliveryFee === 0
                ? "FREE"
                : `$${deliveryFee.toFixed(2)}`}
            </strong>
          </div>

          <hr />

          <div className="summary-total">
            <span>Total</span>

            <strong>
              ${grandTotal.toFixed(2)}
            </strong>
          </div>

          <Link
            to="/checkout"
            className="checkout-button"
          >
            Proceed to Checkout
          </Link>

        </aside>

      </div>
    </main>
  );
}

export default Cart;