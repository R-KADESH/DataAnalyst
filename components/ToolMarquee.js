// Endless ticker of tools. The list is doubled so the loop is seamless.
export default function ToolMarquee({ tools }) {
  const items = [...tools, ...tools];
  return (
    <div className="overflow-hidden border-y border-line bg-surface py-5">
      <div className="flex w-max animate-marquee gap-12">
        {items.map((tool, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold text-muted/70">
            {tool}
            <span className="text-sun">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
