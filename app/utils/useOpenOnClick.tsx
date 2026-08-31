import { useEffect, useState, useRef } from "react";

export default function useOpenOnClick() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(()=>{
    function handleClick(event:MouseEvent) {
      if (ref.current && ref.current.contains(event.target as Node)) {
        setIsOpen((prev)=>!prev);
      }
      else {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, [])

  return {ref, isOpen};
}