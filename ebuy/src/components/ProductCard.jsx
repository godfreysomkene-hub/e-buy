import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link
        to={`/products/${product.id}`}
        className="product-card-link"
      >
        <img
          src={product.image}
          alt={product.title}
          className="product-image"
        />

        <div className="product-info">
          <h2>{product.title}</h2>

          <p className="product-price">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      <div className="product-card-button">
        <button
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;