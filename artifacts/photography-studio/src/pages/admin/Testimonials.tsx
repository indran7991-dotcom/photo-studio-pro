import { useState } from "react";
import { AdminLayout } from "./Layout";
import { useGetTestimonials, useCreateTestimonial, getGetTestimonialsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Textarea, Button, Label } from "@/components/ui";
import { Star } from "lucide-react";

const testSchema = z.object({
  clientName: z.string().min(2),
  clientTitle: z.string().min(2),
  rating: z.coerce.number().min(1).max(5),
  content: z.string().min(10),
  published: z.boolean().default(true)
});

export default function AdminTestimonials() {
  const [isAdding, setIsAdding] = useState(false);
  const { data: testimonials, isLoading } = useGetTestimonials();
  const queryClient = useQueryClient();
  
  const form = useForm<z.infer<typeof testSchema>>({
    resolver: zodResolver(testSchema),
    defaultValues: { rating: 5, published: true }
  });

  const createMutation = useCreateTestimonial({
    mutation: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: getGetTestimonialsQueryKey() });
        setIsAdding(false);
        form.reset();
      }
    }
  });

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display text-white">Testimonials</h1>
        <Button onClick={() => setIsAdding(!isAdding)}>
          {isAdding ? 'Cancel' : 'Add New'}
        </Button>
      </div>

      {isAdding && (
        <div className="bg-card border border-white/5 p-6 rounded-sm mb-8">
          <h2 className="text-xl font-display text-primary mb-6">Create Testimonial</h2>
          <form onSubmit={form.handleSubmit((d) => createMutation.mutate({ data: d }))} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Client Name</Label>
                <Input {...form.register("clientName")} />
              </div>
              <div>
                <Label>Title/Event (e.g. Vogue Bride)</Label>
                <Input {...form.register("clientTitle")} />
              </div>
            </div>
            <div>
              <Label>Rating (1-5)</Label>
              <Input type="number" {...form.register("rating")} />
            </div>
            <div>
              <Label>Quote</Label>
              <Textarea {...form.register("content")} />
            </div>
            <Button type="submit" isLoading={createMutation.isPending}>Save Testimonial</Button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLoading ? (
          <div className="text-white">Loading...</div>
        ) : testimonials?.map((t) => (
          <div key={t.id} className="bg-card border border-white/5 p-6 rounded-sm">
            <div className="flex text-primary mb-3">
              {[...Array(t.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            </div>
            <p className="text-foreground/80 italic mb-4">"{t.content}"</p>
            <div className="flex justify-between items-end border-t border-white/5 pt-4 mt-4">
              <div>
                <h4 className="font-bold text-white">{t.clientName}</h4>
                <p className="text-xs text-primary uppercase">{t.clientTitle}</p>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-sm ${t.published ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {t.published ? 'Published' : 'Draft'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
