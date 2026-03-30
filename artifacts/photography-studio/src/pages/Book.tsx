import { useState } from "react";
import { useLocation } from "wouter";
import { Layout } from "@/components/Layout";
import { FadeIn, Input, Textarea, Button, Label } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetPackages, useCreateBooking } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/utils";
import { Check } from "lucide-react";

const bookingSchema = z.object({
  customerName: z.string().min(2, "Name required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(7, "Phone required"),
  packageId: z.number().min(1, "Select a package"),
  eventDate: z.string().min(1, "Date required"),
  eventType: z.string().min(1, "Event type required"),
  location: z.string().min(1, "Location required"),
  notes: z.string().optional(),
});

export default function Book() {
  const [, setLocation] = useLocation();
  const { data: packages, isLoading: loadingPackages } = useGetPackages();
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);

  const form = useForm<z.infer<typeof bookingSchema>>({
    resolver: zodResolver(bookingSchema),
  });

  const createMutation = useCreateBooking({
    mutation: {
      onSuccess: (data) => {
        setLocation(`/booking-confirmation/${data.id}`);
      }
    }
  });

  const onSubmit = (data: z.infer<typeof bookingSchema>) => {
    createMutation.mutate({ data });
  };

  return (
    <Layout>
      <div className="pt-32 pb-24 container mx-auto px-4 md:px-8 max-w-6xl">
        <FadeIn>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-display text-white mb-4">Secure Your Session</h1>
            <p className="text-foreground/70 font-sans max-w-2xl mx-auto">Select a curated package below and provide your event details to initiate the booking process.</p>
          </div>
        </FadeIn>

        {/* Package Selection */}
        <div className="mb-20">
          <FadeIn delay={0.1}>
            <h3 className="text-2xl font-display text-primary mb-8 text-center">1. Select a Collection</h3>
            {loadingPackages ? (
              <div className="flex justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {packages?.map((pkg) => (
                  <div 
                    key={pkg.id}
                    onClick={() => {
                      setSelectedPackage(pkg.id);
                      form.setValue("packageId", pkg.id);
                    }}
                    className={`cursor-pointer transition-all duration-300 rounded-sm border p-8 flex flex-col ${
                      selectedPackage === pkg.id 
                        ? "glass-gold scale-105 z-10" 
                        : "bg-card border-white/5 hover:border-primary/50"
                    }`}
                  >
                    {pkg.popular && (
                      <span className="bg-primary text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 self-start mb-4 rounded-full">
                        Most Requested
                      </span>
                    )}
                    <h4 className="text-2xl font-display text-white mb-2">{pkg.name}</h4>
                    <p className="text-3xl font-display text-primary mb-6">{formatCurrency(pkg.price)}</p>
                    <p className="text-sm text-foreground/60 mb-6">{pkg.description}</p>
                    
                    <ul className="space-y-3 mb-8 flex-1">
                      {pkg.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-sm text-foreground/80">
                          <Check size={16} className="text-primary mr-3 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="text-xs uppercase tracking-widest text-foreground/50 border-t border-white/10 pt-4 text-center">
                      Duration: {pkg.duration}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {form.formState.errors.packageId && (
              <p className="text-red-400 text-center mt-4">Please select a package to continue.</p>
            )}
          </FadeIn>
        </div>

        {/* Booking Form */}
        <FadeIn delay={0.2}>
          <div className="max-w-3xl mx-auto glass p-8 md:p-12 rounded-sm border-white/10">
            <h3 className="text-2xl font-display text-primary mb-8 text-center">2. Event Details</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Full Name</Label>
                  <Input {...form.register("customerName")} placeholder="Jane Doe" />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input type="email" {...form.register("customerEmail")} placeholder="jane@example.com" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Phone Number</Label>
                  <Input {...form.register("customerPhone")} placeholder="+1 234 567 8900" />
                </div>
                <div>
                  <Label>Event Date</Label>
                  <Input type="date" {...form.register("eventDate")} className="dark:[color-scheme:dark]" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Event Type</Label>
                  <select 
                    {...form.register("eventType")}
                    className="flex h-12 w-full rounded-sm border border-border bg-card/50 px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                  >
                    <option value="" disabled className="bg-card">Select Type</option>
                    <option value="wedding" className="bg-card">Wedding</option>
                    <option value="portrait" className="bg-card">Portrait Session</option>
                    <option value="commercial" className="bg-card">Commercial Shoot</option>
                    <option value="event" className="bg-card">Special Event</option>
                  </select>
                </div>
                <div>
                  <Label>Location / Venue</Label>
                  <Input {...form.register("location")} placeholder="Plaza Hotel, NYC" />
                </div>
              </div>

              <div>
                <Label>Additional Notes or Vision</Label>
                <Textarea {...form.register("notes")} placeholder="Tell us about the vibe, styling, or specific shots you want..." />
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full text-lg" 
                  isLoading={createMutation.isPending}
                  disabled={!selectedPackage}
                >
                  {createMutation.isPending ? "Processing..." : "Confirm Booking Request"}
                </Button>
                {!selectedPackage && <p className="text-center text-xs text-foreground/50 mt-3">Select a package above to enable booking</p>}
              </div>
            </form>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
}
