(() => {
    const EXIT_MS = 460;
    let isNavigating = false;

    function markNavigationTrigger(sourceEl) {
        const candidate = sourceEl || document.activeElement;
        if (!candidate || !candidate.classList) return;
        candidate.classList.add("nav-rotate-trigger");
    }

    function canAnimate() {
        return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function isInternalLink(anchor) {
        if (!anchor || !anchor.href) return false;
        if (anchor.target && anchor.target.toLowerCase() === "_blank") return false;
        if (anchor.hasAttribute("download")) return false;
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) return false;
        return true;
    }

    function navigateWithTransition(url, sourceEl) {
        if (!url || isNavigating) return;
        if (!canAnimate()) {
            window.location.href = url;
            return;
        }

        isNavigating = true;
        markNavigationTrigger(sourceEl);
        document.body.classList.add("page-exit");
        window.setTimeout(() => {
            window.location.href = url;
        }, EXIT_MS);
    }

    window.navigateWithTransition = navigateWithTransition;

    document.addEventListener("DOMContentLoaded", () => {
        if (canAnimate()) {
            document.body.classList.add("page-enter");
            requestAnimationFrame(() => {
                document.body.classList.add("page-enter-active");
            });
        }

        document.addEventListener("click", (event) => {
            const anchor = event.target.closest("a");
            if (!anchor || anchor.dataset.noTransition === "true") return;
            if (!isInternalLink(anchor)) return;

            const targetUrl = new URL(anchor.href, window.location.href);
            const currentUrl = new URL(window.location.href);
            if (targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search) return;

            event.preventDefault();
            navigateWithTransition(anchor.href, anchor);
        });

        const shouldAnimateForms = Boolean(document.querySelector(".main-wrapper"));
        if (shouldAnimateForms) {
            document.querySelectorAll("form").forEach((form) => {
                form.addEventListener("submit", (event) => {
                    if (form.dataset.noTransition === "true" || isNavigating || !canAnimate()) return;
                    event.preventDefault();
                    isNavigating = true;
                    markNavigationTrigger(event.submitter || form.querySelector('button[type="submit"], input[type="submit"]'));
                    document.body.classList.add("page-exit");
                    window.setTimeout(() => {
                        form.submit();
                    }, EXIT_MS);
                });
            });
        }
    });
})();
