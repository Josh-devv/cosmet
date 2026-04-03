"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProduct, setActiveProduct] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Parallax
  const heroImageScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <main className="w-full relative bg-charcoal text-cream font-sans selection:bg-gold selection:text-charcoal leading-relaxed overflow-hidden">
      
      {/* Cinematic Aurora Background Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-gold/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating Floating Nav */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[150] w-fit px-8 py-4 glass-dark rounded-full flex items-center gap-12 text-[10px] tracking-[0.3em] uppercase font-semibold border border-white/5 shadow-2xl">
        <a href="#hero" className="hover:text-gold transition-colors">Intro</a>
        <a href="#discover" className="hover:text-gold transition-colors">Curation</a>
        <div className="text-xl font-serif lowercase tracking-normal px-4 italic border-x border-white/10">Aurea</div>
        <a href="#products" className="hover:text-gold transition-colors">Shop</a>
        <div className="relative group cursor-pointer">
           <ShoppingBag className="w-4 h-4 group-hover:text-gold transition-colors" />
           <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[7px] w-3 h-3 flex items-center justify-center rounded-full">3</span>
        </div>
      </nav>

      {/* Extreme Luxury Hero Section */}
      <section id="hero" className="relative h-[110vh] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-[120%]"
          style={{ scale: heroImageScale }}
        >
          <img 
            src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Hero Visual" 
            className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.2] saturate-50"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal"></div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
             initial={{ opacity: 0, y: 100 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="text-center"
          >
             <h1 className="font-serif text-[clamp(4rem,15vw,18rem)] leading-[0.8] mb-12 flex flex-col italic font-light tracking-tighter">
                <span>The Art</span>
                <span className="text-gold -mt-[2vw] pl-[5vw]">of Glow.</span>
             </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="luxury-subtitle text-xs text-cream/40 mb-12"
          >
            A Journey Through Light & Shadow
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.5 }}
            className="w-32 h-[1px] bg-gold/50"
          />
        </div>
      </section>

      {/* Bento Grid Discovery */}
      <section id="discover" className="py-40 bg-charcoal relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 flex flex-col md:flex-row justify-between items-end gap-8"
          >
            <h2 className="font-serif text-6xl md:text-[8rem] leading-none font-light italic">Discovery</h2>
            <p className="max-w-md text-cream/50 font-light text-lg">Curating the world's most sophisticated ingredients to deliver a visual symphony of skin artistry.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-4 h-auto md:h-[120vh]">
             {/* Large Bento Item */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2rem] border border-white/5"
             >
                <img src="https://images.pexels.com/photos/3321415/pexels-photo-3321415.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 filter saturate-0 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent p-12 flex flex-col justify-end items-start translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                   <h3 className="font-serif text-6xl mb-4 italic">Complexion</h3>
                   <p className="luxury-subtitle text-[10px] text-gold">The Foundation of Beauty</p>
                </div>
             </motion.div>
             
             {/* Smaller Bento Item */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2rem] border border-white/5"
             >
                <img src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span className="font-serif text-3xl italic">L’Art du Lèvre</span>
                </div>
             </motion.div>
             
             {/* Smaller Bento Item */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2rem] border border-white/5"
             >
                <img src="https://images.pexels.com/photos/3018845/pexels-photo-3018845.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span className="font-serif text-3xl italic">Aurea Eyes</span>
                </div>
             </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Scrolling Products */}
      <section id="products" className="py-40 bg-stone/30 relative">
        <div className="max-w-7xl mx-auto px-6 mb-24 flex justify-between items-end">
           <h2 className="font-serif text-5xl md:text-7xl font-light">Muses Choice</h2>
           <div className="flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all">←</button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all">→</button>
           </div>
        </div>
        
        <div className="flex px-6 md:px-0 gap-8 overflow-x-auto pb-20 scrollbar-hide snap-x">
          {[
            { name: "Obsidian Serum", price: "$145", img: "https://images.pexels.com/photos/3321415/pexels-photo-3321415.jpeg?auto=compress&cs=tinysrgb&w=1200" },
            { name: "Gild Highlight", price: "$82", img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Cream Blush", price: "$56", img: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Serum Foundation", price: "$98", img: "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1600" }
          ].map((prod, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="flex-none w-[80vw] md:w-[400px] snap-center group"
             >
                <div className="aspect-[3/4] relative overflow-hidden rounded-[2.5rem] bg-charcoal border border-white/5 mb-8">
                   <img src={prod.img} className="w-full h-full object-cover filter contrast-[1.1] group-hover:scale-105 transition-transform duration-[1.5s]" />
                   <div className="absolute top-8 right-8 z-20">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveProduct(prod)} className="w-14 h-14 rounded-full glass flex items-center justify-center backdrop-blur-3xl hover:bg-gold transition-colors">
                         <ShoppingBag className="w-5 h-5 text-charcoal" />
                      </motion.button>
                   </div>
                </div>
                <div className="flex justify-between items-baseline px-4">
                   <h3 className="font-serif text-3xl italic">{prod.name}</h3>
                   <span className="text-gold font-semibold">{prod.price}</span>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Massive Narrative Section */}
      <section className="py-60 bg-charcoal relative">
         <div className="max-w-7xl mx-auto px-6 overflow-hidden">
            <motion.h2 
               initial={{ x: "100%" }}
               whileInView={{ x: "-10%" }}
               transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               className="font-serif text-[12rem] whitespace-nowrap opacity-10 italic uppercase border-b border-gold/20 pb-4"
            >
               Skin is Poetry • Radiance is Art • Skin is Poetry • Radiance is Art
            </motion.h2>
            
            <div className="grid md:grid-cols-2 gap-24 items-center mt-32">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5 }}
                  className="rounded-[4rem] overflow-hidden aspect-square border border-white/10"
               >
                  <img src="https://images.pexels.com/photos/3321417/pexels-photo-3321417.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full h-full object-cover filter grayscale contrast-125 saturate-50" />
               </motion.div>
               <div className="flex flex-col gap-12">
                  <h3 className="font-serif text-6xl italic leading-tight">Glowing from <br/> <span className="text-gold">Within.</span></h3>
                  <p className="text-cream/60 text-xl leading-loose font-light">Inspired by the iridescent layers of high-fashion and the organic beauty of raw minerals, Aurea captures the fleeting moment where light meets skin.</p>
                  <button className="w-fit border-b-2 border-gold/30 pb-2 text-gold tracking-widest uppercase text-xs font-semibold hover:border-gold transition-all">Explore Heritage</button>
               </div>
            </div>
         </div>
      </section>

      {/* Modern Newsletter Gilded Card */}
      <section className="py-40 bg-stone/20 relative px-6">
         <motion.div 
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-5xl mx-auto rounded-[4rem] bg-charcoal border border-gold/10 p-16 md:p-32 flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-luxury-glow opacity-30 pointer-events-none"></div>
            <p className="luxury-subtitle text-[10px] text-gold mb-12">Early Access</p>
            <h2 className="font-serif text-5xl md:text-8xl italic mb-12 leading-none">Join the Curation</h2>
            <form className="w-full max-w-xl flex flex-col md:flex-row gap-4 relative z-10">
               <input type="email" placeholder="YOUR EMAIL ADDRESS" className="flex-1 bg-white/5 border border-white/10 rounded-full px-8 py-5 text-sm outline-none focus:border-gold transition-colors" />
               <button className="bg-gold text-charcoal px-12 py-5 rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-goldMuted transition-colors">Invoke Vault</button>
            </form>
         </motion.div>
      </section>

      {/* Gilded Minimal Footer */}
      <footer className="bg-charcoal text-cream pt-40 pb-20 px-8 border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[clamp(4rem,20vw,25rem)] opacity-[0.03] leading-none mb-[-5vw] tracking-tighter">AUREA</h2>
            
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-16 py-32 border-b border-white/5 relative z-10">
               <div className="flex flex-col gap-8">
                  <span className="luxury-subtitle text-gold">Shop</span>
                  <div className="flex flex-col gap-4 text-cream/40 text-xs">
                     <a href="#">Complexion</a>
                     <a href="#">Lèvres</a>
                     <a href="#">Essentials</a>
                  </div>
               </div>
               <div className="flex flex-col gap-8">
                  <span className="luxury-subtitle text-gold">Muses</span>
                  <div className="flex flex-col gap-4 text-cream/40 text-xs">
                     <a href="#">Gallery</a>
                     <a href="#">Collective</a>
                     <a href="#">Journal</a>
                  </div>
               </div>
               <div className="flex flex-col gap-8 col-span-2 md:text-right">
                  <span className="luxury-subtitle text-cream/30">Connect</span>
                  <p className="text-cream/50 text-xs max-w-xs ml-auto md:ml-auto md:mr-0">Follow our curation of light and texture across the digital ritual.</p>
                  <div className="flex gap-4 justify-start md:justify-end">
                     <svg className="w-5 h-5 text-gold/50 cursor-pointer hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </div>
               </div>
            </div>
            
            <div className="w-full flex justify-between pt-12 items-center text-cream/20 text-[8px] tracking-[0.4em] uppercase">
               <p>© 2026 Aurea Curation</p>
               <p>The Aesthetics of Silence</p>
               <p>D’Art & Beauté</p>
            </div>
         </div>
      </footer>

      {/* Interaction Modal */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-6 glass-dark backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-charcoal border border-gold/10 rounded-[3rem] p-12 max-w-2xl w-full flex flex-col items-center text-center">
               <img src={activeProduct.img} className="w-48 h-48 object-cover rounded-full mb-12 border-2 border-gold/20" />
               <h2 className="font-serif text-5xl italic mb-4">{activeProduct.name}</h2>
               <p className="text-gold mb-8">{activeProduct.price}</p>
               <p className="text-cream/50 mb-12 font-light">An obsidian-infused ritual for the modern complexion. Delivering an air-glass finish that mimics the physics of light on organic skin.</p>
               <div className="flex gap-4 w-full">
                  <button onClick={() => setActiveProduct(null)} className="flex-1 border border-white/10 rounded-full py-5 uppercase text-[10px] tracking-widest font-bold">Return</button>
                  <button className="flex-1 bg-gold text-charcoal rounded-full py-5 uppercase text-[10px] tracking-widest font-bold">Add to Curation</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
