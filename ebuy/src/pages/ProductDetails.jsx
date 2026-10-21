import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Product not found");
        }

        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((currentQuantity) => currentQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((currentQuantity) =>
      currentQuantity > 1
        ? currentQuantity - 1
        : 1
    );
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  if (loading) {
    return (
      <p className="status">
        Loading product...
      </p>
    );
  }

  if (error) {
    return (
      <main className="product-details-page">
        <p className="status">{error}</p>

        <Link
          to="/products"
          className="continue-shopping"
        >
          ← Back to Products
        </Link>
      </main>
    );
  }

  return (
    <main className="product-details-page">
      <Link
        to="/products"
        className="back-link"
      >
        ← Back to Products
      </Link>

      <div className="product-details">
        <div className="product-details-image-container">
          <img
            src={product.image}
            alt={product.title}
            className="product-details-image"
          />
        </div>

        <div className="product-details-info">
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.title}</h1>

          <p className="product-details-price">
            ${product.price.toFixed(2)}
          </p>

          <div className="product-rating">
            <span>⭐</span>

            <strong>
              {product.rating.rate}
            </strong>

            <span>
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="product-description">
            {product.description}
          </p>

          <div className="product-quantity">
            <span>Quantity:</span>

            <div className="quantity-selector">
              <button
                onClick={decreaseQuantity}
              >
                −
              </button>

              <span>{quantity}</span>

              <button
                onClick={increaseQuantity}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="add-to-cart-details"
            onClick={handleAddToCart}
          >
            🛒 Add {quantity} to Cart
          </button>

          <Link
            to="/cart"
            className="view-cart-button"
          >
            View Cart
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ProductDetails;