import { useEffect } from "react";

/**
 * Adds `is-visible` to every `.reveal` element when it scrolls into view.
 * Also picks up elements added later (e.g. GitHub repos that load async).
 */
export function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const observeAll = (root: ParentNode) =>
      root.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));

    observeAll(document);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) =>
        m.addedNodes.forEach((n) => {
          if (n instanceof HTMLElement) {
            if (n.matches(".reveal:not(.is-visible)")) io.observe(n);
            observeAll(n);
          }
        })
      );
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
}
