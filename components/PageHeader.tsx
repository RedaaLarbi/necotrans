interface PageHeaderProps {
  label: string;
  title: string;
  subtitle: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-[oklch(0.08_0.07_258)] pt-36 pb-20 text-center">
      {/* Orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 700,
          height: 700,
          top: "-200px",
          right: "-150px",
          background: "radial-gradient(circle, oklch(0.35 0.22 258 / 0.40) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: 500,
          height: 500,
          bottom: "-150px",
          left: "-80px",
          background: "radial-gradient(circle, oklch(0.75 0.16 78 / 0.18) 0%, transparent 70%)",
          filter: "blur(70px)",
        }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-medium tracking-widest uppercase text-[var(--orange)] mb-4">{label}</p>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">{title}</h1>
        <p className="text-white/50 max-w-xl mx-auto text-lg leading-relaxed">{subtitle}</p>
      </div>
    </section>
  );
}
