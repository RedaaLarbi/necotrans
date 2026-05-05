export default function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const nameColor    = variant === "dark" ? "#ffffff"              : "#0a1e54";
  const tagColor     = variant === "dark" ? "rgba(255,255,255,0.50)" : "#1e3a8a";
  const transitColor = variant === "dark" ? "rgba(255,255,255,0.70)" : "#1e3a8a";

  return (
    <svg
      viewBox="0 0 320 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Transit Necotrans"
      role="img"
    >
      {/* ── "TRANSIT" super-label ── */}
      {/* Left accent bar */}
      <rect x="0" y="8" width="3" height="12" rx="1.5" fill="#e63946" />

      {/* "TRANSIT" text */}
      <text
        x="9" y="19"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="5"
        fill={transitColor}
      >
        TRANSIT
      </text>

      {/* Thin line extending after TRANSIT */}
      <line x1="82" y1="13" x2="220" y2="13" stroke={transitColor} strokeWidth="0.8" strokeOpacity="0.35" />

      {/* ── "Necotrans" main wordmark ── */}
      <text
        x="0" y="60"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="50"
        fontWeight="800"
        letterSpacing="-2.5"
        fill={nameColor}
      >
        Necotrans
      </text>

      {/* Red accent dot */}
      <circle cx="309" cy="48" r="5" fill="#e63946" />

      {/* Three-colour divider */}
      <line x1="1"   y1="69" x2="90"  y2="69" stroke="#e63946" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="95"  y1="69" x2="170" y2="69" stroke="#f4a261" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="175" y1="69" x2="225" y2="69" stroke="#1e3a8a" strokeWidth="2.5" strokeLinecap="round" />

      {/* Tagline */}
      <text
        x="1" y="80"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="8.5"
        fontWeight="600"
        letterSpacing="3.5"
        fill={tagColor}
      >
        GLOBAL  ·  TRANSPORT  ·  LOGISTICS
      </text>
    </svg>
  );
}
