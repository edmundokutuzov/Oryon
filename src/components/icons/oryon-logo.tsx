import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OryonLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative inline-block", className)}>
      <Shield className="h-12 w-12 text-primary" />
      <div className="absolute -top-1 -right-1">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 bg-green-500 rounded-full pulse-soft"></div>
          <div className="absolute inset-0 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
