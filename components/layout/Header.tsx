import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E5E7EB] bg-white shadow-sm transition-all">
      <Container className="grid grid-cols-3 items-center py-3">
        <div className="flex h-14 items-center justify-center justify-self-start">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/brand/logo.svg"
              alt="donezo."
              height={40}
              width={122}
            />
          </Link>
        </div>

        <nav className="hidden gap-6 text-sm text-[#0B1220] md:flex justify-self-center">
          <a href="#services" className="transition-colors hover:text-[#111827] hover:underline">
            Services
          </a>
        </nav>

        <div className="justify-self-end">
          <a href="/pro" className="rounded-md bg-[#7FCB00] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#FFFFFF] transition-colors hover:bg-[#6FB800]">
            Donezo Pro Login
          </a>
        </div>
      </Container>
    </header>
  );
}

