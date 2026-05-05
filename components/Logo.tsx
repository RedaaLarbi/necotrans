export default function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const nameColor    = variant === "dark" ? "#ffffff"              : "#555555";
  const transitColor = variant === "dark" ? "rgba(255,255,255,0.70)" : "#888888";

  return (
    <svg
      viewBox="0 0 250 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="necotrans Transit"
      role="img"
    >
      {/* ── Red swoosh / wing icon ── */}
      {/* 7 curved stripes fanning from lower-left to upper-right */}
      {/* Stripe 1 — innermost */}
      <path d="M 9 68 Q 3 44 24 10 L 28 13 Q 8 47 13 68 Z" fill="#D42B2B"/>
      {/* Stripe 2 */}
      <path d="M 15 70 Q 8 43 32 8 L 36 11 Q 12 45 19 70 Z" fill="#D32828"/>
      {/* Stripe 3 */}
      <path d="M 22 71 Q 14 42 40 6 L 44 9 Q 18 44 26 71 Z" fill="#CC2424"/>
      {/* Stripe 4 — middle */}
      <path d="M 29 72 Q 21 41 48 5 L 52 8 Q 25 43 33 72 Z" fill="#C82020"/>
      {/* Stripe 5 */}
      <path d="M 36 72 Q 28 40 56 4 L 60 7 Q 32 42 40 72 Z" fill="#C41C1C"/>
      {/* Stripe 6 */}
      <path d="M 44 71 Q 36 38 63 3 L 67 6 Q 40 40 48 71 Z" fill="#C01818"/>
      {/* Stripe 7 — outermost */}
      <path d="M 52 69 Q 44 36 69 1 L 72 4 Q 48 38 56 69 Z" fill="#BB1414"/>

      {/* ── Wordmark ── */}
      {/* "necotrans" — lowercase, medium weight, gray */}
      <text
        x="80" y="46"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="34"
        fontWeight="400"
        letterSpacing="-0.5"
        fill={nameColor}
      >
        necotrans
      </text>

      {/* "Transit" — below, lighter, smaller */}
      <text
        x="83" y="66"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="20"
        fontWeight="300"
        letterSpacing="0.5"
        fill={transitColor}
      >
        Transit
      </text>
    </svg>
  );
}
