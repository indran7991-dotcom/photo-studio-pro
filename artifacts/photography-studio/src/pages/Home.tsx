import { Layout } from "@/components/Layout";
import { FadeIn, Button } from "@/components/ui";
import { Link } from "wouter";
import { useGetTestimonials } from "@workspace/api-client-react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronRight, Star } from "lucide-react";

const services = [
  { title: "Weddings", desc: "Cinematic storytelling of your most special day.", image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" },
  { title: "Portraits", desc: "Striking, editorial-style personal and professional portraits.", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80" },
  { title: "Commercial", desc: "High-end product and brand imagery.", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
];

export default function Home() {
  const { data: testimonials } = useGetTestimonials();
  const [emblaRef] = useEmblaCarousel({ loop: true });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Cinematic Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <FadeIn>
            <span className="text-primary tracking-[0.3em] text-sm md:text-base uppercase font-bold mb-6 block">
              Timeless & Cinematic
            </span>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white mb-8 leading-tight">
              ELEVATING <br />
              <span className="text-gradient-gold italic">THE ORDINARY</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.4}>
            <p className="text-foreground/70 text-lg md:text-xl font-sans font-light mb-12 max-w-2xl mx-auto">
              We capture moments with an editorial eye, creating art pieces from your memories.
            </p>
          </FadeIn>
          <FadeIn delay={0.6}>
            <Link href="/gallery">
              <Button size="lg" className="mr-4">View Portfolio</Button>
            </Link>
            <Link href="/book">
              <Button size="lg" variant="outline">Book Session</Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Services/Categories Grid */}
      <section className="py-32 bg-background container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display mb-4 text-white">Our Disciplines</h2>
            <div className="h-1 w-20 bg-primary mx-auto"></div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <FadeIn key={i} delay={i * 0.2}>
              <Link href="/gallery" className="group block relative h-[500px] overflow-hidden rounded-sm border border-white/5">
                {/* Unsplash abstract photography */}
                <img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <h3 className="text-3xl font-display text-primary mb-3">{service.title}</h3>
                  <p className="text-foreground/70 font-sans text-sm mb-6 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                    {service.desc}
                  </p>
                  <div className="flex items-center text-white text-xs tracking-widest uppercase font-bold group-hover:text-primary transition-colors">
                    Explore <ChevronRight size={16} className="ml-2" />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Featured Quote / Philosophy */}
      <section className="py-32 bg-card relative border-y border-white/5">
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <FadeIn>
            <svg className="w-12 h-12 text-primary/30 mx-auto mb-8" fill="currentColor" viewBox="0 0 32 32">
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm18 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
            </svg>
            <h2 className="text-3xl md:text-5xl font-display italic font-light leading-relaxed text-white">
              "Photography is the story I fail to put into words. It's about preserving the fleeting poetry of human existence."
            </h2>
            <p className="mt-8 text-primary tracking-widest uppercase text-sm font-bold">— Aurelia, Lead Photographer</p>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-32 bg-background container mx-auto px-4 md:px-8">
        <FadeIn>
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display mb-4 text-white">Client Stories</h2>
              <div className="h-1 w-20 bg-primary"></div>
            </div>
          </div>
        </FadeIn>

        {testimonials && testimonials.length > 0 ? (
          <FadeIn delay={0.2}>
            <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
              <div className="flex gap-6">
                {testimonials.map((t) => (
                  <div key={t.id} className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0 pl-6">
                    <div className="glass-gold p-8 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex text-primary mb-6">
                          {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                        </div>
                        <p className="text-foreground/80 font-sans italic mb-8 leading-relaxed">"{t.content}"</p>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-lg">{t.clientName}</h4>
                        <p className="text-primary text-xs uppercase tracking-widest mt-1">{t.clientTitle}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        ) : (
          <div className="text-center text-foreground/50 py-12 border border-white/5 rounded-sm">
            More stories coming soon.
          </div>
        )}
      </section>
    </Layout>
  );
}
