"use client";

import { useState } from "react";

const allProducts = [
  { id: 1, name: "Wireless Pro Headphones", category: "Electronics", price: 299, rating: 4.8, reviews: 1243, stock: 89, sold: 3420, image: "🎧", trending: true },
  { id: 2, name: "SmartWatch Ultra", category: "Electronics", price: 449, rating: 4.6, reviews: 892, stock: 45, sold: 2180, image: "⌚", trending: true },
  { id: 3, name: "Ergonomic Laptop Stand", category: "Accessories", price: 79, rating: 4.9, reviews: 2341, stock: 234, sold: 8920, image: "💻", trending: false },
  { id: 4, name: "Mechanical Keyboard RGB", category: "Electronics", price: 159, rating: 4.7, reviews: 1567, stock: 156, sold: 4560, image: "⌨️", trending: true },
  { id: 5, name: "USB-C Hub Pro", category: "Accessories", price: 49, rating: 4.5, reviews: 3421, stock: 567, sold: 12300, image: "🔌", trending: false },
  { id: 6, name: "Noise Cancelling Buds", category: "Electronics", price: 199, rating: 4.4, reviews: 2100, stock: 12, sold: 5670, image: "🎵", trending: false },
  { id: 7, name: "4K Webcam Pro", category: "Electronics", price: 129, rating: 4.3, reviews: 876, stock: 0, sold: 2340, image: "📷", trending: false },
  { id: 8, name: "Desk Organizer Set", category: "Office", price: 39, rating: 4.6, reviews: 1890, stock: 345, sold: 7800, image: "📎", trending: false },
  { id: 9, name: "Wireless Charging Pad", category: "Accessories", price: 35, rating: 4.2, reviews: 4532, stock: 890, sold: 15600, image: "🔋", trending: true },
  { id: 10, name: "Standing Desk Mat", category: "Office", price: 59, rating: 4.7, reviews: 1234, stock: 178, sold: 4320, image: "🧱", trending: false },
  { id: 11, name: "Monitor Light Bar", category: "Office", price: 69, rating: 4.8, reviews: 2345, stock: 67, sold: 6780, image: "💡", trending: true },
  { id: 12, name: "Premium Mouse Pad XL", category: "Accessories", price: 29, rating: 4.5, reviews: 5678, stock: 1200, sold: 23400, image: "🖱️", trending: false },
];

const categories = ["All", "Electronics", "Accessories", "Office"];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= Math.floor(rating) ? "var(--accent-yellow)" : s - 0.5 <= rating ? "var(--accent-yellow)" : "var(--card-border)"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = allProducts.filter((p) => {
    if (category !== "All" && p.category !== category) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <main className="flex-1 p-8 ml-64 min-h-screen">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <p className="text-muted mt-1">Your product catalog at a glance.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0 }}>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" strokeLinecap="round" strokeWidth="2" />
          </svg>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-card border border-card-border rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
          />
        </div>
        <div className="flex gap-1 bg-card border border-card-border rounded-lg p-1">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 rounded-md text-xs font-medium transition-all ${
                category === c ? "bg-accent text-white" : "text-muted hover:text-white"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-card border border-card-border rounded-lg p-1">
          <button onClick={() => setView("grid")} className={`px-3 py-2 rounded-md text-sm transition-all ${view === "grid" ? "bg-accent text-white" : "text-muted hover:text-white"}`}>▦</button>
          <button onClick={() => setView("list")} className={`px-3 py-2 rounded-md text-sm transition-all ${view === "list" ? "bg-accent text-white" : "text-muted hover:text-white"}`}>☰</button>
        </div>
      </div>

      {/* Products Grid */}
      <div className={view === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"}>
        {filtered.map((p, i) => (
          view === "grid" ? (
            <div
              key={p.id}
              className="group bg-card border border-card-border rounded-xl overflow-hidden hover:border-accent/30 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${0.2 + i * 0.05}s`, opacity: 0 }}
            >
              {/* Image area */}
              <div className="relative h-40 bg-gradient-to-br from-background to-card flex items-center justify-center overflow-hidden">
                <span className="text-6xl group-hover:scale-125 transition-transform duration-500">{p.image}</span>
                {p.trending && (
                  <span className="absolute top-3 left-3 bg-accent-orange text-white text-[10px] font-bold px-2 py-0.5 rounded-full">TRENDING</span>
                )}
                {p.stock === 0 && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-accent-red font-bold text-sm">OUT OF STOCK</span>
                  </div>
                )}
                {p.stock > 0 && p.stock <= 20 && (
                  <span className="absolute top-3 right-3 bg-accent-red/20 text-accent-red text-[10px] font-bold px-2 py-0.5 rounded-full">Low Stock</span>
                )}
              </div>
              {/* Info */}
              <div className="p-4">
                <p className="text-xs text-muted mb-1">{p.category}</p>
                <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-accent transition-colors">{p.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <Stars rating={p.rating} />
                  <span className="text-xs text-muted">({p.reviews.toLocaleString()})</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-white">${p.price}</span>
                  <span className="text-xs text-muted">{p.sold.toLocaleString()} sold</span>
                </div>
                {/* Stock bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-[10px] text-muted mb-1">
                    <span>Stock</span>
                    <span>{p.stock} units</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        p.stock === 0 ? "bg-accent-red" : p.stock < 50 ? "bg-accent-orange" : "bg-accent-green"
                      }`}
                      style={{ width: `${Math.min((p.stock / 500) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={p.id}
              className="bg-card border border-card-border rounded-xl p-4 flex items-center gap-4 hover:border-accent/30 transition-all animate-slide-in-left"
              style={{ animationDelay: `${0.2 + i * 0.05}s`, opacity: 0 }}
            >
              <span className="text-4xl w-16 text-center">{p.image}</span>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white">{p.name}</h3>
                <p className="text-xs text-muted">{p.category}</p>
              </div>
              <Stars rating={p.rating} />
              <span className="text-sm font-bold text-white w-16 text-right">${p.price}</span>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.stock === 0 ? "text-accent-red bg-accent-red/10" : p.stock < 50 ? "text-accent-orange bg-accent-orange/10" : "text-accent-green bg-accent-green/10"}`}>
                {p.stock === 0 ? "Out of stock" : `${p.stock} in stock`}
              </span>
            </div>
          )
        ))}
      </div>
      <p className="text-xs text-muted mt-6">{filtered.length} products shown</p>
    </main>
  );
}
