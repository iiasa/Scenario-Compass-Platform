"use client";

import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";

/**
 * Mobile-only floating action button that scrolls back to the top of the page.
 * It fades in once the user has scrolled down roughly half a screen. Styled to
 * match the brand's other floating action (see feedback-button).
 */
const SHOW_THRESHOLD = 400;

export default function ScrollToTopButton() {
  const { y } = useScroll();
  const visible = y > SHOW_THRESHOLD;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      type="button"
      size="icon"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      className={cn(
        "bg-red-orange text-background hover:bg-primary fixed right-4 bottom-6 z-50 size-11 rounded-full shadow-lg transition-opacity duration-300 hover:text-white sm:hidden",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <ArrowUp aria-hidden="true" />
    </Button>
  );
}
