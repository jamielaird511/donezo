import React from "react";

export default function PreHeroBanner() {
  return (
    <div className="w-full border-b border-[#E5E7EB] bg-zinc-900">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-center px-4 sm:px-6">
        <div className="font-space-grotesk text-[13px] font-medium tracking-[0.03em] text-white/80 sm:text-[14px]">
          Got a job <span className="mx-2 text-white/40">→</span>
          Get it done <span className="mx-2 text-white/40">→</span>
          <span className="text-white/95">Donezo</span>
        </div>
      </div>
    </div>
  );
}

