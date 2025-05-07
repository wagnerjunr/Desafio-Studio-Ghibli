import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ElementType; 
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {Icon && (
          <span className="absolute left-3">
            <Icon size={18} className="stroke-neutral/40 "/>
          </span>
        )}
        <input
          type={type}
          className={cn(
            `flex w-full h-11 rounded-xl bg-element border border-border px-3 py-2 ${Icon ? 'pl-10' : 'pl-3'} text-[16px] 
            md:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium 
            placeholder:text-neutral/40 focus-visible:outline-none focus-visible:ring-2 
            focus-visible:ring-primary first-line:focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
