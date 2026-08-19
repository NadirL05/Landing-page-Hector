"use client";

import { useEffect, useRef, type ReactNode } from "react";

// Choreographie de scroll minimale — un IntersectionObserver par instance,
// anime uniquement opacity/transform (compositor-friendly, voir
// app/globals.css [data-reveal]). Respecte prefers-reduced-motion via le
// media query CSS : si l'utilisateur préfère moins d'animations, l'élément
// est simplement visible (pas de traitement de masquage appliqué).
//
// Progressive enhancement délibérée : l'attribut data-reveal="pending" qui
// déclenche le masquage CSS n'est posé qu'au montage côté client, jamais au
// rendu serveur. Si le JS échoue à charger ou à s'hydrater, le contenu reste
// visible par défaut (HTML SSR sans l'attribut) plutôt que caché à vie —
// un site de gestion de patrimoine ne doit jamais dépendre du JS pour être
// lisible.
interface ScrollRevealProps {
  children: ReactNode;
  /** Délai de déclenchement en ms — pour choréographier plusieurs blocs. */
  delayMs?: number;
  className?: string;
}

export function ScrollReveal({ children, delayMs = 0, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Si l'élément est déjà dans le viewport au montage (ex. juste sous le
    // pli, ou JS lent à s'hydrater), on l'affiche directement — pas de
    // masquage rétroactif d'un contenu déjà visible à l'écran.
    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.9;
    if (alreadyVisible) return;

    el.setAttribute("data-reveal", "pending");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              entry.target.setAttribute("data-reveal", "in");
            }, delayMs);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delayMs]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
