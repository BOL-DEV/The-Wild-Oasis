import { useEffect } from "react";

export const useOutsideClick = (ref, close) => {
  // console.log(ref)

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        // console.log("clicked outside");
        close();
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => document.removeEventListener("click", handleClick, true);
  });
};
