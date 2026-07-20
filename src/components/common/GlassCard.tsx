import { cn } from '@/lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "bg-transparent backdrop-blur-sm border border-[#ffffff]/10 rounded flex flex-col transition-all duration-400 ease-out hover:border-[#ffffff]/30 hover:shadow-[0_20px_60px_rgba(255,255,255,0.08)]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
