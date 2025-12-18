export function GutterIcon({ className = "w-5 h-5 text-lime-300" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3 10l9-6 9 6" />
      <path d="M5 12v5c0 1 .8 2 2 2h10c1.2 0 2-.8 2-2v-5" />
      <path d="M7 18h10" />
      <path d="M12 18v3" />
    </svg>
  );
}




