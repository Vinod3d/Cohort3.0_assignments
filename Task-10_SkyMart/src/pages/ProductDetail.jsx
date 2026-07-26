import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { useCart } from "../context/CartContext";
import { FiMinus, FiPlus, FiShoppingCart, FiStar, FiArrowLeft, FiShield, FiTruck, FiRefreshCw } from "react-icons/fi";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.images?.[0] || data.thumbnail || "/placeholder.svg");
        setQuantity(1);

        
        try {
          const relRes = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=5`);
          const relData = await relRes.json();
          
          const filtered = (relData.products || []).filter((p) => p.id !== data.id).slice(0, 4);
          setRelatedProducts(filtered);
        } catch (err) {
          console.error("Failed to fetch related products", err);
        }
      } catch (error) {
        console.error("Error loading product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="h-4 bg-white/5 rounded w-1/4 mb-8" />
        
        {/* Main split grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery skeleton */}
          <div className="space-y-4">
            <div className="bg-white/5 aspect-square rounded-3xl w-full" />
            <div className="flex gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/5 w-20 h-20 rounded-xl" />
              ))}
            </div>
          </div>
          
          {/* Details skeleton */}
          <div className="space-y-6">
            <div className="h-4 bg-white/5 rounded w-1/6" />
            <div className="h-10 bg-white/5 rounded w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/3" />
            <div className="h-8 bg-white/5 rounded w-1/4" />
            <div className="h-24 bg-white/5 rounded w-full" />
            <div className="h-12 bg-white/5 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="font-heading font-bold text-2xl text-foreground">
          Product Not Found
        </h2>
        <p className="text-white/40 font-body mt-2 text-sm">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-background font-bold text-xs rounded-xl hover:bg-volt-light transition-all"
        >
          <FiArrowLeft /> Back to Shop
        </Link>
      </div>
    );
  }

  const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100);

  // Stock status styling
  const isLowStock = product.stock > 0 && product.stock <= 10;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs & Back link */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-white transition-colors"
        >
          <FiArrowLeft /> Back to Shop
        </Link>
        <div className="text-xs text-white/30 font-body flex items-center gap-2">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="capitalize text-white/60">{product.category.replace("-", " ")}</span>
        </div>
      </div>

      {/* Product Split Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
        {/* Left Side: Images Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white border border-white/5 rounded-3xl p-8 flex items-center justify-center overflow-hidden relative">
            <img
              src={activeImage}
              alt={product.title}
              className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
            {product.discountPercentage > 0 && (
              <span className="absolute top-4 left-4 bg-red-500 text-white font-body font-bold text-xs px-2.5 py-1 rounded-xl shadow-lg shadow-red-500/20 animate-pulse">
                Save {Math.round(product.discountPercentage)}%
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-white/5">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 h-20 bg-white border rounded-2xl shrink-0 p-2 overflow-hidden flex items-center justify-center transition-all cursor-pointer ${
                    activeImage === img
                      ? "border-primary shadow-md shadow-primary/10 ring-2 ring-primary/20"
                      : "border-white/5 hover:border-white/20"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${i}`}
                    className="max-h-full max-w-full object-contain"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Details & Actions */}
        <div className="text-left flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category and Brand */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="bg-primary/10 text-primary text-[10px] font-heading font-bold px-2.5 py-1 rounded-lg border border-primary/15 uppercase tracking-wider">
                {product.category.replace("-", " ")}
              </span>
              {product.brand && (
                <span className="bg-white/5 text-white/60 text-[10px] font-body px-2.5 py-1 rounded-lg border border-white/5">
                  Brand: {product.brand}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground leading-tight">
              {product.title}
            </h1>

            {/* Ratings & Reviews Count */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.round(product.rating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-white/20"
                    }`}
                  />
                ))}
                <span className="text-sm font-bold text-white/80 ml-1.5">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-white/30 text-xs font-body">|</span>
              <span className="text-white/50 text-xs font-body hover:underline cursor-pointer">
                {product.reviews?.length || 0} customer reviews
              </span>
            </div>

            {/* Pricing Section */}
            <div className="py-4 border-y border-white/5 flex items-baseline gap-3">
              <span className="text-primary font-heading font-bold text-3xl">
                ${finalPrice.toFixed(2)}
              </span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-white/30 line-through text-lg font-body">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-red-400 text-xs font-body bg-red-400/10 px-2 py-0.5 rounded-md border border-red-500/10">
                    -{Math.round(product.discountPercentage)}% Off
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-white/80 font-heading font-semibold text-sm">Overview</h3>
              <p className="text-white/50 font-body text-sm leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock status indicator */}
            <div className="flex items-center gap-2.5 pt-2">
              <span className="text-xs text-white/40 font-body">Availability:</span>
              {isOutOfStock ? (
                <span className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold px-3 py-1 rounded-xl">
                  Out of Stock
                </span>
              ) : isLowStock ? (
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-xl animate-pulse">
                  Only {product.stock} items left!
                </span>
              ) : (
                <span className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-xl">
                  In Stock ({product.stock} units)
                </span>
              )}
            </div>
          </div>

          {/* Quantity and Cart buttons */}
          <div className="space-y-4 pt-4 border-t border-white/5">
            {!isOutOfStock && (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {/* Quantity selector */}
                <div className="flex items-center justify-between sm:justify-start gap-3 bg-white/4 border border-white/5 px-4 py-3 rounded-2xl sm:w-36">
                  <span className="text-xs text-white/40 font-body sm:hidden">Quantity</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="p-1 hover:text-primary transition-colors text-white/50 cursor-pointer"
                    >
                      <FiMinus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold font-body text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="p-1 hover:text-primary transition-colors text-white/50 cursor-pointer"
                    >
                      <FiPlus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 py-4 bg-primary text-background font-bold text-sm rounded-2xl hover:bg-volt-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/25"
                >
                  <FiShoppingCart size={16} />
                  Add to Cart - ${(finalPrice * quantity).toFixed(2)}
                </button>
              </div>
            )}
          </div>

          {/* Quick Specifications list */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-white/5">
            <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-start gap-3">
              <FiShield className="text-primary text-lg shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground font-semibold text-xs font-heading">Warranty</p>
                <p className="text-white/40 text-[10px] font-body mt-0.5 leading-relaxed">
                  {product.warrantyInformation || "1 Year Warranty"}
                </p>
              </div>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-start gap-3">
              <FiTruck className="text-primary text-lg shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground font-semibold text-xs font-heading">Shipping</p>
                <p className="text-white/40 text-[10px] font-body mt-0.5 leading-relaxed">
                  {product.shippingInformation || "Ships in 3-5 days"}
                </p>
              </div>
            </div>
            <div className="bg-white/3 border border-white/5 rounded-2xl p-4 flex items-start gap-3">
              <FiRefreshCw className="text-primary text-lg shrink-0 mt-0.5" />
              <div>
                <p className="text-foreground font-semibold text-xs font-heading">Return Policy</p>
                <p className="text-white/40 text-[10px] font-body mt-0.5 leading-relaxed">
                  {product.returnPolicy || "30 days easy returns"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="border-t border-white/5 pt-10 mb-16">
          <h2 className="font-heading font-bold text-xl mb-6 text-left">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {product.reviews.map((review, i) => (
              <div
                key={i}
                className="bg-white/3 border border-white/5 p-5 rounded-2xl space-y-3 hover:border-white/10 transition-colors text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 font-heading font-semibold text-sm">
                      {review.reviewerName}
                    </p>
                    <p className="text-white/30 text-[10px] font-body">
                      {new Date(review.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(5)].map((_, index) => (
                      <FiStar
                        key={index}
                        className={`w-3.5 h-3.5 ${
                          index < review.rating ? "fill-amber-400 text-amber-400" : "text-white/10"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white/50 text-xs font-body leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Related Products list */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-white/5 pt-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-xl text-left">
              You Might Also Like
            </h2>
            <Link
              to="/products"
              className="text-primary text-xs hover:underline flex items-center gap-1 font-body font-semibold"
            >
              See All Products
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => {
              const relFinalPrice =
                relProduct.price * (1 - (relProduct.discountPercentage || 0) / 100);
              return (
                <Link
                  key={relProduct.id}
                  to={`/products/${relProduct.id}`}
                  className="group bg-white/3 border border-white/5 hover:border-volt/20 rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-square bg-white rounded-2xl p-4 flex items-center justify-center overflow-hidden mb-3 relative shrink-0">
                      <img
                        src={relProduct.thumbnail}
                        alt={relProduct.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h4 className="font-heading font-bold text-sm text-foreground group-hover:text-primary transition-colors text-left line-clamp-1">
                      {relProduct.title}
                    </h4>
                    <p className="text-white/40 text-[10px] font-body text-left mt-0.5 capitalize">
                      In {relProduct.category.replace("-", " ")}
                    </p>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-white/5 flex items-center justify-between">
                    <span className="text-primary font-heading font-bold text-sm">
                      ${relFinalPrice.toFixed(2)}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 text-[10px] font-bold">
                      <FiStar size={10} className="fill-amber-400" />
                      <span>{relProduct.rating.toFixed(1)}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
