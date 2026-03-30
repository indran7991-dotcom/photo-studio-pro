import { AdminLayout } from "./Layout";
import { useGetBookings, useUpdateBookingStatus } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { getGetBookingsQueryKey } from "@workspace/api-client-react";

export default function AdminBookings() {
  const { data: bookings, isLoading } = useGetBookings();
  const queryClient = useQueryClient();
  const updateMutation = useUpdateBookingStatus({
    mutation: {
      onSuccess: () => queryClient.invalidateQueries({ queryKey: getGetBookingsQueryKey() })
    }
  });

  const handleStatusChange = (id: number, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    updateMutation.mutate({ id, data: { status } });
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display text-white">Manage Bookings</h1>
      </div>

      <div className="bg-card border border-white/5 rounded-sm overflow-hidden">
        <table className="w-full text-left text-sm text-foreground/80">
          <thead className="bg-white/5 text-xs uppercase tracking-widest text-foreground/50 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 font-normal">Inv #</th>
              <th className="px-6 py-4 font-normal">Client</th>
              <th className="px-6 py-4 font-normal">Date & Type</th>
              <th className="px-6 py-4 font-normal">Package</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
            ) : bookings?.map((b) => (
              <tr key={b.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-mono text-white">{b.invoiceNumber}</td>
                <td className="px-6 py-4">
                  <p className="text-white font-medium">{b.customerName}</p>
                  <p className="text-xs text-foreground/50">{b.customerEmail}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{format(new Date(b.eventDate), 'MMM d, yyyy')}</p>
                  <p className="text-xs text-foreground/50 capitalize">{b.eventType}</p>
                </td>
                <td className="px-6 py-4">
                  <p>{b.packageName}</p>
                  <p className="text-xs text-primary">{formatCurrency(b.packagePrice)}</p>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm ${
                    b.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                    b.status === 'pending' ? 'bg-amber-500/20 text-amber-400' :
                    b.status === 'completed' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {b.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <select 
                    value={b.status}
                    onChange={(e) => handleStatusChange(b.id, e.target.value as any)}
                    disabled={updateMutation.isPending}
                    className="bg-background border border-white/10 text-xs px-2 py-1 rounded-sm outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirm</option>
                    <option value="completed">Complete</option>
                    <option value="cancelled">Cancel</option>
                  </select>
                </td>
              </tr>
            ))}
            {bookings?.length === 0 && (
              <tr><td colSpan={6} className="text-center py-8 text-foreground/50">No bookings found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
