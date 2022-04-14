import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const ScrollToTop = () => {
  const { y: pageYOffset } = useWindowScroll();
  const [visible, setVisiblity] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisiblity(true);
    } else {
      setVisiblity(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!visible) {
    return false;
  }

  return (
    <div className="scroll-to-top" onClick={scrollToTop}>
      <img className="to-top" src="https://i.postimg.cc/C1tJdjhh/imageedit-2-8071840377.png" />
    </div>
  );
};

export default ScrollToTop;
