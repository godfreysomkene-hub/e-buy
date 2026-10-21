import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const categories = [
    {
      name: "Men's Clothing",
      icon: "👔",
      value: "men's clothing",
    },
    {
      name: "Women's Clothing",
      icon: "👗",
      value: "women's clothing",
    },
    {
      name: "Jewelry",
      icon: "💎",
      value: "jewelery",
    },
    {
      name: "Electronics",
      icon: "💻",
      value: "electronics",
    },
  ];

  return (
    <main>

      {/* HERO */}

      <section className="hero">
        <div className="hero-content">

          <p className="hero-small-text">
            WELCOME TO E-BUY
          </p>

          <h1>
            Shop smarter.
            <br />
            Live better.
          </h1>

          <p className="hero-description">
            Discover quality products at great prices.
            Everything you need, all in one place.
          </p>

          <Link
            to="/products"
            className="shop-button"
          >
            Shop Now
          </Link>

        </div>
      </section>


      {/* CATEGORIES */}

      <section className="categories-section">

        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>

          <h2>Find What You Need</h2>

          <span>
            Explore our collection by category.
          </span>
        </div>

        <div className="categories-grid">

          {categories.map((category) => (
            <Link
              key={category.value}
              to={`/products?category=${encodeURIComponent(
                category.value
              )}`}
              className="category-card"
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>{category.name}</h3>

              <span>
                Shop Now →
              </span>

            </Link>
          ))}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}

      <section className="featured-products">

        <div className="section-heading">

          <p>SHOP OUR COLLECTION</p>

          <h2>Featured Products</h2>

          <span>
            Discover some of our most popular products.
          </span>

        </div>

        {loading ? (
          <p className="status">
            Loading products...
          </p>
        ) : (
          <div className="featured-products-grid">

            {products
              .slice(0, 8)
              .map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}

          </div>
        )}

        <div className="view-all-products">

          <Link
            to="/products"
            className="view-all-button"
          >
            View All Products
          </Link>

        </div>

      </section>


      {/* FEATURES */}

      <section className="features">

        <div className="feature">
          <span>🚚</span>

          <h3>Fast Delivery</h3>

          <p>
            Get your products delivered quickly.
          </p>
        </div>

        <div className="feature">
          <span>🔒</span>

          <h3>Secure Shopping</h3>

          <p>
            Your shopping experience is safe and secure.
          </p>
        </div>

        <div className="feature">
          <span>⭐</span>

          <h3>Quality Products</h3>

          <p>
            Shop from a wide range of products.
          </p>
        </div>

      </section>

    </main>
  );
}

export default Home;