import { useEffect, useState } from "react";

function ScrollTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 200);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return visible ? (
        <button
            onClick={scrollToTop}
            className="scroll-top-btn"
            aria-label="Subir arriba"
        >
            <i className="bi bi-arrow-up scroll-top-icon"></i>
        </button>
    ) : null;
}

export default ScrollTop;