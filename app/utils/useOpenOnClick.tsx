import { useEffect, useState, useRef } from "react";

export default function useOpenOnClick() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const node = ref.current;
    function handleClick(event:MouseEvent) {
      if (node && node.contains(event.target as Node)) {
        if (isOpen) {
          setIsOpen((prev)=>!prev)
        }
        else {
          setIsOpen((prev)=>!prev)
        }
      }
    }
    function handleMonthsTabClickOutside(event:MouseEvent) {
      if (node && !node.contains(event.target as Node)) {
        setIsOpen((prev)=>!prev);
      }
    }
    function handleMonthsTabClickInside(event:MouseEvent) {
      if (isOpen && node && !node.contains(event.target as Node)) {
        setIsOpen((prev)=>!prev);
      }
    }
    
    document.addEventListener("click", handleClick);
    document.addEventListener("mousedown", handleMonthsTabClickOutside);
    document.addEventListener("mousedown", handleMonthsTabClickInside);

    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("mousedown", handleMonthsTabClickOutside);
      document.addEventListener("mousedown", handleMonthsTabClickInside);
    }
  }, [])

  return {ref, isOpen};
}