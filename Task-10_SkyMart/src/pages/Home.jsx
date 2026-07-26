import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { FiStar, FiShoppingBag, FiArrowRight, FiPackage, FiTrendingUp, FiTag, FiZap } from "react-icons/fi";

const Home = () => {
  const { loggedInUser } = useAuth();
  const { cartCount, cartTotal, addToCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const userName = loggedInUser?.name || "Guest";
  console.log(products)

  useEffect(() => {
    const fetchHomeProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch home products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  const topRatedItems = useMemo(() => {
    return [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  }, [products]);


  const newArrivals = useMemo(() => {
    return products.slice(0, 4);
  }, [products]);


  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="bg-background">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="relative rounded-3xl bg-white/5 border border-white/10 p-8 sm:p-12 mb-10 overflow-hidden text-left">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-16 -right-16 w-80 h-80 bg-primary/8 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-primary/4 rounded-full blur-3xl"></div>
            <div className="absolute inset-0 opacity-[0.03]"></div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <div className="text-left">
              <p className="text-primary text-sm font-body tracking-widest uppercase mb-3 animate-pulse">
                Good afternoon 👋
              </p>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl text-foreground leading-tight mb-4">
                Welcome back,
                <br />
                <span className="text-primary">{userName}!</span>
              </h1>
              <p className="text-foreground/40 font-body max-w-md">
                Discover today's picks — hand-curated products across
                electronics, beauty, home decor, and more.
              </p>
              <div className="flex items-center gap-3 mt-6 flex-wrap">
                <button
                  onClick={() => navigate("/products")}
                  className="bg-primary font-bold text-sm text-background flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl hover:bg-volt-light transition-colors cursor-pointer border-none"
                >
                  Shop Now <FaArrowRight />
                </button>
                <button
                  onClick={() => navigate("/products")}
                  className="flex items-center text-sm justify-center gap-2 px-5 py-3.5 rounded-2xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-all cursor-pointer"
                >
                  View All Products <FaArrowRight />
                </button>
              </div>
            </div>

            {/* Right side stats */}
            <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
              <div className="bg-volt/10 border border-primary/20 rounded-2xl px-6 py-4 text-center">
                <p className="font-heading font-bold text-4xl text-primary">
                  100+
                </p>
                <p className="text-foreground/40 text-xs font-body mt-1">
                  Products Available
                </p>
              </div>

              <div className="bg-white/4 border border-white/5 rounded-2xl px-6 py-4 text-center">
                <p className="font-heading font-bold text-2xl text-foreground/80">
                  Free
                </p>
                <p className="text-foreground/40 text-xs font-body mt-1">
                  Delivery on ₹999+
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10 stagger">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-volt/10 text-volt">
              <FiPackage size={22} />
            </div>
            <div>
              <p className="font-heading font-bold text-2xl text-white">{cartCount}</p>
              <p className="text-white/50 text-sm font-body">Cart Items</p>
              <p className="text-white/25 text-xs font-body mt-0.5">In your bag</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-400">
              <FiTrendingUp size={22} />
            </div>
            <div>
              <p className="font-heading font-bold text-2xl text-white">${cartTotal.toFixed(2)}</p>
              <p className="text-white/50 text-sm font-body">Cart Value</p>
              <p className="text-white/25 text-xs font-body mt-0.5">Ready to checkout</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-amber-500/10 text-amber-400">
              <FiStar size={22} />
            </div>
            <div>
              <p className="font-heading font-bold text-2xl text-white">4.9★</p>
              <p className="text-white/50 text-sm font-body">Top Products</p>
              <p className="text-white/25 text-xs font-body mt-0.5">Highly rated</p>
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 flex items-start gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-purple-500/10 text-purple-400">
              <FiTag size={22} />
            </div>
            <div>
              <p className="font-heading font-bold text-2xl text-white">10+</p>
              <p className="text-white/50 text-sm font-body">Categories</p>
              <p className="text-white/25 text-xs font-body mt-0.5">To explore</p>
            </div>
          </div>
        </div>

        {/* Categories section */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading font-bold text-xl text-left">Shop by Category</h2>
            <Link
              className="text-volt text-sm hover:text-volt-light transition-colors flex items-center gap-1 font-semibold"
              to="/products"
            >
              View All <FiArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=beauty"
            >
              <div className="text-3xl mb-3">💄</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                beauty
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=fragrances"
            >
              <div className="text-3xl mb-3">🌸</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                fragrances
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=furniture"
            >
              <div className="text-3xl mb-3">🪑</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                furniture
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=groceries"
            >
              <div className="text-3xl mb-3">🍎</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                groceries
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=laptops"
            >
              <div className="text-3xl mb-3">💻</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                laptops
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
            <Link
              className="group bg-white border border-white/20 hover:border-white/40 hover:bg-white/95 rounded-2xl p-5 text-center transition-all duration-200 hover:-translate-y-0.5"
              to="/products?category=home-decoration"
            >
              <div className="text-3xl mb-3">🖼️</div>
              <p className="font-body font-semibold text-ink/80 text-sm capitalize">
                decor
              </p>
              <p className="text-ink/50 text-xs mt-1">Explore</p>
            </Link>
          </div>
        </section>

        {/* Dual List Grid: Top Rated & New Arrivals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          {/* Top Rated */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2 text-white text-left">
                <FiStar className="text-amber-400 fill-amber-400" />
                Top Rated Products
              </h2>
              <Link
                className="text-volt text-xs hover:underline flex items-center gap-1 font-semibold animate-pulse"
                to="/products?sort=rating"
              >
                See all <FiArrowRight />
              </Link>
            </div>
            <div className="space-y-2.5">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                ))
              ) : (
                topRatedItems.map((product) => {
                  const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="group flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-volt/30 rounded-2xl transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5 overflow-hidden">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-xs font-heading font-semibold truncate">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-primary font-bold text-xs">
                            ${finalPrice.toFixed(2)}
                          </span>
                          <span className="flex items-center text-[10px] text-amber-400">
                            <FiStar size={10} className="fill-amber-400 mr-0.5" />
                            {product.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="shrink-0 w-8 h-8 bg-volt/10 hover:bg-volt text-volt hover:text-ink rounded-lg flex items-center justify-center transition-all cursor-pointer border-none"
                        title="Add to Cart"
                      >
                        <FiShoppingBag size={14} />
                      </button>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          {/* New Arrivals */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-heading font-bold text-lg flex items-center gap-2 text-white text-left">
                <FiZap className="text-volt fill-volt" />
                New Arrivals
              </h2>
              <Link
                className="text-volt text-xs hover:underline flex items-center gap-1 font-semibold"
                to="/products"
              >
                See all <FiArrowRight />
              </Link>
            </div>
            <div className="space-y-2.5">
              {loading ? (
                [...Array(4)].map((_, i) => (
                  <div key={i} className="h-16 bg-white/5 rounded-2xl animate-pulse" />
                ))
              ) : (
                newArrivals.map((product) => {
                  const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.id}`}
                      className="group flex items-center gap-3 p-3 bg-white/3 hover:bg-white/6 border border-white/5 hover:border-volt/30 rounded-2xl transition-all duration-200 text-left"
                    >
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 p-1.5 overflow-hidden">
                        <img
                          src={product.thumbnail}
                          alt={product.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-xs font-heading font-semibold truncate">
                          {product.title}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-primary font-bold text-xs">
                            ${finalPrice.toFixed(2)}
                          </span>
                          <span className="text-[10px] text-white/40 capitalize">
                            {product.category.replace("-", " ")}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="shrink-0 w-8 h-8 bg-volt/10 hover:bg-volt text-volt hover:text-ink rounded-lg flex items-center justify-center transition-all cursor-pointer border-none"
                        title="Add to Cart"
                      >
                        <FiShoppingBag size={14} />
                      </button>
                    </Link>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
