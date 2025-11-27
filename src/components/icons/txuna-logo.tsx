import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function TxunaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-52 h-16", className)}>
      <Image
        src="https://i.imgur.com/liiCufN.png"
        alt="Txuna Bet Logo"
        fill
        className="object-contain"
      />
    </div>
  );
}
