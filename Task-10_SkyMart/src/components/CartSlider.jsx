import React, { useRef, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { FiMinus, FiPlus, FiShoppingBag } from "react-icons/fi";
import { toast } from "react-toastify";

const CartSlider = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  } = useCart();

  const sliderRef = useRef();

  // Close cart when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsCartOpen(false);
      }
    };
    if (isCartOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckout = () => {
    toast.success("🛒 Checkout simulation successful! Thank you for shopping with SkyMart.");
    clearCart();
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Cart drawer panel */}
      <div
        ref={sliderRef}
        className={`fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#0e0e11] border-l border-white/10 shadow-2xl z-50 flex flex-col transition-transform duration-300 ease-out transform ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiShoppingBag className="text-primary text-xl" />
            <h2 className="font-heading font-bold text-lg text-foreground">
              Your Cart
            </h2>
            <span className="bg-primary/10 text-primary text-xs px-2.5 py-1 rounded-full font-bold">
              {cartCount} {cartCount === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-all text-white/50 hover:text-white cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-white/5">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center text-white/40 mb-4 animate-bounce">
                <FiShoppingBag size={28} />
              </div>
              <p className="font-heading font-semibold text-lg text-white/80">
                Your cart is empty
              </p>
              <p className="text-white/40 text-xs font-body max-w-[200px] mt-1.5 leading-relaxed">
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-5 py-2.5 bg-primary text-background text-xs font-bold font-body rounded-xl border border-primary hover:bg-volt-light transition-all cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item) => {
              const discountedPrice = item.price * (1 - (item.discountPercentage || 0) / 100);
              return (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-white/4 border border-white/5 rounded-2xl hover:border-white/10 transition-all group"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0 p-2 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-semibold text-sm text-foreground truncate text-left">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-primary font-bold text-sm">
                          ${discountedPrice.toFixed(2)}
                        </span>
                        {item.discountPercentage > 0 && (
                          <span className="text-white/30 line-through text-xs">
                            ${item.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 bg-white/5 border border-white/10 px-2 py-1 rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:text-primary transition-colors text-white/50 cursor-pointer"
                        >
                          <FiMinus size={12} />
                        </button>
                        <span className="w-6 text-center text-xs font-body font-semibold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:text-primary transition-colors text-white/50 cursor-pointer"
                        >
                          <FiPlus size={12} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all cursor-pointer"
                        title="Remove product"
                      >
                        <IoTrashOutline size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-white/10 bg-[#0c0c0f] space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-white/50 text-xs font-body">
                <span>Items Subtotal</span>
                <span>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-white/50 text-xs font-body">
                <span>Discount Saved</span>
                <span className="text-red-400">
                  -$
                  {(
                    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) -
                    cartTotal
                  ).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-foreground text-sm font-heading font-bold pt-1.5 border-t border-white/5">
                <span>Order Total</span>
                <span className="text-primary text-base">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-white/30 font-body text-center leading-relaxed">
              Shipping & taxes calculated at checkout. Free shipping on orders over $100.
            </p>

            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-primary text-background font-bold text-sm rounded-2xl hover:bg-volt-light transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-primary/10 hover:shadow-primary/20"
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSlider;
