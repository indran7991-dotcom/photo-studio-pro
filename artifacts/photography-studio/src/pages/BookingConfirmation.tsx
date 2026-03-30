import { useRoute } from "wouter";
import { Layout } from "@/components/Layout";
import { FadeIn, Button } from "@/components/ui";
import { useGetBookingById } from "@workspace/api-client-react";
import { formatCurrency } from "@/lib/utils";
import { format } from "date-fns";
import { Download, CheckCircle } from "lucide-react";

export default function BookingConfirmation() {
  const [, params] = useRoute("/booking-confirmation/:id");
  const id = parseInt(params?.id || "0");
  
  const { data: booking, isLoading, isError } = useGetBookingById(id, { query: { enabled: id > 0 } });

  if (isLoading) {
    return (
      <Layout>
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin w-12 h-12 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      </Layout>
    );
  }

  if (isError || !booking) {
    return (
      <Layout>
        <div className="h-screen flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-3xl font-display text-destructive mb-4">Booking Not Found</h1>
          <p className="text-foreground/70">We couldn't locate this booking reference.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="pt-32 pb-20 container mx-auto px-4 flex justify-center">
        <FadeIn className="w-full max-w-3xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl font-display text-white mb-4">Booking Received</h1>
            <p className="text-foreground/70 font-sans">
              Thank you, {booking.customerName}. Your request has been logged. Our studio manager will reach out shortly to finalize details.
            </p>
          </div>

          {/* Invoice / Bill Style Display */}
          <div className="bg-[#111] border border-white/10 rounded-sm p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Decorative background logo */}
            <div className="absolute -right-20 -top-20 opacity-5 pointer-events-none">
              <img src={`${import.meta.env.BASE_URL}images/logo-mark.png`} alt="" className="w-96 h-96 grayscale" />
            </div>

            <div className="flex justify-between items-start mb-12 border-b border-white/10 pb-8 relative z-10">
              <div>
                <h2 className="text-2xl font-display text-primary tracking-widest uppercase mb-1">AURELIA</h2>
                <p className="text-xs text-foreground/50 tracking-widest">STUDIOS NEW YORK</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-foreground/50 uppercase tracking-widest mb-1">Invoice / Ref No.</p>
                <p className="font-mono text-lg text-white">{booking.invoiceNumber}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-primary/20 text-primary text-xs font-bold uppercase tracking-widest rounded-sm">
                  {booking.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-12 text-sm relative z-10">
              <div>
                <p className="text-foreground/50 uppercase tracking-widest mb-2 text-xs">Billed To:</p>
                <p className="text-white font-medium">{booking.customerName}</p>
                <p className="text-foreground/80">{booking.customerEmail}</p>
                <p className="text-foreground/80">{booking.customerPhone}</p>
              </div>
              <div>
                <p className="text-foreground/50 uppercase tracking-widest mb-2 text-xs">Event Details:</p>
                <p className="text-white capitalize">{booking.eventType}</p>
                <p className="text-foreground/80">{format(new Date(booking.eventDate), 'MMMM do, yyyy')}</p>
                <p className="text-foreground/80">{booking.location}</p>
              </div>
            </div>

            <table className="w-full text-left mb-12 relative z-10">
              <thead className="border-y border-white/10 text-xs uppercase tracking-widest text-foreground/50">
                <tr>
                  <th className="py-4 font-normal">Description</th>
                  <th className="py-4 font-normal text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="text-sm border-b border-white/10">
                <tr>
                  <td className="py-6 text-white font-medium">
                    {booking.packageName} Collection
                  </td>
                  <td className="py-6 text-white text-right">
                    {formatCurrency(booking.packagePrice)}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex justify-end relative z-10">
              <div className="w-64">
                <div className="flex justify-between text-sm mb-3 text-foreground/70">
                  <span>Subtotal</span>
                  <span>{formatCurrency(booking.packagePrice)}</span>
                </div>
                <div className="flex justify-between text-sm mb-3 text-foreground/70">
                  <span>Tax (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-lg font-display text-primary border-t border-white/10 pt-3 mt-3">
                  <span>Total Due</span>
                  <span>{formatCurrency(booking.packagePrice)}</span>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <Button variant="outline" className="text-xs uppercase tracking-widest" onClick={() => window.print()}>
                <Download size={16} className="mr-2" /> Download PDF
              </Button>
            </div>
          </div>
        </FadeIn>
      </div>
    </Layout>
  );
}
