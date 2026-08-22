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

    // Close if user clicks outside or selects something inside
    function handleMonthsTabClickOutside(event:MouseEvent) {
      if (node && !node.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleMonthsTabClickInside(event:MouseEvent) {
      if (isOpen && node && !node.contains(event.target as Node)) {
        setIsOpen(false);
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