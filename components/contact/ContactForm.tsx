"use client";

import { useState, type FormEvent } from "react";

const projectTypes = [
  "Web Application",
  "E-commerce Platform",
  "SaaS Product",
  "AI Integration",
  "WordPress Project",
  "CMS Platform",
  "Consulting / Architecture Review",
  "Other",
];

const budgetRanges = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const inputClasses =
  "w-full rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-ink placeholder:text-faint transition-colors duration-300 focus:border-accent/60 focus:outline-none focus:ring-1 focus:ring-accent/40";

/**
 * Contact form UI. No backend is wired up yet — see the TODO in
 * handleSubmit for where to connect an API route or form service.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: connect to a real endpoint when the backend is ready, e.g.:
    //   const formData = new FormData(e.currentTarget);
    //   await fetch("/api/contact", {
    //     method: "POST",
    //     body: JSON.stringify(Object.fromEntries(formData)),
    //     headers: { "Content-Type": "application/json" },
    //   });
    // Recommended: a Next.js route handler at app/api/contact/route.ts that
    // validates input and relays via an email provider (Resend, SES, etc.).

    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div
        className="glass flex h-full min-h-72 flex-col items-center justify-center rounded-3xl p-10 text-center"
        role="status"
      >
        <span className="grid h-14 w-14 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-6 w-6"
            aria-hidden
          >
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h3 className="mt-5 font-display text-xl font-semibold">
          Message received
        </h3>
        <p className="mt-2 max-w-sm text-sm text-muted">
          Thanks for reaching out — I&apos;ll get back to you within one
          business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass rounded-3xl p-7 md:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-xs font-medium text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label
            htmlFor="projectType"
            className="mb-2 block text-xs font-medium text-muted"
          >
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            defaultValue=""
            className={`${inputClasses} appearance-none`}
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypes.map((type) => (
              <option key={type} value={type} className="bg-surface">
                {type}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="budget"
            className="mb-2 block text-xs font-medium text-muted"
          >
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            required
            defaultValue=""
            className={`${inputClasses} appearance-none`}
          >
            <option value="" disabled>
              Select a budget range
            </option>
            {budgetRanges.map((range) => (
              <option key={range} value={range} className="bg-surface">
                {range}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="mb-2 block text-xs font-medium text-muted"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell me about the system you want to build…"
            className={`${inputClasses} resize-y`}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 w-full rounded-full bg-gradient-to-r from-accent-deep to-glow px-8 py-3.5 text-sm font-semibold text-void transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}
