import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Portrait", "Wedding", "Events", "Commercial"];

// Unsplash placeholder images
const photos = [
  { id: 1, src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", category: "Portrait", aspect: "aspect-[3/4]" },
  { id: 2, src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", category: "Wedding", aspect: "aspect-[4/3]" },
  { id: 3, src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80", category: "Events", aspect: "aspect-[1/1]" },
  { id: 4, src: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=800&q=80", category: "Portrait", aspect: "aspect-[4/5]" },
  { id: 5, src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", category: "Commercial", aspect: "aspect-[16/9]" },
  { id: 6, src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", category: "Wedding", aspect: "aspect-[3/4]" },
  { id: 7, src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80", category: "Events", aspect: "aspect-[3/2]" },
  { id: 8, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", category: "Commercial", aspect: "aspect-[4/5]" },
];

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const filteredPhotos = activeTab === "All" 
    ? photos 
    : photos.filter(p => p.category === activeTab);

  return (
    <Layout>
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-display text-center mb-12 text-white">Portfolio</h1>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2 rounded-full text-sm font-sans tracking-widest uppercase transition-all duration-300 ${
                  activeTab === cat 
                    ? "bg-primary text-black font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]" 
                    : "border border-white/20 text-foreground/70 hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Masonry-style Grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <AnimatePresence>
            {filteredPhotos.map((photo) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={photo.id}
                className="relative group overflow-hidden break-inside-avoid rounded-sm border border-white/5"
                onClick={() => setLightboxImg(photo.src)}
              >
                <div className={photo.aspect}>
                  <img 
                    src={photo.src} 
                    alt={photo.category} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                  <ZoomIn className="text-primary w-10 h-10" />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxImg(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-primary transition-colors"
              onClick={() => setLightboxImg(null)}
            >
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              src={lightboxImg} 
              alt="Expanded" 
              className="max-w-full max-h-[90vh] object-contain shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
