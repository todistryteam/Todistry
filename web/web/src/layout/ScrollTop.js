import { useEffect, useState } from "react";

const ScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = () => {
    let offset = window.scrollY;
    const sticky = document.getElementById("scrollUp");
    if (sticky) {
      if (offset > 300) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    }
  };

  return (
    <a
      id="scrollUp"
      href="#top"
      title=""
      style={{
        position: "fixed",
        zIndex: 2147483647,
        display: scrollTop ? "block" : "none",
      }}
    ></a>
  );
};

export default ScrollTop;
