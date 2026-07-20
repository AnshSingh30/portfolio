import { cn } from '@/lib/utils';

interface ChapterLabelProps {
  number: string;
  label: string;
  className?: string;
}

export default function ChapterLabel({ number, label, className }: ChapterLabelProps) {
  return (
    <div className={cn("flex items-center gap-2 mb-12", className)}>
      <span className="font-mono text-[0.65rem] tracking-[0.25em] text-[#ffffff] uppercase">
        {number} · {label}
      </span>
    </div>
  );
}
