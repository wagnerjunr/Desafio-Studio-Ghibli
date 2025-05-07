import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(minutesStr:string) {
  const minutes = parseInt(minutesStr, 10); 
  if (isNaN(minutes)) {
    return "Invalid input"; 
  }

  const hours = Math.floor(minutes / 60); 
  const remainingMinutes = minutes % 60; 

  const hoursStr = hours > 0 ? `${hours}h` : "";
  const minutesStrRes = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

  return `${hoursStr} ${minutesStrRes}`.trim();
}


import * as React from 'react'

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false)

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches)
    }

    const result = matchMedia(query)
    result.addEventListener('change', onChange)
    setValue(result.matches)

    return () => result.removeEventListener('change', onChange)
  }, [query])

  return value
}
