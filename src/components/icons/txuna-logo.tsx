import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function TxunaLogo({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <Image
        src="https://i.imgur.com/liiCufN.png"
        alt="Txuna Bet Logo"
        width={160}
        height={50}
        priority
      />
    </div>
  );
}
