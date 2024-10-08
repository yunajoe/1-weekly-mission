import React, { useEffect } from "react";

interface useOutsideClickType {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
}

export default function useOutsideClick({
  ref,
  callback,
}: useOutsideClickType) {
  const handleClick = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      event.preventDefault();
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
}
