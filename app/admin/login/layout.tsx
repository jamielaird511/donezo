export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No auth gating - just render children
  return <>{children}</>;
}


