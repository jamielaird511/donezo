import { Suspense } from "react";
import SuccessClient from "./SuccessClient";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-base text-[#374151]/70">Loading...</p>
      </div>
    }>
      <SuccessClient />
    </Suspense>
  );
}

