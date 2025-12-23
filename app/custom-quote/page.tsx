import { Suspense } from "react";
import CustomQuoteClient from "./CustomQuoteClient";

export default function CustomQuotePage() {
  return (
    <Suspense fallback={null}>
      <CustomQuoteClient />
    </Suspense>
  );
}

