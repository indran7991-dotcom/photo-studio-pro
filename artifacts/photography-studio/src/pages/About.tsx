import { Layout } from "@/components/Layout";
import { FadeIn, Input, Textarea, Button, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export default function About() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
  });

  const submitMutation = useSubmitContact({
    mutation: {
      onSuccess: () => {
        toast({ title: "Message Sent", description: "We will get back to you shortly." });
        form.reset();
      },
      onError: () => {
        toast({ title: "Error", description: "Failed to send message.", type: "error" });
      }
    }
  });

  const onSubmit = (data: z.infer<typeof contactSchema>) => {
    submitMutation.mutate({ data });
  };

  return (
    <Layout>
      {/* Bio Section */}
      <section className="pt-32 pb-20 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <div className="absolute -inset-4 border border-primary/30 rounded-sm translate-x-4 translate-y-4 -z-10"></div>
              {/* Unsplash photographer image */}
              <img 
                src="https://pixabay.com/get/gce4447f8de6cfd47c6941e6470c7d9bb6991abebee85d9c90a032b3a76fd06b0bc4f320bb70ac28786120a0d0f082adf_1280.jpg" 
                alt="Aurelia - Lead Photographer" 
                className="w-full object-cover rounded-sm aspect-[3/4]"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h1 className="text-5xl font-display mb-6 text-white">The Artist Behind the Lens</h1>
            <h3 className="text-xl text-primary font-sans uppercase tracking-widest mb-8">Aurelia Vance</h3>
            <div className="space-y-6 text-foreground/70 font-sans leading-relaxed">
              <p>
                With over a decade of experience in fashion capitals around the world, I approach photography not just as a service, but as an art form. My signature style blends editorial chic with raw, authentic emotion.
              </p>
              <p>
                Every face has a story, every event a unique rhythm. I seek the quiet moments in between the loud ones, crafting imagery that feels both monumental and intensely intimate.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12 pt-12 border-t border-white/10">
              <div>
                <h4 className="text-4xl font-display text-white mb-2">15+</h4>
                <p className="text-sm text-primary tracking-widest uppercase">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-display text-white mb-2">300+</h4>
                <p className="text-sm text-primary tracking-widest uppercase">Global Clients</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact & Location */}
      <section className="py-24 bg-card border-t border-white/5">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeIn>
            <h2 className="text-4xl font-display mb-8 text-white">Inquire</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Name</Label>
                  <Input {...form.register("name")} placeholder="Jane Doe" />
                  {form.formState.errors.name && <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>}
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" {...form.register("email")} placeholder="jane@example.com" />
                  {form.formState.errors.email && <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <Label>Phone (Optional)</Label>
                  <Input {...form.register("phone")} placeholder="+1 234 567 890" />
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input {...form.register("subject")} placeholder="Wedding Inquiry" />
                  {form.formState.errors.subject && <p className="text-red-400 text-xs mt-1">{form.formState.errors.subject.message}</p>}
                </div>
              </div>
              <div>
                <Label>Message</Label>
                <Textarea {...form.register("message")} placeholder="Tell us about your project..." />
                {form.formState.errors.message && <p className="text-red-400 text-xs mt-1">{form.formState.errors.message.message}</p>}
              </div>
              <Button type="submit" size="lg" className="w-full" isLoading={submitMutation.isPending}>
                Send Message
              </Button>
            </form>
          </FadeIn>

          <FadeIn delay={0.2} className="h-full min-h-[400px]">
            <h2 className="text-4xl font-display mb-8 text-white">Studio</h2>
            <div className="w-full h-[calc(100%-4rem)] rounded-sm overflow-hidden border border-white/10 grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-700">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.2386348630327!2d-73.99351052349774!3d40.73479633621932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a22f733199%3A0xc3f60cb7557aeb!2s125%205th%20Ave%2C%20New%20York%2C%20NY%2010003!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </FadeIn>
        </div>
      </section>
    </Layout>
  );
}
