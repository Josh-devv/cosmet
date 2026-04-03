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
    <main className="w-full relative bg-charcoal text-cream font-sans selection:bg-gold selection:text-charcoal leading-relaxed overflow-x-hidden">
      
      {/* Aurora Shadows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[100vw] md:w-[60vw] h-[100vw] md:h-[60vw] bg-gold/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[80vw] md:w-[50vw] h-[80vw] md:h-[50vw] bg-gold/5 rounded-full blur-[100px]"></div>
      </div>

      {/* Floating Smart Nav - Responsive */}
      <nav className={`fixed top-0 left-0 w-full z-[150] transition-all duration-500 ${isScrolled ? 'bg-charcoal/80 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="hidden md:flex gap-10 text-[10px] tracking-[0.3em] uppercase font-semibold">
            <a href="#hero" className="hover:text-gold transition-colors">Intro</a>
            <a href="#discover" className="hover:text-gold transition-colors">Curation</a>
            <a href="#products" className="hover:text-gold transition-colors">Shop</a>
          </div>

          <div className="text-2xl md:text-3xl font-serif lowercase tracking-normal italic">aurea.</div>

          <div className="flex items-center gap-6">
             <div className="relative group cursor-pointer">
                <ShoppingBag className="w-5 h-5 group-hover:text-gold transition-colors" />
                <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-[8px] w-4 h-4 flex items-center justify-center rounded-full font-bold">3</span>
             </div>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden w-8 h-8 flex flex-col justify-center gap-1.5 p-1 group">
                <div className={`h-[1px] bg-cream transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-[3.5px]' : 'w-6'}`}></div>
                <div className={`h-[1px] bg-cream transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></div>
                <div className={`h-[1px] bg-cream transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-[8.5px]' : 'w-6'}`}></div>
             </button>
          </div>
        </div>
        
        {/* Fullscreen Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 h-screen bg-charcoal z-[200] p-12 flex flex-col justify-center items-center text-center gap-12"
            >
               <button onClick={() => setIsMenuOpen(false)} className="absolute top-10 right-10 text-cream/40 text-xs tracking-widest">[ CLOSE ]</button>
               <div className="flex flex-col gap-8">
                  <a href="#hero" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl italic hover:text-gold">Home</a>
                  <a href="#discover" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl italic hover:text-gold">Archives</a>
                  <a href="#products" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl italic hover:text-gold">Curation</a>
                  <a href="#" onClick={() => setIsMenuOpen(false)} className="font-serif text-5xl italic hover:text-gold">Account</a>
               </div>
               <div className="mt-20 luxury-subtitle text-[8px] text-gold">A Aesthetics of Silence</div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Extreme Luxury Hero Section */}
      <section id="hero" className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-[120%]"
          style={{ scale: heroImageScale }}
        >
          <img 
            src="https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Hero Visual" 
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1] saturate-50"
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-charcoal"></div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
             className="text-center"
          >
             <h1 className="font-serif text-[clamp(2.5rem,10vw,16rem)] leading-[0.9] mb-8 md:mb-12 flex flex-col italic font-light tracking-tighter">
                <span>The Art</span>
                <span className="text-gold -mt-[1vw] md:-mt-[2vw] pl-[5vw]">of Glow.</span>
             </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="luxury-subtitle text-[8px] md:text-xs text-cream/40 mb-10 md:mb-12 text-center px-4"
          >
            A Boutique Journey Through Light & Shadow
          </motion.p>
          
          <motion.div 
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.2, duration: 1.5 }}
            className="w-24 md:w-32 h-[1px] bg-gold/50"
          />
        </div>
      </section>

      {/* Bento Grid Discovery */}
      <section id="discover" className="py-24 md:py-40 bg-charcoal relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10"
          >
            <h2 className="font-serif text-6xl md:text-[8rem] leading-none font-light italic">Archives</h2>
            <p className="max-w-md text-cream/50 font-light text-base md:text-lg leading-relaxed">Curating the world's most sophisticated ingredients to deliver a visual symphony of skin artistry.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-4 h-auto md:h-[110vh]">
             {/* Large Bento Item */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="md:col-span-8 md:row-span-2 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 aspect-[4/5] md:aspect-auto h-[400px] md:h-auto"
             >
                <img src="https://images.pexels.com/photos/3321415/pexels-photo-3321415.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110 filter saturate-0 group-hover:saturate-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/10 to-transparent p-10 md:p-12 flex flex-col justify-end items-start md:translate-y-10 md:group-hover:translate-y-0 transition-transform duration-700">
                   <h3 className="font-serif text-5xl md:text-7xl mb-4 italic">Complexion</h3>
                   <p className="luxury-subtitle text-[8px] md:text-[10px] text-gold">The Foundation of Art</p>
                </div>
             </motion.div>
             
             
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 h-[300px] md:h-auto"
             >
                <img src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800" className="w-full h-full object-cover filter brightness-75 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                   <span className="font-serif text-3xl italic">L’Art du Lèvre</span>
                </div>
             </motion.div>
             
             {/* Smaller Bento Item */}
             <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="md:col-span-4 md:row-span-1 relative group overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 h-[300px] md:h-auto"
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
      <section id="products" className="py-24 md:py-40 bg-stone/20 relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 flex justify-between items-end">
           <h2 className="font-serif text-5xl md:text-8xl font-light">The Curation</h2>
           <div className="hidden md:flex gap-4">
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all font-light">←</button>
              <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-gold hover:text-charcoal transition-all font-light">→</button>
           </div>
        </div>
        
        <div className="flex px-6 gap-8 overflow-x-auto pb-12 scrollbar-hide snap-x no-scrollbar">
          {[
            { name: "Obsidian Serum", price: "$145", img: "https://images.pexels.com/photos/3321415/pexels-photo-3321415.jpeg?auto=compress&cs=tinysrgb&w=1200" },
            { name: "Gild Highlight", price: "$82", img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Cream Blush", price: "$56", img: "https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Serum Foundation", price: "$98", img: "https://images.pexels.com/photos/3321416/pexels-photo-3321416.jpeg?auto=compress&cs=tinysrgb&w=1600" }
          ].map((prod, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 40 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="flex-none w-[85vw] sm:w-[400px] md:w-[450px] snap-center group"
             >
                <div className="aspect-[3/4] relative overflow-hidden rounded-[2.5rem] md:rounded-[3.5rem] bg-charcoal border border-white/5 mb-8">
                   <img src={prod.img} className="w-full h-full object-cover filter contrast-[1.05] group-hover:scale-105 transition-transform duration-[1.5s]" />
                   <div className="absolute top-6 md:top-10 right-6 md:right-10 z-20">
                      <motion.button 
                        whileTap={{ scale: 0.9 }} 
                        onClick={() => setActiveProduct(prod)} 
                        className="w-12 h-12 md:w-16 md:h-16 rounded-full glass-dark flex items-center justify-center backdrop-blur-3xl hover:bg-gold transition-colors"
                      >
                         <ShoppingBag className="w-5 h-5 text-cream group-hover:text-charcoal transition-colors" />
                      </motion.button>
                   </div>
                </div>
                <div className="flex justify-between items-baseline px-4">
                   <h3 className="font-serif text-3xl md:text-4xl italic">{prod.name}</h3>
                   <span className="text-gold font-semibold text-lg">{prod.price}</span>
                </div>
             </motion.div>
          ))}
        </div>
      </section>

      {/* Massive Narrative Section */}
      <section className="py-32 md:py-60 bg-charcoal relative overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="relative -mx-6 mb-16 md:mb-32">
               <motion.div 
                  initial={{ x: "0%" }}
                  animate={{ x: "-50%" }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="flex whitespace-nowrap"
               >
                  <span className="font-serif text-5xl md:text-[8rem] opacity-[0.03] italic uppercase pr-10 tracking-widest">Skin is Poetry • Radiance is Art •&nbsp;</span>
                  <span className="font-serif text-5xl md:text-[8rem] opacity-[0.03] italic uppercase pr-10 tracking-widest">Skin is Poetry • Radiance is Art •&nbsp;</span>
               </motion.div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-16 md:gap-32 items-center">
               <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                  className="rounded-[3rem] md:rounded-[4rem] overflow-hidden aspect-square border border-white/5 order-2 md:order-1"
               >
                  <img src="https://images.pexels.com/photos/3321417/pexels-photo-3321417.jpeg?auto=compress&cs=tinysrgb&w=1200" className="w-full h-full object-cover filter grayscale contrast-125 saturate-50" />
               </motion.div>
               <div className="flex flex-col gap-8 md:gap-12 order-1 md:order-2">
                  <h3 className="font-serif text-5xl md:text-7xl italic leading-tight">Glow from <br/> <span className="text-gold">Inside.</span></h3>
                  <p className="text-cream/50 text-lg md:text-xl leading-relaxed font-light">Inspired by the iridescent layers of high-fashion and the organic beauty of raw minerals, Aurea captures the fleeting moment where light meets skin.</p>
                  <button className="w-fit border-b-2 border-gold/20 pb-2 text-gold tracking-widest uppercase text-[10px] font-semibold hover:border-gold transition-all">Heritage Archive</button>
               </div>
            </div>
         </div>
      </section>

    
      <section className="py-24 md:py-40 bg-stone/50 relative px-6">
         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-5xl mx-auto rounded-[3rem] md:rounded-[5rem] bg-charcoal border border-gold/5 p-12 md:p-32 flex flex-col items-center text-center relative overflow-hidden"
         >
            <div className="absolute inset-0 bg-luxury-glow opacity-30 pointer-events-none"></div>
            <p className="luxury-subtitle text-[8px] md:text-[10px] text-gold mb-10">Secret Society</p>
            <h2 className="font-serif text-5xl md:text-[7rem] italic mb-10 md:mb-16 leading-[0.9]">The Invocation</h2>
            <form className="w-full max-w-xl flex flex-col md:flex-row gap-6 relative z-10">
               <input type="email" placeholder="ENCRYPTED EMAIL ADDRESS" className="flex-1 bg-white/[0.03] border border-white/5 rounded-full px-10 py-6 text-sm outline-none focus:border-gold/50 transition-colors placeholder:text-cream/20" />
               <button className="bg-gold text-charcoal px-14 py-6 rounded-full font-bold uppercase text-[11px] tracking-widest hover:brightness-110 transition-all shadow-2xl">Access Vault</button>
            </form>
         </motion.div>
      </section>

      {/* Gilded Minimal Footer */}
      <footer className="bg-charcoal text-cream pt-24 md:pt-40 pb-16 px-8 border-t border-white/5">
         <div className="max-w-7xl mx-auto flex flex-col items-center">
            <h2 className="font-serif text-[clamp(4rem,15vw,20rem)] opacity-[0.02] leading-none mb-[-3vw] tracking-tighter">AUREA.</h2>
            
            <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-y-20 gap-x-12 py-24 md:py-32 border-b border-white/5 relative z-10">
               <div className="flex flex-col gap-8">
                  <span className="luxury-subtitle text-[10px] text-gold">Shop</span>
                  <div className="flex flex-col gap-6 text-cream/30 text-xs tracking-wider">
                     <a href="#" className="hover:text-gold transition-colors">Complexion</a>
                     <a href="#" className="hover:text-gold transition-colors">Lèvres</a>
                     <a href="#" className="hover:text-gold transition-colors">Essentials</a>
                  </div>
               </div>
               <div className="flex flex-col gap-8">
                  <span className="luxury-subtitle text-[10px] text-gold">Muses</span>
                  <div className="flex flex-col gap-6 text-cream/30 text-xs tracking-wider">
                     <a href="#" className="hover:text-gold transition-colors">Gallery</a>
                     <a href="#" className="hover:text-gold transition-colors">Collective</a>
                     <a href="#" className="hover:text-gold transition-colors">Journal</a>
                  </div>
               </div>
               <div className="flex flex-col gap-8 col-span-2 md:text-right">
                  <span className="luxury-subtitle text-[10px] text-white/20">The Aesthetic of Silence</span>
                  <p className="text-cream/40 text-sm max-w-xs md:ml-auto leading-relaxed">Follow our curation of light and texture across the digital ritual.</p>
                  <div className="flex gap-6 justify-start md:justify-end mt-4">
                     <svg className="w-5 h-5 text-gold/30 cursor-pointer hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  </div>
               </div>
            </div>
            
            <div className="w-full flex flex-col md:flex-row justify-between pt-12 items-center gap-8 text-[8px] tracking-[0.4em] uppercase text-white/10 font-medium">
               <p>© 2026 Aurea Curation — London</p>
               <p className="hidden md:block">D’Art & Beauté Moderniste</p>
               <p>All Rights Preserved</p>
            </div>
         </div>
      </footer>

      {/* Interaction Modal */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] flex items-center justify-center p-4 glass-dark backdrop-blur-2xl">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-charcoal border border-gold/10 rounded-[3rem] p-10 md:p-14 max-w-2xl w-full flex flex-col items-center text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
               <div className="w-40 h-40 md:w-56 md:h-56 relative mb-10">
                  <img src={activeProduct.img} className="w-full h-full object-cover rounded-full border-2 border-gold/10" />
                  <div className="absolute inset-0 rounded-full bg-gold/5 blur-xl"></div>
               </div>
               <h2 className="font-serif text-4xl md:text-6xl italic mb-4">{activeProduct.name}</h2>
               <p className="text-gold text-lg md:text-xl font-medium mb-10">{activeProduct.price}</p>
               <p className="text-cream/50 mb-12 font-light text-sm md:text-base leading-relaxed">An obsidian-infused ritual for the modern complexion. Delivering an air-glass finish that mimics the physics of light on organic skin texture.</p>
               <div className="flex flex-col sm:flex-row gap-4 w-full">
                  <button onClick={() => setActiveProduct(null)} className="flex-1 border border-white/5 rounded-full py-5 uppercase text-[10px] tracking-widest font-bold">Close</button>
                  <button className="flex-1 bg-gold text-charcoal rounded-full py-5 uppercase text-[10px] tracking-widest font-bold hover:brightness-110">Invoke Ritual</button>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
