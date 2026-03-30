import { AdminLayout } from "./Layout";
import { useGetContactMessages } from "@workspace/api-client-react";
import { format } from "date-fns";

export default function AdminMessages() {
  const { data: messages, isLoading } = useGetContactMessages();

  return (
    <AdminLayout>
      <h1 className="text-3xl font-display text-white mb-8">Inquiries & Messages</h1>

      <div className="space-y-4">
        {isLoading ? (
          <div className="text-white">Loading messages...</div>
        ) : messages?.map((msg) => (
          <div key={msg.id} className="bg-card border border-white/5 rounded-sm p-6 relative overflow-hidden">
            {!msg.read && <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>}
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium text-white">{msg.subject}</h3>
                <p className="text-sm text-foreground/60">{msg.name} &lt;{msg.email}&gt; {msg.phone && `| ${msg.phone}`}</p>
              </div>
              <span className="text-xs text-foreground/40 font-mono">
                {format(new Date(msg.createdAt), 'MMM d, yyyy HH:mm')}
              </span>
            </div>
            
            <div className="bg-background/50 p-4 rounded-sm border border-white/5 text-sm text-foreground/80 whitespace-pre-wrap">
              {msg.message}
            </div>
            
            <div className="mt-4 flex gap-3">
              <button className="text-xs uppercase tracking-widest font-bold text-primary hover:text-white transition-colors">
                Reply via Email
              </button>
              <button className="text-xs uppercase tracking-widest font-bold text-foreground/50 hover:text-white transition-colors">
                Mark as Read
              </button>
            </div>
          </div>
        ))}
        {messages?.length === 0 && (
          <div className="text-center py-12 text-foreground/50 bg-card border border-white/5 rounded-sm">
            No messages yet.
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
