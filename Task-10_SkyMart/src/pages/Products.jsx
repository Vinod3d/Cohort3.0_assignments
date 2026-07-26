import React, { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { useCart } from "../context/CartContext";
import { FiSearch, FiShoppingCart, FiStar, FiSliders, FiX } from "react-icons/fi";

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState("default");
  const { addToCart } = useCart();

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", category);
    }
    setSearchParams(searchParams);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const productsRes = await fetch("https://dummyjson.com/products?limit=100");
        const productsData = await productsRes.json();
        setProducts(productsData.products || []);

        // Fetch categories list
        try {
          const categoriesRes = await fetch("https://dummyjson.com/products/category-list");
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData || []);
        } catch (catError) {
          console.error("Failed to fetch categories list, using fallback", catError);
          // Fallback categories list extracted from mock data
          setCategories([
            "beauty",
            "fragrances",
            "furniture",
            "groceries",
            "home-decoration",
            "laptops",
            "mens-shirts",
            "mens-shoes",
            "womens-dresses",
            "womens-shoes"
          ]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          (product.brand && product.brand.toLowerCase().includes(query)) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((product) => product.category === selectedCategory);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => {
        const pA = a.price * (1 - (a.discountPercentage || 0) / 100);
        const pB = b.price * (1 - (b.discountPercentage || 0) / 100);
        return pA - pB;
      });
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => {
        const pA = a.price * (1 - (a.discountPercentage || 0) / 100);
        const pB = b.price * (1 - (b.discountPercentage || 0) / 100);
        return pB - pA;
      });
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "discount") {
      result.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortBy]);

  // Handle adding to cart and stopping link propagation
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-foreground">
          Discover Products
        </h1>
        <p className="text-white/40 font-body mt-2 text-sm sm:text-base">
          Browse through our curated collection of high-quality products.
        </p>
      </div>

      {/* Controls: Search, Sort, Category */}
      <div className="bg-white/4 border border-white/5 p-4 sm:p-6 rounded-3xl mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-3 outline-none text-foreground text-sm focus:border-primary transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <FiX size={16} />
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 outline-none text-white/70 text-sm focus:border-primary transition-colors appearance-none cursor-pointer"
            >
              <option value="default" className="bg-[#18181b] text-foreground">Sort By: Featured</option>
              <option value="price-asc" className="bg-[#18181b] text-foreground">Price: Low to High</option>
              <option value="price-desc" className="bg-[#18181b] text-foreground">Price: High to Low</option>
              <option value="rating" className="bg-[#18181b] text-foreground">Top Rated</option>
              <option value="discount" className="bg-[#18181b] text-foreground">Biggest Discount</option>
            </select>
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30">
              <FiSliders size={14} />
            </div>
          </div>

          {/* Items count indicator */}
          <div className="flex items-center justify-center md:justify-end text-sm text-white/40 font-body">
            Showing {filteredAndSortedProducts.length} products
          </div>
        </div>

        {/* Categories Bar */}
        <div className="border-t border-white/5 pt-4">
          <p className="text-white/40 text-xs font-body uppercase tracking-wider mb-2.5 text-center sm:text-left">
            Filter by Category
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-white/5">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-primary text-background border-primary shadow-sm shadow-primary/10"
                  : "bg-white/5 text-white/60 border-white/5 hover:border-white/10 hover:text-white"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border capitalize cursor-pointer ${
                  selectedCategory === category
                    ? "bg-primary text-background border-primary shadow-sm shadow-primary/10"
                    : "bg-white/5 text-white/60 border-white/5 hover:border-white/10 hover:text-white"
                }`}
              >
                {category.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        // Skeleton Loader Grid
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className="bg-white/3 border border-white/5 rounded-3xl p-4 animate-pulse space-y-4"
            >
              <div className="bg-white/5 aspect-square rounded-2xl w-full" />
              <div className="h-4 bg-white/5 rounded w-1/3" />
              <div className="h-6 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="flex justify-between items-center pt-2">
                <div className="h-6 bg-white/5 rounded w-1/3" />
                <div className="h-9 bg-white/5 rounded-xl w-10" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredAndSortedProducts.length === 0 ? (
        // Empty State
        <div className="text-center py-20 bg-white/3 border border-white/5 rounded-3xl">
          <p className="font-heading font-bold text-lg text-white/80">
            No products found
          </p>
          <p className="text-white/40 text-sm font-body mt-2">
            Try adjusting your search keywords or category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              handleCategoryChange("all");
              setSortBy("default");
            }}
            className="mt-6 px-5 py-2.5 bg-primary text-background text-xs font-bold rounded-xl hover:bg-volt-light transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        // Products List
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map((product) => {
            const finalPrice = product.price * (1 - (product.discountPercentage || 0) / 100);
            return (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white/3 hover:bg-white/6 border border-white/5 hover:border-volt/20 rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative aspect-square bg-white rounded-2xl p-4 overflow-hidden flex items-center justify-center shrink-0 mb-4">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {product.discountPercentage > 0 && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white font-body font-bold text-[10px] px-2 py-1 rounded-lg">
                        -{Math.round(product.discountPercentage)}%
                      </span>
                    )}
                    <span className="absolute top-3 right-3 bg-white/80 backdrop-blur-md text-ink text-[10px] font-heading font-bold px-2 py-1 rounded-lg border border-black/5 capitalize">
                      {product.category.replace("-", " ")}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="px-1">
                    <div className="flex items-center gap-1 text-[11px] text-white/40 mb-1">
                      <span>{product.brand || "SkyMart Pick"}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-1 text-left">
                      {product.title}
                    </h3>
                    <p className="text-white/40 font-body text-xs mt-1 line-clamp-2 leading-relaxed text-left">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Pricing and Call to Action */}
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between px-1">
                  <div className="flex flex-col text-left">
                    <span className="text-primary font-heading font-bold text-lg">
                      ${finalPrice.toFixed(2)}
                    </span>
                    {product.discountPercentage > 0 && (
                      <span className="text-white/30 line-through text-xs -mt-1 font-body">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-1 rounded-lg text-[10px] font-bold">
                      <FiStar size={10} className="fill-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>

                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="p-2.5 bg-primary text-background hover:bg-volt-light rounded-xl transition-all cursor-pointer shadow-md shadow-primary/10 hover:shadow-primary/25"
                      title="Add to Cart"
                    >
                      <FiShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
