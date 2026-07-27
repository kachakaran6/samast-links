import { useEffect, useState } from "react";

function useIsElementInViewport(ref: any) {
  const [isInViewport, setIsInViewport] = useState(true);

  useEffect(() => {
    let t = setInterval(() => {
      if (ref?.current) {
        clearInterval(t);
        function checkIsInViewport() {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const isInView =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
              (window.innerWidth || document.documentElement.clientWidth);

          setIsInViewport(isInView);
        }

        function handleScroll() {
          checkIsInViewport();
        }
        checkIsInViewport(); // Check on initial render
        window.addEventListener("scroll", handleScroll);
        window.addEventListener("resize", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
          window.removeEventListener("resize", handleScroll);
        };
      }
    }, 500);
  }, [ref]);

  return isInViewport;
}

export default useIsElementInViewport;
