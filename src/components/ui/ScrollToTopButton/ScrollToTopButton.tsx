"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ScrollToTopButton.styles";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.pageYOffset > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <Button onClick={handleClick} aria-label="Scroll to top">
      <Image
        src="/assets/icons/scroll-to-top.svg"
        alt="Scroll to top"
        width={30}
        height={30}
      />
    </Button>
  );
};

export default ScrollToTopButton;
