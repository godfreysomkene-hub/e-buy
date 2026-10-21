import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();

  const navigate = useNavigate();

  const deliveryFee = cartTotal >= 100 ? 0 : 10;
  const grandTotal = cartTotal + deliveryFee;

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    paymentMethod: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.paymentMethod
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (formData.phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");

    clearCart();

    navigate("/success");
  };

  if (cart.length === 0) {
    return (
      <main className="checkout-page">
        <div className="empty-checkout">
          <h1>Your Cart Is Empty</h1>

          <p>
            Add some products to your cart before checking out.
          </p>

          <Link
            to="/products"
            className="continue-shopping"
          >
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* CHECKOUT FORM */}
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>Customer Information</h2>

          {error && (
            <p className="form-error">
              {error}
            </p>
          )}

          {/* CONTACT INFORMATION */}
          <div className="checkout-section">
            <h3>Contact Information</h3>

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />

            <label htmlFor="email">
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              required
            />

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* DELIVERY INFORMATION */}
          <div className="checkout-section">
            <h3>Delivery Information</h3>

            <label htmlFor="address">
              Delivery Address
            </label>

            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter your full delivery address"
              rows="4"
              required
            />

            <div className="checkout-row">
              <div>
                <label htmlFor="city">
                  City
                </label>

                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                />
              </div>

              <div>
                <label htmlFor="state">
                  State
                </label>

                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                />
              </div>
            </div>
          </div>

          {/* PAYMENT INFORMATION */}
          <div className="checkout-section">
            <h3>Payment Method</h3>

            <label htmlFor="paymentMethod">
              Select Payment Method
            </label>

            <select
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">
                Select payment method
              </option>

              <option value="cash">
                Cash on Delivery
              </option>

              <option value="card">
                Debit/Credit Card
              </option>
            </select>

            <p className="payment-note">
              🔒 Your payment information is secure.
            </p>
          </div>

          <button
            type="submit"
            className="place-order-button"
          >
            Place Order — ${grandTotal.toFixed(2)}
          </button>
        </form>

        {/* ORDER SUMMARY */}
        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="checkout-items">
            {cart.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >
                <div className="summary-product">
                  <img
                    src={item.image}
                    alt={item.title}
                  />

                  <div>
                    <p>{item.title}</p>

                    <span>
                      Qty: {item.quantity}
                    </span>
                  </div>
                </div>

                <strong>
                  $
                  {(
                    item.price * item.quantity
                  ).toFixed(2)}
                </strong>
              </div>
            ))}
          </div>

          <hr />

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
        </aside>
      </div>
    </main>
  );
}

export default Checkout;