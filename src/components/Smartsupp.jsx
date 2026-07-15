import { useEffect } from "react";

export default function Smartsupp() {
  useEffect(() => {
    // Prevent loading twice
    if (window.smartsupp) return;

    window._smartsupp = window._smartsupp || {};
    window._smartsupp.key = "ed240c21595a422bbc8186278ecd81a093cebfa0";

    window.smartsupp =
      window.smartsupp ||
      function () {
        (window.smartsupp._ = window.smartsupp._ || []).push(arguments);
      };

    const script = document.createElement("script");
    script.src = "https://www.smartsuppchat.com/loader.js";
    script.async = true;
    script.charset = "utf-8";

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}
