(() => {
    const selectors = [
        ".btn-neon",
        ".role-card",
        ".login-btn-top-left",
        ".nav-btn",
        ".neon-btn",
        ".submit-btn",
        ".profile-icon"
    ].join(", ");

    function attachGlow(el) {
        if (!el || el.dataset.glowBound === "true") return;
        el.dataset.glowBound = "true";
        el.classList.add("ui-glow-target");

        el.addEventListener("mousemove", (event) => {
            const rect = el.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            el.style.setProperty("--mx", `${x}px`);
            el.style.setProperty("--my", `${y}px`);
        });

        el.addEventListener("click", (event) => {
            const rect = el.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height) * 1.2;
            const ripple = document.createElement("span");
            ripple.className = "ui-ripple";
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;
            ripple.style.left = `${event.clientX - rect.left}px`;
            ripple.style.top = `${event.clientY - rect.top}px`;
            el.appendChild(ripple);
            window.setTimeout(() => ripple.remove(), 650);
        });
    }

    function initializeGlowEffects() {
        document.querySelectorAll(selectors).forEach(attachGlow);
    }

    function ensureClickFxLayer() {
        let fx = document.getElementById("click-light-fx");
        if (!fx) {
            fx = document.createElement("div");
            fx.id = "click-light-fx";
            document.body.appendChild(fx);
        }
        return fx;
    }

    document.addEventListener("DOMContentLoaded", () => {
        initializeGlowEffects();
        const fx = ensureClickFxLayer();

        document.addEventListener("click", (event) => {
            const trigger = event.target.closest("button, .btn-neon, .role-card, .login-btn-top-left, .nav-btn, .neon-btn, .submit-btn, .profile-icon, a[role='button']");
            if (!trigger) return;

            const x = event.clientX || (window.innerWidth / 2);
            const y = event.clientY || (window.innerHeight / 2);
            fx.style.setProperty("--fx-x", `${x}px`);
            fx.style.setProperty("--fx-y", `${y}px`);

            fx.classList.remove("active");
            // Force restart animation
            void fx.offsetWidth;
            fx.classList.add("active");
        }, true);
    });
})();
