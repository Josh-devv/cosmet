"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ShoppingBag, X, Plus, Minus, Check, ArrowLeft, Star, Menu } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = "body" | "face" | "hair" | "other";
type View = "home" | "catalog" | "about" | "reviews";

interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  salePrice?: number;
  category: Category;
  img: string;
  bgColor: string;
  tag?: string;
  description: string;
  howTo: string;
  ingredients: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Coconut Body Butter",
    subtitle: "Deep nourishing body treatment",
    price: 42,
    salePrice: 36,
    category: "body",
    img: "https://images.pexels.com/photos/5938359/pexels-photo-5938359.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f5f0eb",
    tag: "sale -15%",
    description: "A rich, whipped body butter formulated with organic coconut oil and shea extracts to drench skin in lasting hydration.",
    howTo: "Scoop a generous amount and massage into skin in circular motions after showering. Focus on dry areas like elbows, knees, and heels.",
    ingredients: "Cocos Nucifera Oil, Butyrospermum Parkii, Glycerin, Cetearyl Alcohol, Tocopherol (Vitamin E).",
  },
  {
    id: "p2",
    name: "Velvet Body Lotion",
    subtitle: "Lightweight daily moisture",
    price: 34,
    category: "body",
    img: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#eef2f0",
    description: "A fast-absorbing daily lotion that leaves skin silky smooth without any greasy residue. Infused with aloe vera and cucumber extract.",
    howTo: "Apply to clean, damp skin immediately after bathing for best absorption. Massage in upward strokes.",
    ingredients: "Aloe Barbadensis Leaf Juice, Cucumis Sativus Extract, Glycerin, Niacinamide, Panthenol.",
  },
  {
    id: "p3",
    name: "Radiance Face Serum",
    subtitle: "Brightening vitamin C complex",
    price: 68,
    salePrice: 58,
    category: "face",
    img: "https://images.pexels.com/photos/7427858/pexels-photo-7427858.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f8f4ee",
    tag: "bestseller",
    description: "A potent 15% Vitamin C serum that visibly brightens, evens skin tone, and boosts collagen production over time.",
    howTo: "Apply 3–4 drops to clean, dry skin every morning before moisturizer and SPF. Avoid contact with eyes.",
    ingredients: "L-Ascorbic Acid 15%, Hyaluronic Acid, Niacinamide, Ferulic Acid, Tocopherol.",
  },
  {
    id: "p4",
    name: "Soft Reset Moisturiser",
    subtitle: "Barrier-restoring daily cream",
    price: 52,
    category: "face",
    img: "https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f0f4f8",
    description: "A gentle, fragrance-free moisturiser that rebuilds the skin barrier with ceramides and peptides. Suitable for all skin types.",
    howTo: "Apply a pea-sized amount to face and neck morning and night after cleansing and serums.",
    ingredients: "Ceramide NP, Ceramide AP, Hyaluronic Acid, Glycerin, Cholesterol, Phytosphingosine.",
  },
  {
    id: "p5",
    name: "Scalp Balance Shampoo",
    subtitle: "Purifying & gentle cleanse",
    price: 28,
    category: "hair",
    img: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#eef0f5",
    description: "A sulfate-free shampoo that balances the scalp microbiome, removes buildup, and leaves hair clean without stripping natural oils.",
    howTo: "Lather into wet hair and scalp, massage for 60 seconds, and rinse thoroughly. Use 2–3 times per week.",
    ingredients: "Sodium Cocoyl Isethionate, Salicylic Acid, Zinc PCA, Panthenol, Aloe Barbadensis.",
  },
  {
    id: "p6",
    name: "Glass Hair Oil",
    subtitle: "Frizz-free shine treatment",
    price: 38,
    salePrice: 32,
    category: "hair",
    img: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f5eef5",
    tag: "new",
    description: "An ultra-lightweight oil blend that tames frizz, adds mirror-like shine, and protects from heat up to 230°C.",
    howTo: "Apply 2–4 drops to damp or dry hair, focusing on mid-lengths and ends. Style as usual.",
    ingredients: "Cyclopentasiloxane, Argan Oil, Camellia Oil, Dimethiconol, Tocopherol.",
  },
  {
    id: "p7",
    name: "Ritual Hand Cream",
    subtitle: "Intensive overnight repair",
    price: 22,
    category: "other",
    img: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f0f5ee",
    description: "A thick, concentrated hand cream that repairs cracked, dry hands overnight with shea butter and urea.",
    howTo: "Apply generously to hands before bed and massage into cuticles. For intensive treatment, wear cotton gloves overnight.",
    ingredients: "Butyrospermum Parkii, Urea 5%, Allantoin, Glycerin, Lanolin.",
  },
  {
    id: "p8",
    name: "Calming Lip Treatment",
    subtitle: "Plumping peptide lip balm",
    price: 18,
    category: "other",
    img: "https://images.pexels.com/photos/2533264/pexels-photo-2533264.jpeg?auto=compress&cs=tinysrgb&w=600",
    bgColor: "#f8eef0",
    tag: "new",
    description: "A nourishing lip treatment with peptides and hyaluronic acid to smooth, plump, and protect lips.",
    howTo: "Apply throughout the day as needed, or as the last step of your skincare routine at night.",
    ingredients: "Castor Oil, Beeswax, Hyaluronic Acid, Acetyl Hexapeptide-8, Shea Butter.",
  },
];

const CATEGORY_IMAGES: Record<Category, string> = {
  body: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
  face: "https://images.pexels.com/photos/7427858/pexels-photo-7427858.jpeg?auto=compress&cs=tinysrgb&w=600",
  hair: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600",
  other: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600",
};

const REVIEWS = [
  { name: "Sofia M.", location: "London", rating: 5, text: "The Coconut Body Butter is genuinely the best thing I've put on my skin. It absorbs beautifully and doesn't feel heavy at all. I've repurchased three times.", product: "Coconut Body Butter" },
  { name: "Amara T.", location: "Paris", rating: 5, text: "I was skeptical about the Vitamin C serum at first, but within two weeks my skin tone was visibly more even. It's become non-negotiable for me.", product: "Radiance Face Serum" },
  { name: "Isabella R.", location: "Milan", rating: 5, text: "Finally a hand cream that works without feeling greasy. I use it every night and my hands feel completely transformed.", product: "Ritual Hand Cream" },
  { name: "Nora K.", location: "Stockholm", rating: 5, text: "The Glass Hair Oil is a game-changer. A couple of drops and my hair looks freshly blown out. I take it everywhere with me.", product: "Glass Hair Oil" },
  { name: "Clara B.", location: "Berlin", rating: 5, text: "The Soft Reset Moisturiser is my holy grail. My skin stays hydrated all day without any breakouts. Clean ingredients, effective formula.", product: "Soft Reset Moisturiser" },
  { name: "Léa D.", location: "Lyon", rating: 5, text: "I love everything about the act· — the packaging, the formulas, the ethics. The Body Lotion smells incredible and lasts all day.", product: "Velvet Body Lotion" },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function Home() {
  const [view, setView] = useState<View>("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroTab, setHeroTab] = useState("Aesthetics");
  const [filterCat, setFilterCat] = useState<Category | "all">("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [checkoutStep, setCheckoutStep] = useState<"bag" | "details" | "payment" | "done">("bag");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNum, setCardNum] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cart helpers
  const addToCart = (p: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === p.id);
      return existing
        ? prev.map((i) => (i.product.id === p.id ? { ...i, quantity: i.quantity + 1 } : i))
        : [...prev, { product: p, quantity: 1 }];
    });
  };
  const updateQty = (id: string, delta: number) =>
    setCart((prev) =>
      prev
        .map((i) => (i.product.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  const cartTotal = cart.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const nav = (v: View) => {
    setView(v);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = filterCat === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filterCat);

  // ── NAV ───────────────────────────────────────────────────────────────────
  const Navbar = () => (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center justify-between px-6 md:px-12 h-16 ${
        scrolled ? "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Mobile Menu Toggle */}
      <button 
        className="md:hidden text-[#0A0A0A]"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {/* Logo */}
      <button 
        onClick={() => nav("home")} 
        className="text-xl md:text-2xl font-normal tracking-tight text-[#0A0A0A]"
      >
        the act<span className="text-[var(--accent)]">·</span>
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10">
        {(["catalog", "about", "reviews"] as View[]).map((v) => (
          <button
            key={v}
            onClick={() => nav(v)}
            className={`text-sm tracking-wide capitalize transition-colors ${
              view === v ? "text-[#0A0A0A] font-medium" : "text-gray-500 hover:text-[#0A0A0A]"
            }`}
          >
            {v === "catalog" ? "Catalog" : v === "about" ? "About Us" : "Reviews"}
          </button>
        ))}
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-4 md:gap-6">
        <button
          onClick={() => { setCartOpen(true); setCheckoutStep("bag"); }}
          className="relative flex items-center text-[#0A0A0A] hover:text-[var(--accent)] transition-colors"
        >
          <ShoppingBag size={22} strokeWidth={1.5} />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 bg-[#0A0A0A] text-white w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
        <button
          onClick={() => nav("about")}
          className="hidden md:flex bg-[#0A0A0A] text-white px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--accent)] transition-colors"
        >
          Contact Us
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white z-[60] flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="text-xl font-normal tracking-tight">the act<span className="text-[var(--accent)]">·</span></span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={28} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex flex-col gap-8 text-2xl font-light">
              {(["home", "catalog", "about", "reviews"] as View[]).map((v) => (
                <button
                  key={v}
                  onClick={() => nav(v)}
                  className={`text-left capitalize ${view === v ? "text-[var(--accent)]" : "text-[#0A0A0A]"}`}
                >
                  {v === "catalog" ? "Catalog" : v === "about" ? "About Us" : v}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );

  // ── HOME VIEW ─────────────────────────────────────────────────────────────
  const HomeView = () => {
    const featured = PRODUCTS.find((p) => p.id === "p1")!;
    return (
      <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>

        {/* ── HERO ── */}
        <section className="relative w-full h-[100svh] min-h-[600px] bg-gray-50 overflow-hidden">
          {/* Full-bleed model image */}
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3782142/pexels-photo-3782142.jpeg?auto=compress&cs=tinysrgb&w=1400"
              alt="Model with product"
              className="w-full h-full object-cover object-center"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-white/90 md:from-white/80 via-white/40 to-transparent" />
          </div>

          {/* Headline */}
          <div className="absolute top-[20%] md:top-[25%] left-6 md:left-[8%] max-w-md z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.1] text-[#0A0A0A] tracking-tight">
              Cosmetics for the <br /> whole body. <br className="hidden md:block" />
              <span className="font-bold">For every body.</span>
            </h1>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button 
                onClick={() => nav("catalog")} 
                className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-8 py-3.5 rounded-full text-sm font-medium hover:bg-[var(--accent)] transition-colors w-full sm:w-auto"
              >
                Shop now <ArrowUpRight size={16} />
              </button>
              <button 
                onClick={() => nav("about")} 
                className="flex items-center justify-center gap-2 bg-white/80 backdrop-blur-md text-[#0A0A0A] px-8 py-3.5 rounded-full text-sm font-medium hover:bg-white transition-colors w-full sm:w-auto"
              >
                Our story
              </button>
            </div>
          </div>

          {/* Pill tabs */}
          <div className="hidden md:flex absolute top-[55%] right-[25%] gap-2 z-10">
            {["Aesthetics", "Comfort", "Care"].map((t) => (
              <button 
                key={t} 
                onClick={() => setHeroTab(t)} 
                className={`px-5 py-2 rounded-full text-sm transition-colors ${
                  heroTab === t ? "bg-[#0A0A0A] text-white" : "bg-white/70 backdrop-blur-md text-gray-700 hover:bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Floating product card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="hidden md:block absolute right-[5%] top-[60%] bg-white/90 backdrop-blur-lg rounded-3xl p-5 w-64 shadow-xl z-10"
          >
            <span className="inline-block px-3 py-1 bg-gray-100 text-[#0A0A0A] text-xs font-semibold rounded-full mb-3">
              {'{ sale -15% }'}
            </span>
            <h3 className="text-lg font-bold leading-tight text-[#0A0A0A]">
              Coconut body<br />butter
            </h3>
            <div className="flex justify-between items-end mt-4">
              <img
                src={featured.img}
                alt={featured.name}
                className="w-20 h-20 object-cover rounded-xl"
              />
              <button
                onClick={() => addToCart(featured)}
                className="w-10 h-10 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center hover:bg-[var(--accent)] transition-colors"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </motion.div>

          {/* Brand story card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
            className="hidden lg:flex absolute bottom-[8%] left-[8%] bg-white/90 backdrop-blur-lg rounded-3xl p-5 max-w-sm gap-4 shadow-lg z-10"
          >
            <img
              src="https://images.pexels.com/photos/3321415/pexels-photo-3321415.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Brand story"
              className="w-16 h-16 rounded-xl object-cover shrink-0"
            />
            <div>
              <p className="text-sm font-medium leading-tight text-[#0A0A0A]">
                We were inspired by you and wanted to turn everyday care into a special ritual.
              </p>
              <p className="text-xs text-gray-500 mt-2 leading-snug">
                In the moment of realizing our value, the moment where we are in the first place.
              </p>
            </div>
          </motion.div>
        </section>

        {/* ── CATEGORY ROW ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 border-b border-gray-100">
          {(["body", "face", "hair", "other"] as Category[]).map((cat, i) => (
            <button
              key={cat}
              onClick={() => { nav("catalog"); setFilterCat(cat); }}
              className={`p-6 flex flex-col gap-6 bg-white hover:bg-gray-50 transition-colors text-left border-r border-b lg:border-b-0 border-gray-100 group ${
                i % 2 !== 0 ? "border-r-0 lg:border-r" : ""
              } ${i === 3 ? "border-r-0" : ""}`}
            >
              <div className="flex justify-between items-center w-full">
                <span className="text-sm text-gray-500 font-medium group-hover:text-[var(--accent)] transition-colors">
                  {'{ ' + cat + ' }'}
                </span>
                <span className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-[var(--accent)] group-hover:text-[var(--accent)] transition-colors">
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </span>
              </div>
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 img-hover">
                <img
                  src={CATEGORY_IMAGES[cat]}
                  alt={cat}
                  className="w-full h-full object-cover"
                />
              </div>
            </button>
          ))}
        </section>

        {/* ── FEATURED PRODUCTS ── */}
        <section className="py-20 px-6 md:px-12 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-2">Our selection</p>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0A0A0A]">Most loved formulas</h2>
              </div>
              <button 
                onClick={() => nav("catalog")} 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:border-[#0A0A0A] transition-colors"
              >
                View all <ArrowUpRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} onView={() => setQuickView(p)} onAdd={() => addToCart(p)} />
              ))}
            </div>
          </div>
        </section>

        {/* ── RITUAL STRIP ── */}
        <section className="bg-[#0A0A0A] text-white py-24 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-4 text-[var(--accent)]">Our promise</p>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] mb-6">
                Everyday care.<br /><span className="font-bold">Turned ritual.</span>
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-10 font-light">
                We believe skincare should feel like a moment of pause, not a chore. Every formula we create is designed to fit naturally into the rhythm of your day — and to genuinely work.
              </p>
              <button 
                onClick={() => nav("about")} 
                className="flex items-center gap-2 bg-white/10 hover:bg-white hover:text-[#0A0A0A] px-8 py-3.5 rounded-full text-sm font-medium transition-colors w-max"
              >
                Learn our story <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { num: "98%", label: "of users report visible improvement in 14 days" },
                { num: "0", label: "harsh chemicals, parabens, or synthetic fragrance" },
                { num: "42+", label: "clinically validated active ingredients" },
                { num: "∞", label: "refillable packaging — designed for the planet" },
              ].map((stat) => (
                <div key={stat.num} className="bg-white/5 rounded-3xl p-8 border border-white/10">
                  <p className="text-4xl font-bold mb-3 text-[var(--accent)]">{stat.num}</p>
                  <p className="text-sm text-gray-300 leading-relaxed font-light">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS TEASER ── */}
        <section className="py-24 px-6 md:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <h2 className="text-3xl md:text-4xl font-light tracking-tight text-[#0A0A0A]">What people say</h2>
              <button 
                onClick={() => nav("reviews")} 
                className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-medium hover:border-[#0A0A0A] transition-colors"
              >
                All reviews <ArrowUpRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {REVIEWS.slice(0, 3).map((r, i) => (
                <ReviewCard key={i} review={r} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <Footer navFn={nav} />
      </motion.div>
    );
  };

  // ── CATALOG VIEW ──────────────────────────────────────────────────────────
  const CatalogView = () => (
    <motion.div key="catalog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow pb-24">
        <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A0A0A] mb-2">Catalog</h1>
        <p className="text-gray-500 mb-12 font-light">Formulas for every moment of your day.</p>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 pb-8 border-b border-gray-100">
          <div className="flex flex-wrap gap-2">
            {(["all", "body", "face", "hair", "other"] as const).map((c) => (
              <button 
                key={c} 
                onClick={() => setFilterCat(c as Category | "all")} 
                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                  filterCat === c 
                    ? "bg-[#0A0A0A] text-white" 
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {c === "all" ? "All" : `{ ${c} }`}
              </button>
            ))}
          </div>
          <span className="text-sm text-gray-400 font-medium">
            {filtered.length} items
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onView={() => setQuickView(p)} onAdd={() => addToCart(p)} />
          ))}
        </div>
      </div>
      <Footer navFn={nav} />
    </motion.div>
  );

  // ── ABOUT VIEW ────────────────────────────────────────────────────────────
  const AboutView = () => (
    <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-16">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] w-full bg-gray-900 overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="The act laboratory"
          className="w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-16 max-w-7xl mx-auto">
          <p className="text-xs text-[var(--accent)] font-semibold tracking-widest uppercase mb-4">Our Story</p>
          <h1 className="text-5xl md:text-7xl font-light text-white tracking-tight leading-none max-w-2xl">
            Inspired by you.
          </h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-24">
        {[
          {
            heading: "How it started",
            body: "the act· was founded in 2021 out of frustration with overcomplicated skincare — products with endless ingredient lists that delivered mediocre results. We wanted something different: formulas that worked, packaged in a way that felt good to use every day.",
          },
          {
            heading: "The way we work",
            body: "Every formula begins with a clear objective. We identify the active ingredients with the strongest clinical evidence, build around them, and remove everything that doesn't serve a purpose. No marketing ingredients. No filler. Just function.",
          },
          {
            heading: "Our commitment",
            body: "We are B-Corp certified, proudly carbon-neutral, and committed to refillable packaging across our entire range by 2026. We believe that sustainable beauty and effective beauty are not in conflict — they're the same thing.",
          },
        ].map((s, i) => (
          <div key={i} className={`mb-16 pb-16 ${i < 2 ? "border-b border-gray-100" : ""}`}>
            <h2 className="text-2xl md:text-3xl font-light text-[#0A0A0A] tracking-tight mb-6">{s.heading}</h2>
            <p className="text-lg text-gray-600 leading-relaxed font-light">{s.body}</p>
          </div>
        ))}
        <button 
          onClick={() => nav("catalog")} 
          className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 rounded-full text-sm font-medium hover:bg-[var(--accent)] transition-colors w-full sm:w-auto"
        >
          Explore the catalog <ArrowUpRight size={16} />
        </button>
      </div>
      <Footer navFn={nav} />
    </motion.div>
  );

  // ── REVIEWS VIEW ──────────────────────────────────────────────────────────
  const ReviewsView = () => (
    <motion.div key="reviews" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24 min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex-grow pb-24">
        <div className="mb-16">
          <p className="text-xs text-gray-400 font-medium tracking-widest uppercase mb-3">{'{ reviews }'}</p>
          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-[#0A0A0A]">What people say</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <ReviewCard key={i} review={r} />
          ))}
        </div>
      </div>
      <Footer navFn={nav} />
    </motion.div>
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-white text-[#0A0A0A]">
      <Navbar />

      <AnimatePresence mode="wait">
        {view === "home" && <HomeView key="home" />}
        {view === "catalog" && <CatalogView key="catalog" />}
        {view === "about" && <AboutView key="about" />}
        {view === "reviews" && <ReviewsView key="reviews" />}
      </AnimatePresence>

      {/* ── QUICK VIEW MODAL ── */}
      <AnimatePresence>
        {quickView && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setQuickView(null)}
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          >
            <motion.div
              initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
            >
              {/* Image */}
              <div 
                className="w-full md:w-1/2 min-h-[300px] md:min-h-0"
                style={{ backgroundColor: quickView.bgColor }}
              >
                <img src={quickView.img} alt={quickView.name} className="w-full h-full object-cover" />
              </div>
              
              {/* Details */}
              <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col gap-6 overflow-y-auto">
                <div className="flex justify-between items-start">
                  {quickView.tag && (
                    <span className="px-3 py-1 bg-gray-100 text-[#0A0A0A] text-xs font-semibold rounded-full">
                      {'{ ' + quickView.tag + ' }'}
                    </span>
                  )}
                  <button onClick={() => setQuickView(null)} className="ml-auto bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition-colors">
                    <X size={20} className="text-gray-600" />
                  </button>
                </div>

                <div>
                  <p className="text-xs text-[var(--accent)] font-semibold uppercase tracking-widest mb-2">
                    {'{ ' + quickView.category + ' }'}
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-[#0A0A0A] mb-1">{quickView.name}</h2>
                  <p className="text-gray-500 font-light">{quickView.subtitle}</p>
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-light">${quickView.salePrice ?? quickView.price}</span>
                  {quickView.salePrice && (
                    <span className="text-lg text-gray-400 line-through">${quickView.price}</span>
                  )}
                </div>

                <p className="text-gray-600 leading-relaxed font-light">{quickView.description}</p>
                
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">How to use</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-light">{quickView.howTo}</p>
                </div>

                <button
                  onClick={() => { addToCart(quickView); setQuickView(null); }}
                  className="mt-auto w-full bg-[#0A0A0A] text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors"
                >
                  Add to bag — ${quickView.salePrice ?? quickView.price}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CART DRAWER ── */}
      <AnimatePresence>
        {cartOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm flex justify-end"
          >
            <div className="absolute inset-0" onClick={() => setCartOpen(false)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold tracking-tight">Your bag</h2>
                  <p className="text-sm text-gray-500 mt-1">{cartCount} item{cartCount !== 1 ? "s" : ""}</p>
                </div>
                <button 
                  onClick={() => setCartOpen(false)} 
                  className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Checkout Steps */}
              <AnimatePresence mode="wait">
                {checkoutStep === "bag" && (
                  <motion.div key="bag" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 gap-4">
                          <ShoppingBag size={48} strokeWidth={1} />
                          <p className="text-lg font-light">Your bag is empty</p>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6">
                          {cart.map((item, idx) => (
                            <div key={item.product.id} className={`flex gap-4 pb-6 ${idx < cart.length - 1 ? "border-b border-gray-50" : ""}`}>
                              <div 
                                className="w-20 h-24 rounded-xl overflow-hidden shrink-0"
                                style={{ backgroundColor: item.product.bgColor }}
                              >
                                <img src={item.product.img} alt={item.product.name} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-1 flex flex-col py-1">
                                <p className="text-sm font-bold text-[#0A0A0A] leading-tight">{item.product.name}</p>
                                <p className="text-xs text-[var(--accent)] mt-1 font-medium">{'{ ' + item.product.category + ' }'}</p>
                                
                                <div className="mt-auto flex items-center justify-between">
                                  <div className="flex items-center gap-4 bg-gray-50 rounded-full px-3 py-1.5">
                                    <button onClick={() => updateQty(item.product.id, -1)} className="text-gray-500 hover:text-[#0A0A0A]"><Minus size={14} /></button>
                                    <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                                    <button onClick={() => updateQty(item.product.id, 1)} className="text-gray-500 hover:text-[#0A0A0A]"><Plus size={14} /></button>
                                  </div>
                                  <p className="text-base font-bold">${(item.product.salePrice ?? item.product.price) * item.quantity}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {cart.length > 0 && (
                      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                        <div className="mb-6">
                          <div className="flex justify-between text-xs text-gray-500 font-medium uppercase tracking-widest mb-3">
                            <span>Free shipping progress</span>
                            <span>{cartTotal >= 60 ? "Unlocked ✓" : `$${60 - cartTotal} away`}</span>
                          </div>
                          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[var(--accent)] transition-all duration-500" 
                              style={{ width: `${Math.min((cartTotal / 60) * 100, 100)}%` }} 
                            />
                          </div>
                        </div>
                        <div className="flex justify-between items-end mb-6">
                          <span className="text-sm text-gray-500">Subtotal</span>
                          <span className="text-2xl font-light">${cartTotal}</span>
                        </div>
                        <button 
                          onClick={() => setCheckoutStep("details")} 
                          className="w-full bg-[#0A0A0A] text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-[var(--accent)] transition-colors"
                        >
                          Checkout <ArrowUpRight size={18} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                )}

                {checkoutStep === "details" && (
                  <motion.div key="details" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
                    <button 
                      onClick={() => setCheckoutStep("bag")} 
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A0A0A] w-max transition-colors"
                    >
                      <ArrowLeft size={16} /> Back to bag
                    </button>
                    <div>
                      <h3 className="text-2xl font-light tracking-tight text-[#0A0A0A]">Delivery details</h3>
                      <p className="text-sm text-gray-500 mt-1">Step 1 of 2</p>
                    </div>
                    <div className="flex flex-col gap-5 flex-1">
                      {[
                        { label: "Email address", val: email, set: setEmail, ph: "you@example.com", type: "email" },
                        { label: "Delivery address", val: address, set: setAddress, ph: "12 Example Street, London", type: "text" },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{f.label}</label>
                          <input
                            type={f.type} value={f.val} onChange={(e) => f.set(e.target.value)}
                            placeholder={f.ph}
                            className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm outline-none"
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      disabled={!email || !address}
                      onClick={() => setCheckoutStep("payment")}
                      className="w-full bg-[#0A0A0A] disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-full font-medium transition-colors mt-auto"
                    >
                      Continue to payment
                    </button>
                  </motion.div>
                )}

                {checkoutStep === "payment" && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
                    <button 
                      onClick={() => setCheckoutStep("details")} 
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#0A0A0A] w-max transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>
                    <div>
                      <h3 className="text-2xl font-light tracking-tight text-[#0A0A0A]">Payment</h3>
                      <p className="text-sm text-gray-500 mt-1">Step 2 of 2 · Total: <span className="font-semibold text-[#0A0A0A]">${cartTotal}</span></p>
                    </div>
                    <div className="flex flex-col gap-5 flex-1">
                      {[
                        { label: "Name on card", val: cardName, set: setCardName, ph: "Your full name", type: "text" },
                        { label: "Card number", val: cardNum, set: setCardNum, ph: "•••• •••• •••• ••••", type: "text" },
                      ].map((f) => (
                        <div key={f.label}>
                          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">{f.label}</label>
                          <input
                            type={f.type} value={f.val} onChange={(e) => f.set(e.target.value)}
                            placeholder={f.ph}
                            className={`w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] transition-all text-sm outline-none ${f.label === "Card number" ? "font-mono" : ""}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      disabled={!cardName || !cardNum}
                      onClick={() => { setCheckoutStep("done"); setCart([]); }}
                      className="w-full bg-[#0A0A0A] disabled:bg-gray-200 disabled:text-gray-400 text-white py-4 rounded-full font-medium transition-colors mt-auto"
                    >
                      Place order — ${cartTotal}
                    </button>
                  </motion.div>
                )}

                {checkoutStep === "done" && (
                  <motion.div key="done" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 mb-2">
                      <Check size={40} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-3xl font-light tracking-tight text-[#0A0A0A]">Order confirmed</h3>
                    <p className="text-gray-500 leading-relaxed max-w-xs font-light">
                      Thank you! Your order is on its way. A confirmation has been sent to <strong className="font-medium text-[#0A0A0A]">{email}</strong>.
                    </p>
                    <button 
                      onClick={() => { setCartOpen(false); setCheckoutStep("bag"); }} 
                      className="mt-8 bg-gray-100 text-[#0A0A0A] hover:bg-gray-200 px-8 py-3.5 rounded-full font-medium transition-colors"
                    >
                      Continue shopping
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProductCard({ product, onView, onAdd }: { product: Product; onView: () => void; onAdd: () => void }) {
  return (
    <div className="group rounded-3xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300">
      {/* Image area */}
      <div 
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: product.bgColor }}
      >
        <img
          src={product.img} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        {product.tag && (
          <span className="absolute top-4 left-4 px-3 py-1.5 bg-white/90 backdrop-blur-md text-[#0A0A0A] text-[10px] font-bold tracking-widest uppercase rounded-full">
            {'{ ' + product.tag + ' }'}
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={onView} 
            className="px-6 py-2.5 rounded-full bg-white text-[#0A0A0A] text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick view <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      
      {/* Info */}
      <div className="p-6">
        <p className="text-xs text-[var(--accent)] font-semibold uppercase tracking-widest mb-2">
          {'{ ' + product.category + ' }'}
        </p>
        <h3 className="text-lg font-bold text-[#0A0A0A] leading-tight mb-1">{product.name}</h3>
        <p className="text-sm text-gray-500 mb-6 font-light">{product.subtitle}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-baseline">
            <span className="text-2xl font-light">${product.salePrice ?? product.price}</span>
            {product.salePrice && <span className="text-sm text-gray-400 line-through">${product.price}</span>}
          </div>
          <button 
            onClick={onAdd} 
            className="w-10 h-10 rounded-full bg-gray-100 text-[#0A0A0A] flex items-center justify-center hover:bg-[var(--accent)] hover:text-white transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-8 hover:border-gray-200 transition-colors">
      <div className="flex gap-1 mb-6">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={14} fill="var(--accent)" color="var(--accent)" />
        ))}
      </div>
      <p className="text-gray-600 leading-relaxed font-light italic mb-8">"{review.text}"</p>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-[#0A0A0A]">{review.name}</p>
          <p className="text-xs text-gray-400 mt-1">{review.location}</p>
        </div>
        <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full">
          {'{ ' + review.product.split(' ').slice(0, 2).join(' ').toLowerCase() + ' }'}
        </span>
      </div>
    </div>
  );
}

function Footer({ navFn }: { navFn: (v: View) => void }) {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-24 pb-8 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2">
            <p className="text-3xl font-light tracking-tight mb-4">the act<span className="text-[var(--accent)]">·</span></p>
            <p className="text-gray-400 font-light leading-relaxed max-w-sm">Everyday care, turned ritual. Clean formulas, honest ingredients, beautiful results.</p>
          </div>
          {[
            { title: "{ explore }", links: [{ label: "Catalog", v: "catalog" as View }, { label: "About Us", v: "about" as View }, { label: "Reviews", v: "reviews" as View }] },
            { title: "{ categories }", links: [{ label: "{ body }", v: "catalog" as View }, { label: "{ face }", v: "catalog" as View }, { label: "{ hair }", v: "catalog" as View }] },
            { title: "{ info }", links: [{ label: "Shipping & Returns", v: "about" as View }, { label: "Sustainability", v: "about" as View }, { label: "Contact", v: "about" as View }] },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-[var(--accent)] uppercase tracking-widest mb-6">{col.title}</p>
              <div className="flex flex-col gap-4">
                {col.links.map((l) => (
                  <button 
                    key={l.label} 
                    onClick={() => navFn(l.v)} 
                    className="text-gray-400 text-sm hover:text-white transition-colors text-left w-max font-light"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10 text-xs text-gray-500 font-light">
          <p>© 2026 the act· All rights reserved.</p>
          <p>Clean beauty. Honest ingredients.</p>
        </div>
      </div>
    </footer>
  );
}
