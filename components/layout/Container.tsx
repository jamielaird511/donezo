import React from "react";

export default function Container({ 
  children, 
  className = "" 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-4xl px-8 lg:px-12 xl:px-16 2xl:px-20 ${className}`}>
      {children}
    </div>
  );
}

