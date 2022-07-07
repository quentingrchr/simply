import { useState, useEffect } from "react";


interface IScrollPos {
  scrollX: number;
  scrollY: number;
}

const useScroll = () :IScrollPos => {
  const [scrollPosition, setScrollPosition] = useState<IScrollPos>({
    scrollX: 0,
    scrollY: 0
  });

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(
        {
          scrollX: window.scrollX,
          scrollY: window.scrollY
        }
      );
    }
    window.addEventListener("scroll", updatePosition);
    updatePosition();
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return scrollPosition;
};

export default useScroll;