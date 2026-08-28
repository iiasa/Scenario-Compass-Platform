import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

/** Status eyebrow with a pulsing burgundy dot, shared by the public-review band and block. */
export function PublicReviewEyebrow({ children, className }: Props) {
  return (
    <p
      className={cn(
        "text-burgundy flex items-center gap-[9px] text-[13px] font-bold tracking-[0.1em] uppercase",
        className,
      )}
    >
      <span className="bg-burgundy size-2 shrink-0 rounded-full" aria-hidden="true" />
      {children}
    </p>
  );
}
