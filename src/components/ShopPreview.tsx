"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  LuBackpack,
  LuCheck,
  LuFootprints,
  LuGlasses,
  LuHeadphones,
  LuHeart,
  LuLock,
  LuPlus,
  LuSearch,
  LuShirt,
  LuShoppingCart,
  LuStar,
  LuWatch,
} from "react-icons/lu";

type Category = "All" | "Fashion" | "Tech" | "Accessories";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  category: Exclude<Category, "All">;
  Icon: IconType;
  tint: string;
}

const PRODUCTS: Product[] = [
  { id: 1, name: "Linen Shirt", price: 1299, rating: 4.6, category: "Fashion", Icon: LuShirt, tint: "#7c8db5" },
  { id: 2, name: "Runner Sneakers", price: 2499, rating: 4.8, category: "Fashion", Icon: LuFootprints, tint: "#c0703f" },
  { id: 3, name: "ANC Headphones", price: 4999, rating: 4.7, category: "Tech", Icon: LuHeadphones, tint: "#2f4b7c" },
  { id: 4, name: "Smart Watch", price: 3799, rating: 4.5, category: "Tech", Icon: LuWatch, tint: "#3b3b46" },
  { id: 5, name: "Sunglasses", price: 899, rating: 4.3, category: "Accessories", Icon: LuGlasses, tint: "#8a6d3b" },
  { id: 6, name: "Travel Backpack", price: 1899, rating: 4.9, category: "Accessories", Icon: LuBackpack, tint: "#3d6b47" },
];

const TABS: Category[] = ["All", "Fashion", "Tech", "Accessories"];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Interactive mini storefront used as the featured-project preview. */
export default function ShopPreview() {
  const [tab, setTab] = useState<Category>("All");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [toast, setToast] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const items = tab === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === tab);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = PRODUCTS.reduce((sum, p) => sum + (cart[p.id] ?? 0) * p.price, 0);

  const add = (p: Product) => {
    setCart((c) => ({ ...c, [p.id]: (c[p.id] ?? 0) + 1 }));
    setBump((b) => b + 1);
    setToast(`${p.name} added to cart`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const toggleLike = (id: number) =>
    setLiked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });

  return (
    <div className="shop" role="group" aria-label="Interactive preview of the Shopverse e-commerce app">
      {/* browser chrome */}
      <div className="shop-chrome">
        <span className="shop-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="shop-url">
          <LuLock aria-hidden="true" /> shopverse.app
        </span>
      </div>

      {/* app header */}
      <div className="shop-head">
        <strong className="shop-logo">Shopverse</strong>
        <span className="shop-search" aria-hidden="true">
          <LuSearch /> Search products
        </span>
        <span className="shop-cart" aria-live="polite" aria-label={`${count} items in cart`}>
          <LuShoppingCart aria-hidden="true" />
          {count > 0 && (
            <b key={bump} className="shop-badge">
              {count}
            </b>
          )}
        </span>
      </div>

      {/* category tabs */}
      <div className="shop-tabs" role="tablist" aria-label="Categories">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* product grid */}
      <ul className="shop-grid" key={tab}>
        {items.map((p, i) => {
          const inCart = cart[p.id] ?? 0;
          return (
            <li key={p.id} className="shop-card" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="shop-thumb" style={{ "--tint": p.tint } as CSSProperties}>
                <p.Icon aria-hidden="true" />
                <button
                  type="button"
                  className={`shop-like ${liked.has(p.id) ? "on" : ""}`}
                  aria-label={liked.has(p.id) ? `Unlike ${p.name}` : `Like ${p.name}`}
                  aria-pressed={liked.has(p.id)}
                  onClick={() => toggleLike(p.id)}
                >
                  <LuHeart />
                </button>
              </div>
              <div className="shop-info">
                <span className="shop-name">{p.name}</span>
                <span className="shop-rating">
                  <LuStar aria-hidden="true" /> {p.rating}
                </span>
              </div>
              <div className="shop-buy">
                <span className="shop-price">{inr(p.price)}</span>
                <button
                  type="button"
                  className={`shop-add ${inCart ? "added" : ""}`}
                  onClick={() => add(p)}
                  aria-label={`Add ${p.name} to cart`}
                >
                  {inCart ? (
                    <>
                      <LuCheck aria-hidden="true" /> {inCart}
                    </>
                  ) : (
                    <LuPlus aria-hidden="true" />
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      {/* footer bar */}
      <div className="shop-foot">
        <span className="muted">{count ? `${count} item${count > 1 ? "s" : ""} · ${inr(total)}` : "Try adding something to the cart"}</span>
        <button
          type="button"
          className="shop-checkout"
          disabled={!count}
          onClick={() => {
            setCart({});
            setToast("Order placed! 🎉 (demo)");
            clearTimeout(toastTimer.current);
            toastTimer.current = setTimeout(() => setToast(null), 2000);
          }}
        >
          Checkout
        </button>
      </div>

      {toast && (
        <div className="shop-toast" role="status">
          <LuCheck aria-hidden="true" /> {toast}
        </div>
      )}
    </div>
  );
}
