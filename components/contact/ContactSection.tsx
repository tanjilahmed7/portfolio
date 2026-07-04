import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { site } from "@/data/site";

const contactDetails = [
  { label: "Name", value: site.name },
  { label: "Location", value: site.location },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Website", value: "tanjilahmed.com", href: site.url },
  // TODO: replace with final profile URLs when available
  { label: "LinkedIn", value: "linkedin.com/in/tanjilahmed", href: site.linkedin },
  { label: "GitHub", value: "github.com/tanjilahmed", href: site.github },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-24 md:py-36">
      <div className="glow-orb bottom-0 left-1/4 h-[26rem] w-[26rem] bg-glow/10" />
      <div className="container-x relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-4">Contact</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
              Let&apos;s build something{" "}
              <span className="text-gradient">scalable</span>.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg">
              Whether you need a platform architected from scratch, an existing
              system rescued, or an AI capability integrated properly — tell me
              what you&apos;re building.
            </p>

            <dl className="mt-10 space-y-4">
              {contactDetails.map((item) => (
                <div
                  key={item.label}
                  className="flex items-baseline gap-4 border-b border-line pb-3"
                >
                  <dt className="w-24 shrink-0 font-mono text-[0.68rem] tracking-wider text-faint uppercase">
                    {item.label}
                  </dt>
                  <dd className="text-sm">
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                        className="text-ink transition-colors hover:text-accent"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-ink">{item.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.15}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
