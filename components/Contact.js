import Reveal from "@/components/Reveal";

export default function Contact({ profile }) {
  const links = [
    profile.email && { label: "Email me", href: `mailto:${profile.email}`, primary: true },
    profile.linkedin && { label: "LinkedIn", href: profile.linkedin },
    profile.github && { label: "GitHub", href: profile.github },
    profile.resume_url && { label: "Download CV", href: profile.resume_url },
  ].filter(Boolean);

  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-navy-deep px-6 py-16 text-center text-white sm:px-16 sm:py-20">
        <div className="absolute -bottom-24 left-1/4 -z-10 h-72 w-[30rem] rounded-full bg-sky/45 blur-3xl animate-float" />
        <div className="absolute -top-24 right-0 -z-10 h-56 w-72 rounded-full bg-sun/25 blur-3xl animate-float-slow" />
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Let&apos;s work together</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          Hiring a data analyst intern, or reviewing a scholarship application? I keep learning and I care about getting it right. I&apos;d love to hear from you.
        </p>
        {profile.availability?.length > 0 && (
          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {profile.availability.map((item) => (
              <li
                key={item}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/85"
              >
                <span className="h-2 w-2 rounded-full bg-leaf" />
                Open to {item.toLowerCase()}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {links.length > 0 ? (
            links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className={`rounded-full px-6 py-3 font-medium transition hover:-translate-y-0.5 ${
                  link.primary
                    ? "bg-white text-navy hover:bg-accent-soft"
                    : "border border-white/25 hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))
          ) : (
            <p className="text-white/50">Contact links coming soon.</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}
