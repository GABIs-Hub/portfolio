"use client";

import { useEffect, useRef, useState, type AnchorHTMLAttributes, type ReactNode } from "react";

type ExternalActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  pendingLabel?: string;
};

export function ExternalActionLink({
  children,
  pendingLabel = "Opening…",
  onClick,
  ...props
}: ExternalActionLinkProps) {
  const [pending, setPending] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  return (
    <a
      {...props}
      aria-busy={pending}
      data-pending={pending ? "" : undefined}
      onClick={(event) => {
        if (pending) {
          event.preventDefault();
          return;
        }
        onClick?.(event);
        if (event.defaultPrevented) return;
        setPending(true);
        if (resetTimer.current) clearTimeout(resetTimer.current);
        resetTimer.current = setTimeout(() => setPending(false), 1400);
      }}
    >
      {pending ? pendingLabel : children}
      <span className="sr-only" aria-live="polite">
        {pending ? pendingLabel : ""}
      </span>
    </a>
  );
}
