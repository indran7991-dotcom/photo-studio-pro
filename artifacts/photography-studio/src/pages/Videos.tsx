import { useState } from "react";
import { Layout } from "@/components/Layout";
import { FadeIn } from "@/components/ui";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const videos = [
  { id: 1, title: "The Santorini Wedding", thumb: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 2, title: "Vogue Editorial NYC", thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
  { id: 3, title: "Aston Martin Campaign", thumb: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80", embed: "https://www.youtube.com/embed/dQw4w9WgXcQ" },
];

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <Layout>
      <div className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <FadeIn>
          <h1 className="text-5xl md:text-6xl font-display text-center mb-6 text-white">Cinematic Films</h1>
          <p className="text-center text-foreground/60 max-w-2xl mx-auto mb-16 font-sans">
            Moving images that tell a profound story. Experience our video production work.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, i) => (
            <FadeIn key={vid.id} delay={i * 0.1}>
              <div 
                className="group relative cursor-pointer rounded-sm overflow-hidden border border-white/10"
                onClick={() => setActiveVideo(vid.embed)}
              >
                <div className="aspect-video relative">
                  <img src={vid.thumb} alt={vid.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80" />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
                      <Play fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-card">
                  <h3 className="text-xl font-display text-white">{vid.title}</h3>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-primary transition-colors z-10"
              onClick={() => setActiveVideo(null)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-lg overflow-hidden border border-white/10 shadow-2xl"
            >
              <iframe 
                src={activeVideo} 
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
