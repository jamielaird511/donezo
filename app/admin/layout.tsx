export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Minimal passthrough - no auth checks, no redirects
  // Auth gating is handled by app/admin/(protected)/layout.tsx
  return <>{children}</>;
}

