export default function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const nameColor    = variant === "dark" ? "#ffffff"               : "#1a1a2e";
  const transitColor = variant === "dark" ? "rgba(255,255,255,0.60)" : "#666666";
  const RED = "#CC1A1A";

  /*
    Globe mark construction:
    - Circle clip: cx=44, cy=45, r=42
    - 7 red rectangular bands rotated +17° clockwise around (44,45)
    - Band y-positions are computed so that after rotation, all 7 bands
      fall evenly within the globe circle (screen y 3–87).
    - Each band: h=7px, gap≈7px → 1:1 ratio matching the real logo.
    - x span (-30 to 130) ensures bands fill the circle even after rotation.
  */
  const bands = [
    { y: 1  },
    { y: 15 },
    { y: 29 },
    { y: 43 },
    { y: 57 },
    { y: 71 },
    { y: 85 },
  ];

  return (
    <svg
      viewBox="0 0 295 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Necotrans Transit"
      role="img"
    >
      <defs>
        <clipPath id="nc-globe-clip">
          <circle cx="44" cy="45" r="42" />
        </clipPath>
      </defs>

      {/* Globe mark */}
      <g clipPath="url(#nc-globe-clip)" transform="rotate(17 44 45)">
        {bands.map(({ y }, i) => (
          <rect key={i} x="-30" y={y} width="160" height="7" fill={RED} />
        ))}
      </g>

      {/* Wordmark */}
      <text
        x="94" y="48"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="36"
        fontWeight="700"
        letterSpacing="-0.5"
        fill={nameColor}
      >
        Necotrans
      </text>
      <text
        x="96" y="70"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="19"
        fontWeight="300"
        letterSpacing="1"
        fill={transitColor}
      >
        Transit
      </text>
    </svg>
  );
}
