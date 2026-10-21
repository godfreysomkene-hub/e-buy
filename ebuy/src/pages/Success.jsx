import { Link } from "react-router-dom";

function Success() {
  return (
    <main className="success-page">
      <div className="success-card">
        <div className="success-icon">✓</div>

        <h1>Order Successful!</h1>

        <p>
          Thank you for shopping with E-buy.
          Your order has been received successfully.
        </p>

        <Link to="/products" className="continue-shopping">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}

export default Success;